export interface SkillGroup {
  name: string;
  level: string;
  items: string[];
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  codeUrl?: string;
}

export interface Job {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

export const profile = {
  /** Shows in the navbar (the part after the dot is highlighted). */
  brandFirst: 'Naveen',
  brandSecond: 'Gubbala',

  /** Two lines of your name in the hero. Wrap a word in <em></em> to accent it. */
  nameLine1: 'Naveen',
  nameLine2: '<em>Gubbala</em>',

  available: 'Available for new work — 2026',

  /** Hero intro. Wrap key words in <strong></strong> to brighten them. */
  lede:
    'Frontend Software Engineer with <strong>5+ years of experience</strong> building scalable, high-performance web applications using Angular, React, TypeScript, JavaScript, and Ionic. Passionate about delivering responsive, user-centric digital experiences and cloud-native enterprise solutions.',

  /** About paragraphs. Use <span class="hl">…</span> for accented phrases. */
  about: [
    'I specialize in designing and developing modern web applications using Angular, React, TypeScript, and Ionic, with a strong focus on performance, maintainability, and scalable architecture.',
    'Throughout my career at Capgemini and PwC, I have collaborated with cross-functional teams to deliver enterprise-grade solutions, optimize frontend performance, mentor developers, and translate complex business requirements into <span class="hl">efficient technical solutions</span>.',
  ],

  facts: [
    { k: 'Based in', v: 'Bangalore, IN' },
    { k: 'Focus', v: 'Frontend Engineering' },
    { k: 'Experience', v: '5+ years' },
    { k: 'Currently', v: 'Senior Associate @ PwC' },
  ],

  email: 'naveengubbala800@gmail.com',

  /** Digits only, with country code, no '+' or spaces — used for tel: and WhatsApp. */
  phone: '919618647894',

  socials: [
    { label: 'GitHub', url: 'https://github.com/naveengubbala961?tab=repositories' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/naveen-gubbala-713814156' },
  ] as SocialLink[],
};

export const skills: SkillGroup[] = [
  {
    name: 'Languages',
    level: 'daily',
    items: ['JavaScript', 'TypeScript'],
  },
  {
    name: 'Frameworks',
    level: 'expert',
    items: [
      'Angular',
      'AngularJS',
      'React',
      'Ionic Angular',
      'RxJS',
      'NgRx',
      'Redux',
      'HTML5',
      'SCSS',
      'CSS',
      'jQuery',
    ],
  },
  {
    name: 'Tooling',
    level: 'fluent',
    items: [
      'VS Code',
      'Git',
      'GitHub',
      'GitLab',
      'Bitbucket',
      'Postman',
      'Swagger',
      'Figma',
      'Adobe XD',
      'MongoDB',
    ],
  },
  {
    name: 'Platform',
    level: 'working',
    items: [
      'AWS',
      'Azure DevOps',
      'GitLab CI/CD',
      'Angular Material',
      'Bootstrap',
      'JIRA',
      'Rally',
    ],
  },
];

export const projects: Project[] = [
  {
    title: 'Patient Portal - LHRC',
    description:
      'A comprehensive hospital management platform enabling patients, doctors, and administrators to manage appointments, medical records, consultations, prescriptions, and operational workflows through a unified digital ecosystem.',
    tags: ['Angular', 'Healthcare', 'REST APIs', 'Enterprise'],
  },
  {
    title: 'ResiYou',
    description:
      "Bayer's AI-driven platform that helps fruit and vegetable producers manage pesticide residues, optimize crop protection strategies, and ensure compliance with legal and market standards.",
    tags: ['Angular', 'AI Platform', 'Agriculture', 'Bayer'],
  },
  {
    title: 'Grape Vision',
    description:
      'An Angular-based application providing region-specific agricultural insights including weather forecasts and treatment recommendations to improve crop yield and decision-making.',
    tags: ['Angular', 'Agriculture', 'Data Visualization', 'Enterprise'],
  },
];

export const experience: Job[] = [
  {
    period: '2025 — Present',
    role: 'Senior Associate',
    company: 'PricewaterhouseCoopers (PwC)',
    location: 'Bangalore',
    description:
      'Led development of key product features, improved frontend rendering performance by 35%, optimized API interactions, mentored junior developers, participated in technical hiring, and collaborated with product and design teams to deliver scalable enterprise solutions.',
  },
  {
    period: '2021 — 2025',
    role: 'Software Engineer',
    company: 'Capgemini',
    location: 'Hyderabad',
    description:
      'Developed and optimized enterprise web applications using Angular and React, designed UI/UX solutions, integrated backend APIs, created technical documentation, participated in Agile delivery processes, and delivered cloud-native solutions for global clients including Bayer and Wabtec.',
  },
];

/** Used to build the nav + scrollspy. Order matters. */
export const sections = [
  { id: 'about', label: 'about' },
  { id: 'skills', label: 'skills' },
  { id: 'work', label: 'work' },
  { id: 'experience', label: 'experience' },
];
