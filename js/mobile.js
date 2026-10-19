/* Phone-only enhancements (≤640px). Adds touch-friendly controls; desktop never sees them. */
(function(){
'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
// hero: a tap row of room chips under the map (opens the room sheet)
const stage=$('#hero-stage');
if(stage&&window.ROOMS){const row=document.createElement('div');row.className='room-chips';row.setAttribute('role','group');row.setAttribute('aria-label','Rooms');
 row.innerHTML=ROOMS.map((r,i)=>`<button type="button" data-i="${i}" style="--c:${r[4]}"><i></i>${r[0]}</button>`).join('');
 stage.insertAdjacentElement('afterend',row);
 const hint=document.createElement('p');hint.className='room-hint';hint.innerHTML='<span class="live"></span>Tap a room to step inside';stage.insertAdjacentElement('afterend',hint);
 row.addEventListener('click',e=>{const b=e.target.closest('button');if(b&&window.HeroRooms)HeroRooms.open(+b.dataset.i)})}
// every module: keep the chosen chip in view inside its own row (never moves the page)
const sb=$('#sbar');
const centre=(rowEl,el)=>{if(!rowEl||!el||rowEl.scrollWidth<=rowEl.clientWidth)return;const x=el.offsetLeft-rowEl.offsetLeft-(rowEl.clientWidth-el.offsetWidth)/2;rowEl.scrollTo({left:Math.max(0,x),behavior:'smooth'})};
if(sb)sb.addEventListener('click',e=>{const el=e.target.closest('.sbi');if(el)setTimeout(()=>centre(sb,el),0)});
// every module: one panel, switch between the live scene and the Ekko screen
const exp=$('.exp');
if(exp){const seg=document.createElement('div');seg.className='m-seg';seg.setAttribute('role','group');seg.setAttribute('aria-label','Panel view');
 seg.innerHTML='<i aria-hidden="true"></i><button type="button" class="on" aria-pressed="true" data-v="0">Live scene</button><button type="button" aria-pressed="false" data-v="1">Ekko screen</button>';
 sb.insertAdjacentElement('afterend',seg);
 const pill=seg.querySelector('i');const lay=()=>{const on=seg.querySelector('button.on');if(!on)return;pill.style.width=on.offsetWidth+'px';pill.style.transform=`translateX(${on.offsetLeft-4}px)`};
 seg.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;seg.querySelectorAll('button').forEach(x=>{const on=x===b;x.classList.toggle('on',on);x.setAttribute('aria-pressed',String(on))});exp.classList.toggle('ui',b.dataset.v==='1');lay()});
 window.addEventListener('resize',lay);setTimeout(lay,60);if(document.fonts)document.fonts.ready.then(lay)}
// learn: show six lessons first, the rest on request
const ml=$('#modlist');
if(ml){ml.classList.add('clip');const more=document.createElement('button');more.type='button';more.className='m-more';ml.insertAdjacentElement('afterend',more);
 const upd=()=>{const n=ml.querySelectorAll('.mi').length;more.hidden=!ml.classList.contains('clip')||n<=6;more.textContent=`Show all ${n} lessons`};
 more.addEventListener('click',()=>{ml.classList.remove('clip');upd()});new MutationObserver(upd).observe(ml,{childList:true});upd()}
// menu: close on outside tap / Esc
const burger=$('#burger'),mnav=$('#mnav');
const closeNav=()=>{if(mnav&&mnav.classList.contains('open')){mnav.classList.remove('open');burger.setAttribute('aria-expanded','false')}};
document.addEventListener('click',e=>{if(!e.target.closest('#mnav')&&!e.target.closest('#burger'))closeNav()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeNav()});
})();
