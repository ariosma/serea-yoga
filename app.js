'use strict';
const menu=document.querySelector('.menu');
const nav=document.querySelector('#nav');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menú');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');nav.classList.toggle('open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
const dateInput=document.querySelector('[name="date"]');
const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Madrid',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
dateInput.min=today;
document.querySelector('#year').textContent=new Date().getFullYear();
const bookingForm=document.querySelector('#booking-form');
bookingForm.addEventListener('submit',e=>{
 e.preventDefault();if(!bookingForm.reportValidity())return;
 const data=new FormData(bookingForm);const requestedDate=String(data.get('date'));
 if(requestedDate<today){dateInput.setCustomValidity('Elige hoy o una fecha futura.');dateInput.reportValidity();return;}
 const formatted=new Intl.DateTimeFormat('es-ES',{dateStyle:'long',timeZone:'Europe/Madrid'}).format(new Date(requestedDate+'T12:00:00'));
 const message=`Hola, Serea 🌅 Soy ${String(data.get('name')).trim()}. Me gustaría consultar una sesión de yoga al atardecer.\n\nFecha preferida: ${formatted}\nPersonas: ${data.get('people')}\nExperiencia: ${data.get('level')}${String(data.get('notes')).trim()?'\nComentario: '+String(data.get('notes')).trim():''}\n\n¿Podéis confirmarme disponibilidad, lugar, horario, duración, precio y material? Gracias.`;
 const config=window.SEREA_CONFIG||{};const phone=String(config.whatsapp||'').replace(/\D/g,'');
 if(config.demo||!/^\d{8,15}$/.test(phone)||/^340+$/.test(phone)){
 document.querySelector('#message-preview').value=message;document.querySelector('#copy-status').textContent='';document.querySelector('#message-dialog').showModal();
 document.querySelector('#form-status').textContent='Modo demostración: consulta preparada. No se ha enviado ninguna reserva.';return;
 }
 const target=`https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
 window.location.assign(target);
});
dateInput.addEventListener('input',()=>dateInput.setCustomValidity(''));
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelectorAll('.dialog-close,.dialog-ok').forEach(button=>button.addEventListener('click',()=>dialog.close()));dialog.addEventListener('click',e=>{if(e.target===dialog){const rect=dialog.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)dialog.close();}});});
document.querySelector('#copy-message').addEventListener('click',async()=>{const preview=document.querySelector('#message-preview');try{await navigator.clipboard.writeText(preview.value);document.querySelector('#copy-status').textContent='Mensaje copiado.';}catch{preview.focus();preview.select();document.querySelector('#copy-status').textContent='Selecciona el texto y cópialo con el menú de tu dispositivo.';}});
const legal={privacy:{title:'Tu privacidad, con calma.',body:'<p>Este sitio no guarda las consultas del formulario en un servidor ni utiliza analítica o cookies propias. El mensaje se prepara en tu navegador.</p><p>Si las reservas están activadas, al continuar se abre WhatsApp con los datos introducidos. Puedes revisar el mensaje antes de enviarlo. WhatsApp y los servicios externos que elijas visitar aplican sus propias políticas.</p><p>Las tipografías se cargan desde Google Fonts, que recibe los datos técnicos necesarios para servirlas, como tu dirección IP. GitHub Pages proporciona el alojamiento.</p><p>Esta es una presentación de proyecto con contacto ficticio. Antes de admitir reservas reales, el responsable del servicio deberá incorporar su identidad, contacto y condiciones aplicables.</p>'},credits:{title:'Un proyecto con alma atlántica.',body:'<p>Serea es una propuesta de marca y experiencia de yoga inspirada en Fisterra y la Costa da Morte. El nombre, los textos y la dirección visual forman parte de este concepto.</p><p>Las fotografías se han creado con inteligencia artificial. Son imágenes ilustrativas; no documentan clases, instructores ni una localización exacta.</p><p>El contacto +34 000 000 000 es ficticio. No hay agenda, precios o disponibilidad confirmados. El formulario funciona en modo demostración hasta incorporar el contacto real.</p><p>La información sobre las playas se ha contrastado con el <a class="text-link" href="https://concellofisterra.gal/turismo/praias/es" target="_blank" rel="noopener noreferrer">Concello de Fisterra ↗</a>.</p>'}};
document.querySelectorAll('[data-legal]').forEach(button=>button.addEventListener('click',()=>{const content=legal[button.dataset.legal];document.querySelector('#legal-title').textContent=content.title;document.querySelector('#legal-content').innerHTML=content.body;document.querySelector('#legal-dialog').showModal();}));
