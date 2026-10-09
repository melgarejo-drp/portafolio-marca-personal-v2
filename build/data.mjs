// Datos del portafolio. Todo el sitio se genera desde este archivo con `node build/gen.mjs`.
//
// Campos de un proyecto:
//   slug, title, year, format, role, client, studio, tags[], cover, tone (portada tipográfica si no hay cover)
//   reto, respuesta, quote, kpis[[valor, etiqueta]], award (galardón), link (pieza completa externa)
//   media[]: { yt, title } · { video, poster, title, vertical } · { ig, kind: 'reel'|'p', title }
//   draft: true  → no se publica (falta material)

export const SITE = {
  name: 'Simón Melgarejo',
  role: 'Filmmaker & Editor',
  tagline: 'Filmmaker, editor e investigador de IA',
  description: 'Simón Melgarejo — director, filmmaker y editor. Narrativas cinematográficas, colorización y sistemas creativos potenciados por IA.',
  reel: 'KUhqdR2Sowo',
  email: ['melgarejorodriguez19', 'gmail.com'],
  socials: [
    { name: 'Instagram', url: 'https://www.instagram.com/by.melgarejo/' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/simon-melgarejo/' },
    { name: 'YouTube', url: 'https://www.youtube.com/@simonmelgarejo' }
  ]
};

export const TAGS = [
  { key: 'direccion', label: 'Dirección' },
  { key: 'cortos', label: 'Cortometrajes' },
  { key: 'ia', label: 'IA generativa' },
  { key: 'edicion', label: 'Edición y redes' },
  { key: 'cubrimiento', label: 'Cubrimientos' }
];

const yt = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

export const PROJECTS = [
  {
    slug: 'ums-juanse-laverde', title: 'Juanse Laverde — Unisabana Music Sessions', short: 'UMS × Juanse Laverde',
    year: 2022, format: 'Music session', role: 'Dirección, edición y color', client: 'Unisabana',
    tags: ['direccion'], cover: '/img/ums.webp',
    reto: 'Transmitir el estilo único del artista en una music session rápida pero efectiva.',
    respuesta: 'Un formato de menos de 5 minutos donde el artista hace una versión acústica de su canción.',
    media: [{ yt: 'P_eagrXXdls', title: 'Juanse Laverde — Unisabana Music Sessions' }]
  },
  {
    slug: 'elecciones-2022-unisabana-medios', title: 'Cubrimiento de elecciones 2022 — Unisabana Medios', short: 'Elecciones 2022',
    year: 2022, format: 'Transmisión en vivo', role: 'Curaduría de material en tiempo real', client: 'Unisabana Medios',
    tags: ['cubrimiento'], cover: yt('DuO8B_LhX5w'),
    reto: 'Cubrir las elecciones presidenciales de 2022 en tiempo real.',
    respuesta: 'Curar material en tiempo real para transmitirlo a través de los canales de comunicación de Unisabana Radio.',
    media: [{ yt: 'DuO8B_LhX5w', title: 'Cubrimiento de elecciones 2022' }]
  },
  {
    slug: 'el-invasor', title: 'El Invasor',
    year: 2023, format: 'Corto animado', role: 'Dirección, ilustración, animación y edición',
    tags: ['direccion', 'cortos'], cover: '/img/el-invasor.webp', award: 'Ganador · Cineminutos por el Océano',
    reto: '¿Cómo hablar del cuidado de los océanos sin conocer el mar, y hacerlo en menos de 3 días? Transmitir la urgencia ambiental bajo la estricta limitante de 60 segundos.',
    respuesta: 'Un filminuto animado con una premisa sencilla: si nosotros creamos el problema, somos nosotros quienes podemos solucionarlo. Ilustración artesanal, animación fluida y edición dinámica.',
    quote: 'Ganador de Cineminutos por el Océano, Delphinus, Cancún.',
    kpis: [['Ganador', 'Cineminutos por el Océano'], ['150k+', 'Vistas']],
    media: [{ yt: 'aStnqyI2Nmo', title: 'El Invasor' }]
  },
  {
    slug: 'staccato', title: 'Staccato',
    year: 2023, format: 'Cortometraje', role: 'Director',
    tags: ['direccion', 'cortos'], cover: '/img/staccato.webp',
    link: 'https://simonmelgarejo.myportfolio.com/staccato', media: []
  },
  {
    slug: 'the-book', title: 'The Book',
    year: 2023, format: 'Cortometraje', role: 'Camarógrafo y colorista',
    tags: ['cortos'], cover: '/img/the-book.webp',
    link: 'https://simonmelgarejo.myportfolio.com/the-book', media: []
  },
  {
    slug: 'la-vida-no-es-una', title: 'La vida no es una __',
    year: 2024, format: 'Campaña de comerciales', role: 'Dirección, montaje, VFX y color',
    tags: ['direccion'], cover: '/img/la-vida.webp',
    reto: 'Crear conciencia sobre los accidentes viales usando humor que conectara con jóvenes y adultos, y convertir una campaña educativa en un formato cautivador con alto valor de producción.',
    respuesta: 'Una micro serie que cuenta, en los lenguajes de cada género audiovisual, por qué es importante conducir con responsabilidad. Dirección cinematográfica, montaje meticuloso de VFX y una colorización atmosférica saturada.',
    quote: 'Un formato crudo y poderoso que enseña sin que se note la lección.',
    kpis: [['1.2M', 'Vistas'], ['Global', 'Alcance'], ['04', 'Episodios']],
    media: [
      { yt: 'Ehk5HtRCNKM', title: 'La vida no es una telenovela' },
      { yt: '74zQyojWL-I', title: 'La vida no es una película' },
      { yt: 'Ladhve6tn7w', title: 'La vida no es un videojuego' },
      { yt: 'QpROiPq1n_A', title: 'La vida no es una red social' }
    ]
  },
  {
    slug: 'dopamine-jara', title: 'Dopamine — Jara', short: 'Dopamine',
    year: 2024, format: 'Videoclip', role: 'Asistente de dirección', client: 'Jara',
    tags: ['direccion'], cover: '/img/dopamine.webp',
    link: 'https://simonmelgarejo.myportfolio.com/dopamine-jara', media: []
  },
  {
    slug: 'un-perdon-no-es-suficiente', title: 'Un perdón no es suficiente',
    year: 2024, format: 'Cortometraje', role: 'Director de posproducción, DP y colorista',
    tags: ['cortos'], cover: '/img/perdon.webp',
    link: 'https://simonmelgarejo.myportfolio.com/un-perdon-no-es-suficiente', media: []
  },
  {
    slug: 'marleny-arauz', studio: 'Lemon Drop', title: 'Marleny Araúz — reels de marca personal', short: 'Marleny Araúz',
    year: 2025, format: 'Reels de marca personal', role: 'Edición de video', client: 'Marleny Araúz',
    tags: ['edicion'], tone: 'clay',
    respuesta: 'Edición de reels de marca personal para Marleny Araúz.',
    media: [
      { ig: 'DIhtuvCynlJ', kind: 'p', title: 'Reel de marca personal' },
      { ig: 'DJKu4VZybgt', kind: 'p', title: 'Reel de marca personal' }
    ]
  },
  {
    slug: 'laboratorio-de-actuacion-el-vicio', studio: 'Lemon Drop', title: 'Laboratorio de actuación — El Vicio Producciones', short: 'Laboratorio de actuación',
    year: 2025, format: 'Edición de video', role: 'Postproducción', client: 'El Vicio Producciones',
    tags: ['edicion'], cover: '/img/el-vicio.webp',
    reto: 'Hacer la postproducción de un proyecto grabado en otro país.',
    respuesta: 'Postproducción con los más altos estándares de calidad.',
    media: [
      { ig: 'DMX_ZbQgxW9', kind: 'reel', title: 'Laboratorio de actuación' },
      { ig: 'DM9QRDstKP7', kind: 'reel', title: 'Laboratorio de actuación' },
      { ig: 'DNE4YpmNAP5', kind: 'reel', title: 'Laboratorio de actuación' }
    ]
  },
  {
    slug: 'hablando-como-los-locos', studio: 'Lemon Drop', title: 'Hablando como los Locos',
    year: 2025, format: 'Reels sobre podcast', role: 'Edición de video', client: 'Hablando como los Locos',
    tags: ['edicion'], tone: 'ink',
    respuesta: 'Reels a partir de los episodios del podcast Hablando como los Locos.',
    media: [{ ig: 'DQH8rlmCitW', kind: 'reel', title: 'Hablando como los Locos' }]
  },
  {
    slug: 'se-lo-digo-en-concreto', studio: 'Lemon Drop', title: 'Se lo digo en concreto',
    year: 2025, format: 'Serie vertical de opinión', role: 'Edición de video',
    tags: ['edicion'], tone: 'accent',
    respuesta: 'Edición de la serie vertical de opinión Se lo digo en concreto.',
    media: [{ ig: 'DQ9p4ShjlRh', kind: 'reel', title: 'Se lo digo en concreto' }]
  },
  {
    slug: 'sin-prisa-y-sin-pausa', studio: 'Lemon Drop', title: 'Sin prisa y sin pausa',
    year: 2026, format: 'Promocionales para serie', role: 'Edición de video',
    tags: ['edicion'], tone: 'sand',
    respuesta: 'Promocionales para la serie Sin prisa y sin pausa.',
    media: [{ ig: 'DVlfcHNDjXG', kind: 'reel', title: 'Sin prisa y sin pausa' }]
  },
  {
    slug: 'podcast-familia-y-empresas', studio: 'Lemon Drop', title: 'Podcast Familia y Empresas',
    year: 2026, format: 'Contenidos sobre podcast', role: 'Edición de video',
    tags: ['edicion'], cover: '/img/familia-y-empresas.webp', coverVertical: true,
    respuesta: 'Contenidos de video a partir de los episodios del podcast Familia y Empresas.',
    related: 'monica-gomez-jaramillo',
    media: [
      { video: '/media/ep-familia-y-empresas.mp4', poster: '/img/ep/familia-y-empresas.webp', title: 'Familia y empresas', vertical: true },
      { ig: 'DW2BMBYEZQg', kind: 'p', title: 'Familia y Empresas' }
    ]
  },
  {
    slug: 'monica-gomez-jaramillo', studio: 'Lemon Drop', title: 'Mónica Gómez Jaramillo — marca personal y edición automatizada', short: 'Mónica Gómez Jaramillo',
    year: 2026, format: 'Edición automatizada con IA', role: 'Edición de video y automatización', client: 'Mónica Gómez Jaramillo',
    tags: ['edicion', 'ia'], cover: '/img/monica-gomez.webp',
    reto: 'Editar en un día toda una parrilla de contenidos sin morir en el intento.',
    respuesta: 'Una herramienta que edita reels automáticamente, usando la misma gráfica que ya mantenía la marca: 12 piezas en 40 minutos. Además, reels de marca personal para sus redes.',
    kpis: [['12', 'Piezas'], ['40 min', 'De edición']],
    media: [
      { video: '/media/ep-legado-del-fundador.mp4', poster: '/img/ep/legado-del-fundador.webp', title: 'El legado del fundador', vertical: true },
      { video: '/media/ep-caso-pergamino.mp4', poster: '/img/ep/caso-pergamino.webp', title: 'Caso Pergamino', vertical: true },
      { video: '/media/ep-familias-no-hablan-de-dinero.mp4', poster: '/img/ep/familias-no-hablan-de-dinero.webp', title: 'Las familias no hablan de dinero', vertical: true },
      { video: '/media/ep-comprar-la-paz-con-silencio.mp4', poster: '/img/ep/comprar-la-paz-con-silencio.webp', title: 'Comprar la paz con silencio', vertical: true },
      { video: '/media/ep-espiritu-de-una-empresa-familiar.mp4', poster: '/img/ep/espiritu-de-una-empresa-familiar.webp', title: 'El espíritu de una empresa familiar', vertical: true },
      { video: '/media/ep-familia-y-empresas.mp4', poster: '/img/ep/familia-y-empresas.webp', title: 'Familia y empresas', vertical: true },
      { ig: 'DXxE25zxULT', kind: 'p', title: 'Reels de marca personal' }
    ]
  },
  {
    slug: 'kling-3', studio: 'Lemon Drop', title: 'Kling 3.0',
    year: 2026, format: 'Video generativo con IA', role: '', client: 'Kling',
    tags: ['ia'], cover: '/img/kling-3.webp',
    reto: '¿Cómo lanzar el modelo de video más potente y mostrar su poder?',
    respuesta: 'Un video de acción que muestra todas las posibilidades de Kling 3.0.',
    media: [{ video: '/media/kling-3.mp4', poster: '/img/kling-3.webp', title: 'Kling 3.0' }]
  },
  {
    slug: 'hedra', studio: 'Lemon Drop', title: 'Hedra',
    year: 2026, format: 'Video generativo con IA', role: '', client: 'Hedra',
    tags: ['ia'], cover: '/img/hedra.webp',
    reto: 'Hacer destacar a la marca en un mercado tan competitivo como las plataformas de IA.',
    respuesta: 'Un video con motion graphics, imitando UI y mostrando todas las posibilidades de la generación con IA.',
    media: [{ video: '/media/hedra.mp4', poster: '/img/hedra.webp', title: 'Hedra' }]
  },
  {
    slug: 'cine-colombia-emi-falck', studio: 'Lemon Drop', title: 'Comercial Cine Colombia — Emi Falck', short: 'Cine Colombia × Emi Falck',
    year: 2026, format: 'Comercial con IA', role: '', client: 'Cine Colombia · Emi Falck',
    tags: ['ia', 'direccion'], cover: '/img/cine-colombia.webp',
    reto: 'Cambiar la publicidad de salas de Cine Colombia por una que se sintiera como ver una película.',
    respuesta: 'Usar la IA para contar una historia imposible: 3 personajes, una vida salvada, y cientos de historias como esa.',
    media: [{ video: '/media/cine-colombia-emi-falck.mp4', poster: '/img/cine-colombia.webp', title: 'Comercial Cine Colombia — Emi Falck' }]
  },
  {
    // Pendiente: portada, rol, sinopsis y enlace al corto.
    slug: 'roque', title: 'Roque',
    year: 2026, format: 'Cortometraje', role: '',
    tags: ['cortos'], tone: 'accent',
    award: 'Prenominado · Categoría profesional · Smartfilms 2026',
    media: []
  },
  {
    // Pendiente: no hay material de Humind en el repo de Lemon Drop.
    // Completar portada, textos y piezas, y quitar `draft` para publicarlo.
    slug: 'humind', title: 'Humind', year: 2026, format: 'Por definir', role: '',
    tags: ['ia'], tone: 'ink', reto: '', respuesta: '', media: [], draft: true
  }
];

// Orden de "Trabajo seleccionado" en el inicio.
export const FEATURED = ['el-invasor', 'roque', 'cine-colombia-emi-falck', 'la-vida-no-es-una'];

// Carrusel de edición para redes (/redes). Cada pieza: { client, title, ig + kind } o { video, poster, vertical }.
// `draft: true` = falta el enlace; no se publica.
export const REELS = [
  { client: 'Mónica Gómez Jaramillo', title: 'El legado del fundador', video: '/media/ep-legado-del-fundador.mp4', poster: '/img/ep/legado-del-fundador.webp', project: 'monica-gomez-jaramillo' },
  { client: 'Mónica Gómez Jaramillo', title: 'Caso Pergamino', video: '/media/ep-caso-pergamino.mp4', poster: '/img/ep/caso-pergamino.webp', project: 'monica-gomez-jaramillo' },
  { client: 'Mónica Gómez Jaramillo', title: 'Las familias no hablan de dinero', video: '/media/ep-familias-no-hablan-de-dinero.mp4', poster: '/img/ep/familias-no-hablan-de-dinero.webp', project: 'monica-gomez-jaramillo' },
  { client: 'Mónica Gómez Jaramillo', title: 'Comprar la paz con silencio', video: '/media/ep-comprar-la-paz-con-silencio.mp4', poster: '/img/ep/comprar-la-paz-con-silencio.webp', project: 'monica-gomez-jaramillo' },
  { client: 'Mónica Gómez Jaramillo', title: 'El espíritu de una empresa familiar', video: '/media/ep-espiritu-de-una-empresa-familiar.mp4', poster: '/img/ep/espiritu-de-una-empresa-familiar.webp', project: 'monica-gomez-jaramillo' },
  { client: 'Mónica Gómez Jaramillo', title: 'Reels de marca personal', ig: 'DXxE25zxULT', kind: 'p', project: 'monica-gomez-jaramillo' },
  { client: 'Familia y Empresas', title: 'Familia y empresas', video: '/media/ep-familia-y-empresas.mp4', poster: '/img/ep/familia-y-empresas.webp', project: 'podcast-familia-y-empresas' },
  { client: 'Familia y Empresas', title: 'Contenidos sobre el podcast', ig: 'DW2BMBYEZQg', kind: 'p', project: 'podcast-familia-y-empresas' },
  { client: 'Hablando como los Locos', title: 'Reels sobre el podcast', ig: 'DQH8rlmCitW', kind: 'reel', project: 'hablando-como-los-locos' },
  { client: 'Se lo digo en concreto', title: 'Serie vertical de opinión', ig: 'DQ9p4ShjlRh', kind: 'reel', project: 'se-lo-digo-en-concreto' },
  { client: 'Sin prisa y sin pausa', title: 'Promocional de la serie', ig: 'DVlfcHNDjXG', kind: 'reel', project: 'sin-prisa-y-sin-pausa' },
  { client: 'Marleny Araúz', title: 'Reel de marca personal', ig: 'DIhtuvCynlJ', kind: 'p', project: 'marleny-arauz' },
  { client: 'Marleny Araúz', title: 'Reel de marca personal', ig: 'DJKu4VZybgt', kind: 'p', project: 'marleny-arauz' },
  { client: 'El Vicio Producciones', title: 'Laboratorio de actuación', ig: 'DMX_ZbQgxW9', kind: 'reel', project: 'laboratorio-de-actuacion-el-vicio' },
  { client: 'El Vicio Producciones', title: 'Laboratorio de actuación', ig: 'DM9QRDstKP7', kind: 'reel', project: 'laboratorio-de-actuacion-el-vicio' },
  // Pendientes: pegar el código de la publicación de Instagram y quitar `draft`.
  { client: 'Conversaciones de piernas abiertas', title: 'Por definir', ig: '', kind: 'reel', draft: true },
  { client: 'Emi Falck', title: 'Publicaciones en redes de Emi Falck', ig: '', kind: 'reel', draft: true }
];

export const SERVICES = [
  { title: 'Dirección', text: 'Narrativas visionarias y liderazgo de equipos de producción.' },
  { title: 'Filmmaking', text: 'Imágenes cinematográficas crudas y de alto contraste.' },
  { title: 'Montaje', text: 'Cortando líneas de tiempo para un ritmo agresivo e intencional.' },
  { title: 'Colorización', text: 'Paletas industriales y melancólicas.' },
  { title: 'IA creativa', text: 'Redes neuronales para expandir la narrativa: video generativo y edición automatizada.' }
];

// Colecciones de fotos. Las imágenes se leen solas de img/colecciones/<slug>/ (jpg, png o webp,
// en orden alfabético). La primera es la portada salvo que se indique `cover`.
export const COLLECTIONS = [
  {
    slug: 'al-fuego', title: 'Al fuego', subtitle: 'Chef Felipe Hincapié × Beluga', cover: '/img/colecciones/al-fuego/01.webp',
    // Composición narrativa (opcional). Sin `story`, la colección se muestra como galería simple.
    // Fotos por número de archivo en img/colecciones/<slug>/NN.webp (completa, se ve en el visor) y
    // recorte/NN.webp (sin la firma, se ve en la composición; si no existe, se usa la completa). Texto entre *asteriscos* = cursiva.
    // Disposiciones: duo, duo-r, trio, mosaic (3 o 4 fotos), wide (a sangre). TEXTOS: BORRADOR para corregir.
    story: {
      // [etiqueta, texto, enlace opcional]
      meta: [['Chef', 'Felipe Hincapié · @chef_felipeh', 'https://www.instagram.com/chef_felipeh/'], ['Lugar', 'Beluga · @belugarest.hifi', 'https://www.instagram.com/belugarest.hifi/'], ['Grupo', 'Grupo Altas Vistas · @grupoaltasvistas', 'https://www.instagram.com/grupoaltasvistas/'], ['Ocasión', 'Experiencia privada · libro *Al fuego*'], ['Rol', 'Fotografía'], ['Año', '2026']],
      intro: 'Una noche, una cocina abierta y un libro que todavía olía a tinta. Felipe Hincapié convirtió Beluga, del Grupo Altas Vistas, en el escenario de una experiencia privada: un menú que recorría las páginas de *Al fuego*, servido a pocos metros de donde se cocinaba. Mi trabajo era estar ahí sin estorbar, y lograr que las fotos se sintieran como la noche y no como un catálogo.',
      chapters: [
        {
          title: 'Antes del servicio',
          text: 'Antes de que entrara el primer invitado, Felipe salió a la calle. Un cigarrillo, la pared de ladrillo, el delantal ya puesto. Fueron diez minutos en los que todavía no era el chef de la noche, sino alguien juntando calma. Ahí empezó la sesión: con él, no con la comida.',
          blocks: [{ duo: ['02', '03'] }, { quote: 'Fotografiar a un cocinero es fotografiar a alguien que nunca está quieto.' }]
        },
        {
          title: 'La mesa espera',
          text: 'Beluga estaba en silencio. Servilletas dobladas con el nombre bordado en rojo, platos alineados sobre el mármol, el vino esperando su turno. Me interesaba ese momento en el que todo está listo y nada ha pasado todavía: la promesa del menú antes del primer plato.',
          blocks: [{ 'duo-r': ['04', '05'] }, { mosaic: ['21', '12', '30', '25'] }]
        },
        {
          title: 'Cocina abierta',
          text: 'La cocina de Beluga no tiene puerta. No hay dónde esconder el oficio: los comensales ven cada gesto. Busqué encuadres desde el salón, entre lámparas y flores, para que la foto tuviera el punto de vista de quien está sentado a la mesa mirando cómo se arma su cena.',
          blocks: [{ trio: ['07', '08', '09'] }, { wide: '06' }, { duo: ['11', '13'] }, { 'duo-r': ['14', '24'] }]
        },
        {
          title: 'Al fuego',
          text: 'Cuando se encienden los fogones, la luz de la sala se vuelve otra. El fuego no es solo una técnica en el libro de Felipe: es el hilo de todo el menú. Trabajé con la luz disponible —llamas, lámparas, el rojo del techo— para no romper el ambiente con un flash y para que el calor se notara en el color.',
          blocks: [{ wide: '33' }, { duo: ['32', '31'] }, { quote: 'El fuego no se pone en pausa para la foto.' }, { trio: ['22', '26', '28'] }]
        },
        {
          title: 'Al plato',
          text: 'Pan tostado, tomate, queso fresco, hierbas puestas con pinza. Cada plato salía del pase en segundos, así que fotografiar la comida fue un ejercicio de anticipación: saber dónde iba a caer la mano antes de que cayera. Quise que los platos se vieran como se ven en la mesa, sin set ni montaje de estudio.',
          blocks: [{ 'duo-r': ['16', '15'] }, { trio: ['17', '29', '18'] }, { wide: '36' }, { duo: ['20', '35'] }, { 'duo-r': ['10', '37'] }]
        },
        {
          title: 'Sobremesa',
          text: 'Al final, lo que queda no es un plato sino un equipo. Felipe no cocinó solo: la noche fue de toda la brigada que lo acompañó en el pase. Cerré la sesión con ellos, ya sin prisa. *Al fuego* es un libro de recetas, pero esa noche fue, sobre todo, una mesa compartida.',
          blocks: [{ duo: ['38', '40'] }, { wide: '39' }, { 'duo-r': ['19', '41'] }]
        }
      ]
    }
  },
  // Series nuevas. Fotos en img/colecciones/<slug>/NN.webp (01 = portada), numeradas en orden de lectura.
  // Originales en img/raw/<slug>/ (no se publican). TEXTOS: BORRADOR para corregir.
  {
    slug: 'el-castillo', title: 'El Castillo', subtitle: 'Pole dance en un antiguo prostíbulo del barrio Santa Fe',
    story: {
      meta: [['Lugar', 'El Castillo · barrio Santa Fe, Bogotá'], ['Disciplina', 'Pole dance'], ['Rol', 'Fotografía'], ['Año', '2023']],
      intro: 'En el barrio Santa Fe, en el centro de Bogotá, hay una casa que durante años fue un prostíbulo. Hoy se llama El Castillo y es otra cosa: un lugar donde comunidades LGBTIQ+ llegan a crear, entrenar y expresarse. Entré a fotografiar una de esas formas de expresión, el *pole dance*, y lo que pasa cuando un cuerpo vuelve a ocupar, en sus propios términos, un espacio que antes lo vendía.',
      chapters: [
        {
          title: 'La casa',
          text: 'Antes de llegar a la barra hay que subir. En las escaleras, retratos en blanco y negro miran a quien entra; en las paredes, murales hechos a muchas manos, colores, frases. El Castillo cuenta su nueva historia en los muros antes de que nadie diga una palabra.',
          blocks: [{ duo: ['02', '03'] }, { quote: 'Es mejor ser con miedo que dejar de ser por miedo.' }]
        },
        {
          title: 'En el piso',
          text: 'La clase empieza abajo, sobre colchonetas de colores. Estirar, abrir la cadera, sostener el peso de otro cuerpo, dejarse corregir. Aquí el *pole* es primero disciplina: fuerza, flexibilidad y confianza en quien te acompaña. Cada estiramiento es también una forma de cuidado.',
          blocks: [{ wide: '04' }, { duo: ['05', '06'] }, { 'duo-r': ['07', '08'] }]
        },
        {
          title: 'La barra',
          text: 'Arriba, el mundo se pone de cabeza. Un cuerpo se cuelga de una sola pierna, gira, se sostiene con las manos y vuelve a caer. Usé flash para congelar el movimiento en la penumbra del salón y quedarme con el instante en que la fuerza y la gracia se confunden. Lo que antes era un espacio de transacción ahora es un escenario: el cuerpo no se ofrece, se entrena y se celebra.',
          blocks: [{ trio: ['09', '10', '11'] }]
        }
      ]
    }
  },
  {
    slug: 'el-olimpo', title: 'El Olimpo', subtitle: 'El taller de Cindy, «la madre», en el barrio Santa Fe',
    story: {
      meta: [['Taller', 'El Olimpo · barrio Santa Fe, Bogotá'], ['Diseñadora', 'Cindy, «la madre»'], ['Oficio', 'Diseño de modas y costura'], ['Rol', 'Fotografía'], ['Año', '2023']],
      intro: 'A Cindy le dicen «la madre». Es una mujer trans, diseñadora de modas, que vive en el barrio Santa Fe, en Bogotá, y se ganó el apodo por acoger a muchas personas que no tenían dónde estar. *El Olimpo* es su proyecto artístico: un taller donde la costura es oficio, refugio y escenario. Esta serie retrata a Cindy en su taller y, sobre todo, lo que allí se construye: el lugar, las herramientas y las piezas.',
      chapters: [
        {
          title: 'El taller',
          text: 'Cindy se apoya en la mesa de trabajo, junto a una ventana grande sobre el centro de Bogotá, entre maniquíes, rollos de tela y carretes de hilo. Las paredes están cubiertas de fotos de moda, afiches y collages; hasta el piso es una galería. El Olimpo es una casa donde todo, también la cocina y el baño, termina siendo parte de la obra.',
          blocks: [{ wide: '02' }, { duo: ['03', '04'] }, { trio: ['05', '06', '07'] }]
        },
        {
          title: 'El oficio',
          text: 'La máquina de coser no para. Alrededor, pegante, pintura en aerosol, muñecas intervenidas con pedrería y un frasco con la palabra *Olimpo*. Aquí el diseño se aprende haciendo y se comparte: la costura también es una forma de sostener a otros.',
          blocks: [{ wide: '08' }, { quote: 'Coser también es una forma de sostener a otros.' }, { 'duo-r': ['09', '10'] }]
        },
        {
          title: 'Rosa',
          text: 'La pieza central es un vestido fucsia: una crinolina que deja ver su propia estructura, tul, lazos a rayas, collares de cuentas. Me acerqué hasta que el color llenara el cuadro, porque en El Olimpo el detalle es una declaración: nada es discreto, todo está hecho para ser visto.',
          blocks: [{ duo: ['11', '12'] }, { mosaic: ['13', '14', '15', '16'] }]
        }
      ]
    }
  },
  {
    slug: 'la-base-fraternidad', title: 'La Base Fraternidad', subtitle: 'La fiesta universitaria del centro de Bogotá',
    story: {
      meta: [['Lugar', 'La Base Fraternidad · centro de Bogotá'], ['Escena', 'Fiesta universitaria'], ['Rol', 'Fotografía'], ['Año', '2024']],
      intro: 'En el centro de Bogotá hay una casa dispuesta como discoteca. Se llama La Base Fraternidad y se llena de universitarios. Esta serie es sobre lo que pasa cuando una casa se vuelve pista: la fiesta, el calor, el baile.',
      chapters: [
        {
          title: 'Llegar',
          text: 'La fiesta empieza antes de entrar: en la calle, con bombo y platillos. Después vienen la puerta de madera, la mirada a cámara y el primer paso adentro, donde la luz cambia de color.',
          blocks: [{ duo: ['02', '03'] }]
        },
        {
          title: 'Calor',
          text: 'Adentro la casa se cierra sobre sí misma. Luces violetas y verdes, humo, cuerpos a pocos centímetros. Disparé dentro de la multitud, sin distancia, para que la foto tuviera la temperatura del lugar.',
          blocks: [{ 'duo-r': ['04', '05'] }, { quote: 'Una casa llena se convierte en un solo cuerpo que respira al ritmo del bajo.' }]
        },
        {
          title: 'El baile',
          text: 'Hay quien baila con los ojos cerrados, quien grita la canción y quien baila para la cámara. Me interesaban todos: el gesto que nadie ve y la pose que se sabe vista. Juntos cuentan lo que es tener veinte años en el centro de la ciudad.',
          blocks: [{ trio: ['06', '07', '08'] }]
        }
      ]
    }
  },
  {
    // Recopilatorio de diseño gráfico: galería simple (sin `story`), en orden de fecha.
    slug: 'flyers-la-base', title: 'Flyers de La Base', subtitle: 'Diseño gráfico impulsado con IA', kind: 'Diseño gráfico', unit: 'piezas',
    intro: 'Dieciséis flyers, de enero a junio, para promocionar las fiestas de *La Base Fraternidad* en sus sedes del Centro y Chapinero. Cada fecha tiene su propio concepto —bienvenida de semestre, *tardeo old school*, mes de la mujer, noches de Karol G y Bad Bunny— y una imagen generada con inteligencia artificial que lo cuenta de un vistazo, sobre una misma estructura gráfica para que la marca se reconozca en el *feed*.'
  }
];
