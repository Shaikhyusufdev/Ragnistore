let imgs=[],editId=null,list=[];
const need=()=>$("#app").hidden=!ok();
const ok=()=>sessionStorage.in=="1";
const toast=m=>{const t=$("#toast");t.textContent=m;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)};
async function login(){const pw=$("#pw").value;
 if(db){try{await firebase.auth().signInWithEmailAndPassword($("#em").value,pw)}catch(e){return toast("Login galat hai")}}
 else if(pw!=C.demoPassword)return toast("Password galat hai");
 sessionStorage.in="1";show()}
$("#em").hidden=!db;
$("#lb").onclick=login;
function show(){$("#login").hidden=ok();$("#app").hidden=!ok();if(ok())load()}
async function load(){list=await getProducts();$("#plist").innerHTML=list.map(p=>`<div class="row"><img src="${p.images[0]}"><div><b>${p.title}</b><br><small>₹${p.price} / ₹${p.mrp} • ${pct(p)}% • ${p.cat}</small></div><button onclick="ed('${p.id}')">Edit</button><button onclick="rm('${p.id}')">Delete</button></div>`).join("");
 $("#cats").innerHTML=[...new Set(list.map(p=>p.cat))].map(c=>`<option value="${c}">`).join("")}
function prev(){$("#prev").innerHTML=imgs.map((u,i)=>`<div><img src="${u}"><button onclick="imgs.splice(${i},1);prev()">×</button></div>`).join("")}
async function up(files){const {cloudName:cn,uploadPreset:pr}=C.cloudinary;
 for(const f of files){
  if(!cn){const r=new FileReader();r.onload=()=>{imgs.push(r.result);prev()};r.readAsDataURL(f);toast("Cloudinary set nahi — demo preview");continue}
  const fd=new FormData();fd.append("file",f);fd.append("upload_preset",pr);
  $("#dz").classList.add("busy");
  try{const r=await(await fetch(`https://api.cloudinary.com/v1_1/${cn}/image/upload`,{method:"POST",body:fd})).json();imgs.push(r.secure_url);prev()}catch(e){toast("Upload fail")}
  $("#dz").classList.remove("busy")}}
const dz=$("#dz"),fi=$("#fi");
dz.onclick=()=>fi.click();fi.onchange=()=>up(fi.files);
dz.ondragover=e=>{e.preventDefault();dz.classList.add("over")};dz.ondragleave=()=>dz.classList.remove("over");
dz.ondrop=e=>{e.preventDefault();dz.classList.remove("over");up(e.dataTransfer.files)};
$("#save").onclick=async()=>{const p={id:editId,title:$("#t").value.trim(),cat:$("#c").value.trim()||"General",price:+$("#pr").value,mrp:+$("#mrp").value,desc:$("#d").value,images:imgs};
 if(!p.title||!p.price||!p.mrp||!imgs.length)return toast("Title, price, MRP aur 1 image zaruri hai");
 if(p.mrp<=p.price)return toast("MRP price se bada hona chahiye");
 await saveProduct(p);toast("Saved ✔");reset();load()};
function reset(){editId=null;imgs=[];["t","c","pr","mrp","d"].forEach(i=>$("#"+i).value="");prev();$("#save").textContent="Save Product"}
window.ed=id=>{const p=list.find(x=>x.id==id);editId=id;imgs=[...p.images];$("#t").value=p.title;$("#c").value=p.cat;$("#pr").value=p.price;$("#mrp").value=p.mrp;$("#d").value=p.desc;prev();$("#save").textContent="Update Product";scrollTo({top:0,behavior:"smooth"})};
window.rm=async id=>{if(confirm("Delete karna hai?")){await delProduct(id);load()}};
$("#lo").onclick=()=>{sessionStorage.in="0";db&&firebase.auth().signOut();show()};
show();
