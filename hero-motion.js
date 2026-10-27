'use strict';
(() => {
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 const hero=document.querySelector('.hero');
 let frame=0;
 function render(){
  frame=0;if(preference.matches)return;
  const rect=hero.getBoundingClientRect();
  if(rect.bottom<=0||rect.top>=innerHeight)return;
  const progress=Math.max(0,Math.min(1,-rect.top/rect.height));
  hero.style.setProperty('--hero-zoom',(1.05+progress*.12).toFixed(3));
  hero.style.setProperty('--hero-title-drift',`${(-progress*90).toFixed(2)}px`);
 }
 function request(){if(!preference.matches&&!frame)frame=requestAnimationFrame(render);}
 function configure(){
  cancelAnimationFrame(frame);frame=0;
  document.documentElement.classList.toggle('hero-motion-enabled',!preference.matches);
  hero.style.removeProperty('--hero-zoom');hero.style.removeProperty('--hero-title-drift');
  request();
 }
 window.addEventListener('scroll',request,{passive:true});
 window.addEventListener('resize',request,{passive:true});
 window.addEventListener('serea:layout',request);
 preference.addEventListener('change',configure);configure();
})();
