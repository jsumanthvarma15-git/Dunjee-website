const $=s=>document.querySelector(s),cl=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)),E=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2,EO=x=>1-Math.pow(1-x,3),L=(a,b,p)=>a+(b-a)*p,seg=(t,a,b)=>E(cl((t-a)/(b-a)));
const IC=(d,c)=>`<svg viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const EKKO=(w,c='#227568')=>{let s=`<svg viewBox="-50 -50 100 100" width="${w}" height="${w}">`;for(let i=0;i<6;i++){const a=(i*60-90)*Math.PI/180,x=Math.cos(a)*36,y=Math.sin(a)*36;s+=`<line x1="0" y1="0" x2="${x}" y2="${y}" stroke="${c}" stroke-width="6" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="8.5" fill="${c}"/>`}return s+`<circle r="21" fill="${c}"/><text y="9.5" text-anchor="middle" font-family="Plus Jakarta Sans,Inter" font-weight="800" font-size="30" fill="#fff">e</text></svg>`};
const I={dash:'<rect x="3" y="3" width="7" height="8" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="15" width="7" height="6" rx="1.5"/>',op:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/>',fin:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M16 15h2"/>',ph:'<rect x="3" y="9" width="18" height="7" rx="3.5" transform="rotate(-35 12 12)"/><path d="M9.5 8.5l5 7"/>',bed:'<path d="M3 18V7M3 13h18v5M21 13v-1a3 3 0 0 0-3-3h-7v4"/><circle cx="7" cy="10" r="2"/>',lab:'<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M7.5 15h9"/>',mt:'<path d="M15 4a4.5 4.5 0 0 0-5 6l-6 6a2 2 0 0 0 3 3l6-6a4.5 4.5 0 0 0 6-5l-3 3-2-1-1-2z"/>',amb:'<path d="M2 16V8h11v8M13 11h4l3 3v2h-7"/><circle cx="6" cy="17" r="2"/><circle cx="16" cy="17" r="2"/><path d="M7.5 10v3M6 11.5h3"/>',adm:'<circle cx="9" cy="8" r="3"/><path d="M3 20v-1a6 6 0 0 1 12 0v1"/><circle cx="17" cy="9" r="2.4"/><path d="M15 15a4 4 0 0 1 6 3.5V20"/>',ih:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',clk:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'};
// explorer modules: [name, icon, colourKey, scene, offset, tagline]
const MODS2=[["Dashboard",'dash','mint',null,0,"Doctors, beds, OP and tickets at a glance"],["Outpatients",'op','ice','scOutpatient',2.5,"Token queue, consultations, saved visit files"],["Beds",'bed','mint','scBeds',1,"Admit, allocate and discharge with paid / due"],["Laboratory",'lab','mint','scLab',0,"Pending tests, OP / IP requests, daily reports"],["Pharmacy",'ph','lav','scPharmacy',1.5,"Vendors, GRNs and orders, sales, problem log"],["Finance",'fin','peach','scFinance',0,"All departments, income vs expenses, cash flow"],["Maintenance",'mt','peach','scMaint',1.5,"Raise, assign and resolve tickets"],["Ambulance",'amb','ice','scAmb',0,"Vehicles, drivers, trips and vehicle care"],["Administration",'adm','lav','scAdmin',0,"Staff and per-section access control"],["In-House",'ih','peach','scInhouse',0,"Team calendar, team news and clock-in"]];
const sceneFn=n=>n&&typeof window[n]==='function'?window[n]:(typeof scPeople==='function'?scPeople:()=>({svg:'',data:[]}));
function resolveScenes(){MODS2.forEach(m=>{if(typeof m[3]==='string')m[3]=sceneFn(m[3])});}
const PTS=[['Priya Sharma','34 · F'],['Rahul Verma','52 · M'],['Anita Desai','41 · F'],['Mohan Das','67 · M'],['Fatima Khan','29 · F'],['Suresh Pillai','45 · M'],['Kavitha Rao','38 · F'],['Arjun Singh','23 · M'],['Neha Gupta','31 · F'],['Ramesh Iyer','58 · M']];
const COL={ice:['#e7f1fb','#3c6a9a'],mint:['#e5f2eb','#227568'],peach:['#fff0e3','#c0703a'],lav:['#eeebfa','#6a5bc4']};
const LMODS=[["Getting started with Ekko","Find your way around the sidebar, dashboard and clock-in."],["Outpatients and beds","Follow the token queue, admissions and discharge files."],["Finance and cash flow","Read income vs expenses across departments and export CSV."],["Pharmacy, laboratory and ambulance","Vendors and orders, pending tests, trips and vehicle care."]];

const split=s=>s.split(' ').map(w=>`<span class="w"><span>${w}</span></span>`).join(' ');
const FAQ=[["What is Dhanjiva?","A maker of management tools for hospitals. Ekko is the first."],["What's inside Ekko?","Outpatients, finance, pharmacy, beds, laboratory, maintenance, ambulance, administration and In-House. One workspace."],["Does Ekko treat patients?","No. Ekko runs hospital administration, not diagnosis or treatment."]];
const LMODS2=[["Getting started","Sidebar, dashboard, clock-in."],["Outpatients & beds","Tokens, admissions, discharge."],["Finance & cash flow","Every department. CSV out."],["Pharmacy, lab & ambulance","Orders, tests, trips."]];

// ---------- iso hospital ----------
let OX=500,OY=190,SC=42;const P=(x,y,z=0)=>[OX+(x-y)*.866*SC,OY+(x+y)*.5*SC-z*SC];const pts=a=>a.map(p=>p.join(',')).join(' ');
function shadeH(c,k){return shade(c,k)}
function box(x,y,z,w,d,h,c,st='#ffffff'){const t=[P(x,y,z+h),P(x+w,y,z+h),P(x+w,y+d,z+h),P(x,y+d,z+h)],l=[P(x,y+d,z),P(x+w,y+d,z),P(x+w,y+d,z+h),P(x,y+d,z+h)],r=[P(x+w,y,z),P(x+w,y+d,z),P(x+w,y+d,z+h),P(x+w,y,z+h)];return`<polygon points="${pts(l)}" fill="${shade(c,.9)}"/><polygon points="${pts(r)}" fill="${shade(c,.8)}"/><polygon points="${pts(t)}" fill="${c}" stroke="${st}" stroke-opacity=".6"/>`}
const ROOMS=[["Outpatients",0,0,'#cfe3f6','#3c6a9a'],["Beds",5,0,'#cdeedd','#2f8a63'],["Pharmacy",10,0,'#dcd5f7','#6a5bc4'],["Finance",0,5,'#f8dcc8','#c0703a'],["Laboratory",5,5,'#cdeee6','#227568'],["Ambulance",10,5,'#d6e6f6','#3c6a9a']];
function isoPerson(x,y,o){const p=P(x,y,0);return person(Object.assign({x:p[0],y:p[1],s:.3},o))}
// Hero map is drawn in three stacked layers so only moving people repaint each frame.
// Rooms (static) re-render only on hover; labels + hit areas never re-render, so clicks always land.
const ROOM_TO_MOD=[1,2,4,5,3,7];
function isoRoom(i,lift){const [n,x,y,c]=ROOMS[i];let r='';const z=lift;
 r+=`<polygon points="${pts([P(x,y,z),P(x+4,y,z),P(x+4,y+4,z),P(x,y+4,z)])}" fill="${shade(c,1.06)}" stroke="#ffffff" stroke-width="2"/>`;
 // floor tiles (subtle)
 for(let k=1;k<4;k++)r+=`<path d="M${P(x+k,y,z).join(',')} L${P(x+k,y+4,z).join(',')} M${P(x,y+k,z).join(',')} L${P(x+4,y+k,z).join(',')}" stroke="#ffffff" stroke-opacity=".45" stroke-width="1"/>`;
 r+=`<polygon points="${pts([P(x,y,z),P(x+4,y,z),P(x+4,y,z+1.6),P(x,y,z+1.6)])}" fill="${shade(c,.95)}"/><polygon points="${pts([P(x,y,z),P(x,y+4,z),P(x,y+4,z+1.6),P(x,y,z+1.6)])}" fill="${shade(c,.86)}"/>`;
 r+=`<polygon points="${pts([P(x,y,z),P(x+4,y,z),P(x+4,y,z+.12),P(x,y,z+.12)])}" fill="#ffffff" opacity=".5"/><polygon points="${pts([P(x,y,z),P(x,y+4,z),P(x,y+4,z+.12),P(x,y,z+.12)])}" fill="#ffffff" opacity=".35"/>`;
 r+=`<polyline points="${pts([P(x,y+4,z+1.6),P(x,y,z+1.6),P(x+4,y,z+1.6)])}" fill="none" stroke="#ffffff" stroke-width="3" stroke-linejoin="round"/>`;
 const fy=fY(x,y,z),fx=fX(x,y,z);
 const win=(f,u)=>rectOn(f,u,.7,.9,.55,'#ffffff')+rectOn(f,u+.06,.75,.78,.45,'#dcecf8')+rectOn(f,u+.06,.75,.78,.14,'#cfe8dc');
 if(i==0){// Outpatients
  r+=rectOn(fy,2.2,.82,1.3,.62,'#13294b')+rectOn(fy,2.26,.86,1.18,.54,'#ffffff')+rectOn(fy,2.34,1.12,.5,.18,'#13294b')+rectOn(fy,3.0,1.14,.32,.08,'#2f8a63');
  r+=rectOn(fx,2.5,0,.8,1.25,'#ffffff')+rectOn(fx,2.56,0,.68,1.18,'#7fb8e4')+rectOn(fx,2.66,.6,.2,.3,'#cfe3f6')+win(fx,.6);
  r+=isoRug(x+1,y+1.9,z,2.8,1.1,'#ffffff');
  // waiting chairs are depth-sorted with people in isoDynamic
  r+=box(x+3.35,y+.5,z,.3,.3,.1,'#d5e0ec')+box(x+3.44,y+.58,z+.1,.12,.12,.5,'#c9d4e0')+box(x+3.3,y+.48,z+.6,.4,.34,.5,'#ffffff')+(()=>{const f=fY(x+3.3,y+.82,z+.6);return rectOn(f,.06,.18,.28,.24,'#cfe6f7')})();
  r+=isoPlant(x+.35,y+3.55,z,1)+isoPlant(x+3.7,y+3.6,z,.85)}
 if(i==1){// Beds
  r+=win(fy,.9)+win(fy,2.5);
  r+=rectOn(fx,.2,1.1,.5,.32,'#ffffff')+rectOn(fx,.25,1.15,.4,.22,'#2f8a63');
  [[.3,.3,'#cfe3f6',{skin:'#e9b892',hair:'#c7ccd2'}],[.3,1.75,'#f6d9c6',{skin:'#b07552',hair:'#1f2a3d'}]].forEach(([u,v,bl,oc])=>{r+=isoIV(x+u+.05,y+v-.12,z);r+=isoBed(x+u,y+v,z,bl,oc);r+=isoSideTable(x+u-.05,y+v+.9,z)});
  r+=box(x+3.2,y+.15,z,.6,.4,.9,'#ffffff')+box(x+3.24,y+.55,z+.05,.52,.01,.8,'#eef4f1');
  }// plant is depth-sorted with the stretcher in isoDynamic
 if(i==2){// Pharmacy
  r+=isoCupboard(x+.02,y+.5,z,1.3,'x',2);r+=isoCupboard(x+.5,y+.02,z,1.2,'y',0);r+=isoCupboard(x+1.85,y+.02,z,1.2,'y',4);
  r+=rectOn(fy,3.2,1.0,.62,.34,'#ffffff')+rectOn(fy,3.43,1.07,.16,.2,'#5bb58c')+rectOn(fy,3.36,1.13,.3,.08,'#5bb58c');
  r+=isoPlant(x+.4,y+3.55,z,.9)}
 if(i==3){// Finance
  r+=win(fx,.5)+rectOn(fy,2.3,.7,1.3,.65,'#ffffff');[.3,.42,.36,.55,.48].forEach((b,k)=>r+=rectOn(fy,2.42+k*.22,.78,.14,b*.9,['#b7aaf0','#9fd6bd','#7fb8e4','#f2bf9c','#9fd6bd'][k]));
  r+=box(x+.04,y+2.7,z,.42,.7,1,'#ffffff');{const f=fX(x+.46,y+2.7,z);[.1,.4,.7].forEach(v=>r+=rectOn(f,.06,v,.58,.24,'#f7f2ec')+rectOn(f,.28,v+.1,.14,.04,'#c9b49c'))}
  r+=isoRug(x+.9,y+.9,z,2.6,1.8,'#ffffff');
  [[.6,.6],[2.2,.6]].forEach(([u,v],k)=>{r+=isoDesk(x+u,y+v,z,1.2,.62,'#efe0cc','y');r+=isoMonitor(x+u+.42,y+v+.08,z+.68,'y');r+=box(x+u+.3,y+v+.42,z+.68,.4,.14,.02,'#dfe6ee');r+=box(x+u+.1,y+v+.2,z+.68,.12,.12,.12,k?'#9fd6bd':'#f4a7b4');r+=isoOfficeChair(x+u+.36,y+v+.86,z,k?'#c0703a':'#33496e','y')});
  r+=isoPlant(x+3.6,y+3.5,z,.9)}
 if(i==4){// Laboratory
  r+=win(fx,.7);r+=rectOn(fy,.4,1.15,2.3,.05,'#d5e0ec');for(let k=0;k<8;k++)r+=rectOn(fy,.5+k*.27,1.2,.14,.2+(k%3)*.05,['#ffffff','#e7c08f','#d2ebe2'][k%3],'stroke="#c9d6e6" stroke-width=".6"');
  r+=box(x+.3,y+.05,z,2.6,.62,.72,'#ffffff');{const f=fY(x+.3,y+.67,z);for(let k=0;k<5;k++)r+=rectOn(f,.06+k*.51,.06,.46,.56,'#f3f6f9')+rectOn(f,.22+k*.51,.5,.14,.03,'#b8c4d2')}
  r+=box(x+.26,y+.01,z+.72,2.68,.7,.06,'#d2ebe2');
  r+=isoMicroscope(x+.75,y+.42,z+.78)+isoTubes(x+1.05,y+.25,z+.78,5)+isoAnalyser(x+1.75,y+.1,z+.78,'y');
  r+=isoFridge(x+3.15,y+.05,z,'y');
  r+=box(x+.9,y+1.15,z,.1,.1,.5,'#9aa7b9')+box(x+.76,y+1.01,z+.5,.38,.38,.07,'#227568');
  r+=isoPlant(x+3.6,y+3.6,z,.85)}
 if(i==5){// Ambulance bay
  r+=rectOn(fy,.5,0,2.6,1.3,'#c9d8e8');for(let k=0;k<9;k++)r+=rectOn(fy,.56,.06+k*.135,2.48,.1,'#e9f1f9');
  r+=rectOn(fy,1.25,1.36,1.1,.2,'#c0392b');
  for(let k=0;k<6;k++)r+=poly([P(x+.4+k*.55,y+3.5,z+.01),P(x+.7+k*.55,y+3.5,z+.01),P(x+.6+k*.55,y+3.8,z+.01),P(x+.3+k*.55,y+3.8,z+.01)],'#f6d27a','opacity=".7"');
  r+=poly([P(x+.4,y+1.2,z+.01),P(x+3.4,y+1.2,z+.01),P(x+3.4,y+2.7,z+.01),P(x+.4,y+2.7,z+.01)],'none','stroke="#ffffff" stroke-width="2" stroke-dasharray="6 6"');
  r+=box(x+.05,y+.4,z,.4,.6,.9,'#ffffff')+(()=>{const f=fX(x+.45,y+.4,z);return rectOn(f,.1,.4,.4,.36,'#eef4fa')+rectOn(f,.22,.5,.16,.16,'#f2a493')})();
  r+=isoStretcher(x+.6,y+3,z,false)}
 return r}
function isoTree(x,y,s=1,c='#9fd6bd'){const b=P(x,y,0),t=P(x,y,1.25*s);return`<ellipse cx="${b[0]}" cy="${b[1]+2}" rx="${22*s}" ry="${10*s}" fill="#13294b" opacity=".08"/><rect x="${b[0]-3*s}" y="${t[1]+8*s}" width="${6*s}" height="${b[1]-t[1]-6*s}" rx="${3*s}" fill="#c9a27a"/><circle cx="${t[0]}" cy="${t[1]}" r="${24*s}" fill="${c}"/><circle cx="${t[0]-9*s}" cy="${t[1]-9*s}" r="${13*s}" fill="#ffffff" opacity=".28"/><circle cx="${t[0]+10*s}" cy="${t[1]+6*s}" r="${15*s}" fill="${shade(c,.9)}" opacity=".6"/>`}
// Back static layer: ground, corridor floor and the back row of rooms. People in the back row and
// the corridor are drawn above it, then the front row of rooms (isoStaticFront) covers them, so
// nobody is ever painted over a wall that stands in front of them.
function isoStatic(hov){
 const sc=P(7,4.6,-.6);let s=`<defs><radialGradient id="isoSh"><stop offset="0" stop-color="#13294b" stop-opacity=".16"/><stop offset="1" stop-color="#13294b" stop-opacity="0"/></radialGradient><radialGradient id="lawnG" cx="${sc[0]}" cy="${sc[1]}" r="560" gradientUnits="userSpaceOnUse" gradientTransform="translate(${sc[0]} ${sc[1]}) scale(1 .62) translate(${-sc[0]} ${-sc[1]})"><stop offset=".55" stop-color="#e9f4ee" stop-opacity=".9"/><stop offset=".86" stop-color="#e9f4ee" stop-opacity="0"/></radialGradient><radialGradient id="sun" cx="560" cy="220" r="620" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff7e6" stop-opacity=".35"/><stop offset="1" stop-color="#fff7e6" stop-opacity="0"/></radialGradient></defs>`;
 s+=`<ellipse cx="${sc[0]}" cy="${sc[1]+30}" rx="520" ry="270" fill="url(#isoSh)"/>`;s+=`<polygon points="${pts([P(-1.5,-1.5,-.62),P(15.5,-1.5,-.62),P(15.5,10.5,-.62),P(-1.5,10.5,-.62)])}" fill="url(#lawnG)"/>`;[[-1.1,1.2,.9,'#b6e2cc'],[15.1,1.4,1,'#9fd6bd']].forEach(([x,y,k,c])=>{if(y<5)s+=isoTree(x,y,k,c)});
 s+=box(-.6,-.6,-.6,15.2,10.2,.6,'#ffffff','#e4eaf2');
 s+=`<polygon points="${pts([P(-.6,4,0),P(14.6,4,0),P(14.6,5,0),P(-.6,5,0)])}" fill="#eef3f9"/>`;
 [0,1,2].forEach(i=>s+=isoRoom(i,hov==i?.25:0));
 return s+`<rect x="-200" y="-100" width="1500" height="1100" fill="url(#sun)"/>`}
// Front static layer: front-row rooms + front trees, with the same sun wash clipped to their outline.
const TREES_F=[[-1.1,7.8,1.05,'#9fd6bd'],[15.1,7,.85,'#b6e2cc'],[3,10.1,.85,'#9fd6bd'],[11.5,10.1,1,'#b6e2cc']];
function isoStaticFront(hov){let s='',clip='';
 [3,4,5].forEach(i=>{const [n,x,y]=ROOMS[i],z=hov==i?.25:0;s+=isoRoom(i,z);clip+=`<polygon points="${pts([P(x,y+4,z+1.6),P(x,y,z+1.6),P(x+4,y,z+1.6),P(x+4,y,z),P(x+4,y+4,z),P(x,y+4,z)])}"/>`});
 TREES_F.forEach(([x,y,k,c])=>{s+=isoTree(x,y,k,c);const t=P(x,y,1.25*k),b=P(x,y,0);clip+=`<circle cx="${t[0]}" cy="${t[1]}" r="${25*k}"/><rect x="${b[0]-3*k}" y="${t[1]}" width="${6*k}" height="${b[1]-t[1]}"/>`});
 return `<defs><radialGradient id="sun2" cx="560" cy="220" r="620" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff7e6" stop-opacity=".35"/><stop offset="1" stop-color="#fff7e6" stop-opacity="0"/></radialGradient><clipPath id="isoFC">${clip}</clipPath></defs>`+s+`<rect x="-200" y="-100" width="1500" height="1100" fill="url(#sun2)" clip-path="url(#isoFC)"/>`}
function isoUI(){let s='';ROOMS.forEach(([n,x,y,c,cd],i)=>{const lp=P(x+1.1,y+1.1,2.45);
  const hit=[P(x,y+4,1.6),P(x,y,1.6),P(x+4,y,1.6),P(x+4,y,0),P(x+4,y+4,0),P(x,y+4,0),P(x,y,0)];
  s+=`<g class="room-g" data-room="${i}" id="room${i}" tabindex="0" role="button" aria-label="Open ${n}"><polygon class="room-hit" points="${pts(hit)}" fill="#000" fill-opacity="0"/><g transform="translate(${lp[0]},${lp[1]})"><g class="room-s"><g class="room-l"><rect x="-80" y="-20" width="160" height="40" rx="20" fill="#ffffff" stroke="#e4eaf2" stroke-width="1.5" style="--rc:${cd}"/><circle cx="-58" cy="0" r="6" fill="${cd}"/><text x="6" y="6" text-anchor="middle" font-family="Inter" font-weight="700" font-size="15" fill="#13294b">${n}</text><text x="66" y="6" text-anchor="middle" font-family="Inter" font-weight="700" font-size="15" fill="${cd}" class="room-arrow">→</text></g></g></g></g>`});
 return s}
function isoPersonZ(x,y,z,o){const p=P(x,y,z);return person(Object.assign({x:p[0],y:p[1],s:.3,v2:1},o))}
// Walk a fixed route of floor waypoints at a steady pace. Leg phase follows distance walked, so
// feet never slide; waits ({w}) hold a pose. Returns null outside the route's duration.
function isoRoute(steps,v=.5){const seg=[];let t=0,d=0,[px,py,f]=steps[0];f=f||1;
 steps.slice(1).forEach(s=>{if(s.w!=null){if(s.f)f=s.f;seg.push({t0:t,t1:t+s.w,x:px,y:py,f,pose:s.pose||'stand'});t+=s.w}
  else{const [x,y]=s,L=Math.hypot(x-px,y-py),sd=(x-px)-(y-py);if(Math.abs(sd)>.04)f=sd>0?1:-1;seg.push({t0:t,t1:t+L/v,ax:px,ay:py,bx:x,by:y,f,d0:d,L});t+=L/v;d+=L;px=x;py=y}});
 const fn=lt=>{if(lt<0||lt>t)return null;for(const s of seg)if(lt<=s.t1+1e-9){if(s.L==null)return{x:s.x,y:s.y,f:s.f,pose:s.pose,ph:lt};const q=s.t1>s.t0?(lt-s.t0)/(s.t1-s.t0):1;return{x:s.ax+(s.bx-s.ax)*q,y:s.ay+(s.by-s.ay)*q,f:s.f,pose:'walk',ph:(s.d0+s.L*q)*10}}return null};fn.T=t;return fn}
// Routes stay on clear floor: in through the Outpatients door, round the waiting chairs, out across
// the open front into the corridor; staff loop between their workstations. Back-row walkers keep
// x<=3.2 inside a room so they never overlap the next room's wall.
const PM=(a,b)=>((a%b)+b)%b;// positive modulo: t can be negative/edge on some loads
const R_OP=isoRoute([[.12,2.9,1],[.8,2.85],[.8,1.65],[1.45,1.5],{w:3.5,pose:'talk',f:1},[.8,1.65],[.8,3.1],[2.62,3.1],[2.62,2.4],{w:6,pose:'sit',f:-1},[2.62,3.1],[2.9,3.5],[2.9,4.12],[14.6,4.12]],.5);
const R_FIN=isoRoute([[.75,8,-1],{w:2,pose:'reach',f:-1},[1.5,7.6],[2.25,7.2],{w:3,pose:'read',f:1},[1.5,7.6],[.75,8]],.45);
const R_LAB=isoRoute([[8.15,5.9,1],{w:2,pose:'reach',f:1},[7.7,6.55],[6.8,6.6],[6.5,6.15],{w:2.5,pose:'hold',f:-1},[6.8,6.6],[7.7,6.55],[8.15,5.9]],.45);
const CLEN=15.2,CV=.65,OP_CYC=CLEN/.5,OP_O=R_OP.T-(14.6+.6)/.5;// corridor length (x -.6..14.6); OP_O = when the patient's route would start at the corridor's west end
function isoPeople(t,hov){const B=[],F=[];const Z=i=>hov==i?.25:0;let cur=B;const add=(k,s)=>cur.push([k,s]);
 const fade=x=>C01((x+.6)/.7)*C01((14.6-x)/.7);
 // --- Outpatients (0,0)
 {const z=Z(0);
  add(1.7,isoPersonZ(1.25,.48,z,{pose:'work',ph:t,f:-1,coat:'#f3f7fc',shirt:'#7fb8e4',hs:'bun',hair:'#3a2c2a',skin:PAL.skin[1]}));
  add(2.3,isoReception(.55,.78,z,'#cfe3f6'));
  for(let k=0;k<4;k++)add(1.3+k*.66+2.33,isoChair(1.05+k*.66,2.1,z,'#b7aaf0','y'));
  const seat=k=>[1.3+k*.66,2.34];
  [[0,{top:'#f2bf9c',hair:'#c7ccd2',skin:PAL.skin[3]}],[1,{top:'#9fd6bd',hs:'long',hair:'#1f2a3d',skin:PAL.skin[2]}],[3,{top:'#b7aaf0',hs:'bun',hair:'#5b3d2b',skin:PAL.skin[0]}]].forEach(([k,o])=>{const [sx,sy]=seat(k);add(sx+sy+.3,isoPersonZ(sx,sy,z,Object.assign({pose:'sit',ph:t+k,f:-1,outfit:'casual',bottom:'#33496e'},o)))});
  // arriving patient: door -> reception -> free chair -> corridor (previous cycle may still be in the corridor)
  for(let c=0;c<2;c++){const lt=PM(t,OP_CYC)+c*OP_CYC,w=R_OP(lt);if(!w)continue;const inRoom=w.y<4;
   const al=Math.min(C01(lt/.6),fade(w.x));if(al<=0)continue;
   add(w.x+w.y+(w.pose=='sit'?.3:0),isoPersonZ(w.x,w.y,inRoom?z:0,{pose:w.pose,ph:w.ph,f:w.f,shirt:'#7fb8e4',hair:'#2b2b33',skin:PAL.skin[2],alpha:al.toFixed(3)}))}
  add(1+1.8,isoPersonZ(2.3,.95,z,{pose:'talk',ph:t,f:1,shirt:'#f4a7b4',hs:'long',hair:'#3a2c2a',skin:PAL.skin[1]}))}
 // --- Beds (5,0): porter pushes the stretcher in beside the bed, waits, then pulls it back (always at the head end)
 {const z=Z(1);const q=PM(t*.1,1);let e,ph,pose='push';
  if(q<.4){e=EOs(q/.4)}else if(q<.6){e=1;pose='hold'}else if(q<.95){e=1-EOs((q-.6)/.35)}else{e=0;pose='hold'}
  const sx=L(5.7,7,e),px=sx-.32;ph=(sx-5.7)*10;
  add(sx+.55+3.25,isoStretcher(sx,3.02,z,true,'#f6d9c6'));
  add(px+3.25,isoPersonZ(px,3.25,z,{pose,ph:pose=='hold'?t:ph,f:1,outfit:'scrubs',top:'#9fd6bd',hair:'#2b2b33',skin:PAL.skin[0]}));
  add(8.6+3.6,isoPlant(8.6,3.6,z,.85));
  add(7.4+1.2,isoPersonZ(7.4,1.25,z,{pose:'read',ph:t,f:-1,outfit:'scrubs',top:'#7cc7c0',hs:'cap',hair:'#3a2c2a',skin:PAL.skin[1],item:'clip'}))}
 // --- Pharmacy (10,0)
 {const z=Z(2);
  add(10.65+1.25,isoPersonZ(10.65,1.25,z,{pose:'reach',ph:t,f:-1,coat:'#f3f7fc',shirt:'#9fd6bd',hair:'#5b3d2b',skin:PAL.skin[3]}));
  add(12.9+2.05,isoPersonZ(12.9,2.08,z,{pose:'work',ph:t,f:-1,coat:'#f3f7fc',shirt:'#b7aaf0',hs:'bun',hair:'#1f2a3d',skin:PAL.skin[2]}));
  add(15.5,isoCounter(12.2,2.3,z,1.5,.5)+isoTill(12.95,2.4,z+.78)+isoMonitor(12.4,2.36,z+.78,'y'));
  add(16.3,isoPersonZ(13.1,3.25,z,{pose:'talk',ph:t,f:1,shirt:'#f2bf9c',hs:'long',hair:'#3a2c2a',skin:PAL.skin[0],bottom:'#33496e'}))}
 // --- corridor (y 4..5): two lanes, one per direction, constant pace, fade in/out at the corridor ends
 {const sl=CLEN/CV;// seconds per traverse
  // eastbound lane shares the patient's pace + period, spaced a third of a lap from them
  [[OP_O+OP_CYC/3,'#9fd6bd',0],[OP_O+2*OP_CYC/3,'#b7aaf0',2]].forEach(([o,sh,k])=>{const x=-.6+((t-o)%OP_CYC+OP_CYC)%OP_CYC*.5,y=4.12;
   add(x+y,isoPersonZ(x,y,0,{pose:'walk',ph:x*10,shirt:sh,f:1,hair:PAL.hair[k+1],skin:PAL.skin[(k+2)%4],coat:k==2?'#f3f7fc':null,alpha:fade(x).toFixed(3)}))});
  [[0,'#f2bf9c',{outfit:'scrubs',top:'#7cc7c0'}],[sl/3,'#7fb8e4',{item:'clip'}],[2*sl/3,'#f4a7b4',{hs:'long'}]].forEach(([o,sh,ex],k)=>{const x=14.6-((t+o)%sl)*CV,y=4.42;
   add(x+y,isoPersonZ(x,y,0,Object.assign({pose:'walk',ph:-x*10,shirt:sh,f:-1,hair:PAL.hair[k],skin:PAL.skin[(k+1)%5],alpha:fade(x).toFixed(3)},ex)))})}
 cur=F;
 // --- Finance (0,5)
 {const z=Z(3);
  add(1.18+6.68,isoPersonZ(1.18,6.62,z+.02,{pose:'sit',ph:t,f:1,outfit:'suit',top:'#33496e',hair:'#2b2b33',skin:PAL.skin[0]}));
  add(2.78+6.68,isoPersonZ(2.78,6.62,z+.02,{pose:'sit',ph:t+2,f:1,top:'#f4a7b4',hs:'long',hair:'#3a2c2a',skin:PAL.skin[2],outfit:'casual'}));
  {const w=R_FIN(PM(t,R_FIN.T));add(w.x+w.y,isoPersonZ(w.x,w.y,z,{pose:w.pose,ph:w.ph,f:w.f,shirt:'#9fd6bd',hair:'#5b3d2b',skin:PAL.skin[3],item:'clip'}))}
  for(let k=0;k<3;k++){const q=(t*.6+k/3)%1;const p=P(1.3,5.95,1.5+q*1.1);add(90,`<circle cx="${p[0]}" cy="${p[1]}" r="6" fill="#f6d27a" stroke="#e2b54a" opacity="${Math.sin(q*Math.PI).toFixed(3)}"/>`)}}
 // --- Laboratory (5,5)
 {const z=Z(4);
  add(5.95+6.2,isoPersonZ(5.95,6.18,z+.2,{pose:'sit',ph:t,f:1,coat:'#f3f7fc',shirt:'#7cc7c0',hair:'#1f2a3d',skin:PAL.skin[0]}));
  add(7.15+5.95,isoPersonZ(7.15,5.95,z,{pose:'work',ph:t,f:1,coat:'#f3f7fc',shirt:'#f4a7b4',hs:'bun',hair:'#3a2c2a',skin:PAL.skin[1]}));
  {const w=R_LAB(PM(t,R_LAB.T));add(w.x+w.y,isoPersonZ(w.x,w.y,z,{pose:w.pose,ph:w.ph,f:w.f,coat:'#f3f7fc',shirt:'#b7aaf0',hair:'#5b3d2b',skin:PAL.skin[3],item:'tube'}))}}
 // --- Ambulance (10,5)
 {const z=Z(5);const q=(t/12)%1;let ax,al=1;if(q<.33){ax=L(11.6,10.5,EOs(q/.33));al=C01(q/.08)}else if(q<.75)ax=10.5;else{ax=L(10.5,11.6,Math.pow((q-.75)/.25,2));al=1-C01((q-.92)/.08)}
  const fl=q<.4&&Math.sin(t*12)>0;add(ax+6.25+1.1,`<g opacity="${al.toFixed(3)}">${isoAmbulanceVan(ax,6.25,z,fl)}</g>`);
  add(13.3+7.9,isoPersonZ(13.3,7.9,z,{pose:'talk',ph:t,f:-1,outfit:'scrubs',top:'#7cc7c0',hs:'cap',hair:'#2b2b33',skin:PAL.skin[2],badge:1}))}
 const out=a=>a.sort((a,b)=>a[0]-b[0]).map(i=>i[1]).join('');return[out(B),out(F)]}
function isoDynamic(t,hov){return isoPeople(t,hov).join('')}

// ---------- page ----------
const kpi=(l,v,c,ic,sub='')=>`<div class="kc" style="background:${COL[c][0]}"><div class="kl"><span style="width:18px;height:18px;display:inline-block">${IC(I[ic]||ic,'#263e45')}</span>${l}</div><b>${v}</b>${sub?`<small>${sub}</small>`:''}</div>`;
const tabs=(a,on)=>`<div class="et">${a.map((x,i)=>`<span class="${i==on?'on':''}">${x}</span>`).join('')}</div>`;
const sbHTML=pre=>`<div class="sbl"><span>${EKKO(30)}</span><div><b>Ekko</b><small>HOSPITAL ADMINISTRATION</small></div></div><div class="sbi on2" id="${pre}9"><span>${IC(I.adm,'#227568')}</span>In-House</div><div class="sbi box2"><span>${IC(I.clk,'#263e45')}</span><div><b style="font-weight:600">Clock in</b><small style="display:block;font-size:11px;color:#7d8f95">Start your shift</small></div></div><div class="sbh">WORKSPACE</div>${MODS2.slice(0,9).map((m,i)=>`<div class="sbi" id="${pre}${i}"><span>${IC(I[m[1]],'#263e45')}</span>${m[0]}</div>`).join('')}<div class="sbf"><span class="pill2">Your workspace</span><p>A little more organised.<br>A lot more care.</p></div>`;
const dataHTML=d=>d.map(([k,v])=>`<div style="border:1px solid var(--line);border-radius:14px;padding:9px 14px;background:#fbfcfe;display:flex;justify-content:space-between;align-items:center"><div style="font-size:12.5px;color:var(--mute);font-weight:600">${k}</div><div style="font:700 17px 'Plus Jakarta Sans'">${v}</div></div>`).join('');
const dataHTML4=d=>d.map(([k,v])=>`<div style="border:1px solid var(--line);border-radius:14px;padding:12px 16px;background:#fbfcfe"><div style="font-size:12.5px;color:var(--mute);font-weight:600">${k}</div><div style="font:700 21px 'Plus Jakarta Sans';margin-top:2px">${v}</div></div>`).join('');
const row=(cells,w)=>`<div class="tr" style="grid-template-columns:${w}">${cells.map(c=>`<span>${c}</span>`).join('')}</div>`;
const btnT=(x,id='')=>`<span class="bt" ${id?`id="${id}"`:''}>${x}</span>`;
function ekkoPage(k,lt,d,an){const D=Object.fromEntries(d||[]);const hd=(eb,ti,sub)=>`<div class="eb">${eb}</div><h3>${ti}</h3><p class="sub">${sub}</p>`;let h='';
 if(an){h=hd('HOSPITAL OPERATIONS','Finance','Income, expenses and cash flow across every department.')+tabs(['All departments','Outpatients','Beds','Pharmacy','Laboratory','Ambulance'],0)+`<div class="kg">${kpi('Income received','₹ 4,80,000','mint','fin','This month')+kpi('Expenses paid','₹ 2,10,000','peach','fin','This month')+kpi('Net cash flow','₹ 2,70,000','ice','fin','Income minus expenses')+kpi('Outstanding','₹ 36,500','lav','fin','All patient dues')}</div><div class="bx"><div style="display:flex;justify-content:space-between;align-items:center"><b>Income & expenses</b>${btnT('⇩ Export CSV','csv')}</div>${["Outpatients","Pharmacy","Laboratory","Ambulance · vehicle care"].map((n,i)=>row([n,['₹ 1,20,000','₹ 95,000','₹ 64,000','− ₹ 18,000'][i],`<span class="pl ${i==3?'pp':'pm'}">${i==3?'Expense':'Income'}</span>`],'1.4fr 1fr auto')).join('')}</div>`;return h}
 if(k==0)h=hd('YOUR HOSPITAL, AT A GLANCE','Dashboard',"Welcome back. Here's how today is looking.")+`<div class="kg">${kpi('Doctors available','4','mint','op','6 doctors in your team')+kpi('Beds available','6','ice','bed','14 occupied · 20 total')+kpi('OP remaining',String(Math.max(3,9-Math.floor(lt/2))),'peach','op','Patients waiting')+kpi('Pending tickets','2','lav','mt','Being handled')}</div><div class="bx"><div style="display:flex;justify-content:space-between"><b>Doctors on duty</b><span style="color:#227568">+</span></div>${[['Dr. Ananya Rao','General Medicine'],['Dr. Vikram Mehta','Paediatrics'],['Dr. Kavya Iyer','Orthopaedics']].map(([n,dep],i)=>row([`<span class="av">${IC(I.op,'#227568')}</span><span><b style="color:#227568">${n}</b><small>${dep}</small></span>`,`<span class="tg2 ${i<2?'on':''}"><i></i></span>`],'1fr auto')).join('')}</div><div class="bx" style="background:#e7f1fb;border:none"><small style="letter-spacing:.14em;color:#5c7a76;font-size:11px">TEAM CONNECT · UP NEXT</small><b style="display:block;margin-top:4px">Room for a team moment</b><small>Plan your next team huddle in In-House.</small></div>`;
 if(k==1){const ns=D['Now serving']||'A-104';const n=+ns.slice(2);h=hd('HOSPITAL OPERATIONS','Outpatients','A simple, organised journey from arrival to consultation.')+tabs(['Patients','Files','Analysis'],0)+`<div class="bx">${row(['TOKEN','PATIENT','STATUS',''],'70px 1fr 100px 96px').replace('class="tr"','class="tr th"')}${[n,n+1,n+2,n+3].map((x,i)=>row([`<b>${tok(x)}</b>`,`${PTS[x%PTS.length][0]}<small>Age ${PTS[x%PTS.length][1]}</small>`,`<span class="pl ${i==0?'pb':'pp'}">${i==0?'With doctor':'Waiting'}</span>`,i==0?btnT('✓ Done'):''],'70px 1fr 100px 96px')).join('')}</div><div class="bx" style="display:flex;justify-content:space-between;align-items:center"><span><b>Saved visit files</b><small>Completed consultations are stored in Files</small></span><span class="pl pm">${n-100} today</span></div>`}
 if(k==2){const oc=D['Bed A-03']=='Occupied';h=hd('HOSPITAL OPERATIONS','Beds','Every room, every patient, all in one place.')+tabs(['Overview','Discharge files'],0)+`<div class="kg">${kpi('Occupied',oc?'5':'4','ice','bed','General ward A')+kpi('Available',oc?'1':'2','mint','bed','Ready to allocate')}</div><div class="bx"><b>Available beds</b>${row(['ROOM / BED','TYPE',''],'1fr 1fr auto').replace('class="tr"','class="tr th"')}${(oc?['A-05']:['A-03','A-05']).map(b=>row([b,'General ward',btnT('Allocate bed')],'1fr 1fr auto')).join('')}</div><div class="bx"><b>Discharge files</b>${row(['Lakshmi Menon','<span class="pl pm">Paid</span>'],'1fr auto')+row(['Imran Shaikh','<span class="pl pp">Due ₹ 4,200</span>'],'1fr auto')}</div>`}
 if(k==3){const dn=D['CBC · Rahul Verma']=='Done';h=hd('HOSPITAL OPERATIONS','Laboratory',"Find tests, record today's work and keep every daily report.")+tabs(['Pending tests','Outpatient','Inpatient','Daily reports','Payments','Test catalogue'],0)+`<div class="bx"><div style="display:flex;justify-content:space-between"><b>Pending tests · all patients</b><span class="pl pb">Today</span></div>${row(['PATIENT','TEST','FROM','STATUS'],'1.2fr 1fr 50px 80px').replace('class="tr"','class="tr th"')}${[['Rahul Verma','CBC','OP',dn],['Anita Desai','Lipid profile','IP',0],['Mohan Das','Blood sugar','OP',0]].map(r=>row([r[0],r[1],r[2],`<span class="pl ${r[3]?'pm':'pp'}">${r[3]?'Done':'Pending'}</span>`],'1.2fr 1fr 50px 80px')).join('')}</div><div class="bx"><b>Test catalogue</b>${['CBC','Lipid profile'].map((x,i)=>row([x,['₹ 350','₹ 600'][i],'🔒 Admin'],'1fr 1fr auto')).join('')}<small>Prices are locked and set by an administrator.</small></div>`}
 if(k==4){const ar=D['Delivery']=='Arrived';h=hd('HOSPITAL OPERATIONS','Pharmacy','Vendors, orders and sales, kept simple.')+tabs(['Vendors list','Order summary','Pharmacy sales','Report a problem'],1)+`<div class="kg">${kpi('Shelf B stock',D['Shelf B stock']||'65%','lav','ph','Antibiotics')+kpi('Reorder',D['Reorder']||'—','peach','ph','Raised when stock runs low')}</div><div class="bx"><b>Order summary · GRNs</b>${row(['GRN-1118','MedSupply Co.',`<span class="pl ${ar?'pm':'pb'}">${ar?'Received':'Ordered'}</span>`],'1.2fr 1fr auto')+row(['GRN-1117','Apex Pharma','<span class="pl pm">Received</span>'],'1.2fr 1fr auto')}</div><div class="bx" style="display:flex;justify-content:space-between;align-items:center"><span><b>Pharmacy sales</b><small>Today</small></span><b style="font:700 22px 'Plus Jakarta Sans'">₹ 18,450</b></div>`}
 if(k==5){const pd=D['Status']=='Paid';h=hd('HOSPITAL OPERATIONS','Finance','See every department and keep cash flow clear.')+tabs(['All departments','Outpatients','Beds','Pharmacy','Laboratory'],0)+`<div class="kg">${kpi('Income received','₹ 4,80,000','mint','fin','This month')+kpi('Expenses paid','₹ 2,10,000','peach','fin','This month')+kpi('Net cash flow','₹ 2,70,000','ice','fin','Income minus expenses')+kpi('Outstanding',pd?'₹ 32,300':'₹ 36,500','lav','fin','All patient dues')}</div><div class="bx"><div style="display:flex;justify-content:space-between;align-items:center"><b>Latest entries</b>${btnT('⇩ Export CSV')}</div>${row([D['Invoices printed']?'INV-'+(1000+ +D['Invoices printed']):'INV-1041',`<span class="pl ${pd?'pm':'pp'}">${pd?'Paid':'Pending'}</span>`],'1fr auto')+row(['Vehicle care · ambulance','<span class="pl pp">Expense</span>'],'1fr auto')}</div>`}
 if(k==6){const st=D['Status'];h=hd('HOSPITAL OPERATIONS','Maintenance','Raise an issue, assign it and see it through.')+tabs(['General maintenance','Resolved files'],0)+`<div class="kg">${kpi('Open tickets',st=='Closed'?'1':'2','peach','mt','Needs attention')+kpi('Resolved',st=='Closed'?'8':'7','mint','mt','This month')}</div><div class="bx"><b>Tickets</b>${row(['TCK-1031','Light flickering',`<span class="pl ${st=='Closed'?'pm':st=='Open'?'pp':'pb'}">${st}</span>`],'1.2fr 1fr auto')+row(['TCK-1029','Door hinge','<span class="pl pp">Open</span>'],'1.2fr 1fr auto')}</div>`}
 if(k==7){h=hd('HOSPITAL OPERATIONS','Ambulance','Available vehicles, drivers and trips. Simple updates for everyone.')+tabs(['Overview','Drivers','Trips','Vehicle care'],0)+`<div class="kg">${kpi('Ambulances ready',D['Ambulances ready'],'mint','amb')+kpi('Drivers available',D['Drivers available'],'ice','adm')+kpi('Active trips',D['Active trips'],'peach','amb')+kpi('Vehicles under repair','0','lav','mt')}</div><div style="display:flex;gap:10px;margin:4px 0 12px">${btnT('+ Assign trip','asg').replace('class="bt"','class="bt dk"')}${btnT('+ Add ambulance')}</div><div class="bx"><b>Vehicle care</b>${row(['Service · Ambulance 2','₹ 4,800','<span class="pl pp">→ Finance</span>'],'1.3fr 1fr auto')}<small>Vehicle care costs feed straight into Finance.</small></div>`}
 if(k==8){const n=+D['Sections unlocked']||0;h=hd('HOSPITAL OPERATIONS','Administration','Your team, their details and the access they need.')+`<div class="kg">${kpi('Add new staff','+','mint','adm','Enter details, then choose access')+kpi('Staff information','3','ice','adm','Active staff')}</div><div class="bx"><b>Section access · Meera Nair</b><div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px">${['Outpatients','Pharmacy','Finance','Beds','Laboratory','Ambulance'].map((x,i)=>`<span class="pl ${i<n/1.7?'pm':''}" style="${i<n/1.7?'':'background:#f1f3f6;color:#8a9ab0'}">${i<n/1.7?'✓':'🔒'} ${x}</span>`).join('')}</div></div><div class="bx" style="background:#f3f8fd;border:none"><small>Only staff with Administration access can manage this page. Permissions apply throughout the portal.</small></div>`}
 if(k==9){const m=D['Next meeting']!='—',ci=D['Clock-in']=='Shift started';h=hd('HOSPITAL OPERATIONS','In-House','One team. Shared moments, updates and plans.')+tabs(['Team calendar','Team news'],lt>3.2?1:0)+`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><b>Make time for the team</b>${btnT('+ Add meeting').replace('class="bt"','class="bt dk"')}</div><div class="bx">${m?row(['<b>Team huddle</b><small>Thu · 10:00</small>','<span class="pl pm">Scheduled</span>'],'1fr auto'):'<small>No meetings yet.</small>'}${lt>3.2?row(['<b>New update</b><small>Fire drill on Friday</small>','<span class="pl pv">News</span>'],'1fr auto'):''}</div><div class="bx" style="display:flex;justify-content:space-between;align-items:center;background:${ci?'#e5f2eb':'#fff'}"><span><b>Clock in</b><small>${ci?'Shift started · 08:00':'Start your shift'}</small></span><span class="pl ${ci?'pm':'pb'}">${ci?'✓ Clocked in':'Clock in'}</span></div>`}
 return h}
function analytics(dt){const p=EO(cl(dt/1.4));const n=20;const rv=[...Array(n)].map((_,i)=>180-i*5-26*Math.sin(i*.6)),ex=[...Array(n)].map((_,i)=>250-i*2.4-12*Math.sin(i*.5+1));const k=Math.max(2,Math.round(n*p));const pth=a=>a.slice(0,k).map((y,i)=>(i?'L':'M')+i*34+','+y).join('');
 return`<div style="display:grid;grid-template-rows:1.25fr 1fr;gap:12px;height:100%;padding:4px"><div style="border:1px solid var(--line);border-radius:18px;padding:16px 18px"><div style="display:flex;gap:16px;font-size:13.5px;color:var(--ink2)"><b style="color:var(--ink)">Income vs expenses</b><span style="color:#227568">● Income</span><span style="color:#c0703a">● Expenses</span><span class="badge" style="margin-left:auto">This year</span></div><svg viewBox="0 0 650 300" preserveAspectRatio="none" style="width:100%;height:210px;margin-top:6px">${[60,130,200,270].map(y=>`<line x1="0" x2="650" y1="${y}" y2="${y}" stroke="#eef2f7"/>`).join('')}<defs><linearGradient id="ag" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#7cc7c0" stop-opacity=".45"/><stop offset="1" stop-color="#7cc7c0" stop-opacity="0"/></linearGradient></defs><path d="${pth(rv)}L${(k-1)*34},300L0,300Z" fill="url(#ag)"/><path d="${pth(rv)}" fill="none" stroke="#227568" stroke-width="3.5"/><path d="${pth(ex)}" fill="none" stroke="#e9a77a" stroke-width="3" stroke-dasharray="7 6"/></svg></div>
 <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:12px"><div style="border:1px solid var(--line);border-radius:18px;padding:16px"><b style="font-size:13.5px">Cash flow by department</b><div style="display:flex;align-items:flex-end;gap:10px;height:120px;margin-top:10px">${[.5,.75,.6,.9,.7,.82].map((b,i)=>`<i style="flex:1;height:${b*100*EO(cl((dt-i*.08)/.9))}%;border-radius:8px 8px 3px 3px;background:${['#7cc7c0','#7fb8e4','#b7aaf0','#f2bf9c'][i%4]}"></i>`).join('')}</div></div><div style="border:1px solid var(--line);border-radius:18px;padding:16px;display:flex;gap:14px;align-items:center"><svg viewBox="0 0 100 100" width="110" height="110"><circle cx="50" cy="50" r="38" fill="none" stroke="#eef2f7" stroke-width="12"/><circle cx="50" cy="50" r="38" fill="none" stroke="#227568" stroke-width="12" stroke-linecap="round" stroke-dasharray="239" stroke-dashoffset="${239*(1-.56*p)}" transform="rotate(-90 50 50)"/></svg><div><b style="font-size:15px">Net share</b><div style="color:var(--mute);font-size:13px">of income kept after expenses</div></div></div></div></div>`}
function gsvg(t){let s='';["Outpatients","Pharmacy","Laboratory","Finance"].forEach((r,i)=>{const x=60+i*160;s+=`<rect x="${x-56}" y="150" width="112" height="70" rx="14" fill="#fff" stroke="#e4eaf2"/><text x="${x}" y="190" text-anchor="middle" font-family="Inter" font-weight="700" font-size="12" fill="#227568">${r}</text>`});s+=`<path d="M60,150 C60,80 540,80 540,150" fill="none" stroke="#7cc7c0" stroke-width="2" stroke-dasharray="6 6" stroke-dashoffset="${-t*30}"/>`;const q=(t*.3)%1;s+=`<circle cx="${60+480*q}" cy="${150-Math.sin(q*Math.PI)*52}" r="8" fill="#227568"/>`;return s}
function soonTiles(t,hv){return[0,1,2].map(i=>`<div style="height:84px;border-radius:18px;background:#ffffffcc;border:1px dashed #cfc6ee;display:flex;align-items:center;gap:16px;padding:0 20px;transform:translateY(${Math.sin(t*1.2+i)*3-hv*i*4}px)"><span style="width:44px;height:44px;border-radius:13px;background:${['#eeebfa','#fff0e3','#e7f1fb'][i]};display:grid;place-items:center;font:700 20px Inter;color:#a99de0">?</span><span style="flex:1"><i style="display:block;height:10px;width:${60-i*10}%;border-radius:5px;background:#ece8fb"></i><i style="display:block;height:8px;width:${40+i*8}%;border-radius:4px;background:#f3f0fb;margin-top:10px"></i></span><span class="pl pv">Coming later</span></div>`).join('')}

// How-it-works stage vignettes (viewBox 0 0 640 400). lt = seconds since the step became active.
const HOW_BG=['#eef7f2','#f3f1fc','#edf4fb','#fdf4ec'];
function cursorAt(x,y,press){return`<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${press?0.9:1})"><path d="M0,0 L0,26 L7,20 L12,31 L17,29 L12,18 L21,18Z" fill="#13294b" stroke="#fff" stroke-width="2" stroke-linejoin="round"/></g>`}
function howStage(i,lt){let s=`<rect x="0" y="0" width="640" height="400" fill="${HOW_BG[i]}"/>`;
 const fl=k=>Math.sin(lt*1.4+k)*3;
 if(i==0){
  const pick=EOs(C01((lt-1.2)/.6));
  [0,1,2].forEach(k=>{const x=96+k*160,lift=k==0?pick*18:0,y=125-lift+(k==0?fl(0)*pick:fl(k)*.6);
   s+=`<g transform="translate(${x},${y.toFixed(1)})"><rect width="132" height="170" rx="22" fill="${k==0?'#ffffff':'#f8f7fd'}" stroke="${k==0?(pick>.5?'#227568':'#d7e8e2'):'#d9d2f2'}" stroke-width="${k==0?2.5:1.5}" ${k?'stroke-dasharray="6 6"':''}/>`+
   (k==0?`<g transform="translate(66,66)">${EKKO(64).replace('<svg ','<svg x="-32" y="-32" ')}</g><text x="66" y="136" text-anchor="middle" font-family="Plus Jakarta Sans" font-weight="800" font-size="20" fill="#1f4f47">Ekko</text><text x="66" y="156" text-anchor="middle" font-family="Inter" font-size="11" fill="#5c7a76">Hospital admin</text>`
   :`<text x="66" y="92" text-anchor="middle" font-family="Inter" font-weight="700" font-size="34" fill="#cfc6ee">?</text><text x="66" y="136" text-anchor="middle" font-family="Inter" font-size="13" fill="#a99de0">Coming later</text>`)+`</g>`});
  const ck=C01((lt-1.5)*3);if(ck>0)s+=`<g transform="translate(222,${(111-pick*18+fl(0)*pick).toFixed(1)}) scale(${EOs(ck).toFixed(3)})"><circle r="18" fill="#227568"/><path d="M-7,0 l5,5 l10,-11" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/></g>`;
  const m=EOs(C01(lt/1.1)),cx=mix(520,170,m),cy=mix(355,215,m);if(lt<3)s+=`<g opacity="${(1-C01((lt-2.2)/.8)).toFixed(3)}">${cursorAt(cx,cy,lt>1.1&&lt<1.35)}</g>`;
  s+=`<text x="320" y="352" text-anchor="middle" font-family="Inter" font-weight="600" font-size="15" fill="#5c7a76" opacity="${C01((lt-1.8)*2).toFixed(3)}">Ekko selected</text>`}
 if(i==1){const P3=[["Meera Nair","Nurse","#7cc7c0","MN"],["Arjun Patel","Pharmacist","#9fd6bd","AP"],["Sneha Reddy","Accounts","#b7aaf0","SR"]],SEC=["Beds","Pharmacy","Finance"];
  s+=`<text x="60" y="66" font-family="Inter" font-weight="700" font-size="13" letter-spacing="2" fill="#6a5bc4">YOUR TEAM</text>`;
  P3.forEach(([n,r,c,ini],k)=>{const a=EOs(C01((lt-.2-k*.35)/.7));const y=88+k*84;
   s+=`<g transform="translate(${(60-(1-a)*40).toFixed(1)},${y})" opacity="${a.toFixed(3)}"><rect width="520" height="70" rx="18" fill="#fff" stroke="#e3ddf7"/><circle cx="38" cy="35" r="20" fill="${c}"/><text x="38" y="40" text-anchor="middle" font-family="Inter" font-weight="800" font-size="13" fill="#fff">${ini}</text><text x="72" y="31" font-family="Inter" font-weight="700" font-size="16" fill="#13294b">${n}</text><text x="72" y="50" font-family="Inter" font-size="13" fill="#8a9ab0">${r}</text>`+
   SEC.map((sec,j)=>{const on=(j+k)%3!=2,u=on?EOs(C01((lt-1.3-k*.35-j*.22)/.35)):0;return`<g transform="translate(${248+j*88},21)"><rect width="80" height="28" rx="14" fill="${u>.5?'#e5f2eb':'#f1f3f6'}"/><text x="40" y="19" text-anchor="middle" font-size="12" font-family="Inter" font-weight="700" fill="${u>.5?'#227568':'#a3adbd'}">${u>.5?'✓ ':''}${sec}</text></g>`}).join('')+`</g>`});
  const toast=EOs(C01((lt-3.2)/.5));if(toast>0)s+=`<g transform="translate(320,${(360+(1-toast)*20).toFixed(1)})" opacity="${toast.toFixed(3)}"><rect x="-110" y="-20" width="220" height="38" rx="19" fill="#13294b"/><text x="0" y="5" text-anchor="middle" font-family="Inter" font-weight="700" font-size="14" fill="#fff">✓ 3 invites sent</text></g>`}
 if(i==2){const n=104+Math.floor(lt/1.8);
  s+=`<rect x="0" y="320" width="640" height="80" rx="0" fill="#ffffff" opacity=".7"/><rect x="40" y="40" width="250" height="120" rx="16" fill="#13294b"/><rect x="48" y="48" width="234" height="104" rx="11" fill="#fff"/><text x="66" y="78" font-family="Inter" font-size="12" font-weight="700" fill="#8a9ab0" letter-spacing="2">NOW SERVING</text><text x="66" y="128" font-family="Plus Jakarta Sans" font-weight="800" font-size="44" fill="#13294b">${tok(n)}</text><text x="262" y="128" text-anchor="end" font-family="Inter" font-size="13" font-weight="600" fill="#2f8a63">Room 2</text>`;
  const q=(lt%3.6)/3.6;s+=person({x:mix(40,200,EOs(C01(q*1.5))),y:330,s:.95,pose:q<.66?'walk':'stand',ph:lt*7,shirt:'#7fb8e4',hs:'short'})+person({x:262,y:330,s:.95,pose:'read',ph:lt,coat:'#f3f7fc',shirt:'#b7aaf0',item:'clip',hs:'bun',f:-1});
  const EV=[["#3c6a9a",'Token A-105 → Room 2'],["#2f8a63",'Bed A-03 allocated'],["#227568",'CBC done · Rahul Verma'],["#c0703a",'Trip TRIP-1207 logged'],["#6a5bc4",'GRN-1118 received']];
  const step=1.3,cnt=Math.floor(lt/step),pr=EOs(C01((lt%step)/.5));
  s+=`<text x="330" y="58" font-family="Inter" font-weight="700" font-size="13" letter-spacing="2" fill="#3c6a9a">LIVE ACROSS THE HOSPITAL</text>`;
  for(let k=0;k<4;k++){const idx=cnt-k;if(idx<0)continue;const e=EV[idx%EV.length];const ty=k==0?74-(1-pr)*22:74+(k-1+pr)*62;const op=k==0?pr:k==3?1-pr:1-k*.12;
   s+=`<g transform="translate(330,${ty.toFixed(1)})" opacity="${Math.max(0,op).toFixed(3)}"><rect width="270" height="50" rx="14" fill="#fff" stroke="#d5e0ec"/><circle cx="26" cy="25" r="6" fill="${e[0]}"/><text x="48" y="31" font-family="Inter" font-weight="600" font-size="14" fill="#13294b">${e[1]}</text></g>`}}
 if(i==3){const bars=[.42,.56,.5,.7,.64,.88];
  s+=`<rect x="40" y="40" width="360" height="300" rx="20" fill="#fff" stroke="#f0dfd0"/><text x="64" y="76" font-family="Inter" font-weight="700" font-size="14" fill="#13294b">Income vs expenses</text>`;
  [140,200,260].forEach(y=>s+=`<line x1="64" x2="376" y1="${y}" y2="${y}" stroke="#f1f3f6"/>`);
  bars.forEach((b,k)=>{const g=EOs(C01((lt-.2-k*.1)/.8));const br=k==5?1+Math.sin(lt*1.6)*.02*C01(lt-1.5):1;const h=190*b*g*br;s+=`<rect x="${74+k*50}" y="${(310-h).toFixed(1)}" width="32" height="${h.toFixed(1)}" rx="8" fill="${['#7cc7c0','#7fb8e4','#b7aaf0','#f2bf9c'][k%4]}"/>`});
  const lp=[...Array(7)].map((_,k)=>[74+k*50,250-k*18-Math.sin(k*1.3)*12]);const dr=EOs(C01((lt-.6)/1.4));const nseg=dr*(lp.length-1);let d='';for(let k=0;k<=Math.floor(nseg)&&k<lp.length;k++)d+=(k?'L':'M')+lp[k][0]+','+lp[k][1].toFixed(1);const fk=Math.floor(nseg),fr=nseg-fk;if(fk<lp.length-1){const a=lp[fk],b=lp[fk+1];d+='L'+mix(a[0],b[0],fr).toFixed(1)+','+mix(a[1],b[1],fr).toFixed(1)}
  s+=`<path d="${d}" fill="none" stroke="#c0703a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
  if(dr>=1){const q=(lt*.25)%1,pp=q*(lp.length-1),k=Math.min(lp.length-2,Math.floor(pp)),f=pp-k;s+=`<circle cx="${mix(lp[k][0],lp[k+1][0],f).toFixed(1)}" cy="${mix(lp[k][1],lp[k+1][1],f).toFixed(1)}" r="6" fill="#fff" stroke="#c0703a" stroke-width="3"/>`}
  const c=Math.round(270000*EOs(C01((lt-.3)/1.6)));
  s+=`<g transform="translate(424,60)"><rect width="176" height="96" rx="18" fill="#fff" stroke="#d7e8e2"/><text x="20" y="34" font-family="Inter" font-size="11" font-weight="700" letter-spacing="1.5" fill="#5c7a76">NET CASH FLOW</text><text x="20" y="72" font-family="Plus Jakarta Sans" font-weight="800" font-size="26" fill="#227568">₹ ${c.toLocaleString('en-IN')}</text></g>`;
  const dn=EOs(C01((lt-1)/1));s+=`<g transform="translate(424,176)"><rect width="176" height="164" rx="18" fill="#fff" stroke="#f0dfd0"/><circle cx="88" cy="78" r="44" fill="none" stroke="#f1f3f6" stroke-width="14"/><circle cx="88" cy="78" r="44" fill="none" stroke="#227568" stroke-width="14" stroke-linecap="round" stroke-dasharray="276.5" stroke-dashoffset="${(276.5*(1-.56*dn)).toFixed(1)}" transform="rotate(-90 88 78)"/><text x="88" y="85" text-anchor="middle" font-family="Plus Jakarta Sans" font-weight="800" font-size="20" fill="#13294b">${Math.round(56*dn)}%</text><text x="88" y="146" text-anchor="middle" font-family="Inter" font-size="12" fill="#8a9ab0">Income kept</text></g>`}
 return s}
resolveScenes();
window.howStage=howStage;window.resolveScenes=resolveScenes;window.FAQ=FAQ;window.isoStatic=isoStatic;window.isoUI=isoUI;window.isoDynamic=isoDynamic;window.isoPeople=isoPeople;window.isoStaticFront=isoStaticFront;window.ROOM_TO_MOD=ROOM_TO_MOD;window.ROOMS=ROOMS;window.ekkoPage=ekkoPage;window.analytics=analytics;window.soonTiles=soonTiles;window.dataHTML=dataHTML;window.dataHTML4=typeof dataHTML4!=="undefined"?dataHTML4:dataHTML;window.EKKO=EKKO;window.IC=IC;window.I=I;window.MODS2=MODS2;window.COL=COL;window.sbHTML=sbHTML;
