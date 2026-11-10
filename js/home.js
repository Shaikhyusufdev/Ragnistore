(async()=>{const all=await getProducts();let cur="All";
const cats=["All",...new Set(all.map(p=>p.cat))];
$("#chips").innerHTML=cats.map(c=>`<button class="chip ${c==cur?"on":""}">${c}</button>`).join("");
const draw=()=>{const l=cur=="All"?all:all.filter(p=>p.cat==cur);$("#grid").innerHTML=l.map(card).join("")||"<p>Jaldi aa raha hai...</p>";fx()};
$("#chips").onclick=e=>{const b=e.target.closest(".chip");if(!b)return;cur=b.textContent;$$(".chip").forEach(x=>x.classList.toggle("on",x==b));draw()};
draw();
const ld=document.createElement("script");ld.type="application/ld+json";ld.text=JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness",name:C.brand,address:C.address,telephone:"+"+C.whatsapp});document.head.append(ld);
footer();})();

/* ---- naye effects ---- */
(()=>{const T=["daily tote","college backpack","party clutch","mini sling","travel backpack"];let a=0,b=0,d=0;const ty=$("#ty");
(function t(){if(!ty)return;const w=T[a];ty.textContent=w.slice(0,b);if(!d&&b==w.length){d=1;return setTimeout(t,1300)}if(d&&b==0){d=0;a=(a+1)%T.length}b+=d?-1:1;setTimeout(t,d?45:90)})();
const hero=$(".hero");hero.addEventListener("mousemove",e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;$$(".fl").forEach((f,i)=>f.style.translate=`${x*(i+1)*-22}px ${y*(i+1)*-22}px`)});
const hb=$(".hc .btn");hb.addEventListener("click",e=>{for(let i=0;i<30;i++){const c=document.createElement("i");c.className="cf";c.style.cssText=`left:${e.clientX}px;top:${e.clientY}px;--dx:${Math.random()*320-160}px;--dy:${-Math.random()*280-40}px;background:${["#d4a24c","#e63946","#fff","#f0c46e"][i%4]}`;document.body.append(c);setTimeout(()=>c.remove(),1100)}});
$$(".hc .btn,header .btn").forEach(m=>{m.addEventListener("mousemove",e=>{const r=m.getBoundingClientRect();m.style.translate=`${(e.clientX-r.left-r.width/2)*.25}px ${(e.clientY-r.top-r.height/2)*.25}px`});m.addEventListener("mouseleave",()=>m.style.translate="")});
const bar=document.createElement("div");bar.id="bar";document.body.append(bar);addEventListener("scroll",()=>bar.style.width=scrollY/(document.body.scrollHeight-innerHeight)*100+"%");
document.body.insertAdjacentHTML("beforeend",`<a id="wf" href="https://wa.me/${C.whatsapp}?text=${encodeURIComponent("Hello RAGNI BAGS!")}" target="_blank" aria-label="WhatsApp">💬</a><div id="pop"><button id="px" aria-label="Close">×</button><b>Aaj ka offer 🎉</b><p>Chuninda bags pe upto 50% off. Pasand aaye to WhatsApp pe bolo.</p><a class="btn sm" href="#shop" id="pg">Offers dekho</a></div>`);
const pop=$("#pop");setTimeout(()=>{try{if(sessionStorage.pp)return;sessionStorage.pp=1}catch(e){}pop.classList.add("on")},3500);$("#px").onclick=$("#pg").onclick=()=>pop.classList.remove("on");
fx();})();
