const C=window.CONFIG,$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const pct=p=>Math.round((p.mrp-p.price)/p.mrp*100);
const U=i=>`https://images.unsplash.com/${i}?w=800&q=80&auto=format&fit=crop`;
const demo=[
{id:"d1",title:"Classic Leather Tote",cat:"Tote Bags",price:499,mrp:699,desc:"Spacious tote with strong handles and zip pocket. Office aur college dono ke liye perfect.",images:[U("photo-1584917865442-de89df76afd3"),U("photo-1548036328-c9fa89d128fa")]},
{id:"d2",title:"Urban Travel Backpack",cat:"Backpacks",price:899,mrp:1299,desc:"Water resistant backpack, laptop compartment ke saath. Daily travel ke liye best.",images:[U("photo-1553062407-98eeb64c6a62"),U("photo-1622560480605-d83c853bc5c3")]},
{id:"d3",title:"Elegant Sling Bag",cat:"Sling Bags",price:349,mrp:599,desc:"Stylish compact sling, party aur outing ke liye. Adjustable strap.",images:[U("photo-1566150905458-1bf1fc113f0d"),U("photo-1590874103328-eac38a683ce7")]}];
let db=null;
if(C.firebase.apiKey&&window.firebase){firebase.initializeApp(C.firebase);db=firebase.firestore();}
const ls=()=>JSON.parse(localStorage.rp||"null")||demo;
async function getProducts(){if(db){const s=await db.collection("products").orderBy("created","desc").get();return s.docs.map(d=>({id:d.id,...d.data()}))}return ls()}
async function saveProduct(p){if(db){const id=p.id;delete p.id;if(id)await db.collection("products").doc(id).set(p);else{p.created=Date.now();await db.collection("products").add(p)}}else{const l=ls();p.id=p.id||"p"+Date.now();const i=l.findIndex(x=>x.id==p.id);i<0?l.unshift(p):l[i]=p;localStorage.rp=JSON.stringify(l)}}
async function delProduct(id){if(db)await db.collection("products").doc(id).delete();else localStorage.rp=JSON.stringify(ls().filter(x=>x.id!=id))}
const waLink=p=>`https://wa.me/${C.whatsapp}?text=`+encodeURIComponent(`Mujhe ye bag chahiye 🛍️\n\nBag: ${p.title}\nPrice: ₹${p.price} (MRP ₹${p.mrp}, ${pct(p)}% OFF)\nLink: ${location.origin}${location.pathname.replace(/[^/]*$/,"")}product.html?id=${p.id}`);
function card(p,i){return `<a class="card reveal" style="--d:${i*70}ms" href="product.html?id=${p.id}"><span class="badge">${pct(p)}% OFF</span><div class="imgw"><img loading="lazy" src="${p.images[0]}" alt="${p.title}"></div><div class="info"><small>${p.cat}</small><h3>${p.title}</h3><div class="pr"><b>₹${p.price}</b><s>₹${p.mrp}</s></div></div></a>`}
function fx(){
 const io=new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&(x.target.classList.add("in"),io.unobserve(x.target))),{threshold:.12});
 $$(".reveal:not(.in)").forEach(el=>io.observe(el));
 $$(".card").forEach(c=>{if(c._t)return;c._t=1;c.addEventListener("mousemove",e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(700px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-6px)`});c.addEventListener("mouseleave",()=>c.style.transform="")});
}
document.addEventListener("click",e=>{const b=e.target.closest(".btn,.chip");if(!b)return;const r=document.createElement("i");r.className="rip";const k=b.getBoundingClientRect();r.style.left=e.clientX-k.left+"px";r.style.top=e.clientY-k.top+"px";b.appendChild(r);setTimeout(()=>r.remove(),700)});
const glow=document.createElement("div");glow.className="glow";document.body.append(glow);
addEventListener("mousemove",e=>glow.style.transform=`translate(${e.clientX-150}px,${e.clientY-150}px)`);
addEventListener("scroll",()=>$("header")?.classList.toggle("sc",scrollY>30));
addEventListener("load",()=>setTimeout(()=>$("#pre")?.classList.add("off"),600));
function footer(){document.body.insertAdjacentHTML("beforeend",`<footer><div class="fw"><h2>${C.brand}</h2><nav><a href="https://wa.me/${C.whatsapp}" target="_blank">Contact Us</a><a href="${C.instagram}" target="https://www.instagram.com/ragnibags?cplk=bjhwMWk0em5heDRn">Instagram</a><a href="${C.googleProfile}" target="_blank">Google Profile</a></nav><p>📍 ${C.address}</p><small>© ${new Date().getFullYear()} ${C.brand}. All rights reserved.</small></div></footer>`)}
document.body.insertAdjacentHTML("afterbegin",`<div id="pre"><span>${C.brand}</span></div>`);
