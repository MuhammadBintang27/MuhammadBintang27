export const TECH_STACK_BASE = [
  {
    name: 'React',
    icon: '/tech/react.svg',
    short: 'RE',
    label: 'Frontend core',
    description: 'Builds interactive and dynamic user interfaces with a component-based architecture.',
  },
  {
    name: 'Next.js',
    icon: '/tech/nextdotjs.svg',
    short: 'NX',
    label: 'Full-stack web',
    description: 'Provides routing, server-side rendering, and modern tooling for scalable web applications.',
  },
  {
    name: 'Node.js',
    icon: '/tech/nodedotjs.svg',
    short: 'ND',
    label: 'Runtime backend',
    description: 'Powers fast and scalable backend services, APIs, and automation workflows.',
  },
  {
    name: 'GitHub',
    icon: '/tech/github.svg',
    short: 'GH',
    label: 'Collaboration',
    description: 'Enables version control, team collaboration, and streamlined development workflows.',
  },
  {
    name: 'Express',
    icon: '/tech/express.svg',
    short: 'EX',
    label: 'API framework',
    description: 'Lightweight framework for building RESTful APIs and backend services.',
  },
  {
    name: 'MongoDB',
    icon: '/tech/mongodb.svg',
    short: 'MG',
    label: 'NoSQL database',
    description: 'Flexible document database designed for rapid development and evolving data structures.',
  },
  {
    name: 'Laravel',
    icon: '/tech/laravel.svg',
    short: 'LV',
    label: 'PHP framework',
    description: 'Robust framework for building secure and maintainable web applications.',
  },
  {
    name: 'MySQL',
    icon: '/tech/mysql.svg',
    short: 'MY',
    label: 'SQL database',
    description: 'Reliable relational database for structured data and complex queries.',
  },
  {
    name: 'TensorFlow',
    icon: '/tech/tensorflow.svg',
    short: 'TF',
    label: 'Machine learning',
    description: 'Framework for developing, training, and deploying machine learning models.',
  },
  {
    name: 'PyTorch',
    icon: '/tech/pytorch.svg',
    short: 'PT',
    label: 'Deep learning',
    description: 'Popular deep learning framework for research, experimentation, and production AI.',
  },
  {
    name: 'Flutter',
    icon: '/tech/flutter.svg',
    short: 'FL',
    label: 'Cross-platform mobile',
    description: 'Builds high-performance mobile applications from a single codebase.',
  },
  {
    name: 'Kotlin',
    icon: '/tech/kotlin.svg',
    short: 'KT',
    label: 'Android development',
    description: 'Modern programming language for creating native Android applications.',
  },
  {
    name: 'TypeScript',
    icon: '/tech/typescript.svg',
    short: 'TS',
    label: 'Typed JavaScript',
    description: 'Enhances JavaScript with static typing for safer and more maintainable code.',
  },
  {
    name: 'Tailwind CSS',
    icon: '/tech/tailwindcss.svg',
    short: 'TW',
    label: 'CSS framework',
    description: 'Utility-first framework for building responsive and modern user interfaces.',
  },
  {
    name: 'Python',
    icon: '/tech/python.svg',
    short: 'PY',
    label: 'Programming language',
    description: 'Versatile language widely used for automation, data science, AI, and backend development.',
  },
  {
    name: 'PostgreSQL',
    icon: '/tech/postgresql.svg',
    short: 'PG',
    label: 'Relational database',
    description: 'Advanced SQL database known for reliability, scalability, and performance.',
  },
  {
    name: 'Docker',
    icon: '/tech/docker.svg',
    short: 'DK',
    label: 'Containerization',
    description: 'Packages applications into portable containers for consistent deployment.',
  },
  {
    name: 'Vue.js',
    icon: '/tech/vue.svg',
    short: 'VU',
    label: 'Frontend framework',
    description: 'Progressive JavaScript framework for building modern and reactive interfaces.',
  },
  {
    name: 'Vercel',
    icon: '/tech/vercel.svg',
    short: 'VC',
    label: 'Deployment platform',
    description: 'Optimized platform for deploying frontend and full-stack web applications.',
  },
  {
    name: 'OpenCV',
    icon: '/tech/opencv.svg',
    short: 'CV',
    label: 'Computer vision',
    description: 'Open-source library for image processing and computer vision applications.',
  },
  {
    name: 'Scikit-Learn',
    icon: '/tech/python.svg',
    short: 'SK',
    label: 'Machine learning',
    description: 'Comprehensive toolkit for classical machine learning and data analysis.',
  },
  {
    name: 'OpenAI',
    icon: '/tech/openai.svg',
    short: 'LX',
    label: 'AI services',
    description: 'Provides powerful AI models and APIs for natural language processing, computer vision, and more.',
  },
  {
    name: 'Github',
    icon: '/tech/github.svg',
    short: 'GT',
    label: 'Version control',
    description: 'Tracks code changes and supports efficient collaboration across development teams.',
  },
  {
    name: 'FastAPI',
    icon: '/tech/fastapi.svg',
    short: 'FA',
    label: 'Python backend',
    description: 'High-performance framework for building modern APIs with Python.',
  },
];

// Original cool-toned keycap colors, keyed by tech name (professional theme).
const PROFESSIONAL_COLORS = {
  React: '#61dafb',
  'Next.js': '#f8fafc',
  'Node.js': '#4ade80',
  GitHub: '#c084fc',
  Express: '#38bdf8',
  MongoDB: '#34d399',
  Laravel: '#fb7185',
  MySQL: '#60a5fa',
  TensorFlow: '#fb923c',
  PyTorch: '#f97316',
  Flutter: '#22d3ee',
  Kotlin: '#a78bfa',
  TypeScript: '#3178c6',
  'Tailwind CSS': '#06b6d4',
  Python: '#facc15',
  PostgreSQL: '#3b82f6',
  Docker: '#0ea5e9',
  'Vue.js': '#42b883',
  Vercel: '#ffffff',
  OpenCV: '#ef4444',
  'Scikit-Learn': '#f97316',
  OpenAI: '#eab308',
  Github: '#f97316',
  FastAPI: '#14b8a6',
};

// Red + yellow keycap pool for the Playful theme — matches the reference
// macropad: vivid comic red and golden yellow caps scattered across a black
// deck. The pool length (7) is coprime with the 4-column grid, so the two
// colours land in a checkerboard-ish scatter instead of solid vertical stripes.
const PLAYFUL_WARM_POOL = [
  '#E5301E', // red
  '#FDBE12', // bright golden yellow
  '#FFC21E', // bright yellow
  '#D9291A', // deep red
  '#FFC81F', // brightest yellow
  '#E5301E', // red
  '#FDBE12', // bright golden yellow
];

const PLAYFUL_COLORS = TECH_STACK_BASE.reduce((acc, skill, index) => {
  acc[skill.name] = PLAYFUL_WARM_POOL[index % PLAYFUL_WARM_POOL.length];
  return acc;
}, {});

export const TECH_STACK_COLORS = {
  professional: PROFESSIONAL_COLORS,
  playful: PLAYFUL_COLORS,
};
