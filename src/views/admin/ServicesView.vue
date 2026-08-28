<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// Definición de la interfaz para tipar con TypeScript
interface Service {
  id: number
  title: string
  description: string
  image: string
  status: string
}

// Estados reactivos
const searchQuery = ref<string>('')
const selectedStatus = ref<string>('Todos')
const currentPage = ref<number>(1)
const rowsPerPage = ref<number>(5)

// Datos de muestra con imágenes acordes a los servicios
const services = ref<Service[]>([
  {
    id: 1,
    title: 'Shows Privados',
    description: 'Disfruta de un espectáculo exclusivo con nuestras talentosas bailarinas en la privacidad de tu evento.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 2,
    title: 'Despedidas de Soltero',
    description: 'Paquetes especiales para despedidas de soltero con múltiples bailarinas, shows temáticos y servicio personalizado.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 3,
    title: 'Eventos Corporativos',
    description: 'Entretenimiento elegante y profesional para eventos corporativos, con bailarinas de alto nivel y shows personalizados.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 4,
    title: 'Experiencias Temáticas',
    description: 'Ambientes personalizados según tus preferencias y temáticas exclusivas para ocasiones especiales.',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop',
    status: 'Inactivo'
  },
  {
    id: 5,
    title: 'Shows Privados VIP',
    description: 'Espectáculo de alta categoría con atención exclusiva para clientes preferenciales.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 6,
    title: 'Fiestas Temáticas de Verano',
    description: 'Ambientación y entretenimiento especial para eventos de temporada.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop',
    status: 'Inactivo'
  },
  {
    id: 7,
    title: 'Show Nocturno Ejecutivo',
    description: 'Presentaciones ejecutivas nocturnas con un toque de elegancia y diversión garantizada.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 8,
    title: 'Despedidas Mixtas',
    description: 'Entretenimiento versátil y dinámico diseñado para grupos mixtos y celebraciones especiales.',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 9,
    title: 'Aniversarios Exclusivos',
    description: 'Celebra tus fechas importantes con un show privado adaptado a la ocasión.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop',
    status: 'Inactivo'
  },
  {
    id: 10,
    title: 'Reuniones de Gala',
    description: 'Espectáculos sofisticados ideales para cenas de gala y congresos profesionales.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 11,
    title: 'Banquete y Espectáculo',
    description: 'Combinación perfecta de gastronomía fina y shows artísticos en vivo.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 12,
    title: 'Noche de Máscaras',
    description: 'Fiesta temática misteriosa con bailarinas enmascaradas y coreografías únicas.',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop',
    status: 'Inactivo'
  },
  {
    id: 13,
    title: 'Show Tropical Deluxe',
    description: 'Ambiente playero y tropical con vestuarios coloridos y ritmos caribeños.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 14,
    title: 'Cumpleaños Temáticos',
    description: 'Haz que tu cumpleaños sea inolvidable con sorpresas y espectáculos a medida.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 15,
    title: 'Show de Luces y Baile',
    description: 'Espectáculo moderno que combina tecnología LED, música electrónica y coreografías impactantes.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 16,
    title: 'Fiestas de Fin de Año',
    description: 'Paquetes especiales para recibir el año nuevo con el mejor entretenimiento de la ciudad.',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop',
    status: 'Inactivo'
  },
  {
    id: 17,
    title: 'Cocktail Lounge Show',
    description: 'Presentaciones sutiles y elegantes para amenizar cócteles y reuniones de negocios.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 18,
    title: 'Despedida Soltera Gold',
    description: 'El paquete definitivo para novias que buscan exclusividad, diversión y seguridad.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 19,
    title: 'Lanzamiento de Producto',
    description: 'Atrae miradas y dale un toque innovador a la presentación de tu marca o empresa.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 20,
    title: 'Noche de Casino y Show',
    description: 'Entorno de casino clásico acompañado de espectáculos artísticos personalizados.',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop',
    status: 'Inactivo'
  },
  {
    id: 21,
    title: 'Show Neón Glow',
    description: 'Espectáculo con pintura corporal fluorescente, luces UV y coreografías vibrantes.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 22,
    title: 'Fiestas en Yates',
    description: 'Entretenimiento exclusivo para celebraciones privadas a bordo de embarcaciones de lujo.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 23,
    title: 'Cenas Espectáculo',
    description: 'Disfruta de una cena privada mientras presencias actos artísticos de nivel internacional.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 24,
    title: 'Show Retro 80s y 90s',
    description: 'Un viaje en el tiempo con la mejor música y estética de décadas pasadas.',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop',
    status: 'Inactivo'
  },
  {
    id: 25,
    title: 'Reuniones de Graduación',
    description: 'Celebra el fin de tus estudios superiores con un show a la altura de tu esfuerzo.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 26,
    title: 'Show Burlesque Moderno',
    description: 'Arte, sensualidad y elegancia fusionados en un espectáculo escénico fascinante.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 27,
    title: 'Convenciones de Negocios',
    description: 'Espectáculo de bienvenida para impresionar a socios e inversores internacionales.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 28,
    title: 'Fiestas de Disfraces',
    description: 'Ambientación lúdica con personajes interactivos y coreografías temáticas.',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop',
    status: 'Inactivo'
  },
  {
    id: 29,
    title: 'Show Urbano Street',
    description: 'Bailes urbanos, hip-hop y coreografías modernas con gran energía y dinamismo.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 30,
    title: 'Eventos Deportivos VIP',
    description: 'Entretenimiento exclusivo para palcos y áreas VIP en eventos deportivos masivos.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 31,
    title: 'Show Oriental Místico',
    description: 'Danzas tradicionales con un toque contemporáneo y escenografía deslumbrante.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 32,
    title: 'Fiestas de San Valentín',
    description: 'Ambiente romántico y sensual diseñado para parejas y enamorados.',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop',
    status: 'Inactivo'
  },
  {
    id: 33,
    title: 'Show Latina Caliente',
    description: 'Ritmos latinos intensos con bailarines profesionales y música en vivo.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 34,
    title: 'Despedida Soltero Extrema',
    description: 'Aventura y entretenimiento nocturno sin restricciones para grupos de amigos.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 35,
    title: 'Noche de Jazz y Glamour',
    description: 'Ambiente sofisticado de los años 20 con música de jazz y performance visual.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 36,
    title: 'Inauguración de Locales',
    description: 'Atrae la atención de potenciales clientes en la apertura de tu nuevo negocio.',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop',
    status: 'Inactivo'
  },
  {
    id: 37,
    title: 'Show Fuego y Pasión',
    description: 'Espectáculo visual con efectos de fuego controlado y danzas apasionadas.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 38,
    title: 'Reuniones de Direct directorio',
    description: 'Servicio privado y discreto para altas esferas empresariales.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 39,
    title: 'Festival de Verano Private',
    description: 'Fiesta privada al aire libre con múltiples atracciones y escenarios.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 40,
    title: 'Show Cyberpunk 2077',
    description: 'Temática futurista inspirada en la ciencia ficción con trajes LED y láseres.',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop',
    status: 'Inactivo'
  },
  {
    id: 41,
    title: 'Aniversario de Bodas de Oro',
    description: 'Celebración elegante y emotiva con shows personalizados para la familia.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 42,
    title: 'Fiestas de Halloween VIP',
    description: 'Noche de brujas terroríficamente elegante con bailarinas y performance oscuro.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 43,
    title: 'Show Hollywood Glam',
    description: 'Alfombra roja, flashes de paparazzi y un espectáculo digno de las estrellas.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 44,
    title: 'Despedida Soltera Playa',
    description: 'Paquete especial para celebraciones en casas de playa o resorts.',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop',
    status: 'Inactivo'
  },
  {
    id: 45,
    title: 'Show de Percusión y Baile',
    description: 'Fusión enérgica de percusión en vivo y coreografías imponentes.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 46,
    title: 'Reuniones de Ex-Alumnos',
    description: 'Reencuentros memorables amenizados con música y espectáculos dinámicos.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 47,
    title: 'Show Vegas Style',
    description: 'Lujo, plumas, brillo y el mejor entretenimiento clásico al estilo Las Vegas.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 48,
    title: 'Fiestas Privadas en Cabañas',
    description: 'Entretenimiento exclusivo para retiros y eventos privados en zonas campestres.',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop',
    status: 'Inactivo'
  },
  {
    id: 49,
    title: 'Show Acrobático Aéreo',
    description: 'Acrobacias en telas y aros combinadas con danza contemporánea.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 50,
    title: 'Cocktail de Fin de Temporada',
    description: 'Cierra el ciclo anual de tu empresa con un evento inolvidable.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 51,
    title: 'Show Árabe Moderno',
    description: 'Danza del vientre con fusiones electrónicas y vestuarios iluminados.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 52,
    title: 'Despedida Soltero VIP Elite',
    description: 'El servicio más exclusivo para quienes buscan lujo absoluto y privacidad total.',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop',
    status: 'Inactivo'
  },
  {
    id: 53,
    title: 'Show de Magia y Sensualidad',
    description: 'Ilusionismo combinado con la elegancia de un show coreográfico único.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 54,
    title: 'Fiestas Temáticas de Carnaval',
    description: 'Color, plumas, disfraces y alegría desbordante para tus invitados.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 55,
    title: 'Show Flamenco Fusión',
    description: 'Pasión flamenca adaptada con ritmos modernos y cuadros de baile impactantes.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 56,
    title: 'Reuniones de Promoción',
    description: 'Celebra los logros académicos con un espectáculo vibrante y moderno.',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop',
    status: 'Inactivo'
  },
  {
    id: 57,
    title: 'Show Rock & Roll Session',
    description: 'Actitud rockera, cuero y coreografías llenas de adrenalina y energía.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 58,
    title: 'Fiestas Privadas en Penthouse',
    description: 'Entretenimiento de altura para eventos exclusivos en las mejores terrazas y penthouses.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 59,
    title: 'Show de Tango Argentino',
    description: 'Elegancia, sensualidad y técnica milonguera llevada al escenario principal.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 60,
    title: 'Noche de Gala Benéfica',
    description: 'Espectáculo sofisticado para eventos filantrópicos y recaudación de fondos.',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop',
    status: 'Inactivo'
  },
  {
    id: 61,
    title: 'Show Disco 70s',
    description: 'Bolas disco, plataformas y la mejor música bailable de la época dorada.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 62,
    title: 'Despedida Soltera Deluxe',
    description: 'Paquete completo que incluye animación, juegos y shows personalizados.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 63,
    title: 'Show Broadway Night',
    description: 'Musicales al estilo Broadway con coreografías teatrales de primer nivel.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 64,
    title: 'Fiestas Privadas de Cumpleaños 30',
    description: 'Celebra tu tercera década con un espectáculo inolvidable y exclusivo.',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop',
    status: 'Inactivo'
  },
  {
    id: 65,
    title: 'Show K-Pop Dance Cover',
    description: 'Coreografías precisas y alta energía inspiradas en las tendencias asiáticas.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 66,
    title: 'Eventos de Lanzamiento Inmobiliario',
    description: 'Entretenimiento elegante para mostrar proyectos de vivienda de lujo.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 67,
    title: 'Show Hawaii Luau',
    description: 'Ambientación tropical con danzas polinésicas y rituales de fuego.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 68,
    title: 'Fiestas Privadas en Fincas',
    description: 'Shows al aire libre con total privacidad y logística garantizada.',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop',
    status: 'Inactivo'
  },
  {
    id: 69,
    title: 'Show Baile de Máscaras Venecianas',
    description: 'Magia, misterio y vestuarios de época inspirados en el carnaval de Venecia.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 70,
    title: 'Reuniones de Cierre de Ventas',
    description: 'Premia a tu equipo de ventas con un evento de entretenimiento de alta gama.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 71,
    title: 'Show Bollywood Dreams',
    description: 'Colores vibrantes, música hindú y coreografías exóticas espectaculares.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 72,
    title: 'Despedida Soltero VIP Platinum',
    description: 'Servicio superior con atenciones especiales y transporte privado incluido.',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop',
    status: 'Inactivo'
  },
  {
    id: 73,
    title: 'Show de Salsa Acrobática',
    description: 'Giros vertiginosos y ritmo caribeño llevado al extremo profesional.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 74,
    title: 'Fiestas Privadas de Aniversario Empresa',
    description: 'Conmemora los años de trayectoria de tu organización con estilo.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 75,
    title: 'Show Estelar Nocturno',
    description: 'El show principal de la noche con las mejores bailarinas y efectos de luces.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 76,
    title: 'Fiestas Temáticas de Vaqueros',
    description: 'Estética western con música country, baile y animación temática.',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop',
    status: 'Inactivo'
  },
  {
    id: 77,
    title: 'Show Techno Dance',
    description: 'Bases electrónicas pesadas y coreografías futuristas de alto impacto.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 78,
    title: 'Despedida Soltero Express',
    description: 'Paquete rápido y directo para celebraciones de última hora con máxima energía.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 79,
    title: 'Show de Danza Contemporánea',
    description: 'Arte expresivo y emotivo para eventos culturales y presentaciones selectas.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 80,
    title: 'Reuniones de Directores de Marketing',
    description: 'Entretenimiento exclusivo para networking empresarial de alto nivel.',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop',
    status: 'Inactivo'
  },
  {
    id: 81,
    title: 'Show Baile de Antifaces',
    description: 'Noche llena de intriga y elegancia con antifaces venecianos y música en vivo.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 82,
    title: 'Fiestas Privadas de Bienvenida',
    description: 'Recibe a ejecutivos o familiares venidos del extranjero con un gran espectáculo.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 83,
    title: 'Show Funk & Soul',
    description: 'Ritmos groove y coreografías llenas de estilo y sabor retro.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 84,
    title: 'Despedida Soltera Glamour Total',
    description: 'El paquete definitivo enfocado en la estética, belleza y diversión elegante.',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop',
    status: 'Inactivo'
  },
  {
    id: 85,
    title: 'Show Reggaeton Urbano Live',
    description: 'Los ritmos urbanos del momento interpretados por bailarines profesionales.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 86,
    title: 'Eventos de Cierre de Año Fiscal',
    description: 'Celebra el cumplimiento de metas financieras con un show de categoría.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 87,
    title: 'Show Baile de Fantasía',
    description: 'Diseños de vestuario fantásticos y coreografías inspiradas en cuentos épicos.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 88,
    title: 'Fiestas Privadas en Azoteas',
    description: 'Disfruta de la vista de la ciudad acompañada de un show exclusivo en rooftop.',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop',
    status: 'Inactivo'
  },
  {
    id: 89,
    title: 'Show Baile de Salon VIP',
    description: 'Vals, foxtrot y piezas clásicas interpretadas con máxima distinción.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 90,
    title: 'Reuniones de Liderazgo Ejecutivo',
    description: 'Entretenimiento discreto y refinado para altas jerarquías corporativas.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 91,
    title: 'Show Cabaret Parisino',
    description: 'Estética de Moulin Rouge con plumas, corsés y coreografías francesas.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 92,
    title: 'Despedida Soltero Experiencia Total',
    description: 'Paquete de fin de semana con múltiples actividades y shows privados.',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop',
    status: 'Inactivo'
  },
  {
    id: 93,
    title: 'Show Electrónico Subterráneo',
    description: 'Ambiente underground con música electronic house y bailarinas estelares.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 94,
    title: 'Fiestas de Gala Anuales',
    description: 'El evento social más importante del año con producción integral de espectáculos.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 95,
    title: 'Show de Danzas del Mundo',
    description: 'Un recorrido cultural y artístico por diferentes expresiones de danza global.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 96,
    title: 'Fiestas Privadas de CUMPLE 40',
    description: 'Celebra la madurez con un evento elegante, divertido y sorprendente.',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop',
    status: 'Inactivo'
  },
  {
    id: 97,
    title: 'Show Baile de Gala Nocturna',
    description: 'Actuaciones artísticas exclusivas para cenas de gala de alta sociedad.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 98,
    title: 'Despedida Soltero VIP Diamond',
    description: 'El estándar más alto de exclusividad y entretenimiento nocturno privado.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 99,
    title: 'Show Especial de Aniversario',
    description: 'Conmemora cualquier hito importante con un show personalizado al 100%.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 100,
    title: 'Gran Show Final de Temporada',
    description: 'El cierre perfecto con todas las bailarinas y un espectáculo inolvidable.',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop',
    status: 'Inactivo'
  }
])
// Función para refrescar la data / limpiar filtros
const refreshData = () => {
  searchQuery.value = ''
  selectedStatus.value = 'Todos'
  currentPage.value = 1
}

// Función para eliminar un servicio por su id
const deleteService = (id: number) => {
  services.value = services.value.filter(service => service.id !== id)
  if (paginatedServices.value.length === 0 && currentPage.value > 1) {
    currentPage.value--
  }
}

// Propiedad computada para filtrar por texto y estado en tiempo real
const filteredServices = computed(() => {
  return services.value.filter(service => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesStatus =
      selectedStatus.value === 'Todos' || service.status === selectedStatus.value

    return matchesSearch && matchesStatus
  })
})

// Total de páginas basadas en el resultado filtrado
const totalPages = computed(() => {
  return Math.ceil(filteredServices.value.length / rowsPerPage.value) || 1
})

// Volver a la página 1 cuando cambie el filtro o la búsqueda
watch([searchQuery, selectedStatus], () => {
  currentPage.value = 1
})

// Elementos que se muestran en la tabla según la paginación actual
const paginatedServices = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value
  const end = start + Number(rowsPerPage.value)
  return filteredServices.value.slice(start, end)
})

// Índices para el texto "Showing X - Y of Z"
const startIndex = computed(() => {
  if (filteredServices.value.length === 0) return 0
  return (currentPage.value - 1) * Number(rowsPerPage.value) + 1
})

const endIndex = computed(() => {
  return Math.min(currentPage.value * Number(rowsPerPage.value), filteredServices.value.length)
})

// Algoritmo profesional de la industria para generar los números y puntos suspensivos
const displayedPages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const pages: (number | string)[] = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', total)
    } else if (current >= total - 3) {
      pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total)
    } else {
      pages.push(1, '...', current - 1, current, current + 1, '...', total)
    }
  }
  return pages
})
</script>

<template>
  <div class="p-8 space-y-8 bg-[#0b0f19] min-h-screen text-slate-100 font-sans">

    <div class="space-y-2">
      <h1 class="text-2xl font-bold text-white tracking-wide">Mantenimiento Sección: Servicios</h1>
      <p class="text-sm text-slate-400">Personaliza los títulos principales, el contenido descriptivo y las imágenes de los servicios de la landing.</p>
    </div>

    <div class="bg-[#0b0f19] p-6 rounded-2xl border border-slate-800/80 shadow-xl space-y-6">
      <div class="flex justify-between items-center border-b border-slate-800 pb-4">
        <div class="flex items-center gap-3">
          <span class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold border border-emerald-500/20">H</span>
          <h2 class="text-base font-semibold text-white">Encabezado de la Sección</h2>
        </div>
        <button class="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#121824] hover:bg-slate-800 text-slate-200 rounded-xl border border-slate-700/60 transition-all flex items-center gap-2 cursor-pointer">
          <font-awesome-icon icon="pen-to-square" /> Habilitar Edición
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Título Principal (Ej. Nuestros Servicios)</label>
          <input
            type="text"
            disabled
            value="Nuestros Servicios"
            class="w-full bg-[#121824] border border-slate-800 rounded-xl px-4 py-3 text-slate-300 text-sm focus:outline-none opacity-80 cursor-not-allowed"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Subtítulo de Cabecera</label>
          <input
            type="text"
            disabled
            value="Ofrecemos una amplia gama de servicios de entretenimiento adaptados a tus necesidades."
            class="w-full bg-[#121824] border border-slate-800 rounded-xl px-4 py-3 text-slate-300 text-sm focus:outline-none opacity-80 cursor-not-allowed"
          />
        </div>
      </div>

      <div class="flex justify-end pt-2">
        <button class="px-5 py-2.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 text-sm font-medium rounded-xl border border-emerald-500/30 transition-all flex items-center gap-2 cursor-pointer">
          <font-awesome-icon icon="floppy-disk" /> Guardar Cambios
        </button>
      </div>
    </div>

    <div class="bg-[#0b0f19] rounded-2xl border border-slate-800/80 shadow-xl overflow-hidden">

      <div class="p-6 border-b border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent">
        <div>
          <h2 class="text-base font-bold text-white">Gestión de Servicios</h2>
          <p class="text-xs text-slate-400">Administra las tarjetas y contenidos que se muestran en el sitio web.</p>
        </div>

        <div class="flex items-center gap-3 w-full md:w-auto justify-end flex-wrap">
          <div class="relative w-full sm:w-64">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <font-awesome-icon icon="magnifying-glass" class="text-xs" />
            </span>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Buscar servicio..."
              class="w-full bg-[#121824] border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors shadow-sm"
            />
          </div>

          <div class="relative w-full sm:w-44">
            <select
              v-model="selectedStatus"
              class="w-full bg-[#121824] border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors appearance-none cursor-pointer shadow-sm"
            >
              <option value="Todos">Todos los estados</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
            <span class="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 pointer-events-none">
              <font-awesome-icon icon="chevron-down" class="text-xs" />
            </span>
          </div>

          <button
            @click="refreshData"
            class="w-[38px] h-[38px] bg-[#121824] border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-xl transition-all flex items-center justify-center shadow-sm cursor-pointer"
            title="Refrescar data"
          >
            <font-awesome-icon icon="sync" class="text-xs" />
          </button>

          <button class="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shadow-lg shadow-emerald-900/20 cursor-pointer">
            <font-awesome-icon icon="plus" class="text-xs" /> Nuevo Servicio
          </button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-[#0b0f19]">
              <th class="py-4 px-6">Imagen</th>
              <th class="py-4 px-6">Título (Title)</th>
              <th class="py-4 px-6">Descripción (Description)</th>
              <th class="py-4 px-6">Estado</th>
              <th class="py-4 px-6 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/60 text-sm text-slate-300">
            <tr v-for="service in paginatedServices" :key="service.id" class="hover:bg-slate-800/20 transition-colors">
              <td class="py-4 px-6">
                <img :src="service.image" alt="Preview" class="w-14 h-10 object-cover rounded-lg border border-slate-700 shadow-sm" />
              </td>
              <td class="py-4 px-6 font-medium text-white">{{ service.title }}</td>
              <td class="py-4 px-6 text-slate-400 max-w-xs truncate">{{ service.description }}</td>
              <td class="py-4 px-6">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> {{ service.status }}
                </span>
              </td>
              <td class="py-4 px-6 text-right space-x-3">
                <button class="text-slate-400 hover:text-white transition-colors p-1 cursor-pointer" title="Editar">
                  <font-awesome-icon icon="pen-to-square" class="text-sm" />
                </button>
                <button @click="deleteService(service.id)" class="text-slate-400 hover:text-white transition-colors p-1 cursor-pointer" title="Eliminar">
                  <font-awesome-icon icon="trash" class="text-sm" />
                </button>
              </td>
            </tr>
            <tr v-if="paginatedServices.length === 0">
              <td colspan="5" class="py-12 text-center text-slate-500">
                No se encontraron servicios que coincidan con la búsqueda.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="p-4 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
        <div class="flex items-center gap-2">
          <span>Showing {{ startIndex }} - {{ endIndex }} of {{ filteredServices.length }}</span>
          <div class="flex items-center gap-1.5 ml-4">
            <span>Rows</span>
            <select v-model="rowsPerPage" @change="currentPage = 1" class="bg-[#121824] border border-slate-800 rounded-lg px-2.5 py-1 text-slate-300 focus:outline-none cursor-pointer">
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="20">20</option>
            </select>
          </div>
        </div>

        <div class="flex items-center gap-1">
          <button
            @click="currentPage > 1 && currentPage--"
            :disabled="currentPage === 1"
            class="w-8 h-8 flex items-center justify-center rounded-lg bg-[#121824] border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            &lt;
          </button>

          <template v-for="(page, index) in displayedPages" :key="index">
            <span v-if="page === '...'" class="w-8 h-8 flex items-center justify-center text-slate-500 font-bold">
              ...
            </span>
            <button
              v-else
              @click="currentPage = Number(page)"
              :class="[
                'w-8 h-8 flex items-center justify-center rounded-lg font-semibold shadow-sm cursor-pointer transition-all',
                currentPage === page ? 'bg-emerald-600 text-white' : 'bg-[#121824] border border-slate-800 text-slate-400 hover:bg-slate-800'
              ]"
            >
              {{ page }}
            </button>
          </template>

          <button
            @click="currentPage < totalPages && currentPage++"
            :disabled="currentPage === totalPages || totalPages === 0"
            class="w-8 h-8 flex items-center justify-center rounded-lg bg-[#121824] border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            &gt;
          </button>
        </div>
      </div>

    </div>

  </div>
</template>
