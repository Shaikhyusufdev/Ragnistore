(async()=>{const all=await getProducts(),id=new URLSearchParams(location.search).get("id"),p=all.find(x=>x.id==id);
if(!p){$("#pd").innerHTML="<h2>Product nahi mila</h2><a class='btn' href='index.html'>Home</a>";footer();return}
document.title=`${p.title} - ₹${p.price} | ${C.brand}`;
$('meta[name=description]').content=`${p.title} sirf ₹${p.price} me (${pct(p)}% OFF). ${p.desc.slice(0,110)}`;
const ld=document.createElement("script");ld.type="application/ld+json";ld.text=JSON.stringify({"@context":"https://schema.org","@type":"Product",name:p.title,image:p.images,description:p.desc,offers:{"@type":"Offer",priceCurrency:"INR",price:p.price,availability:"https://schema.org/InStock"}});document.head.append(ld);
$("#pd").innerHTML=`<div class="gal"><span class="badge">${pct(p)}% OFF</span><div class="sl">${p.images.map(i=>`<img src="${i}" alt="${p.title}">`).join("")}</div><div class="dots">${p.images.map((_,i)=>`<b data-i="${i}"></b>`).join("")}</div></div>
<div class="det"><small>${p.cat}</small><h1>${p.title}</h1><div class="pr big"><b>₹${p.price}</b><s>₹${p.mrp}</s><em>Save ${pct(p)}%</em></div>
<a class="btn buy" target="_blank" href="${waLink(p)}">🛒 Buy Now on WhatsApp</a>
<h4>Description</h4><p>${p.desc.replace(/\n/g,"<br>")}</p></div>`;
const sl=$(".sl"),dots=$$(".dots b");let n=0;
const go=i=>{n=(i+p.images.length)%p.images.length;sl.style.transform=`translateX(-${n*100}%)`;dots.forEach((d,k)=>d.classList.toggle("on",k==n))};
go(0);dots.forEach(d=>d.onclick=()=>go(+d.dataset.i));
if(p.images.length>1){let t=setInterval(()=>go(n+1),3000);$(".gal").onmouseenter=()=>clearInterval(t);$(".gal").onmouseleave=()=>t=setInterval(()=>go(n+1),3000);
let sx;sl.ontouchstart=e=>sx=e.touches[0].clientX;sl.ontouchend=e=>{const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>40)go(n+(d<0?1:-1))}}
const s=[...all.filter(x=>x.id!=p.id&&x.cat==p.cat),...all.filter(x=>x.id!=p.id&&x.cat!=p.cat)].slice(0,4);
$("#sug").innerHTML=s.map(card).join("");fx();footer();})();
