(function(){
'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// Write markup only when it actually changed (avoids needless DOM churn and repaints).
const cache=new WeakMap();
function setHTML(el,html){if(!el)return;if(cache.get(el)!==html){el.innerHTML=html;cache.set(el,html)}}
const TODAY=new Date().toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'});

function lightDash(t,compact){const cu=(v,d)=>Math.round(v*Math.min(1,Math.max(0,(t-d)/1.2)));
 const tiles=[['Doctors available',cu(4,.2),'#e5f2eb'],['Beds available',cu(6,.35),'#e7f1fb'],['OP remaining',Math.max(3,9-Math.floor(t/3)%7),'#fff0e3'],['Pending tickets',cu(2,.5),'#eeebfa']];
 const rows=[['Dr. Ananya Rao','On duty',true],['Dr. Vikram Mehta','On duty',true],['Dr. Kavya Iyer','Off duty',false]];
 return `<div class="ld"><div class="ld-h"><span>${EKKO(22)}<b>Today</b></span><span class="ld-s">${TODAY}</span></div>
 <div class="ld-k">${tiles.map(([l,v,c])=>`<div style="background:${c}"><small>${l}</small><b>${v}</b></div>`).join('')}</div>
 ${compact?'':`<div class="ld-l"><div class="ld-t">Doctors on duty</div>${rows.map(([n,st,on])=>`<div class="ld-r"><span><i style="background:${on?'#7cc7c0':'#d9e1e6'}"></i>${n}</span><span class="ld-p ${on?'on':''}">${st}</span></div>`).join('')}</div>`}
 <svg class="ld-sp" viewBox="0 0 300 40" preserveAspectRatio="none"><path class="ld-line" d="${[...Array(16)].map((_,i)=>(i?'L':'M')+i*20+','+(26-10*Math.sin(i*.7)-i*.6).toFixed(1)).join('')}" fill="none" stroke="#7cc7c0" stroke-width="2" stroke-linecap="round"/></svg></div>`}

const STEPS=[["Pick your tool","Ekko is first up."],["Set up your team","Invite staff. Unlock sections."],["Run the day live","Tokens, beds, tests, trips."],["See the numbers","Income, expenses, cash flow."]];

// brand marks
$('#ekko-mark').innerHTML=EKKO(30);{const fm=$('#faqmark');if(fm)fm.innerHTML=EKKO(120)}
$('#ek-brand').innerHTML=`${EKKO(64)}<div><div style="font:800 40px 'Plus Jakarta Sans';color:#1f4f47">Ekko</div><div style="font:600 12px Inter;letter-spacing:.2em;color:#5c7a76">HOSPITAL ADMINISTRATION</div></div>`;
$('#inside-eye').innerHTML=`${EKKO(22)} Inside Ekko`;
$('#foot-ekko').innerHTML=`${EKKO(18)} Ekko`;
$('#chips').innerHTML=['Outpatients','Finance','Pharmacy','Beds','Laboratory','Maintenance','Ambulance','Administration','In-House'].map((m,i)=>`<span class="chip" style="background:${COL[['ice','peach','lav','mint'][i%4]][0]}">${m}</span>`).join('');
$('#soontiles').innerHTML=soonTiles(0,0);

// ---------- How it works: auto-advancing stepper ----------
const STEP_MS=5600;
$('#how-steps').innerHTML=STEPS.map((s,i)=>`<li><button type="button" class="hs" id="hs${i}" data-i="${i}" aria-controls="hp${i}"><span class="hn">${i+1}</span><span class="hs-t"><b>${s[0]}</b><small>${s[1]}</small></span><span class="hs-prog" aria-hidden="true"><i id="hpg${i}"></i></span></button></li>`).join('');
$('#how-stage').innerHTML=STEPS.map((s,i)=>`<div class="hp-panel" id="hp${i}" role="img" aria-label="${s[0]}: ${s[1]}"><svg id="hv${i}" viewBox="0 0 640 400" preserveAspectRatio="xMidYMid meet"></svg></div>`).join('');
const how={i:-1,start:0,elapsed:0,paused:false};
function howGo(i,now){
  if(i===how.i){how.elapsed=0;return}
  const prev=how.i;how.i=i;how.elapsed=0;how.start=now;
  $$('.hs').forEach((b,j)=>{b.classList.toggle('on',j===i);b.classList.toggle('done',j<i);if(j===i)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current')});
  $$('.hp-panel').forEach((p,j)=>{p.classList.toggle('on',j===i);p.classList.toggle('out',j===prev)});
  $$('.hs-prog i').forEach((b,j)=>{if(j!==i)b.style.transform=j<i?'scaleX(1)':'scaleX(0)'});
  // first frame of the new step right away, so the panel never fades in empty
  $('#hv'+i).innerHTML=howStage(i,reduce?9:0);
}
$$('.hs').forEach(b=>b.addEventListener('click',()=>howGo(+b.dataset.i,performance.now())));
const hstage=$('#how-stage');
hstage.addEventListener('mouseenter',()=>how.paused=true);
hstage.addEventListener('mouseleave',()=>how.paused=false);
howGo(0,performance.now());

// ---------- Inside Ekko explorer ----------
$('#sbar').innerHTML=sbHTML('sb');
let modI=1;
function setMod(i){modI=i;$$('#sbar .sbi[id^="sb"]').forEach(el=>{const on=+el.id.slice(2)===i;el.classList.toggle('on',on);el.setAttribute('aria-selected',String(on))})}
$$('#sbar .sbi[id^="sb"]').forEach(el=>{
  el.classList.remove('on2');el.setAttribute('role','tab');el.setAttribute('tabindex','0');
  el.addEventListener('click',()=>setMod(+el.id.slice(2)));
  el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();el.click()}});
});
setMod(1);

// ---------- Hero map ----------
let hov=-1;
const isoS=$('#iso-s'),isoD=$('#iso-d'),isoU=$('#iso');
isoS.innerHTML=isoStatic(-1);isoU.innerHTML=isoUI();
function setHover(i){if(i===hov)return;hov=i;isoS.innerHTML=isoStatic(i);$$('#iso .room-g').forEach(g=>g.classList.toggle('on',+g.dataset.room===i))}
// Rooms open in place inside the hero (js/hero-rooms.js). Never scrolls.
function goRoom(i){if(window.HeroRooms)window.HeroRooms.open(i)}
isoU.addEventListener('pointerover',e=>{const g=e.target.closest('.room-g');setHover(g?+g.dataset.room:-1)});
isoU.addEventListener('pointerleave',()=>setHover(-1));
isoU.addEventListener('click',e=>{const g=e.target.closest('.room-g');if(g)goRoom(+g.dataset.room)});
isoU.addEventListener('keydown',e=>{const g=e.target.closest('.room-g');if(g&&(e.key==='Enter'||e.key===' ')){e.preventDefault();goRoom(+g.dataset.room)}});
isoU.addEventListener('focusin',e=>{const g=e.target.closest('.room-g');if(g)setHover(+g.dataset.room)});
isoU.addEventListener('focusout',()=>setHover(-1));

// ---------- FAQ ----------
$('#faqlist').innerHTML=FAQ.map((f,i)=>`<div class="q${i===0?' open':''}" id="q${i}"><button type="button" class="q-h" aria-expanded="${i===0}" aria-controls="qa${i}">${f[0]}<i aria-hidden="true"></i></button><div class="q-a" id="qa${i}"><p>${f[1]}</p></div></div>`).join('');
$$('.q-h').forEach(btn=>btn.addEventListener('click',()=>{
  const q=btn.closest('.q');const open=!q.classList.contains('open');
  $$('.q').forEach(x=>{x.classList.remove('open');x.querySelector('.q-h').setAttribute('aria-expanded','false')});
  if(open){q.classList.add('open');btn.setAttribute('aria-expanded','true')}
}));

// ---------- Learn Ekko ----------
let MODULES=[],TOOLS=[],curTool='ekko';
const vid=$('#mvid'),ph=$('#pholder');
async function loadMods(){
  try{const d=await(await fetch('assets/modules/modules.json')).json();TOOLS=d.tools||[];MODULES=d.modules||[]}catch(e){}
  $('#toolsel').innerHTML=TOOLS.map(tl=>`<button type="button" role="tab" class="tp${tl.id===curTool?' on':''}" aria-selected="${tl.id===curTool}" data-tool="${tl.id}">${tl.id==='ekko'?EKKO(20):''}${tl.name}</button>`).join('')+`<span class="tp soon" aria-disabled="true">More tools soon</span>`;
  $$('#toolsel .tp[data-tool]').forEach(b=>b.addEventListener('click',()=>{curTool=b.dataset.tool;$$('#toolsel .tp[data-tool]').forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-selected',x===b)});renderList()}));
  renderList();
}
function renderList(){const list=$('#modlist');const ms=MODULES.filter(m=>m.tool===curTool&&!m.comingSoon);
  list.innerHTML=ms.map(m=>`<button type="button" class="mi" role="listitem" data-id="${m.id}"><span class="n">${String(m.order).padStart(2,'0')}</span><span><b>${m.title}</b><small>${m.description}</small></span><span class="watch">Watch ▷</span></button>`).join('');
  list.querySelectorAll('.mi').forEach(btn=>btn.addEventListener('click',()=>loadMod(btn.dataset.id,true)));
  if(ms[0])loadMod(ms[0].id,false);
}
function loadMod(id,play){
  const m=MODULES.find(x=>x.id===id);if(!m)return;
  $$('#modlist .mi').forEach(b=>{const on=b.dataset.id===m.id;b.classList.toggle('on',on);b.querySelector('.watch').textContent=on&&play?'Playing':'Watch ▷'});
  const src=`assets/modules/${m.file}`;
  if(!vid.getAttribute('src')||!vid.getAttribute('src').endsWith(m.file)){
    vid.pause();
    if(m.poster)vid.poster=`assets/modules/${m.poster}`;
    vid.src=src;vid.load();
  }
  vid.classList.add('show');ph.style.display='none';
  vid.setAttribute('aria-label',m.title+' walkthrough');
  if(play){const p=vid.play();if(p&&p.catch)p.catch(()=>{})}
}
vid.addEventListener('ended',()=>{const b=$('#modlist .mi.on .watch');if(b)b.textContent='Watch again'});
vid.addEventListener('pause',()=>{const b=$('#modlist .mi.on .watch');if(b&&!vid.ended)b.textContent='Watch ▷'});
vid.addEventListener('play',()=>{const b=$('#modlist .mi.on .watch');if(b)b.textContent='Playing'});
loadMods();

// ---------- mobile menu ----------
const burger=$('#burger'),mnav=$('#mnav');
burger.addEventListener('click',()=>{
  const open=mnav.hasAttribute('hidden')?false:mnav.classList.contains('open');
  if(mnav.hasAttribute('hidden'))mnav.removeAttribute('hidden');
  mnav.classList.toggle('open',!open);
  burger.setAttribute('aria-expanded',String(!open));
});
mnav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mnav.classList.remove('open');burger.setAttribute('aria-expanded','false')}));

// ---------- reveal + header ----------
const io=new IntersectionObserver(ents=>{ents.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
$$('.rv').forEach(e=>io.observe(e));
let scrolled=false;window.addEventListener('scroll',()=>{const s=scrollY>20;if(s!==scrolled){scrolled=s;$('#hdr').classList.toggle('scrolled',s)}},{passive:true});

// gentle tilt on the Ekko card (rAF-batched, transform only)
const ek=$('#ekcard');
if(ek&&!reduce&&matchMedia('(hover:hover)').matches){let pend=null,r=null;
  ek.addEventListener('mouseenter',()=>{r=ek.getBoundingClientRect()});
  ek.addEventListener('mousemove',e=>{if(!r)r=ek.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;if(!pend)pend=requestAnimationFrame(()=>{pend=null;ek.style.transform=`perspective(1600px) rotateY(${(x*4).toFixed(2)}deg) rotateX(${(-y*4).toFixed(2)}deg)`})});
  ek.addEventListener('mouseleave',()=>{r=null;ek.style.transform=''});
}

// ---------- manage / analyse ----------
let anMode=false,anT0=performance.now();
function layoutPill(){const tm=$('#tm'),ta=$('#ta'),pl=$('#pill');const on=anMode?ta:tm;pl.style.transform=`translateX(${on.offsetLeft}px)`;pl.style.width=on.offsetWidth+'px'}
function setAn(v){anMode=v;anT0=performance.now();$('#tm').classList.toggle('on',!v);$('#ta').classList.toggle('on',v);$('#tm').setAttribute('aria-pressed',String(!v));$('#ta').setAttribute('aria-pressed',String(v));layoutPill()}
$('#tm').addEventListener('click',()=>setAn(false));$('#ta').addEventListener('click',()=>setAn(true));
window.addEventListener('resize',layoutPill);setTimeout(layoutPill,100);if(document.fonts)document.fonts.ready.then(layoutPill);

function bandSVG(t){let s='';const N=[...Array(14)].map((_,i)=>[200+((i*173)%1200)+Math.sin(t*.4+i)*30,80+((i*97)%400)+Math.cos(t*.35+i)*20]);
 N.forEach((a,i)=>N.forEach((b,j)=>{if(j>i&&Math.hypot(a[0]-b[0],a[1]-b[1])<200)s+=`<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#bfe6dc" stroke-opacity=".25" stroke-width="2"/>`}));
 N.forEach((a,i)=>s+=`<circle cx="${a[0].toFixed(1)}" cy="${a[1].toFixed(1)}" r="${(5+2*Math.sin(t+i)).toFixed(2)}" fill="#bfe6dc" opacity=".45"/>`);
 return s}

// ---------- render loop: only visible sections draw ----------
const sceneOn={hero:false,tools:false,how:false,inside:false,ma:false,cta:false};
const secIO=new IntersectionObserver(ents=>{ents.forEach(e=>{if(e.target.id in sceneOn)sceneOn[e.target.id]=e.isIntersecting});if(reduce)draw(performance.now()+8000)},{threshold:0,rootMargin:'60px 0px'});
Object.keys(sceneOn).forEach(id=>{const el=$('#'+id);if(el)secIO.observe(el)});

// Adaptive frame budget: if SVG scenes are slow on this device, draw them every other frame
// so motion stays steady instead of stuttering.
let t0=performance.now(),last=t0,raf=0,frame=0,cost=0;const isPhone=matchMedia('(max-width:640px)');
function draw(now){
  const t=(now-t0)/1000;
  if(sceneOn.hero&&!(window.HeroRooms&&window.HeroRooms.current>=0)){
    isoD.innerHTML=isoDynamic(t,hov);
  }
  if(sceneOn.tools)setHTML($('#ekprev'),lightDash(t,true));
  if(sceneOn.how&&how.i>=0){
    const lt=reduce?9:how.elapsed/1000;
    $('#hv'+how.i).innerHTML=howStage(how.i,lt);
  }
  if(sceneOn.inside){
    const m=MODS2[modI]||MODS2[1];const fn=typeof m[3]==='function'?m[3]:scPeople;const sc=fn(t+m[4]);
    setHTML($('#ctitle'),`<div style="display:flex;gap:10px;align-items:center"><span style="width:36px;height:36px;border-radius:10px;background:${COL[m[2]][0]};display:grid;place-items:center"><span style="width:20px;height:20px;display:block">${IC(I[m[1]],COL[m[2]][1])}</span></span><div><b style="font:700 18px 'Plus Jakarta Sans'">${m[0]}</b><div style="font-size:12.5px;color:var(--mute)">${m[5]}</div></div></div><span class="pl pm">● Today</span>`);
    $('#csvg').innerHTML=sc.svg;setHTML($('#cdata'),dataHTML(sc.data||[]));
    setHTML($('#eui'),ekkoPage(modI,t+m[4],sc.data,false));
  }
  if(sceneOn.ma){
    const lt=(now-anT0)/1000;
    if(anMode){setHTML($('#mal'),analytics(Math.max(0,lt)));setHTML($('#mar'),ekkoPage(5,lt,null,true))}
    else{const sc=scPeople(t);$('#mal').innerHTML=`<svg viewBox="40 30 920 560" style="width:100%;height:440px">${sc.svg}</svg>`;setHTML($('#mar'),lightDash(t,false))}
  }
  if(sceneOn.cta)$('#bsvg').innerHTML=bandSVG(t);
}
function tick(now){
  const dt=Math.min(100,now-last);last=now;
  // stepper clock: advances only while the section is on screen and not hovered
  if(sceneOn.how&&!how.paused&&!reduce){
    how.elapsed+=dt;
    if(how.elapsed>=STEP_MS)howGo((how.i+1)%STEPS.length,now);
    const pg=$('#hpg'+how.i);if(pg)pg.style.transform=`scaleX(${Math.min(1,how.elapsed/STEP_MS).toFixed(4)})`;
  }
  frame++;
  // phones: scenes redraw at ~30fps (smooth, light on battery); desktop adapts to cost
  const skip=(cost>14||isPhone.matches)&&(frame&1);
  if(!skip){const a=performance.now();draw(now);const c=performance.now()-a;cost=cost*.9+c*.1}
  raf=requestAnimationFrame(tick);
}
if(reduce){draw(performance.now()+8000);// one calm, finished frame per section
  setInterval(()=>draw(performance.now()+8000),4000);
}else raf=requestAnimationFrame(tick);
document.addEventListener('visibilitychange',()=>{if(reduce)return;if(document.hidden){cancelAnimationFrame(raf)}else{last=performance.now();raf=requestAnimationFrame(tick)}});

// test hook
window.__dj={how,setMod,goRoom,get modI(){return modI}};
})();
