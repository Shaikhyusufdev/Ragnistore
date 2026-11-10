(async()=>{const all=await getProducts();let cur="All";
const cats=["All",...new Set(all.map(p=>p.cat))];
$("#chips").innerHTML=cats.map(c=>`<button class="chip ${c==cur?"on":""}">${c}</button>`).join("");
const draw=()=>{const l=cur=="All"?all:all.filter(p=>p.cat==cur);$("#grid").innerHTML=l.map(card).join("")||"<p>Jaldi aa raha hai...</p>";fx()};
$("#chips").onclick=e=>{const b=e.target.closest(".chip");if(!b)return;cur=b.textContent;$$(".chip").forEach(x=>x.classList.toggle("on",x==b));draw()};
draw();
const ld=document.createElement("script");ld.type="application/ld+json";ld.text=JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness",name:C.brand,address:C.address,telephone:"+"+C.whatsapp});document.head.append(ld);
footer();})();
