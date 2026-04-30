/**
 * ============================================================
 *  SITE CONFIGURATION — Parameterizable
 * ============================================================
 *  All company info, colors, contacts, plans, services, etc.
 *  are defined here. In the future this will come from an API.
 * ============================================================
 */

const siteConfig = {
  /* ───────── Company ───────── */
  company: {
    name: 'Nuxelit',
    tagline: 'El núcleo de tu transformación digital',
    description:
      'Somos un equipo de desarrollo especializado en crear soluciones digitales innovadoras, escalables y de alto rendimiento. Combinamos ingeniería de software, inteligencia artificial y diseño centrado en el usuario para impulsar empresas hacia su máximo potencial.',
    logo: '/images/logos/logo.svg',
    foundedYear: 2020,
  },

  /* ───────── Theme / Colors ───────── */
  theme: {
    primary: '#6C3CE1',       // Purple
    primaryLight: '#8B5CF6',
    primaryDark: '#5B21B6',
    secondary: '#0EA5E9',     // Cyan
    secondaryLight: '#38BDF8',
    accent: '#F97316',        // Orange
    accentLight: '#FB923C',
    background: '#0B0F1A',    // Deep dark
    backgroundLight: '#111827',
    backgroundCard: '#1A1F35',
    surface: '#1E293B',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    border: '#334155',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    gradient: 'linear-gradient(135deg, #6C3CE1 0%, #0EA5E9 50%, #F97316 100%)',
    gradientSubtle: 'linear-gradient(135deg, #6C3CE1 0%, #0EA5E9 100%)',
  },

  /* ───────── Contact Info ───────── */
  contact: {
    email: 'contacto@Nuxelit.com',
    salesEmail: 'ventas@Nuxelit.com',
    phone: '+57 302 406 1472',
    phoneRaw: '573024061472',
    whatsapp: '573024061472',
    whatsappMessage: '¡Hola! Me interesa conocer más sobre sus servicios de desarrollo.',
    address: 'Calle 100 #19-61, Bogotá, Colombia',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.123456!2d-74.05!3d4.68!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1',
    social: {
      linkedin: 'https://linkedin.com/company/Nuxelit',
      github: 'https://github.com/Nuxelit',
      twitter: 'https://twitter.com/Nuxelit',
      instagram: 'https://instagram.com/Nuxelit',
      youtube: 'https://youtube.com/@Nuxelit',
    },
  },

  /* ───────── Navigation ───────── */
  navigation: [
    { label: 'Inicio', href: '#hero' },
    { label: 'Servicios', href: '#services' },
    { label: 'Planes', href: '#plans' },
    { label: 'IA & Chatbots', href: '#ai-showcase' },
    { label: 'Portafolio', href: '#portfolio' },
    { label: 'Equipo', href: '#team' },
    { label: 'Contacto', href: '#contact' },
  ],

  /* ───────── Services ───────── */
  services: [
    {
      id: 'web-dev',
      icon: 'FaCode',
      title: 'Desarrollo Web',
      description: 'Aplicaciones web modernas con React, Next.js, Vue y Angular. Interfaces responsivas y de alto rendimiento.',
      image: '/images/services/web-dev.jpg',
    },
    {
      id: 'mobile-dev',
      icon: 'FaMobileAlt',
      title: 'Desarrollo Móvil',
      description: 'Apps nativas e híbridas para iOS y Android con React Native, Flutter y Swift.',
      image: '/images/services/mobile-dev.jpg',
    },
    {
      id: 'backend',
      icon: 'FaServer',
      title: 'Backend & APIs',
      description: 'Arquitecturas escalables con Node.js, Python, Java y microservicios en la nube.',
      image: '/images/services/backend.jpg',
    },
    {
      id: 'ai-ml',
      icon: 'FaRobot',
      title: 'IA & Machine Learning',
      description: 'Modelos de IA, chatbots inteligentes, procesamiento de lenguaje natural y visión computacional.',
      image: '/images/services/ai-ml.jpg',
    },
    {
      id: 'cloud',
      icon: 'FaCloud',
      title: 'Cloud & DevOps',
      description: 'Infraestructura en AWS, Azure y GCP. CI/CD, contenedores y orquestación.',
      image: '/images/services/cloud.jpg',
    },
    {
      id: 'consulting',
      icon: 'FaChartLine',
      title: 'Consultoría Digital',
      description: 'Estrategia tecnológica, transformación digital y optimización de procesos para tu negocio.',
      image: '/images/services/consulting.jpg',
    },
  ],

  /* ───────── Pricing Plans ───────── */
  plans: [
    {
      id: 'starter',
      name: 'Starter',
      subtitle: 'Ideal para emprendedores',
      price: '2.500.000',
      currency: 'COP',
      period: '/proyecto',
      highlighted: false,
      features: [
        'Landing page responsive',
        'Hasta 5 secciones',
        'Formulario de contacto',
        'SEO básico',
        'Hosting 3 meses incluido',
        'Soporte por email',
      ],
      cta: 'Comenzar',
    },
    {
      id: 'professional',
      name: 'Professional',
      subtitle: 'Para empresas en crecimiento',
      price: '8.000.000',
      currency: 'COP',
      period: '/proyecto',
      highlighted: true,
      badge: 'Más Popular',
      features: [
        'Aplicación web completa',
        'Panel de administración',
        'Integración con APIs',
        'Base de datos',
        'Autenticación de usuarios',
        'SEO avanzado',
        'Hosting 6 meses incluido',
        'Soporte prioritario',
        'Módulo de IA básico',
      ],
      cta: 'Elegir Plan',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      subtitle: 'Soluciones a medida',
      price: 'Personalizado',
      currency: '',
      period: '',
      highlighted: false,
      features: [
        'Infraestructura completa',
        'Microservicios',
        'IA & Machine Learning',
        'Chatbot inteligente',
        'App móvil incluida',
        'Consultoría dedicada',
        'SLA garantizado',
        'Soporte 24/7',
        'Escalabilidad ilimitada',
      ],
      cta: 'Contactar',
    },
  ],

  /* ───────── AI / Chatbot Modules ───────── */
  aiModules: [
    {
      id: 'chatbot',
      icon: 'FaComments',
      title: 'Chatbot Inteligente',
      description: 'Asistente virtual 24/7 para atención al cliente, ventas y soporte técnico con NLP avanzado.',
      features: ['Respuestas contextuales', 'Multi-idioma', 'Escalamiento a agente humano', 'Analítica de conversaciones'],
    },
    {
      id: 'recommendation',
      icon: 'FaLightbulb',
      title: 'Motor de Recomendaciones',
      description: 'Sistema de recomendaciones personalizadas basado en comportamiento del usuario y machine learning.',
      features: ['Personalización en tiempo real', 'A/B testing automático', 'Segmentación inteligente'],
    },
    {
      id: 'document-ai',
      icon: 'FaFileAlt',
      title: 'Procesamiento de Documentos',
      description: 'Extracción inteligente de datos de documentos, facturas, contratos y formularios con OCR + IA.',
      features: ['OCR avanzado', 'Clasificación automática', 'Extracción de entidades', 'Validación inteligente'],
    },
    {
      id: 'analytics-ai',
      icon: 'FaBrain',
      title: 'Analítica Predictiva',
      description: 'Predicciones y insights basados en datos para tomar mejores decisiones de negocio.',
      features: ['Dashboards inteligentes', 'Alertas predictivas', 'Reportes automatizados'],
    },
  ],

  /* ───────── Portfolio Projects ───────── */
  portfolio: [
    {
      id: 'ecommerce',
      title: 'E-Commerce Premium',
      category: 'Web App',
      description: 'Plataforma de comercio electrónico con IA para recomendaciones de productos.',
      image: '/images/portfolio/ecommerce.jpg',
      tags: ['React', 'Node.js', 'MongoDB', 'AI'],
    },
    {
      id: 'fintech',
      title: 'FinTech Dashboard',
      category: 'Finanzas',
      description: 'Dashboard financiero con analítica predictiva y reportes en tiempo real.',
      image: '/images/portfolio/fintech.jpg',
      tags: ['Vue.js', 'Python', 'PostgreSQL', 'ML'],
    },
    {
      id: 'health-app',
      title: 'Health Tracker App',
      category: 'Móvil',
      description: 'Aplicación móvil de salud con seguimiento de métricas y asistente de IA.',
      image: '/images/portfolio/health.jpg',
      tags: ['React Native', 'Firebase', 'TensorFlow'],
    },
    {
      id: 'erp-system',
      title: 'ERP Empresarial',
      category: 'Enterprise',
      description: 'Sistema ERP completo con módulos de inventario, facturación y recursos humanos.',
      image: '/images/portfolio/erp.jpg',
      tags: ['Angular', 'Java', 'AWS', 'Microservices'],
    },
    {
      id: 'chatbot-platform',
      title: 'Chatbot Platform',
      category: 'IA',
      description: 'Plataforma de chatbots multicanal con entrenamiento de modelos personalizados.',
      image: '/images/portfolio/chatbot.jpg',
      tags: ['Python', 'NLP', 'React', 'Docker'],
    },
    {
      id: 'logistics',
      title: 'LogiTrack',
      category: 'Logística',
      description: 'Sistema de gestión logística con tracking en tiempo real y optimización de rutas.',
      image: '/images/portfolio/logistics.jpg',
      tags: ['Next.js', 'Go', 'Redis', 'Maps API'],
    },
  ],

  /* ───────── Team (optional, for future) ───────── */
  team: [
    { name: 'Carlos Méndez', role: 'CEO & Tech Lead', image: '/images/team/member1.jpg' },
    { name: 'Ana García', role: 'Frontend Architect', image: '/images/team/member2.jpg' },
    { name: 'Diego Torres', role: 'Backend Engineer', image: '/images/team/member3.jpg' },
    { name: 'Laura Rodríguez', role: 'AI/ML Engineer', image: '/images/team/member4.jpg' },
  ],

  /* ───────── Stats ───────── */
  stats: [
    { label: 'Proyectos Entregados', value: 150, suffix: '+' },
    { label: 'Clientes Satisfechos', value: 80, suffix: '+' },
    { label: 'Años de Experiencia', value: 6, suffix: '' },
    { label: 'Tecnologías', value: 40, suffix: '+' },
  ],

  /* ───────── Testimonials ───────── */
  testimonials: [
    {
      name: 'María López',
      company: 'TechStart Colombia',
      role: 'CEO',
      text: 'Nuxelit transformó nuestra visión en una plataforma increíble. Su equipo es excepcional y siempre van más allá de lo esperado.',
      avatar: '/images/team/member1.jpg',
      rating: 5,
    },
    {
      name: 'Roberto Sánchez',
      company: 'FinGroup',
      role: 'CTO',
      text: 'La solución de IA que implementaron aumentó nuestra eficiencia operativa en un 40%. Altamente recomendados.',
      avatar: '/images/team/member2.jpg',
      rating: 5,
    },
    {
      name: 'Patricia Herrera',
      company: 'E-Shop Plus',
      role: 'Directora Digital',
      text: 'Nuestro e-commerce creció un 200% desde que trabajamos con Nuxelit. Su expertise técnico es de primer nivel.',
      avatar: '/images/team/member3.jpg',
      rating: 5,
    },
  ],

  /* ───────── Tech Stack ───────── */
  techStack: [
    'React', 'Next.js', 'Vue.js', 'Angular', 'Node.js',
    'Python', 'Java', 'Go', 'TypeScript', 'Flutter',
    'React Native', 'AWS', 'Azure', 'GCP', 'Docker',
    'Kubernetes', 'MongoDB', 'PostgreSQL', 'Redis', 'GraphQL',
    'TensorFlow', 'PyTorch', 'OpenAI', 'Firebase', 'Figma',
  ],

  /* ───────── Quote Form Options ───────── */
  quoteOptions: {
    serviceTypes: [
      'Desarrollo Web',
      'Desarrollo Móvil',
      'Backend & APIs',
      'IA & Machine Learning',
      'Chatbot',
      'Cloud & DevOps',
      'Consultoría',
      'Otro',
    ],
    budgetRanges: [
      'Menos de $2M COP',
      '$2M - $5M COP',
      '$5M - $15M COP',
      '$15M - $50M COP',
      'Más de $50M COP',
    ],
    timelines: [
      'Menos de 1 mes',
      '1 - 3 meses',
      '3 - 6 meses',
      '6 - 12 meses',
      'Más de 12 meses',
    ],
  },

  /* ───────── API Endpoints ───────── */
  apiEndpoints: {
    baseUrl: import.meta.env?.VITE_API_URL || 'https://nuxelitback-production.up.railway.app/api/v1',
    submitQuote: '/quotes',
    submitContact: '/contact',
    getPlans: '/plans',
    getServices: '/services',
    getPortfolio: '/portfolio',
    getTestimonials: '/testimonials',
    getSiteConfig: '/site-config',
    chatbotSession: '/chatbot/session',
    chatbotMessage: '/chatbot/message',
    chatbotFeedback: '/chatbot/feedback',
    newsletterSubscribe: '/newsletter/subscribe',
    newsletterUnsubscribe: '/newsletter/unsubscribe',
    analyticsEvent: '/analytics/event',
  },
};

export default siteConfig;
