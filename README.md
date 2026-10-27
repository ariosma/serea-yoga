# Serea · Yoga atlántico

Web editorial y responsive de yoga al atardecer inspirada en Fisterra y Costa da Morte. HTML, CSS y JavaScript sin compilación.

## Publicación

GitHub Pages sirve la rama `main`, carpeta raíz. Las rutas de recursos son relativas para funcionar bajo `/serea-yoga/`.

## Activar reservas reales

Editar `config.js`: sustituir el número ficticio por el contacto real en formato internacional sin `+`, espacios ni guiones, y cambiar `demo` a `false`. Con el modo demostración activo no se contacta a ningún número; se puede revisar y copiar la consulta.

Antes de ofrecer el servicio real: completar identidad y contacto del responsable, condiciones de reserva y cancelación, duración, precios, disponibilidad y material. Revisar los textos y las condiciones de uso de las playas con la persona responsable del servicio.

El formulario prepara un mensaje de consulta; WhatsApp permite revisarlo antes de enviarlo. No hay backend, cobros ni confirmación automática. Los datos no se guardan por la web.

## Recursos reales

Siete fotografías únicas facilitadas por el cliente, convertidas a WebP sin alterar su contenido. Una portada, cuatro imágenes en el álbum, una en esencia y una en lugares. Se ha omitido una fotografía adjunta duplicada píxel a píxel.

Un vídeo vertical de una sesión, con controles nativos, sin reproducción automática y carga bajo demanda. Los dos adjuntos muestran la misma grabación; se utiliza una única versión, comprimida en H.264/AAC con faststart. El póster procede del propio vídeo.

Todos los recursos utilizados están en `assets/real/`. Las sesiones se presentan en distintas playas da Costa da Morte, con ubicación concreta a confirmar por WhatsApp.

## Desarrollo local

`python3 -m http.server 4173`

## Galería y movimiento

Álbum con cuatro imágenes, filtros y visor ampliado con teclado, Escape y gestos táctiles. Parallax en portada, fotografías interiores y títulos, respetando la preferencia de movimiento reducido. El vídeo conserva su encuadre vertical completo y controles estables.

## Idiomas

Selector permanente en la cabecera para galego, español e inglés. Las traducciones están en `translations.js` y se aplican mediante `i18n.js`, manteniendo los campos del formulario. Incluyen metadatos, textos alternativos, galería, avisos y consulta de WhatsApp. La preferencia se guarda localmente; `?lang=gl`, `?lang=es` y `?lang=en` permiten compartir un idioma concreto. El español es la versión de respaldo sin JavaScript.

## Álbum cinematográfico

`cinema.js` convierte las cuatro fotos del álbum en escenas con un fondo ambiental, un marco flotante y desplazamiento, escala y rotación vinculados al scroll. Cada escena utiliza una única fotografía en sus planos. La portada añade zoom y desplazamiento del titular. Con movimiento reducido se utiliza la galería estática y se desactivan las transformaciones.
