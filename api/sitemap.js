// Live sitemap: Firebase ke saare products automatically /sitemap.xml me aate hain
module.exports = async (req, res) => {
  const site = (process.env.SITE_URL || 'https://ragnibags.store').replace(/\/$/, '');
  const pid = (process.env.FIREBASE_PROJECT_ID || '').trim();
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  let docs = [], tok = '';
  if (pid) {
    try {
      do {
        const r = await fetch(`https://firestore.googleapis.com/v1/projects/${pid}/databases/(default)/documents/products?pageSize=300${tok ? '&pageToken=' + tok : ''}`);
        const j = await r.json();
        docs = docs.concat(j.documents || []); tok = j.nextPageToken || '';
      } while (tok);
    } catch (e) {}
  }
  const today = new Date().toISOString().slice(0, 10);
  const urls = [`<url><loc>${site}/</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>`];
  docs.forEach(d => {
    const F = d.fields || {}, id = d.name.split('/').pop();
    const t = F.title?.stringValue || '', c = F.created?.integerValue || F.created?.doubleValue;
    const lm = c ? new Date(+c).toISOString().slice(0, 10) : today;
    const imgs = (F.images?.arrayValue?.values || []).map(v => v.stringValue).filter(Boolean).slice(0, 5);
    urls.push(`<url><loc>${site}/product.html?id=${esc(id)}</loc><lastmod>${lm}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority>${imgs.map(u => `<image:image><image:loc>${esc(u)}</image:loc><image:title>${esc(t)}</image:title></image:image>`).join('')}</url>`);
  });
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join('\n')}\n</urlset>`);
};
