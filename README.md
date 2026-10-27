# Serea · Yoga atlántico

Web editorial y responsive de yoga al atardecer inspirada en Fisterra y Costa da Morte. HTML, CSS y JavaScript sin compilación.

## Publicación

GitHub Pages sirve la rama `main`, carpeta raíz. Las rutas de recursos son relativas para funcionar bajo `/serea-yoga/`.

## Activar reservas reales

Editar `config.js`: sustituir el número ficticio por el contacto real en formato internacional sin `+`, espacios ni guiones, y cambiar `demo` a `false`. Con el modo demostración activo no se contacta a ningún número; se puede revisar y copiar la consulta.

Antes de ofrecer el servicio real: completar identidad y contacto del responsable, condiciones de reserva y cancelación, duración, precios, disponibilidad y material. Revisar los textos y las condiciones de uso de las playas con la persona responsable del servicio.

El formulario prepara un mensaje de consulta; WhatsApp permite revisarlo antes de enviarlo. No hay backend, cobros ni confirmación automática. Los datos no se guardan por la web.

## Recursos

- Fotografías originales generadas con IA para este concepto, no documentales. Formato WebP.
- Fuentes: DM Sans y Playfair Display mediante Google Fonts.
- Información de playas: https://concellofisterra.gal/turismo/praias/es

## Desarrollo local

`python3 -m http.server 4173`

Abrir http://localhost:4173. No se necesitan dependencias.

## Galería

Seis escenas en un mosaico responsive, con filtros de movimiento, pausa y paisaje. Las fotos se amplían en un visor que admite flechas de teclado, cierre con Escape y gestos horizontales en dispositivos táctiles. Sin JavaScript, cada fotografía sigue siendo un enlace al archivo original.

Las cuatro nuevas imágenes (`yoga-en-grupo.webp`, `yoga-entre-amigas.webp`, `detalles-de-la-pausa.webp`, `una-pausa-compartida.webp`) son escenas ilustrativas generadas con IA, no sesiones documentales ni clientes reales.

La composición final muestra nueve fotografías diferentes, sin reutilizar una imagen entre secciones: una portada, seis escenas de galería, una imagen de esencia y una vista de los lugares. Las escenas adicionales `yoga-a-tu-ritmo.webp`, `el-ritmo-del-mar.webp` y `horizonte-atlantico.webp` también son ilustraciones fotográficas generadas con IA.

## Movimiento y profundidad

Parallax al desplazarse en la portada y en las ocho imágenes interiores, con distintas intensidades según el encuadre. Los títulos de las ocho secciones y los motivos de fondo se desplazan en otra capa. El formulario, los botones y las imágenes ampliadas permanecen estables. El movimiento sigue el desplazamiento nativo y se desactiva si se solicita reducir movimiento.
