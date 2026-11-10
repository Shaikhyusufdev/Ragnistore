// Vercel serverless function: admin panel se image -> AceCloud S3 -> public URL
const crypto = require('crypto');
const E = process.env;
const H = (k, d) => (E[k] || d || '').trim();

module.exports = async (req, res) => {
  const fail = (c, m) => res.status(c).json({ error: m });
  if (req.method !== 'POST') return fail(405, 'POST only');
  const pass = H('ADMIN_PASS');
  if (!pass || req.headers['x-admin-pass'] !== pass) return fail(401, 'Wrong upload password');

  const chunks = []; let size = 0;
  for await (const c of req) { size += c.length; if (size > 4 * 1024 * 1024) return fail(413, 'Image too large (max 4 MB)'); chunks.push(c); }
  const body = Buffer.concat(chunks);
  let mime, ext;
  if (body[0] === 0xFF && body[1] === 0xD8 && body[2] === 0xFF) [mime, ext] = ['image/jpeg', 'jpg'];
  else if (body.slice(1, 4).toString() === 'PNG') [mime, ext] = ['image/png', 'png'];
  else if (body.slice(0, 4).toString() === 'RIFF' && body.slice(8, 12).toString() === 'WEBP') [mime, ext] = ['image/webp', 'webp'];
  else if (body.slice(0, 3).toString() === 'GIF') [mime, ext] = ['image/gif', 'gif'];
  else return fail(400, 'Only JPG, PNG, WEBP or GIF allowed');

  const d = new Date();
  const key = `${H('S3_FOLDER', 'ragni-bags')}/${d.getUTCFullYear()}/${String(d.getUTCMonth() + 1).padStart(2, '0')}/${crypto.randomBytes(8).toString('hex')}.${ext}`;
  const r = await s3Put(key, body, mime);
  if (r !== true) return fail(502, r);
  res.status(200).json({ url: `${H('S3_PUBLIC_BASE')}/${key}` });
};
module.exports.config = { api: { bodyParser: false } };

async function s3Put(key, body, mime) {
  const endpoint = H('S3_ENDPOINT'), bucket = H('S3_BUCKET'), host = new URL(endpoint).host;
  const uri = '/' + bucket + '/' + key.split('/').map(encodeURIComponent).join('/');
  const hash = crypto.createHash('sha256').update(body).digest('hex');
  const hm = (k, v) => crypto.createHmac('sha256', k).update(v).digest();
  let last = 'Upload failed';
  for (const region of H('S3_REGIONS', 'ap-south-noi-1,us-east-1').split(',').map(x => x.trim())) {
    const amz = new Date().toISOString().replace(/[:-]|\.\d{3}/g, ''), date = amz.slice(0, 8);
    const hd = { 'content-type': mime, host, 'x-amz-content-sha256': hash, 'x-amz-date': amz };
    if (H('S3_ACL_PUBLIC') === 'true') hd['x-amz-acl'] = 'public-read';
    const names = Object.keys(hd).sort(), signed = names.join(';');
    const canon = names.map(n => n + ':' + hd[n] + '\n').join('');
    const scope = `${date}/${region}/s3/aws4_request`;
    const sts = `AWS4-HMAC-SHA256\n${amz}\n${scope}\n` + crypto.createHash('sha256').update(`PUT\n${uri}\n\n${canon}\n${signed}\n${hash}`).digest('hex');
    const k = hm(hm(hm(hm('AWS4' + H('S3_SECRET'), date), region), 's3'), 'aws4_request');
    const sig = crypto.createHmac('sha256', k).update(sts).digest('hex');
    const headers = { Authorization: `AWS4-HMAC-SHA256 Credential=${H('S3_KEY')}/${scope}, SignedHeaders=${signed}, Signature=${sig}` };
    names.forEach(n => { if (n !== 'host') headers[n] = hd[n]; });
    try {
      const r = await fetch(endpoint + uri, { method: 'PUT', headers, body });
      if (r.status === 200 || r.status === 201) return true;
      const t = (await r.text()).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 200);
      last = `S3 error ${r.status}: ${t}`;
      if (!/SignatureDoesNotMatch|AuthorizationHeaderMalformed|InvalidRegion|region/i.test(t)) break;
    } catch (e) { last = 'Connection error: ' + e.message; break; }
  }
  return last;
}
