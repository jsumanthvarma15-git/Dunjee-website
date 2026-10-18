const D2R=Math.PI/180;
const PAL={skin:['#f1c4a3','#d79f7b','#b07552','#f6d6c0','#8d5a3b'],hair:['#3a2c2a','#5b3d2b','#1f2a3d','#a0643a','#2b2b33','#c9a37a'],shirt:['#7fb8e4','#9fd6bd','#b7aaf0','#f2bf9c','#f4a7b4','#8fc7c9'],pants:['#33496e','#4a5a78','#5c6f8f','#2f3d57']};
function lp(x,y,a,l){return[x+Math.sin(a*D2R)*l,y+Math.cos(a*D2R)*l]}
function shade(c,k){if(c.startsWith('rgb')){const m=c.match(/\d+/g).map(Number);return`rgb(${m.map(v=>Math.min(255,Math.round(v*k))).join(',')})`}if(c.length==4)c='#'+c[1]+c[1]+c[2]+c[2]+c[3]+c[3];const n=parseInt(c.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;return`rgb(${Math.min(255,Math.round(r*k))},${Math.min(255,Math.round(g*k))},${Math.min(255,Math.round(b*k))})`}
function seg2(x,y,a1,l1,a2,l2,w1,w2,c){const k=lp(x,y,a1,l1),e=lp(k[0],k[1],a1+a2,l2);return{k,e,svg:`<path d="M${x},${y}L${k[0]},${k[1]}" stroke="${c}" stroke-width="${w1}" stroke-linecap="round"/><path d="M${k[0]},${k[1]}L${e[0]},${e[1]}" stroke="${c}" stroke-width="${w2}" stroke-linecap="round"/>`}}
// o:{x,y,s,f,ph,pose,skin,hair,hs(hairstyle),outfit:'coat'|'scrubs'|'overalls'|'casual'|'suit',top,bottom,item,alpha}
function person(o){const s=o.s||1,f=o.f||1,ph=o.ph||0,pose=o.pose||'stand';const sk=o.skin||PAL.skin[0],hr=o.hair||PAL.hair[0],hs=o.hs||'short';
 const V=!!o.v2;const outfit=o.outfit||(o.coat?'coat':'casual');let top=o.top||o.shirt||PAL.shirt[0],bot=o.bottom||o.pants||PAL.pants[0];
 if(outfit=='scrubs'){top=o.top||o.shirt||'#7cc7c0';bot=shade(top,.86)}if(outfit=='overalls'){bot=o.bottom||'#4f7fa8'}
 let hipY=V?-100:-90,lean=0,bob=0,Lg=[[3,0],[-3,0]],Ar=[[6,10],[-6,10]],sway=0;
 const walking=pose=='walk'||pose=='push'||pose=='carry';const TT=(typeof window!='undefined'&&window.__T)||0,sd=Math.abs(o.x*0.37+o.y*0.11)%7;const blink=((TT+sd)%3.9)<0.13;const look=walking?0:(o.look??Math.max(-1,Math.min(1,Math.sin(TT*.45+sd)*1.6)));const brth=walking?0:Math.sin(TT*1.7+sd)*.9;
 if(walking){const amp=V&&pose=='push'?17:25,kb=V&&pose=='push'?26:42;const a=Math.sin(ph)*amp;const k1=-Math.max(0,Math.sin(ph+1.9))*kb-4,k2=-Math.max(0,Math.sin(ph+1.9+Math.PI))*kb-4;Lg=[[a,k1],[-a,k2]];bob=-Math.abs(Math.sin(ph))*0-2.6*(1+Math.cos(2*ph))/2;
  Ar=pose=='push'?[[66,-14],[62,-12]]:pose=='carry'?[[48,-60],[44,-58]]:[[-a*.85,12+8*Math.sin(ph)],[a*.85,12-8*Math.sin(ph)]];lean=pose=='push'?7:2+Math.sin(2*ph)*.8;sway=Math.sin(ph)*1.6}
 else if(pose=='sit'){hipY=-58;Lg=[[86,-86],[82,-84]];Ar=[[28+Math.sin(ph*1.3)*3,52],[20,50]]}
 else if(pose=='hold'){Ar=[[66,-14],[62,-12]];lean=4;Lg=[[8,0],[-6,0]]}
 else if(pose=='reach'){Ar=[[158+Math.sin(ph*2)*7,12],[10,22]];sway=Math.sin(ph)*.8}
 else if(pose=='work'){Ar=[[58+Math.sin(ph*3)*12,40],[52+Math.cos(ph*3)*12,42]];lean=4}
 else if(pose=='kneel'){hipY=-52;Lg=[[84,-86],[-26,-64]];Ar=[[72+Math.sin(ph*4)*20,-28],[38,42]];lean=8}
 else if(pose=='read'){Ar=[[34,118],[-4,12]];sway=Math.sin(ph*.5)*.4}
 else if(pose=='talk'){Ar=[[18+Math.sin(ph*1.7)*14,48+Math.sin(ph*2.3)*10],[-4,10]];sway=Math.sin(ph*.7)*1}
 else{Ar=[[5+Math.sin(ph*.8)*2,10],[-5,10]];sway=Math.sin(ph*.6)*.6}
 const shY=hipY-(V?60:56)-brth*.6,hy=shY-27-brth*.3;
 let out=`<g transform="translate(${o.x},${o.y}) scale(${s*f},${s})" opacity="${o.alpha??1}">`;
 const shw=walking?1-.08*(1+Math.cos(2*ph))/2:1;out+=`<ellipse cx="${lean}" cy="2" rx="${(pose=='sit'?36:27)*shw}" ry="6" fill="#13294b" opacity=".13"/><ellipse cx="${lean}" cy="2" rx="${14*shw}" ry="3" fill="#13294b" opacity=".1"/>`;
 out+=`<g transform="translate(${walking?Math.sin(ph)*1.2:0},${bob}) rotate(${lean} 0 ${hipY})">`;
 const shin=pose=='sit'?(V?54:38):(V?49:42),thigh=V?50:44;
 const leg=(L,c)=>{const r=seg2(0,hipY,L[0],thigh,L[1],shin,V?15:16,V?12:13,c);const ang=(L[0]+L[1])*D2R;return r.svg+`<path d="M${r.e[0]-4},${r.e[1]-3} q8,-3 16,2 q2,4 -2,6 h-16 q-3,-3 2,-8z" fill="#2a3346" transform="rotate(${pose=='kneel'&&L==Lg[1]?-60:0} ${r.e[0]} ${r.e[1]})"/>`};
 out+=leg(Lg[1],shade(bot,.8));out+=leg(Lg[0],bot);
 const arm=(A,c,sx,front)=>{const r=seg2(sx,shY+7,A[0],V?34:30,A[1],V?31:28,V?11:12,V?9.5:10,c);return{r,svg:r.svg+`<circle cx="${r.e[0]}" cy="${r.e[1]}" r="5.6" fill="${front?sk:shade(sk,.9)}"/>`}};
 const ab=arm(Ar[1],shade(outfit=='coat'?'#eef3f9':top,.85),5,false);out+=ab.svg;
 // torso
 const tw=V?16.5:18,th=`M${-tw},${shY+3} Q${-tw-2},${hipY+2} ${-tw+3},${hipY+8} L${tw-3},${hipY+8} Q${tw+2},${hipY+2} ${tw},${shY+3} Q${tw-2},${shY-6} 0,${shY-7} Q${-tw+2},${shY-6} ${-tw},${shY+3}Z`;
 if(outfit=='overalls'){out+=`<path d="${th}" fill="${top}"/><path d="M${-tw+4},${shY+18} L${tw-4},${shY+18} L${tw-2},${hipY+8} L${-tw+2},${hipY+8}Z" fill="${bot}"/><path d="M${-tw+6},${shY+18} L${-tw+8},${shY-2} M${tw-6},${shY+18} L${tw-8},${shY-2}" stroke="${bot}" stroke-width="4"/><rect x="-7" y="${shY+24}" width="14" height="10" rx="2" fill="${shade(bot,.85)}"/>`}
 else if(outfit=='scrubs'){out+=`<path d="${th}" fill="${top}"/><path d="M-8,${shY-5} L0,${shY+10} L8,${shY-5}" fill="${shade(sk,.92)}"/><path d="M-8,${shY-5} L0,${shY+10} L8,${shY-5}" fill="none" stroke="${shade(top,.8)}" stroke-width="2"/><rect x="5" y="${shY+22}" width="10" height="8" rx="2" fill="${shade(top,.88)}"/>`}
 else if(outfit=='suit'){out+=`<path d="${th}" fill="${top}"/><path d="M-6,${shY-5} L0,${shY+16} L6,${shY-5}Z" fill="#ffffff"/><path d="M0,${shY+2} L-2,${shY+20} L0,${shY+24} L2,${shY+20}Z" fill="#227568"/>`}
 else{out+=`<path d="${th}" fill="${top}"/>`}
 out+=`<path d="M${-tw},${shY+3} Q${-tw-2},${hipY+2} ${-tw+3},${hipY+8} L-6,${hipY+8} Q-10,${shY+20} -8,${shY-5} Q${-tw+2},${shY-6} ${-tw},${shY+3}Z" fill="#13294b" opacity=".08"/>`;
 if(outfit=='coat'){const hem=walking?Math.sin(ph)*6:0;out+=`<path d="M${-tw-1},${shY+2} Q${-tw-3},${hipY} ${-tw-4+hem*.5},${hipY+40} L${-2+hem},${hipY+42} L0,${shY+14} L${2},${hipY+42} L${tw+4+hem},${hipY+40} Q${tw+3},${hipY} ${tw+1},${shY+2} Q${tw-2},${shY-6} 0,${shY-7} Q${-tw+2},${shY-6} ${-tw-1},${shY+2}Z" fill="#f7fafd" stroke="#d3dee9" stroke-width="1.5"/><path d="M-7,${shY-5} L0,${shY+14} L7,${shY-5}" fill="${top}" stroke="#d3dee9" stroke-width="1.2"/><path d="M-7,${shY-4} L-3,${shY+12} M7,${shY-4} L3,${shY+12}" stroke="#d3dee9" stroke-width="1.5"/><rect x="${tw-12}" y="${hipY-4}" width="10" height="10" rx="2" fill="none" stroke="#d3dee9"/><path d="M-6,${shY-3} q-6,18 2,26 q5,4 8,-2" fill="none" stroke="#7d8ca3" stroke-width="2"/><circle cx="4" cy="${shY+22}" r="3" fill="#7fb8e4"/>`}
 if(o.badge)out+=`<rect x="6" y="${shY+12}" width="9" height="6" rx="1.5" fill="#ffffff" stroke="#227568" stroke-width="1"/>`;
 // neck/head
 if(V)out+=`<g transform="translate(0,${shY-4}) scale(.84) translate(0,${-(shY-4)})">`;
 out+=`<rect x="-5.5" y="${shY-14}" width="11" height="11" rx="4" fill="${shade(sk,.88)}"/>`;
 const hx=sway*.4;out+=`<g transform="translate(${hx},0)">`;
 if(hs=='long')out+=`<path d="M-15,${hy-4} Q-20,${hy+22} -10,${hy+30} L4,${hy+22} L-2,${hy-6}Z" fill="${shade(hr,.92)}"/>`;
 out+=`<ellipse cx="-11" cy="${hy+2}" rx="3.5" ry="4.5" fill="${shade(sk,.9)}"/><ellipse cx="1" cy="${hy}" rx="14.5" ry="16.5" fill="${sk}"/><path d="M-6,${hy+12} q8,6 18,0 q-4,6 -9,6 q-6,0 -9,-6z" fill="${shade(sk,.93)}"/>`;
 // face
 const lx=look*2.6,ey=blink?.2:1,dn=pose=='read'?2.5:0;out+=`<g transform="translate(${lx},${dn})"><ellipse cx="3" cy="${hy+1}" rx="1.7" ry="${2.1*ey}" fill="#2a3346"/><ellipse cx="10.5" cy="${hy+1}" rx="1.5" ry="${2*ey}" fill="#2a3346"/><path d="M1,${hy-4} q2.5,-1.5 5,0 M9,${hy-4} q2,-1.2 4,0" stroke="${shade(hr,.9)}" stroke-width="1.4" fill="none" stroke-linecap="round"/><path d="M8,${hy+3} q2.5,3 0,5" stroke="${shade(sk,.75)}" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M4,${hy+10} q3.5,2.6 7,0" stroke="#b5664f" stroke-width="1.5" fill="none" stroke-linecap="round"/><circle cx="12.5" cy="${hy+6}" r="2.6" fill="#f4a7b4" opacity=".35"/></g>`;
 // hair
 const hsw=sway;
 if(hs=='short')out+=`<path d="M-14,${hy+4} Q-17,${hy-18} 2,${hy-18.5} Q15,${hy-18} 15.5,${hy-5} Q10,${hy-11} 2,${hy-10} Q-5,${hy-9} -8,${hy-2} Q-10,${hy+2} -14,${hy+4}Z" fill="${hr}"/>`;
 if(hs=='bun')out+=`<circle cx="${-13+hsw*.3}" cy="${hy-12}" r="7" fill="${hr}"/><path d="M-14,${hy+6} Q-17,${hy-18} 2,${hy-18.5} Q15,${hy-18} 15.5,${hy-4} Q8,${hy-13} -2,${hy-9} Q-8,${hy-4} -14,${hy+6}Z" fill="${hr}"/>`;
 if(hs=='long')out+=`<path d="M-15,${hy+8} Q-18,${hy-19} 2,${hy-19} Q16,${hy-18} 16,${hy-3} Q9,${hy-13} 0,${hy-10} Q-8,${hy-5} -10,${hy+6}Z" fill="${hr}"/>`;
 if(hs=='cap')out+=`<path d="M-14,${hy+2} Q-16,${hy-18} 2,${hy-18} Q15,${hy-18} 15.5,${hy-6} Q6,${hy-9} -14,${hy+2}Z" fill="${hr}"/><path d="M-15,${hy-6} Q-14,${hy-22} 2,${hy-21} Q17,${hy-20} 16,${hy-8} Q2,${hy-13} -15,${hy-6}Z" fill="${o.capc||top}"/>`;
 if(hs=='bald')out+=`<path d="M-13,${hy+2} Q-15,${hy-6} -11,${hy-8}" stroke="${hr}" stroke-width="4" fill="none"/>`;
 out+=`</g>`;if(V)out+=`</g>`;
 // items
 const af=arm(Ar[0],outfit=='coat'?'#f3f7fc':outfit=='overalls'?top:top,-3,true);
 if(o.item=='clip')out+=`<g transform="translate(${af.r.e[0]-2},${af.r.e[1]-18}) rotate(${pose=='read'?-30:-8})"><rect width="16" height="21" rx="2" fill="#ffffff" stroke="#c9d6e6"/><rect x="5" y="-2" width="6" height="4" rx="1" fill="#8a97ab"/><path d="M3,7 h10 M3,11 h8 M3,15 h9" stroke="#d5e0ec"/></g>`;
 if(o.item=='box')out+=`<rect x="6" y="${shY+12}" width="28" height="22" rx="3" fill="#e9c79e" stroke="#c9a273"/><path d="M6,${shY+19} h28" stroke="#c9a273"/>`;
 if(o.item=='tube')out+=`<rect x="${af.r.e[0]-2}" y="${af.r.e[1]-16}" width="5" height="16" rx="2.5" fill="#f4a7b4" stroke="#c97a8a"/>`;
 out+=af.svg;
 if(o.item=='wrench')out+=`<path d="M${af.r.e[0]},${af.r.e[1]} l15,-10" stroke="#8a97ab" stroke-width="5" stroke-linecap="round"/><circle cx="${af.r.e[0]+16}" cy="${af.r.e[1]-11}" r="4" fill="none" stroke="#8a97ab" stroke-width="3"/>`;
 if(outfit=='coat'||outfit=='suit'){}
 if(o.coat&&outfit=='coat'){out+=`<path d="M-3,${shY+7} m0,0" />`}
 return out+'</g></g>'}
function walkAt(t,P,speedPh=6.4){for(let i=0;i<P.length-1;i++){const a=P[i],b=P[i+1];if(t<=b[0]){const raw=Math.max(0,Math.min(1,(t-a[0])/(b[0]-a[0])));const d=Math.hypot(b[1]-a[1],b[2]-a[2]);const mv=d>1;
  // ease in/out over first/last 0.35s
  const T=b[0]-a[0],e1=Math.min(.3,T/3)/T;let p=raw;if(mv){const v=1/(1-e1);p=raw<e1?v*raw*raw/(2*e1):raw>1-e1?1-v*(1-raw)*(1-raw)/(2*e1):v*(raw-e1/2)}
  const x=a[1]+(b[1]-a[1])*p,y=a[2]+(b[2]-a[2])*p;const dist=d*p;return{x,y,f:b[1]<a[1]?-1:(b[1]>a[1]?1:(a[3]||1)),ph:mv?dist/(14):t*speedPh,moving:mv&&raw>0&&raw<1}}}const z=P[P.length-1];return{x:z[1],y:z[2],f:z[3]||1,ph:t*speedPh,moving:false}}
