'use strict';
(() => {
 const gallery=document.querySelector('#galeria');
 const grid=gallery.querySelector('.gallery-grid');
 const shots=[...gallery.querySelectorAll('.gallery-shot')];
 const filters=[...gallery.querySelectorAll('[data-filter]')];
 const viewer=document.querySelector('#gallery-viewer');
 const image=viewer.querySelector('#viewer-image');
 const previous=viewer.querySelector('.viewer-prev');
 const next=viewer.querySelector('.viewer-next');
 let active=0, visible=shots, oldOverflow='';
 gallery.classList.add('gallery-ready');
 filters.forEach(button=>button.addEventListener('click',()=>{
  const category=button.dataset.filter;
  filters.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  shots.forEach(shot=>{shot.hidden=category!=='all'&&shot.dataset.category!==category;});
  visible=shots.filter(shot=>!shot.hidden);
  grid.classList.toggle('is-filtered',category!=='all');
  grid.classList.toggle('is-single',visible.length===1);
  window.dispatchEvent(new Event('serea:layout'));
  document.querySelector('#gallery-status').textContent=`${visible.length} ${visible.length===1?'imagen':'imágenes'}.`;
 }));
 function show(index){
  active=(index+visible.length)%visible.length;
  const shot=visible[active];
  image.src=shot.href; image.alt=shot.querySelector('img').alt;
  document.querySelector('#viewer-title').textContent=shot.dataset.title;
  document.querySelector('#viewer-description').textContent=shot.dataset.description;
  document.querySelector('#viewer-count').textContent=`${String(active+1).padStart(2,'0')} / ${String(visible.length).padStart(2,'0')}`;
  previous.hidden=next.hidden=visible.length<2;
 }
 shots.forEach(shot=>shot.addEventListener('click',event=>{
  event.preventDefault();show(visible.indexOf(shot));oldOverflow=document.body.style.overflow;
  document.body.style.overflow='hidden';viewer.showModal();
 }));
 previous.addEventListener('click',()=>show(active-1));
 next.addEventListener('click',()=>show(active+1));
 viewer.querySelector('.viewer-close').addEventListener('click',()=>viewer.close());
 viewer.addEventListener('close',()=>{document.body.style.overflow=oldOverflow;image.removeAttribute('src');});
 viewer.addEventListener('keydown',event=>{
  if(event.key==='ArrowLeft'){event.preventDefault();show(active-1);}
  if(event.key==='ArrowRight'){event.preventDefault();show(active+1);}
 });
 viewer.addEventListener('click',event=>{if(event.target===viewer)viewer.close();});
 let touchStart;
 image.addEventListener('touchstart',event=>{if(event.touches.length===1)touchStart={x:event.touches[0].clientX,y:event.touches[0].clientY};else touchStart=null;},{passive:true});
 image.addEventListener('touchend',event=>{
  if(!touchStart||event.changedTouches.length!==1)return;
  const dx=event.changedTouches[0].clientX-touchStart.x,dy=event.changedTouches[0].clientY-touchStart.y;
  if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5)show(active+(dx<0?1:-1));
  touchStart=null;
 },{passive:true});
})();
