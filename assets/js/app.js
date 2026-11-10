const pimg=(p,s)=>`src="assets/images/product-${p.id}.jpg" data-fb="${IMG(p.k,s,p.id)}"`;
/* Paste your image links here. Keys: p1..p12 (products), hero, shophero, promo, about, cat-custom, cat-cupcakes, cat-cookies, cat-pastries, cat-donuts.
   Any key left empty falls back to a keyword photo. Example: p1:'https://example.com/chocolate-cake.jpg' */
const IMGS={p1:'',p2:'',p3:'',p4:'',p5:'',p6:'',p7:'',p8:'',p9:'',p10:'',p11:'',p12:'',hero:'',shophero:'',promo:'',about:'','cat-custom':'','cat-cupcakes':'','cat-cookies':'','cat-pastries':'','cat-donuts':''};
const SRC=(key,k,s,l)=>IMGS[key]||IMG(k,s,l);
const IMG=(k,s,l)=>`https://loremflickr.com/${s}/${s}/${k}?lock=${l||7}`;
const P=[
[1,'Chocolate Delight Cake','chocolate',1200,1500,4.8,'chocolate,cake'],[2,'Vanilla Dream Cake','vanilla',1000,0,4.8,'vanilla,cake'],
[3,'Red Velvet Classic','red',1250,0,4.8,'red,velvet,cake'],[4,'Black Forest Cake','chocolate',1300,0,4.8,'black,forest,cake'],
[5,'Custom Celebration Cake','custom',1800,0,4.9,'birthday,cake'],[6,'Strawberry Cupcake','cupcakes',250,0,4.8,'cupcake'],
[7,'Assorted Donuts','donuts',150,0,4.7,'donuts'],[8,'Butter Croissant','pastries',180,0,4.7,'croissant'],
[9,'Strawberry Shortcake','vanilla',1100,0,4.6,'strawberry,cake'],[10,'Chocolate Chip Cookies','cookies',120,0,4.7,'cookies'],
[11,'Wedding Tier Cake','custom',3500,0,4.9,'wedding,cake'],[12,'Cream Danish','pastries',160,0,4.5,'danish,pastry']
].map(([id,name,cat,price,old,rating,k])=>({id,name,cat,price,old,rating,k}));
const CATS={chocolate:'Chocolate Cakes',vanilla:'Vanilla Cakes',red:'Red Velvet',custom:'Custom Cakes',cupcakes:'Cupcakes',pastries:'Pastries',donuts:'Donuts',cookies:'Cookies'};
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const ld=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}},sv=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const money=n=>'৳'+n.toLocaleString('en-US'),pid=id=>P.find(p=>p.id==id);
const stars=r=>'★'.repeat(Math.round(r))+'☆'.repeat(5-Math.round(r));
const cart=()=>ld('shb_cart',[]),wl=()=>ld('shb_wl',[]);
const total=()=>cart().reduce((s,i)=>s+pid(i.id).price*i.q,0),ship=t=>t>=1500||!t?0:100;
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('show'),2200)}
function badge(){$('#cc').textContent=cart().reduce((s,i)=>s+i.q,0)}
const card=p=>`<article class="card"><button class="heart ${wl().includes(p.id)?'on':''}" data-wl="${p.id}" aria-label="Add to wishlist">♥</button>${p.old?'<span class="tag">Sale!</span>':''}<a href="product.html?id=${p.id}"><img loading="lazy" ${pimg(p,480)} alt="${p.name}"></a><h3>${p.name}</h3><div class="stars">${stars(p.rating)} <small>(${p.rating})</small></div><div class="price">${money(p.price)}${p.old?`<s>${money(p.old)}</s>`:''}</div><button class="btn sm" data-add="${p.id}">Add to Cart</button></article>`;
function layout(){
const pg=document.body.dataset.page,L=[['index.html','Home','home'],['shop.html','Shop','shop'],['about.html','About','about'],['contact.html','Contact','contact']];
$('#site-header').innerHTML=`<div class="top"><div class="wrap"><span>🚚 Free delivery on orders over ৳1,500</span><span>Freshly baked with love ♥</span><span>Call us: +880 1234 567890</span></div></div><header><div class="wrap nav"><a class="logo" href="index.html"><b>SweetHome</b><span>Bakery</span></a><button id="burger" aria-label="Menu">☰</button><nav class="menu" id="menu">${L.map(l=>`<a href="${l[0]}" class="${pg==l[2]?'on':''}">${l[1]}</a>`).join('')}<a href="login.html" class="${pg=='login'?'on':''}">Login</a></nav><div class="acts"><a class="cartb" href="cart.html" aria-label="Cart">🛒<span id="cc">0</span></a><a class="btn sm" href="shop.html">Order Now</a></div></div></header>`;
$('#site-footer').innerHTML=`<footer><div class="wrap"><div class="foot"><div><a class="logo" href="index.html"><b style="color:#ff8fb0">SweetHome</b><span>Bakery</span></a><p style="margin-top:12px;font-style:italic">Bake Happiness, Share Love</p></div><div><h4>Quick Links</h4><ul><li><a href="index.html">Home</a></li><li><a href="shop.html">Shop</a></li><li><a href="about.html">About</a></li><li><a href="contact.html">Contact</a></li></ul></div><div><h4>Customer Care</h4><ul><li><a href="cart.html">My Cart</a></li><li><a href="checkout.html">Checkout</a></li><li><a href="login.html">My Account</a></li></ul></div><div><h4>Contact Info</h4><ul><li>+880 1234 567890</li><li>hello@sweethomebakery.com</li><li>Chattogram, Bangladesh</li></ul></div></div><div class="copy"><span>© 2025 SweetHome Bakery. All rights reserved.</span><span>Made with ♥ in Bangladesh</span></div></div></footer>`;
$('#burger').onclick=()=>$('#menu').classList.toggle('open');badge()}
document.addEventListener('click',e=>{const t=e.target.closest('[data-add],[data-wl],[data-q],[data-rm],[data-tab]');if(!t)return;const d=t.dataset;
if(d.add){const c=cart(),i=c.find(x=>x.id==d.add),n=+($('#qty')?.textContent||1);i?i.q+=n:c.push({id:+d.add,q:n});sv('shb_cart',c);badge();toast(pid(d.add).name+' added to cart')}
if(d.wl){let w=wl(),id=+d.wl;w=w.includes(id)?w.filter(x=>x!=id):[...w,id];sv('shb_wl',w);t.classList.toggle('on');toast(w.includes(id)?'Saved to wishlist':'Removed from wishlist')}
if(d.q){const[id,s]=d.q.split(':'),c=cart(),i=c.find(x=>x.id==id);i.q=Math.max(1,i.q+ +s);sv('shb_cart',c);badge();renderCart()}
if(d.rm){sv('shb_cart',cart().filter(x=>x.id!=d.rm));badge();renderCart()}
if(d.tab){$$('.tabs button').forEach(b=>b.classList.toggle('on',b==t));$('#in').hidden=d.tab!='in';$('#up').hidden=d.tab!='up'}});
document.addEventListener('submit',e=>{const f=e.target;if(f.dataset.toast){e.preventDefault();toast(f.dataset.toast);f.reset()}});
document.addEventListener('error',e=>{const i=e.target;if(i.tagName!='IMG')return;if(i.dataset.fb){i.src=i.dataset.fb;delete i.dataset.fb}else i.style.minHeight='120px'},true);
function home(){$('#cats').innerHTML=[['custom','Cakes','birthday,cake'],['cupcakes','Cupcakes','cupcake'],['cookies','Cookies','cookies'],['pastries','Pastries','croissant'],['donuts','Donuts','donuts']].map((c,i)=>`<a href="shop.html?cat=${c[0]}"><img loading="lazy" src="${SRC('cat-'+c[0],c[2],200,40+i)}" alt="${c[1]}">${c[1]}</a>`).join('');$('#featured').innerHTML=P.slice(0,4).map(card).join('')}
function shop(){const S={q:'',cat:new URLSearchParams(location.search).get('cat')||'',pr:'',rt:0,sort:'',page:1},N=8;
const cnt=c=>P.filter(p=>!c||p.cat==c).length;
$('#filters').innerHTML=`<h4>Search Products</h4><input type="search" id="q" placeholder="Search cakes..."><h4>Categories</h4><div id="cl"><button class="fl" data-c="">All Cakes <span>${cnt()}</span></button>${Object.entries(CATS).map(([k,v])=>`<button class="fl" data-c="${k}">${v} <span>${cnt(k)}</span></button>`).join('')}</div><h4>Price Range</h4>${[['','Any price'],['0-500','Under ৳500'],['500-1000','৳500 – ৳1,000'],['1000-1500','৳1,000 – ৳1,500'],['1500-99999','Above ৳1,500']].map(r=>`<label><input type="radio" name="pr" value="${r[0]}" ${r[0]?'':'checked'}> ${r[1]}</label>`).join('')}<h4>Ratings</h4>${[[0,'Any rating'],[4.5,'4.5 &amp; up'],[4,'4 &amp; up']].map(r=>`<label><input type="radio" name="rt" value="${r[0]}" ${r[0]?'':'checked'}> ${r[1]}</label>`).join('')}<div class="offer"><b>Special Offer</b><p>Get 20% OFF on all cakes</p></div>`;
function draw(){let a=P.filter(p=>(!S.cat||p.cat==S.cat)&&p.name.toLowerCase().includes(S.q)&&p.rating>=S.rt&&(!S.pr||(p.price>=S.pr.split('-')[0]&&p.price<=S.pr.split('-')[1])));
if(S.sort=='pa')a.sort((x,y)=>x.price-y.price);if(S.sort=='pd')a.sort((x,y)=>y.price-x.price);if(S.sort=='r')a.sort((x,y)=>y.rating-x.rating);
const pages=Math.max(1,Math.ceil(a.length/N));S.page=Math.min(S.page,pages);const s=(S.page-1)*N,v=a.slice(s,s+N);
$('#list').innerHTML=v.map(card).join('')||'<p class="empty">No cakes match these filters. Try clearing a filter.</p>';
$('#count').textContent=a.length?`Showing ${s+1}–${s+v.length} of ${a.length} results`:'0 results';
$('#pager').innerHTML=pages>1?Array.from({length:pages},(_,i)=>`<button class="${i+1==S.page?'on':''}" data-p="${i+1}">${i+1}</button>`).join(''):'';
$$('.fl').forEach(b=>b.classList.toggle('on',b.dataset.c==S.cat))}
$('#filters').addEventListener('click',e=>{const b=e.target.closest('.fl');if(b){S.cat=b.dataset.c;S.page=1;draw()}});
$('#q').oninput=e=>{S.q=e.target.value.toLowerCase();S.page=1;draw()};
$('#filters').addEventListener('change',e=>{if(e.target.name=='pr')S.pr=e.target.value;if(e.target.name=='rt')S.rt=+e.target.value;S.page=1;draw()});
$('#sort').onchange=e=>{S.sort=e.target.value;draw()};
$('#pager').onclick=e=>{const b=e.target.closest('[data-p]');if(b){S.page=+b.dataset.p;draw();$('#list').scrollIntoView({behavior:'smooth'})}};draw()}
function product(){const p=pid(new URLSearchParams(location.search).get('id'))||P[0];document.title=p.name+' | SweetHome Bakery';
$('#detail').innerHTML=`<div class="pd"><img ${pimg(p,700)} alt="${p.name}"><div><p class="mut">${CATS[p.cat]}</p><h1>${p.name}</h1><div class="stars">${stars(p.rating)} <small>(${p.rating})</small></div><div class="price">${money(p.price)}${p.old?`<s>${money(p.old)}</s>`:''}</div><p class="mut" style="margin:10px 0 20px;max-width:460px">Baked fresh to order with real butter, cream and fresh ingredients. Add a message on the cake at checkout.</p><div class="row" style="align-items:center"><div class="q"><button onclick="qn(-1)">−</button><span id="qty">1</span><button onclick="qn(1)">+</button></div><button class="btn" data-add="${p.id}">Add to Cart</button></div></div></div>`;
$('#related').innerHTML=P.filter(x=>x.cat==p.cat&&x.id!=p.id).concat(P.filter(x=>x.cat!=p.cat)).slice(0,4).map(card).join('')}
function qn(d){const q=$('#qty');q.textContent=Math.max(1,+q.textContent+d)}
function renderCart(){const c=cart(),b=$('#cartbox');if(!c.length){b.innerHTML='<div class="panel" style="grid-column:1/-1;text-align:center"><p>Your cart is empty.</p><a class="btn" href="shop.html">Browse cakes</a></div>';return}
const t=total(),s=ship(t);b.innerHTML=`<div class="panel">${c.map(i=>{const p=pid(i.id);return`<div class="ci"><img ${pimg(p,160)} alt=""><div><b>${p.name}</b><br><span class="mut">${money(p.price)}</span><br><button class="rm" data-rm="${p.id}">Remove</button></div><div class="q"><button data-q="${p.id}:-1">−</button><span>${i.q}</span><button data-q="${p.id}:1">+</button></div></div>`}).join('')}</div><div class="panel sum"><h3>Order Summary</h3><div><span>Subtotal</span><span>${money(t)}</span></div><div><span>Delivery</span><span>${s?money(s):'Free'}</span></div><div class="t"><span>Total</span><span>${money(t+s)}</span></div><a class="btn" href="checkout.html" style="text-align:center">Checkout</a></div>`}
function checkout(){const c=cart(),t=total(),s=ship(t);if(!c.length){$('#cobox').innerHTML='<div class="panel" style="text-align:center"><p>Your cart is empty.</p><a class="btn" href="shop.html">Browse cakes</a></div>';return}
$('#cosum').classList.add('sum');$('#cosum').innerHTML=`<h3>Your Order</h3>${c.map(i=>`<div><span>${pid(i.id).name} × ${i.q}</span><span>${money(pid(i.id).price*i.q)}</span></div>`).join('')}<div><span>Delivery</span><span>${s?money(s):'Free'}</span></div><div class="t"><span>Total</span><span>${money(t+s)}</span></div>`;
$('#coform').onsubmit=e=>{e.preventDefault();const n='SH'+Date.now().toString().slice(-6);sv('shb_cart',[]);badge();$('#cobox').innerHTML=`<div class="panel center"><h1>Thank you!</h1><p>Your order <b>#${n}</b> is placed. We will call you to confirm delivery.</p><a class="btn" href="shop.html">Keep shopping</a></div>`}}
document.addEventListener('DOMContentLoaded',()=>{layout();$$('img[data-k]').forEach(i=>i.src=SRC(i.dataset.key,i.dataset.k,i.dataset.s,3));
({home,shop,product,cart:renderCart,checkout}[document.body.dataset.page]||(()=>{}))()});
