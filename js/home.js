(async()=>{const all=await getProducts();let cur="All";
const cats=["All",...new Set(all.map(p=>p.cat))];
$("#chips").innerHTML=cats.map(c=>`<button class="chip ${c==cur?"on":""}">${c}</button>`).join("");
const draw=()=>{const l=cur=="All"?all:all.filter(p=>p.cat==cur);$("#grid").innerHTML=l.map(card).join("")||"<p>Jaldi aa raha hai...</p>";fx()};
$("#chips").onclick=e=>{const b=e.target.closest(".chip");if(!b)return;cur=b.textContent;$$(".chip").forEach(x=>x.classList.toggle("on",x==b));draw()};
draw();
const ld=document.createElement("script");ld.type="application/ld+json";ld.text=JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness",name:C.brand,address:C.address,telephone:"+"+C.whatsapp});document.head.append(ld);
footer();})();

/* ---- hero + effects ---- */
(async()=>{
const all=await getProducts(),hv=$("#hv");let im=all.flatMap(p=>p.images.slice(0,2));
if(im.length){const cols=[0,1,2].map(i=>{let a=im.filter((_,k)=>k%3==i);if(!a.length)a=im.slice();while(a.length<4)a=a.concat(a);return a});
hv.innerHTML=cols.map(a=>`<div class="col">${[...a,...a].map(s=>`<div class="ar"><img src="${s}" alt="" loading="lazy"></div>`).join("")}</div>`).join("");
addEventListener("scroll",()=>{if(scrollY<innerHeight)hv.style.transform=`translateY(${scrollY*.12}px)`},{passive:true})}else hv.remove();
$("#hwa").href=`https://wa.me/${C.whatsapp}?text=${encodeURIComponent("Hello RAGNI BAGS!")}`;
const bar=document.createElement("div");bar.id="bar";document.body.append(bar);
addEventListener("scroll",()=>bar.style.transform=`scaleX(${scrollY/(document.body.scrollHeight-innerHeight)})`,{passive:true});
document.body.insertAdjacentHTML("beforeend",`<a id="wf" href="https://wa.me/${C.whatsapp}?text=${encodeURIComponent("Hello RAGNI BAGS!")}" target="_blank" aria-label="Chat on WhatsApp"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"><path d="M4 5h16v11H9l-5 4z"/></svg></a><div id="pop"><button id="px" aria-label="Close">&times;</button><b>Store offer</b><p>Up to 50% off on selected bags. Message us on WhatsApp to order.</p><a class="btn sm" href="#shop" id="pg">View offers</a></div>`);
const pop=$("#pop");setTimeout(()=>{try{if(sessionStorage.pp)return;sessionStorage.pp=1}catch(e){}pop.classList.add("on")},4500);$("#px").onclick=$("#pg").onclick=()=>pop.classList.remove("on");
fx()})();
