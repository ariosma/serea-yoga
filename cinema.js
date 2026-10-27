'use strict';
(() => {
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 const gallery=document.querySelector('.gallery-grid');
 const scenes=[...gallery.querySelectorAll('.gallery-shot')];
 const hero=document.querySelector('.hero');
 let frame=0,active=false;
 // One photograph per scene, projected onto two visual planes. The background
 // uses the same source as the foreground, so no extra media is downloaded.
 scenes.forEach((scene,index)=>{
  const stage=document.createElement('div');stage.className='scene-stage';
  const backdrop=document.createElement('span');backdrop.className='scene-backdrop';backdrop.setAttribute('aria-hidden','true');
  backdrop.style.backgroundImage=`url("${scene.querySelector('img').getAttribute('src')}")`;
  const border=document.createElement('span');border.className='scene-outline';border.setAttribute('aria-hidden','true');
  stage.append(backdrop,border,scene.querySelector('figure'));scene.append(stage);
  scene.style.setProperty('--scene-direction',index%2?-1:1);
 });
 function render(){
  frame=0;if(!active)return;
  const h=innerHeight;
  const rects=scenes.filter(scene=>!scene.hidden).map(scene=>({scene,rect:scene.getBoundingClientRect()}));
  const heroRect=hero.getBoundingClientRect();
  rects.forEach(({scene,rect})=>{
   if(rect.bottom<0||rect.top>h)return;
   const progress=Math.max(0,Math.min(1,(h-rect.top)/(h+rect.height)));
   const direction=Number(scene.style.getPropertyValue('--scene-direction'));
   scene.style.setProperty('--scene-x',`${((progress-.5)*100*direction).toFixed(2)}px`);
   scene.style.setProperty('--scene-y',`${((progress-.5)*-65).toFixed(2)}px`);
   scene.style.setProperty('--scene-scale',(1.12-progress*.17).toFixed(3));
   scene.style.setProperty('--scene-angle',`${((progress-.5)*-3*direction).toFixed(3)}deg`);
   scene.style.setProperty('--scene-back-x',`${((progress-.5)*-160*direction).toFixed(2)}px`);
  });
  if(heroRect.bottom>0&&heroRect.top<h){
   const progress=Math.max(0,Math.min(1,-heroRect.top/heroRect.height));
   hero.style.setProperty('--hero-zoom',(1.05+progress*.12).toFixed(3));
   hero.style.setProperty('--hero-title-drift',`${(-progress*90).toFixed(2)}px`);
  }
 }
 function request(){if(active&&!frame)frame=requestAnimationFrame(render);}
 function configure(){
  active=!preference.matches;document.documentElement.classList.toggle('cinema-enabled',active);
  cancelAnimationFrame(frame);frame=0;
  if(!active){scenes.forEach(scene=>['--scene-x','--scene-y','--scene-scale','--scene-angle','--scene-back-x'].forEach(name=>scene.style.removeProperty(name)));hero.style.removeProperty('--hero-zoom');hero.style.removeProperty('--hero-title-drift');}
  request();
 }
 window.addEventListener('scroll',request,{passive:true});window.addEventListener('resize',request,{passive:true});window.addEventListener('serea:layout',request);preference.addEventListener('change',configure);configure();
})();
