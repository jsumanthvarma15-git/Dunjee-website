(function(){
function lightDash(t,compact){const cu=(v,d)=>Math.round(v*Math.min(1,Math.max(0,(t-d)/1.2)));
 const tiles=[['Doctors available',cu(4,.2),'#e5f2eb'],['Beds available',cu(6,.35),'#e7f1fb'],['OP remaining',Math.max(3,9-Math.floor(t/3)%7),'#fff0e3'],['Pending tickets',cu(2,.5),'#eeebfa']];
 const rows=[['Doctor 01','On duty',true],['Doctor 02','On duty',true],['Doctor 03','Off duty',false]];
 return `<div class="ld"><div class="ld-h"><span>${EKKO(22)}<b>Today</b></span><span class="ld-s">Sample</span></div>
 <div class="ld-k">${tiles.map(([l,v,c])=>`<div style="background:${c}"><small>${l}</small><b>${v}</b></div>`).join('')}</div>
 ${compact?'':`<div class="ld-l"><div class="ld-t">Doctors on duty</div>${rows.map(([n,st,on])=>`<div class="ld-r"><span><i style="background:${on?'#7cc7c0':'#d9e1e6'}"></i>${n}</span><span class="ld-p ${on?'on':''}">${st}</span></div>`).join('')}</div>`}
 <svg class="ld-sp" viewBox="0 0 300 40" preserveAspectRatio="none"><path d="${[...Array(16)].map((_,i)=>(i?'L':'M')+i*20+','+(26-10*Math.sin(i*.7+t*.6)-i*.6)).join('')}" fill="none" stroke="#7cc7c0" stroke-width="2" stroke-linecap="round"/></svg></div>`}

const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const STEPS=[["Pick your tool","Ekko is first up."],["Set up your team","Invite staff. Unlock sections."],["Run the day live","Tokens, beds, tests, trips."],["See the numbers","Income, expenses, cash flow."]];
const ROOM_META=[{i:0,title:'Every token. In order.',sc:()=>scOutpatient},{i:1,title:'Beds that turn over.',sc:()=>scBeds},{i:2,title:'Stock that stays clear.',sc:()=>scPharmacy},{i:3,title:'Cash you can follow.',sc:()=>scFinance},{i:4,title:'Tests that finish.',sc:()=>scLab},{i:5,title:'Trips that log.',sc:()=>scAmb}];

// header marks
$('#ekko-mark').innerHTML=EKKO(30);{const fm=document.getElementById('faqmark');if(fm)fm.innerHTML=EKKO(120)}
$('#ek-brand').innerHTML=`${EKKO(64)}<div><div style="font:800 40px 'Plus Jakarta Sans';color:#1f4f47">Ekko</div><div style="font:600 12px Inter;letter-spacing:.2em;color:#5c7a76">HOSPITAL ADMINISTRATION</div></div>`;
$('#inside-eye').innerHTML=`${EKKO(22)} Inside Ekko`;
$('#foot-ekko').innerHTML=`${EKKO(18)} Ekko`;
['Outpatients','Finance','Pharmacy','Beds','Laboratory','Maintenance','Ambulance','Administration','In-House'].forEach((m,i)=>{
  const c=['ice','peach','lav','mint'][i%4];
  const ch=$('#chips');if(ch)ch.innerHTML+=`<span class="chip" style="background:${COL[c][0]}">${m}</span>`;
});

// how steps
$('#how-grid').innerHTML=STEPS.map((s,i)=>`<button type="button" class="hs rv" id="hs${i}" role="listitem" data-i="${i}"><div class="hs-top"><span class="hn" id="hn${i}">${i+1}</span><b>${s[0]}</b></div><svg class="hv" id="hv${i}" viewBox="0 0 360 230" style="width:100%;height:200px"></svg><p style="color:var(--ink2);font-size:15px;margin-top:6px">${s[1]}</p></button>`).join('');

// explorer sidebar
$('#sbar').innerHTML=sbHTML('sb');
$$('#sbar .sbi').forEach(el=>{
  if(el.id&&el.id.startsWith('sb')&&el.id!=='sb9'){
    el.setAttribute('role','tab');el.setAttribute('tabindex','0');
  }
});
// Map sb0-8 to MODS2; sb9 is In-House highlight in template - also add In-House as clickable
const sb9=$('#sb9');if(sb9){sb9.dataset.mod='9';sb9.classList.remove('on2');sb9.setAttribute('role','tab');}

// FAQ
$('#faqlist').innerHTML=FAQ.map((f,i)=>`<div class="q${i===0?' open':''}" id="q${i}"><button type="button" class="q-h" aria-expanded="${i===0}" aria-controls="qa${i}">${f[0]}<i aria-hidden="true"></i></button><div class="q-a" id="qa${i}"><p>${f[1]}</p></div></div>`).join('');
$$('.q-h').forEach(btn=>btn.addEventListener('click',()=>{
  const q=btn.closest('.q');const open=!q.classList.contains('open');
  $$('.q').forEach(x=>{x.classList.remove('open');x.querySelector('.q-h').setAttribute('aria-expanded','false')});
  if(open){q.classList.add('open');btn.setAttribute('aria-expanded','true')}
}));

// modules gallery from modules.json
let MODULES=[],TOOLS=[],curTool='ekko';
async function loadMods(){
  try{const d=await(await fetch('assets/modules/modules.json')).json();TOOLS=d.tools||[];MODULES=d.modules||[]}catch(e){}
  $('#toolsel').innerHTML=TOOLS.map(tl=>`<button type="button" role="tab" class="tp${tl.id===curTool?' on':''}" aria-selected="${tl.id===curTool}" data-tool="${tl.id}">${tl.id==='ekko'?EKKO(20):''}${tl.name}</button>`).join('')+`<span class="tp soon" aria-disabled="true">More tools soon</span>`;
  $$('#toolsel .tp[data-tool]').forEach(b=>b.addEventListener('click',()=>{curTool=b.dataset.tool;$$('#toolsel .tp[data-tool]').forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-selected',x===b)});renderList()}));
  renderList();
}
function renderList(){const list=$('#modlist');const ms=MODULES.filter(m=>m.tool===curTool);
  list.innerHTML=ms.map(m=>`<button type="button" class="mi" role="listitem" data-id="${m.id}"><span class="n">${String(m.order).padStart(2,'0')}</span><span><b>${m.title}</b><small>${m.description}</small></span><span class="watch">${m.comingSoon?'Video coming soon':'Watch ▷'}</span></button>`).join('');
  list.querySelectorAll('.mi').forEach(btn=>btn.addEventListener('click',()=>playMod(MODULES.findIndex(m=>m.id===btn.dataset.id))));
}
function playMod(i){
  const m=MODULES[i];if(!m||m.comingSoon)return;
  $$('#modlist .mi').forEach(b=>b.classList.toggle('on',b.dataset.id===m.id));
  const v=$('#mvid'),ph=$('#pholder');
  v.src=`assets/modules/${m.file}`;v.classList.add('show');ph.style.display='none';
  if(!reduce)v.play().catch(()=>{});
  v.setAttribute('aria-label',m.title+' walkthrough');
}
loadMods();

// mobile menu
const burger=$('#burger'),mnav=$('#mnav');
burger.addEventListener('click',()=>{
  const open=mnav.hasAttribute('hidden')?false:mnav.classList.contains('open');
  if(mnav.hasAttribute('hidden'))mnav.removeAttribute('hidden');
  mnav.classList.toggle('open',!open);
  burger.setAttribute('aria-expanded',String(!open));
});
mnav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mnav.classList.remove('open');burger.setAttribute('aria-expanded','false')}));

// scroll reveal
const io=new IntersectionObserver(ents=>{ents.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
$$('.rv').forEach(e=>io.observe(e));
window.addEventListener('scroll',()=>$('#hdr').classList.toggle('scrolled',scrollY>20),{passive:true});

// tilt on ekcard
const ek=$('#ekcard');
if(ek&&!reduce){
  ek.addEventListener('mousemove',e=>{const r=ek.getBoundingClientRect();ek.style.transform=`perspective(1600px) rotateY(${(e.clientX-r.x-r.width/2)/r.width*5}deg) rotateX(${-(e.clientY-r.y-r.height/2)/r.height*5}deg)`});
  ek.addEventListener('mouseleave',()=>ek.style.transform='');
}

// state
let t0=performance.now()/1000,hov=-1,zoom=-1,howI=0,howT0=performance.now(),modI=1,anMode=false,anT0=performance.now();
const sceneOn={hero:true,tools:true,how:true,inside:true,ma:true,cta:true};
const secIO=new IntersectionObserver(ents=>{ents.forEach(e=>{const id=e.target.id;if(id in sceneOn)sceneOn[id]=e.isIntersecting})},{threshold:.08});
['hero','tools','how','inside','ma','cta'].forEach(id=>{const el=$('#'+id);if(el)secIO.observe(el)});

// room clicks via event on svg after render - use overlay buttons
function bindRooms(){
  const svg=$('#iso');
  ROOM_META.forEach(rm=>{
    const g=svg.querySelector('#room'+rm.i);
    if(g&&!g.dataset.bound){g.dataset.bound='1';g.style.cursor='pointer';g.addEventListener('click',()=>openZoom(rm.i));
      g.addEventListener('mouseenter',()=>{if(zoom<0)hov=rm.i});g.addEventListener('mouseleave',()=>{if(zoom<0)hov=-1});
    }
  });
}
function openZoom(i){zoom=i;$('#zoomp').hidden=false;$('#zoomp').classList.add('open');$('#iso').style.opacity='0';$('#hmini').style.opacity='0';
  const m=ROOM_META.find(r=>r.i===i);$('#ztitle').innerHTML=m.title.replace(/\. /,'. <em class="s">').replace(/\.$/,'.</em>').replace('In order','In order</em>').replace(/Every ([^.]+)\. <em/,'Every $1. <em');
  // simpler titles
  const titles={0:['Outpatients · live','Every token. <em class="s">In order.</em>'],1:['Beds · live','Every bed. <em class="s">Accounted.</em>'],2:['Pharmacy · live','Every item. <em class="s">Tracked.</em>'],3:['Finance · live','Every rupee. <em class="s">In view.</em>'],4:['Laboratory · live','Every test. <em class="s">Finished.</em>'],5:['Ambulance · live','Every trip. <em class="s">Logged.</em>']};
  const tt=titles[i];$('#zeye').textContent=tt[0];$('#ztitle').innerHTML=tt[1];
}
$('#back').addEventListener('click',()=>{zoom=-1;$('#zoomp').classList.remove('open');$('#zoomp').hidden=true;$('#iso').style.opacity='1';$('#hmini').style.opacity='1'});

// how clicks
$$('.hs').forEach(btn=>btn.addEventListener('click',()=>{howI=+btn.dataset.i;howT0=performance.now();$('#hbar').style.width=((howI+1)/4*100)+'%';$$('.hs').forEach((b,j)=>b.classList.toggle('on',j===howI));$$('.hn').forEach((n,j)=>{n.style.background=j<=howI?'#227568':'#e3ece9';n.style.color=j<=howI?'#fff':'#5c7a76'})}));
$('#hs0').click();

// explorer
function setMod(i){modI=i;$$('#sbar .sbi').forEach(el=>{
  const id=el.id||'';const n=id.startsWith('sb')?+id.slice(2):-1;
  el.classList.toggle('on',n===i);
});}
$$('#sbar .sbi').forEach(el=>{
  const id=el.id||'';if(!id.startsWith('sb'))return;
  let n=+id.slice(2);if(n===9)n=9;// In-House is MODS2[9]
  // sidebar template: sb0..sb8 are first 9 of MODS2 (Dashboard..Administration), sb9 was In-House duplicate
  // Actually MODS2[0]=Dashboard ... MODS2[8]=Administration, MODS2[9]=In-House
  // sbHTML maps slice(0,9) to sb0-8, and sb9 is In-House (on2)
  el.addEventListener('click',()=>{
    let idx=+id.slice(2);if(idx===9)idx=9;setMod(idx);
  });
  el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();el.click()}});
});
setMod(1);

// manage/analyse
function layoutPill(){const tm=$('#tm'),ta=$('#ta'),pl=$('#pill');const on=anMode?ta:tm;pl.style.left=on.offsetLeft+'px';pl.style.width=on.offsetWidth+'px'}
$('#tm').addEventListener('click',()=>{anMode=false;anT0=performance.now();$('#tm').classList.add('on');$('#ta').classList.remove('on');$('#tm').setAttribute('aria-pressed','true');$('#ta').setAttribute('aria-pressed','false');layoutPill()});
$('#ta').addEventListener('click',()=>{anMode=true;anT0=performance.now();$('#ta').classList.add('on');$('#tm').classList.remove('on');$('#ta').setAttribute('aria-pressed','true');$('#tm').setAttribute('aria-pressed','false');layoutPill()});
window.addEventListener('resize',layoutPill);setTimeout(layoutPill,100);

// band network
function bandSVG(t){let s='';const N=[...Array(14)].map((_,i)=>[200+((i*173)%1200)+Math.sin(t*.4+i)*30,80+((i*97)%400)+Math.cos(t*.35+i)*20]);
N.forEach((a,i)=>N.forEach((b,j)=>{if(j>i&&Math.hypot(a[0]-b[0],a[1]-b[1])<200)s+=`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#bfe6dc" stroke-opacity=".25" stroke-width="2"/>`}));
N.forEach((a,i)=>s+=`<circle cx="${a[0]}" cy="${a[1]}" r="${5+2*Math.sin(t+i)}" fill="#bfe6dc" opacity=".45"/>`);
return s}

// ekko preview


let raf;
function tick(now){
  const t=(now/1000)-t0+(reduce?0:0);
  window.__T=t;
  if(reduce&&!raf){/* still render static frames once */}
  // hero
  if(sceneOn.hero){
    if(zoom<0){$('#iso').innerHTML=isoHospital(t,hov);bindRooms();
      const cu=v=>Math.round(v*Math.min(1,(t-.5)/1.2));
      $('#hmini').innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center"><span style="display:flex;gap:8px;align-items:center;font:700 14px 'Plus Jakarta Sans'">${EKKO(20)} Ekko · Today</span><span class="badge">Sample</span></div><div class="kg">${[['Doctors available',cu(4),'mint'],['Beds available',cu(6),'ice'],['OP remaining',Math.max(3,9-Math.floor(t/3)%7),'peach'],['Pending tickets',cu(2),'lav']].map(([l,v,c])=>`<div class="kc" style="background:${COL[c][0]}"><small>${l}</small><b>${v}</b></div>`).join('')}</div>`;
    }else{const m=ROOM_META.find(r=>r.i===zoom);const sc=m.sc()(t);$('#zsvg').innerHTML=sc.svg;$('#zdata').innerHTML=dataHTML4(sc.data)}
  }
  // tools
  if(sceneOn.tools){$('#ekprev').innerHTML=lightDash(t,true);$('#soontiles').innerHTML=soonTiles(t,0)}
  // how
  if(sceneOn.how){const howElapsed=(performance.now()-howT0)/1000;for(let i=0;i<4;i++)$('#hv'+i).innerHTML=howV(i,i===howI?howElapsed:(i<howI?4:0))}
  // inside
  if(sceneOn.inside){
    const m=MODS2[modI]||MODS2[1];const fn=typeof m[3]==='function'?m[3]:scPeople;const sc=fn(t+m[4]);
    $('#ctitle').innerHTML=`<div style="display:flex;gap:10px;align-items:center"><span style="width:36px;height:36px;border-radius:10px;background:${COL[m[2]][0]};display:grid;place-items:center"><span style="width:20px;height:20px;display:block">${IC(I[m[1]],COL[m[2]][1])}</span></span><div><b style="font:700 18px 'Plus Jakarta Sans'">${m[0]}</b><div style="font-size:12.5px;color:var(--mute)">${m[5]}</div></div></div><span class="badge">Sample data</span>`;
    $('#csvg').innerHTML=sc.svg;$('#cdata').innerHTML=dataHTML(sc.data||[]);
    $('#eui').innerHTML=ekkoPage(modI,t+m[4],sc.data,false);
  }
  // ma
  if(sceneOn.ma){
    const lt=(performance.now()-anT0)/1000;
    if(anMode){$('#mal').innerHTML=analytics(Math.max(0,lt));$('#mar').innerHTML=ekkoPage(5,lt,null,true)}
    else{const sc=scPeople(t);$('#mal').innerHTML=`<svg viewBox="40 30 920 560" style="width:100%;height:440px">${sc.svg}</svg>`;$('#mar').innerHTML=lightDash(t,false)}
  }
  if(sceneOn.cta&&!reduce)$('#bsvg').innerHTML=bandSVG(t);
  raf=requestAnimationFrame(tick);
}
raf=requestAnimationFrame(tick);

// pause when hidden
document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAnimationFrame(raf);else{t0=performance.now()/1000-(window.__T||0);raf=requestAnimationFrame(tick)}});
})();
