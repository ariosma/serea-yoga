'use strict';
(() => {
 const dictionary=window.SEREA_TRANSLATIONS;
 const supported=['es','gl','en'];
 const picker=document.querySelector('#language');
 let language='es';
 function t(key){return language==='es'?key:(dictionary[key]?.[language]??key);}
 // Keep references to original text nodes: changing language never rebuilds forms,
 // media or interactive elements, and Spanish is always available without JS.
 const texts=[];const attributes=[];
 const walker=document.createTreeWalker(document.documentElement,NodeFilter.SHOW_TEXT);
 while(walker.nextNode()){
  const node=walker.currentNode;
  if(node.parentElement.closest('script,style,#language'))continue;
  const key=node.textContent.trim();
  if(dictionary[key])texts.push({node,key,prefix:node.textContent.match(/^\s*/)[0],suffix:node.textContent.match(/\s*$/)[0]});
 }
 document.querySelectorAll('*').forEach(element=>{
  ['alt','aria-label','placeholder','data-title','data-description'].forEach(name=>{
   const key=element.getAttribute(name);if(dictionary[key])attributes.push({element,name,key});
  });
 });
 const description=document.querySelector('meta[name="description"]');
 attributes.push({element:description,name:'content',key:description.content});
 function html(value){const template=document.createElement('template');template.innerHTML=value;const w=document.createTreeWalker(template.content,NodeFilter.SHOW_TEXT);while(w.nextNode())w.currentNode.textContent=t(w.currentNode.textContent);return template.innerHTML;}
 function imageCount(n){return `${n} ${language==='gl'?(n===1?'imaxe':'imaxes'):language==='en'?(n===1?'image':'images'):(n===1?'imagen':'imágenes')}.`;}
 function bookingMessage(form){
  const data=new FormData(form);const name=String(data.get('name')).trim();const notes=String(data.get('notes')).trim();
  const selectedDate=new Date(String(data.get('date'))+'T12:00:00');
  // Some browsers lack Galician date data and silently use Spanish month names.
  const months=['xaneiro','febreiro','marzo','abril','maio','xuño','xullo','agosto','setembro','outubro','novembro','decembro'];
  const date=language==='gl'?`${selectedDate.getDate()} de ${months[selectedDate.getMonth()]} de ${selectedDate.getFullYear()}`:new Intl.DateTimeFormat(language==='en'?'en-GB':'es-ES',{dateStyle:'long',timeZone:'Europe/Madrid'}).format(selectedDate);
  const people=form.elements.people.selectedOptions[0].textContent;
  const level=form.elements.level.selectedOptions[0].textContent;
  if(language==='gl')return `Ola, Serea 🌅 Son ${name}. Gustaríame consultar unha sesión de ioga ao solpor.\n\nData preferida: ${date}\nPersoas: ${people}\nExperiencia: ${level}${notes?'\nComentario: '+notes:''}\n\nPodedes confirmarme dispoñibilidade, lugar, horario, duración, prezo e material? Grazas.`;
  if(language==='en')return `Hello, Serea 🌅 I’m ${name}. I would like to enquire about a sunset yoga session.\n\nPreferred date: ${date}\nPeople: ${people}\nExperience: ${level}${notes?'\nComment: '+notes:''}\n\nCould you confirm availability, location, time, duration, price and equipment? Thank you.`;
  return `Hola, Serea 🌅 Soy ${name}. Me gustaría consultar una sesión de yoga al atardecer.\n\nFecha preferida: ${date}\nPersonas: ${people}\nExperiencia: ${level}${notes?'\nComentario: '+notes:''}\n\n¿Podéis confirmarme disponibilidad, lugar, horario, duración, precio y material? Gracias.`;
 }
 function apply(value,remember=false){
  language=supported.includes(value)?value:'es';
  texts.forEach(({node,key,prefix,suffix})=>node.textContent=prefix+t(key)+suffix);
  attributes.forEach(({element,name,key})=>element.setAttribute(name,t(key)));
  document.documentElement.lang=language;picker.value=language;
  const menu=document.querySelector('.menu');menu.setAttribute('aria-label',t(menu.getAttribute('aria-expanded')==='true'?'Cerrar menú':'Abrir menú'));
  const form=document.querySelector('#booking-form');form.elements.date.setCustomValidity('');
  if(document.querySelector('#message-dialog').open)document.querySelector('#message-preview').value=bookingMessage(form);
  ['#form-status','#copy-status'].forEach(selector=>document.querySelector(selector).textContent='');
  const url=new URL(location.href);url.searchParams.set('lang',language);history.replaceState(null,'',url);
  if(remember){try{localStorage.setItem('serea-language',language);}catch{/* Private browsing still supports language switching. */}}
  window.dispatchEvent(new Event('serea:language'));window.dispatchEvent(new Event('serea:layout'));
 }
 window.SereaI18n={t,html,imageCount,bookingMessage,get language(){return language;}};
 picker.addEventListener('change',()=>apply(picker.value,true));
 let saved;try{saved=localStorage.getItem('serea-language');}catch{}
 const requested=new URL(location.href).searchParams.get('lang');
 apply(supported.includes(requested)?requested:supported.includes(saved)?saved:'es');
})();
