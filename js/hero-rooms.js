/* Hero room view: click a room on the map, it zooms in and comes alive right in the hero. No scrolling. */
(function(){
'use strict';
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const pill=(x,y,w,txt,bg,fg,op=1)=>`<g transform="translate(${x.toFixed(1)},${y.toFixed(1)})" opacity="${op.toFixed(3)}"><rect x="${-w/2}" y="-20" width="${w}" height="40" rx="20" fill="${bg}"/><text y="6" text-anchor="middle" font-family="Inter" font-weight="700" font-size="16" fill="${fg}">${txt}</text></g>`;
const pop=lt=>EOs(C01(lt/.35))*(1+.12*Math.sin(C01(lt/.35)*Math.PI));

// ---------- room scenes (hero only; detailed illustration kit in hero-art.js) ----------
const hp=o=>person(Object.assign({v2:1},o));
const SK=PAL.skin;
function rOutpatients(t){const P=11,lt=t%P;const tok='A-105';const called=lt>7.6;
 let s=hRoom(['#f3f8fd','#e6f0fa'],'#cfe3f6','#eef3f8',{lamps:[300,700]});
 s+=hWindow(84,76,170,150)+hClock(300,104,t)+hBoard(330,70,called?'A-105':'A-104','A-106',called?(.6+.4*Math.abs(Math.cos((lt-7.6)*6))):1);
 s+=hFrame(620,96,90,70,'#9fd6bd')+hDoor(812,440,100,214,'CONSULT 2','#3c6a9a',lt>9.1?C01((lt-9.1)*2.5):0);
 s+=hPlant(84,446,.95);
 s+=hp({x:690,y:440,pose:'work',ph:t,f:-1,coat:'#f3f7fc',shirt:'#7fb8e4',hs:'bun',hair:'#3a2c2a',skin:SK[1]});
 s+=hMonitor(618,334,62,40,1,1);
 s+=hReception(560,440,220,'RECEPTION');
 s+=hKiosk(468,446,tok,lt>2.1?C01((lt-2.1)*2):0);
 [140,232,324].forEach(x=>s+=hChair(x,450,'#b7aaf0'));
 s+=hp({x:146,y:450,pose:'sit',ph:t,f:1,outfit:'casual',top:'#f2bf9c',bottom:'#5c6f8f',hair:'#c7ccd2',hs:'short',skin:SK[3]});
 s+=hp({x:238,y:450,pose:'sit',ph:t+1,f:1,top:'#9fd6bd',hs:'long',hair:'#1f2a3d',skin:SK[2],bottom:'#33496e'});
 const pt={shirt:'#7fb8e4',hair:'#2b2b33',skin:SK[0],bottom:'#33496e'};
 if(lt<4.6){const W=walkAt(lt,[[0,-40,512,1],[2.1,420,458],[3.2,420,458,1],[4.6,330,450]]);/* enters on the open floor in front of the waiting chairs */s+=hp(Object.assign({x:W.x,y:W.y,pose:W.moving?'walk':'work',ph:W.ph,f:W.f},pt))}
 else if(lt<7.9)s+=hp(Object.assign({x:330,y:450,pose:'sit',ph:t,f:1},pt));
 else{const W=walkAt(lt,[[7.9,334,456,1],[8.5,390,500],[10,800,500],[10.5,862,450],[11,862,450,1]]);s+=hp(Object.assign({x:W.x,y:W.y,pose:W.moving?'walk':'stand',ph:W.ph,f:W.f,alpha:lt>10.3?1-C01((lt-10.3)*2.5):1},pt))}
 s+=hRoomEnd();
 if(lt>2.3&&lt<5){const a=lt<4.6?1:1-C01((lt-4.6)/.4);const k=pop(lt-2.3);s+=`<g transform="translate(468,236) scale(${k.toFixed(3)})" opacity="${a.toFixed(3)}"><rect x="-74" y="-24" width="148" height="48" rx="14" fill="#13294b"/><text y="7" text-anchor="middle" font-family="Plus Jakarta Sans" font-weight="800" font-size="20" fill="#fff">Token ${tok}</text></g>`}
 if(lt>9.4)s+=pill(862,150,196,'✓ Consult started','#227568','#fff',C01((lt-9.4)*3));
 return s}
function rBeds(t){const P=10,lt=t%P;
 let s=hRoom(['#f2f9f5','#e4f2ea'],'#cdeedd','#eef4f1',{lamps:[260,700]});
 s+=hWindow(110,74,190,150)+hWindow(560,74,190,150)+hClock(440,100,t)+hSign(440,150,'WARD A','#2f8a63');
 // curtain rail + soft curtain at right
 
 // bed A-01 occupied, nurse checking IV
 s+=hIV(110,446,.55+.25*Math.cos(t*.3));
 s+=hBed(132,446,{skin:SK[3],hair:'#9aa0a6'},'#cfe3f6');
 s+=hSideTable(404,446);
 s+=hp({x:480,y:452,pose:lt%5<2.6?'read':'talk',ph:t,f:-1,outfit:'scrubs',top:'#7cc7c0',hs:'cap',hair:'#3a2c2a',skin:SK[1],item:lt%5<2.6?'clip':null});
 // bed A-03: patient arrives on the stretcher and transfers
 const tr=C01((lt-5.2)/.9);
 s+=hIV(572,446,.9);
 s+=hBed(594,446,tr>0?{skin:SK[2],hair:'#1f2a3d',al:tr}:null,'#f6d9c6');
 s+=hSideTable(874,446);
 // stretcher pushed by porter in the front lane
 const q=EOs(C01(lt/4)),sx=mix(1000,560,q);const leave=lt>6.4?EOs(C01((lt-6.4)/2.6)):0;const x2=sx+leave*520;const moving=(lt<4)||(lt>6.4&&lt<9);
 s+=hStretcher(x2,540,tr<1,'#f6d9c6',200);
 s+=hp({x:x2+232,y:540,pose:moving?'push':'hold',ph:lt<4?(1000-sx)/14:leave*520/14,f:-1,outfit:'scrubs',top:'#9fd6bd',hair:'#2b2b33',skin:SK[0]});
 s+=hRoomEnd();
 s+=pill(246,290,110,'A-01','#ffffff','#2f8a63',1);
 if(lt>5.9)s+=pill(708,290,210,'✓ A-03 allocated','#227568','#fff',C01((lt-5.9)*3));
 return s}
function rPharmacy(t){const P=10,lt=t%P;
 let s=hRoom(['#f3fbf7','#e4f4ec'],'#cfeadb','#eef5f1',{lamps:[260,700]});
 s+=hSign(800,92,'PHARMACY','#2f8a63')+hClock(900,108,t);
 const took=lt>3.2&&lt<9.6;
 s+=hCupboard(80,440,150,300,1,0)+hCupboard(240,440,150,300,took?.55:1,3)+hCupboard(400,440,150,300,1,5);
 s+=hPlant(872,440,.9);/* kept clear of the pharmacist's path between counter and cupboards */
 // pharmacist: counter -> cupboard -> counter
 const W=walkAt(lt,[[0,700,446,-1],[1.6,320,446],[3.4,320,446,-1],[5,700,446],[10,700,446,1]]);
 const atShelf=lt>1.6&&lt<3.4;
 const behind=true;/* she walks the lane behind the counter, so it always covers her */
 const ph=hp({x:W.x,y:446,pose:W.moving?(lt>3.4?'carry':'walk'):atShelf?'reach':'work',ph:W.ph,f:W.f,coat:'#f3f7fc',shirt:'#b7aaf0',hs:'bun',hair:'#3a2c2a',skin:SK[1],item:lt>3.4&&lt<5.2?'box':null});
 if(behind)s+=ph;
 s+=hPharmCounter(620,452,230);
 if(!behind)s+=ph;
 // customer
 s+=hp({x:906,y:470,pose:lt>7.6?'talk':'stand',ph:t,f:-1,shirt:'#f4a7b4',hs:'long',hair:'#1f2a3d',skin:SK[2],bottom:'#33496e'});
 s+=hRoomEnd();
 const b=EOs(C01((lt-6.8)/.7));if(b>0){const y=320-b*196;s+=`<g transform="translate(738,${y.toFixed(1)})" opacity="${C01(b*2).toFixed(3)}"><rect width="132" height="${(40+b*110).toFixed(1)}" rx="8" fill="#fff" stroke="#cfeadb" stroke-width="2"/><text x="14" y="26" font-family="Inter" font-weight="800" font-size="13" fill="#2f8a63">BILL #P-2187</text>${b>.6?`<text x="14" y="54" font-family="Inter" font-size="12" fill="#5c6f73">Amoxicillin × 2</text><text x="14" y="74" font-family="Inter" font-size="12" fill="#5c6f73">Paracetamol × 1</text><text x="14" y="104" font-family="Plus Jakarta Sans" font-weight="800" font-size="18" fill="#13294b">₹ 1,240</text>`:''}${lt>7.8?`<g transform="translate(104,124) scale(${pop(lt-7.8).toFixed(3)})"><circle r="15" fill="#227568"/><path d="M-6,0 l4,4 l8,-9" stroke="#fff" stroke-width="3" fill="none"/></g>`:''}</g>`}
 return s}
function rFinance(t){const P=8,lt=t%P;
 let s=hRoom(['#fbf6f1','#f6ece2'],'#f8dcc8','#f5f1ec',{lamps:[240,640]});
 s+=hWindow(84,76,160,140)+hWallChart(660,72,t,P)+hClock(300,106,t)+hFrame(380,90,110,80,'#f8dcc8');
 s+=`<g transform="translate(540,250)"><rect width="80" height="190" rx="8" fill="#ffffff" stroke="#e7ddd2"/>${[0,1,2,3].map(i=>`<rect x="8" y="${10+i*45}" width="64" height="38" rx="4" fill="#f7f2ec"/><rect x="30" y="${26+i*45}" width="20" height="4" rx="2" fill="#c9b49c"/>`).join('')}</g>`;
 // desk 1: officer working
 const d1=110,d2=370,dy=452;
 s+=hOfficeChair(d1+46,dy,'#33496e',1)+hp({x:d1+54,y:dy,pose:'sit',ph:t,f:1,outfit:'suit',top:'#33496e',hair:'#2b2b33',skin:SK[0]});
 s+=hDesk(d1+50,dy,200)+hMonitor(d1+170,dy-80,74,48,1,1,`<rect x="-31" y="-60" width="30" height="5" rx="2" fill="#c0703a" opacity=".8"/>${[0,1,2,3].map(i=>`<rect x="${-31+i*15}" y="${-27-[10,18,14,24][i]}" width="10" height="${[10,18,14,24][i]}" rx="2" fill="#f2bf9c"/>`).join('')}`)+hKeyboard(d1+110,dy-80,40)+hMug(d1+232,dy-80);
 // desk 2
 s+=hOfficeChair(d2+46,dy,'#c0703a',1)+hp({x:d2+54,y:dy,pose:'sit',ph:t+2,f:1,shirt:'#f4a7b4',hs:'long',hair:'#3a2c2a',skin:SK[2],bottom:'#33496e'});
 s+=hDesk(d2+50,dy,200)+hMonitor(d2+170,dy-80,74,48,1,1,`<rect x="-31" y="-60" width="38" height="5" rx="2" fill="#227568" opacity=".8"/><rect x="-31" y="-50" width="60" height="4" rx="2" fill="#9fb9d6"/><rect x="-31" y="-42" width="50" height="4" rx="2" fill="#9fb9d6"/><rect x="-31" y="-34" width="${lt>4.8?60:40}" height="4" rx="2" fill="${lt>4.8?'#7cc7c0':'#9fb9d6'}"/>`)+hKeyboard(d2+110,dy-80,40)+hPapers(d2+212,dy-80);
 s+=hPlant(900,452,1);
 // accounts assistant walking with a file
 const W=walkAt(lt,[[0,980,520,-1],[3,700,520],[4.6,700,520,-1],[7.6,980,520]]);
 s+=hp({x:W.x,y:520,pose:W.moving?'walk':'read',ph:W.ph,f:W.f,shirt:'#9fd6bd',hair:'#5b3d2b',skin:SK[3],bottom:'#5c6f8f',item:'clip'});
 s+=hRoomEnd();
 if(lt>4.8)s+=pill(470,250,190,'✓ INV-1041 paid','#227568','#fff',C01((lt-4.8)*3));
 return s}
function rLab(t){const P=7,lt=t%P;const run=lt>2.2&&lt<3.8,done=lt>=3.8,pr=C01((lt-2.2)/1.6);
 let s=hRoom(['#f2faf8','#e2f2ed'],'#cdeee6','#eef5f3',{lamps:[260,640]});
 // wall shelf with reagents
 s+=`<g transform="translate(100,170)"><rect width="300" height="8" rx="4" fill="#d5e0ec"/>${[0,1,2,3,4,5,6,7,8].map(i=>`<rect x="${12+i*32}" y="${-30-(i%3)*6}" width="18" height="${30+(i%3)*6}" rx="4" fill="${['#ffffff','#e7c08f','#d2ebe2'][i%3]}" stroke="#c9d6e6"/><rect x="${14+i*32}" y="${-36-(i%3)*6}" width="14" height="7" rx="2" fill="${['#b7aaf0','#f4a7b4','#7fb8e4'][i%3]}"/>`).join('')}</g>`;
 s+=hWindow(450,70,150,130)+hSign(700,92,'LABORATORY','#227568')+hClock(870,108,t);
 s+=hFridge(810,446,120,270);
 s+=hLabBench(80,446,620);
 const top=446-108;
 s+=hMicroscope(168,top)+hTubeRack(214,top,6,lt>0.9&&lt<6.6?2:-1)+hAnalyser(330,top,run,pr,done,t)+hReport(560,top,C01((lt-4)/1),lt>5.1);
 // seated technician at microscope on a stool
 s+=`<g transform="translate(96,452)"><rect x="-3" y="-76" width="6" height="70" fill="url(#hgMetal)"/><path d="M-20,0 L0,-10 L20,0" stroke="#5c6f8f" stroke-width="4" fill="none"/><ellipse cx="0" cy="-30" rx="16" ry="3" fill="none" stroke="#9aa7b9" stroke-width="3"/><rect x="-20" y="-84" width="40" height="10" rx="5" fill="#227568"/></g>`;
 s+=hp({x:100,y:426,pose:'sit',ph:t,f:1,coat:'#f3f7fc',shirt:'#7cc7c0',hs:'short',hair:'#1f2a3d',skin:SK[0]});
 // technician carries a sample tube from rack to analyser, then picks up report
 const W=walkAt(lt,[[0,260,470,1],[0.9,260,470,1],[1.9,400,470],[4.2,400,470,1],[5,600,470],[6.2,600,470,-1],[7,260,470]]);
 s+=hp({x:W.x,y:470,pose:W.moving?'walk':'work',ph:W.ph,f:W.f,coat:'#f3f7fc',shirt:'#f4a7b4',hs:'bun',hair:'#3a2c2a',skin:SK[1],item:lt>0.9&&lt<2?'tube':null});
 s+=hRoomEnd();
 if(lt>5.2)s+=pill(436,194,180,'✓ Report ready','#13294b','#fff',C01((lt-5.2)*3));
 return s}
function rAmb(t){const P=10,lt=t%P;
 let s=hRoom(['#f2f7fc','#e5eef8'],'#d6e6f6','#e9eef3',{lamps:[300]});
 s+=hBay(80,440,420,300,1);
 // bay interior: a parked stretcher and supplies cabinet
 s+=`<g transform="translate(220,440)"><rect x="300" y="-150" width="70" height="150" rx="6" fill="#ffffff" stroke="#c9d8e8"/><rect x="308" y="-140" width="54" height="60" rx="3" fill="#eef4fa"/><rect x="326" y="-120" width="18" height="18" rx="2" fill="#f2a493"/><rect x="308" y="-72" width="54" height="64" rx="3" fill="#eef4fa"/></g>`;
 const q=C01(lt/3.2),e=1-Math.pow(1-q,3);const x=mix(1000,130,e);const rot=-(1000-x)/26*57.3;
 const flash=Math.sin(lt*14)>0&&lt<5.5;
 if(q<1)for(let k=0;k<3;k++)s+=`<line x1="${(x+320+k*26).toFixed(1)}" y1="${360+k*26}" x2="${(x+370+k*26+(1-q)*60).toFixed(1)}" y2="${360+k*26}" stroke="#9fb9d6" stroke-width="3" stroke-linecap="round" opacity="${(.5*(1-q)).toFixed(3)}"/>`;
 s+=hAmbulance(x,470,{flash:lt<5.5,t:lt,rot,dir:-1});
 // receiving nurse with empty stretcher
 const nx=lt>4.6?mix(740,620,EOs(C01((lt-4.6)/1.8))):740;
 s+=hStretcher(nx-10,540,false,'#cfe3f6',170);
 s+=hp({x:nx+190,y:540,pose:lt>4.6&&lt<6.4?'push':'hold',ph:lt>4.6&&lt<6.4?(740-nx)/14:t,f:-1,coat:'#f3f7fc',shirt:'#f4a7b4',hs:'bun',hair:'#5b3d2b',skin:SK[1]});
 if(lt>3.5){const W=walkAt(lt,[[3.5,390,500,1],[5.4,560,500],[10,560,500,1]]);s+=hp({x:W.x,y:500,pose:W.moving?'walk':'talk',ph:W.ph,f:W.f,outfit:'scrubs',top:'#7cc7c0',hs:'cap',hair:'#2b2b33',skin:SK[2],badge:1,alpha:C01((lt-3.5)*3)})}
 s+=hRoomEnd();
 const base=14*60+2,sec=base+Math.min(lt,3.2)*2;const mm=String(Math.floor(sec/60)).padStart(2,'0'),ss=String(Math.floor(sec%60)).padStart(2,'0');const arrived=lt>=3.2;
 s+=`<g transform="translate(570,80)"><rect width="340" height="150" rx="18" fill="#ffffff" stroke="#d5e0ec" stroke-width="2"/><text x="22" y="36" font-family="Inter" font-weight="700" font-size="13" fill="#8a9ab0" letter-spacing="1.5">TRIP-1207 · RAVI KUMAR</text><text x="22" y="92" font-family="Plus Jakarta Sans" font-weight="800" font-size="44" fill="#13294b">${mm}:${ss}</text><rect x="196" y="62" width="${arrived?120:112}" height="34" rx="17" fill="${arrived?'#dff4ea':'#fdeee3'}"/><text x="${arrived?256:252}" y="84" text-anchor="middle" font-family="Inter" font-weight="700" font-size="14" fill="${arrived?'#2f8a63':'#c0703a'}">${arrived?'✓ Arrived':'En route'}</text><rect x="22" y="114" width="296" height="8" rx="4" fill="#eef2f7"/><rect x="22" y="114" width="${(296*e).toFixed(1)}" height="8" rx="4" fill="#227568"/></g>`;
 return s}

const RV=[
 {name:'Outpatients',col:'#3c6a9a',bg:'#e7f1fb',mod:1,scene:rOutpatients,line:'Walk in. Get a token. See the doctor.',chips:['Issue token','Call next','Save visit file'],stat:['Now serving','A-105']},
 {name:'Beds',col:'#2f8a63',bg:'#e5f2eb',mod:2,scene:rBeds,line:'Every bed, accounted for. Live.',chips:['Admit patient','Allocate bed','Discharge'],stat:['Free beds','2 of 20']},
 {name:'Pharmacy',col:'#6a5bc4',bg:'#eeebfa',mod:4,scene:rPharmacy,line:'Shelf to counter to bill. Done.',chips:['Dispense','Print bill','Reorder'],stat:['Bill','₹ 1,240']},
 {name:'Finance',col:'#c0703a',bg:'#fff0e3',mod:5,scene:rFinance,line:'Every rupee in, every invoice closed.',chips:['Create invoice','Mark paid','Export CSV'],stat:['Collected today','₹ 1,24,500']},
 {name:'Laboratory',col:'#227568',bg:'#e5f2eb',mod:3,scene:rLab,line:'Tube in. Report out. On time.',chips:['Record test','Print report','Daily report'],stat:['Pending tests','3 → 2']},
 {name:'Ambulance',col:'#3c6a9a',bg:'#e7f1fb',mod:7,scene:rAmb,line:'Every trip on the clock, door to door.',chips:['Assign trip','Track trip','Vehicle care'],stat:['Trip time','14:08']}
];

const stage=$('#hero-stage'),wrap=$('#isow');
const view=document.createElement('div');view.className='room-view';view.id='roomview';view.setAttribute('role','dialog');view.setAttribute('aria-modal','false');view.setAttribute('aria-label','Room view');view.hidden=true;
view.innerHTML=`<div class="rv-grab" aria-hidden="true"></div><div class="rv-top"><div class="rv-tabs" role="tablist" aria-label="Rooms">${RV.map((r,i)=>`<button type="button" class="rv-tab" role="tab" data-i="${i}" style="--c:${r.col}"><i></i>${r.name}</button>`).join('')}</div><button type="button" class="rv-x" aria-label="Back to the map"><svg viewBox="0 0 24 24" width="18" height="18"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></button></div>
<div class="rv-scene"><svg class="rv-l on" viewBox="40 30 920 560" preserveAspectRatio="xMidYMid meet" aria-hidden="true"></svg><svg class="rv-l" viewBox="40 30 920 560" preserveAspectRatio="xMidYMid meet" aria-hidden="true"></svg></div>
<div class="rv-card"><div class="rv-info"></div></div>`;
stage.appendChild(view);
const isM=()=>window.matchMedia('(max-width:640px)').matches;
const bdrop=document.createElement('div');bdrop.className='rv-back';bdrop.setAttribute('aria-hidden','true');document.body.appendChild(bdrop);
let sheet=false;
const layers=[...view.querySelectorAll('.rv-l')],info=view.querySelector('.rv-info');
let cur=-1,open=false,t0=0,front=0,raf=0,closeTimer=0;

function cardHTML(r){return`<div class="rv-head"><span class="rv-ic" style="background:${r.bg}">${EKKO(22,r.col==='#c0703a'?'#227568':'#227568')}</span><div><div class="rv-eb">Ekko · ${r.name}</div><div class="rv-line">${r.line}</div></div></div><div class="rv-row"><div class="rv-chips">${r.chips.map((c,k)=>`<span class="rv-chip${k===0?' p':''}" style="--d:${k*80}ms">${c}</span>`).join('')}</div><div class="rv-stat"><small>${r.stat[0]}</small><b>${r.stat[1]}</b></div></div><a class="rv-link" href="#inside" data-mod="${r.mod}">See it in Ekko →</a>`}

function roomCentre(i){const hit=$('#room'+i+' .room-hit');const a=hit.getBoundingClientRect(),w=wrap.getBoundingClientRect();return[a.left+a.width/2-w.left,a.top+a.height/2-w.top,w.width,w.height]}
function zoomMap(i){const [cx,cy,W,H]=roomCentre(i);const S=2.4;wrap.style.transformOrigin='0 0';wrap.style.transform=`translate3d(${(W/2-S*cx).toFixed(1)}px,${(H/2-S*cy).toFixed(1)}px,0) scale(${S})`;
  view.style.transformOrigin=`${((cx/W)*100).toFixed(1)}% ${((cy/H)*100).toFixed(1)}%`}

function show(i){
  if(i===cur&&open)return;
  const first=!open;cur=i;t0=performance.now();
  const r=RV[i];
  $$('.rv-tab').forEach(b=>{const on=+b.dataset.i===i;b.classList.toggle('on',on);b.setAttribute('aria-selected',String(on))});
  {const tb=view.querySelector('.rv-tabs'),at=view.querySelector(`.rv-tab[data-i="${i}"]`);if(tb&&at&&tb.scrollWidth>tb.clientWidth)tb.scrollLeft=Math.max(0,at.offsetLeft-tb.offsetLeft-tb.clientWidth/2+at.offsetWidth/2)}
  // crossfade scene layers
  const nf=first?front:1-front;layers[nf].innerHTML=r.scene(reduce?6:0);
  if(!first){layers[front].classList.remove('on');layers[nf].classList.add('on')}
  front=nf;
  // card swap
  if(first){info.innerHTML=cardHTML(r)}else{info.classList.add('swap');setTimeout(()=>{info.innerHTML=cardHTML(r);info.classList.remove('swap')},reduce?0:180)}
  if(first){sheet=isM();if(sheet){if(view.parentNode!==document.body)document.body.appendChild(view);view.classList.add('sheet');view.setAttribute('aria-modal','true')}else{if(view.parentNode!==stage)stage.appendChild(view);view.classList.remove('sheet');view.setAttribute('aria-modal','false')}}
  if(!sheet)zoomMap(i);
  if(first){
    clearTimeout(closeTimer);open=true;view.hidden=false;view.style.transform='';
    if(sheet)requestAnimationFrame(()=>bdrop.classList.add('on'));
    stage.classList.add('zoomed');
    requestAnimationFrame(()=>requestAnimationFrame(()=>view.classList.add('open')));
    view.querySelector('.rv-x').focus({preventScroll:true});
    if(!raf&&!reduce)raf=requestAnimationFrame(loop);
  }
}
function close(){
  if(!open)return;open=false;view.classList.remove('open');stage.classList.remove('zoomed');wrap.style.transform='';bdrop.classList.remove('on');view.style.transform='';
  cancelAnimationFrame(raf);raf=0;
  const back=cur;closeTimer=setTimeout(()=>{view.hidden=true;layers.forEach(l=>l.innerHTML='');cur=-1;const g=$('#room'+back);if(g)g.focus({preventScroll:true})},reduce?0:650);
}
function loop(now){if(!open){raf=0;return}const lt=(now-t0)/1000;layers[front].innerHTML=RV[cur].scene(lt);raf=requestAnimationFrame(loop)}
if(reduce)setInterval(()=>{if(open)layers[front].innerHTML=RV[cur].scene(6)},4000);

view.addEventListener('click',e=>{
  const tab=e.target.closest('.rv-tab');if(tab){show(+tab.dataset.i);return}
  if(e.target.closest('.rv-x')){close();return}
  const lk=e.target.closest('.rv-link');if(lk){e.preventDefault();const m=+lk.dataset.mod;close();if(window.__dj)window.__dj.setMod(m);$('#inside').scrollIntoView({behavior:reduce?'auto':'smooth'})}
});
view.querySelector('.rv-tabs').addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const n=(cur+(e.key==='ArrowRight'?1:RV.length-1))%RV.length;show(n);view.querySelector(`.rv-tab[data-i="${n}"]`).focus({preventScroll:true})}});
document.addEventListener('keydown',e=>{if(open&&e.key==='Escape')close()});
// click outside the room view (anywhere else in the hero) zooms back out
document.getElementById('hero').addEventListener('click',e=>{if(open&&!e.target.closest('.room-view')&&!e.target.closest('.room-g')&&!e.target.closest('.room-chips'))close()});
window.addEventListener('resize',()=>{if(open&&!sheet)zoomMap(cur)});
bdrop.addEventListener('click',()=>close());
// drag the sheet's handle down to dismiss
{const g=view.querySelector('.rv-grab');let y0=null,dy=0;
 g.addEventListener('pointerdown',e=>{if(!sheet)return;y0=e.clientY;dy=0;view.style.transition='none';g.setPointerCapture(e.pointerId)});
 g.addEventListener('pointermove',e=>{if(y0===null)return;dy=Math.max(0,e.clientY-y0);view.style.transform=`translate3d(0,${dy}px,0)`});
 const up=()=>{if(y0===null)return;y0=null;view.style.transition='';if(dy>90)close();else view.style.transform=''};
 g.addEventListener('pointerup',up);g.addEventListener('pointercancel',up)}

window.HeroRooms={open:show,close,scene:(i,t)=>RV[i].scene(t),get current(){return open?cur:-1}};
})();
