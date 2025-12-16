import { Podcast, Sponsor, Testimonial } from './types';

export const PODCASTS: Podcast[] = [
  {
    id: '1615',
    name: '16.15 Podcast',
    category: 'Espiritualidade',
    description: 'Espiritualidade, fé e histórias transformadoras. A origem do nome vem da Bíblia (Marcos 16.15).',
    host: 'Rafael Soares (@rsoares16.15)',
    youtubeUrl: 'https://www.youtube.com/@1615PODCAST',
    subscribers: '4.209',
    views: '612.237',
    themeColor: '#D4AF37', // Gold
    image: 'logo-1615.png',
    stats: [
      { label: 'Alcance', value: '73 Países' },
      { label: 'Público Masc.', value: '67.5%' },
      { label: 'Idade Principal', value: '25-34 anos' }
    ],
    awards: [
      { year: '2024', title: 'Prêmio MPB', category: 'Espiritualidade', position: '1º' },
      { year: '2025', title: 'Prêmio MPB', category: 'Espiritualidade', position: '3º' }
    ]
  },
  {
    id: 'parada-obrigatoria',
    name: 'Parada Obrigatória',
    category: 'Automobilismo',
    description: 'O ponto de encontro para os amantes de motores e estradas.',
    host: 'Victor (@victorpaiva.oficial) e Rafael (@rafanapista)',
    youtubeUrl: 'https://www.youtube.com/@paradaobrigatoria16.15',
    subscribers: '10k+',
    views: '481.156',
    themeColor: '#ef4444', // Red
    image: 'logo-parada-obrigatoria.png',
    stats: [
      { label: 'Interações', value: '17.271' },
      { label: 'Público Masc.', value: '58.8%' },
      { label: 'Idade Principal', value: '25-34 anos' }
    ],
    awards: [
      { year: '2024', title: 'Prêmio MPB', category: 'Automobilismo', position: '1º' },
      { year: '2025', title: 'Prêmio MPB', category: 'Automobilismo', position: '1º' }
    ]
  },
  {
    id: 'excelentissimo',
    name: 'Excelentíssimo',
    category: 'Direito',
    description: 'Debates jurídicos, cidadania e direitos com clareza e profundidade.',
    host: 'Lucas Castro (@lucascastro)',
    youtubeUrl: 'https://www.youtube.com/@ExcelentissimoPodcast',
    subscribers: '2.000+',
    views: '50.025',
    themeColor: '#1e3a8a', // Blue
    image: 'logo-excelentissimo.png',
    stats: [
      { label: 'Dispositivos Móveis', value: '91.1%' },
      { label: 'Público Masc.', value: '84.2%' },
      { label: 'Idade Principal', value: '45-54 anos' }
    ],
    awards: [
      { year: '2024', title: 'Prêmio MPB', category: 'Direito', position: '2º' },
      { year: '2025', title: 'Prêmio MPB', category: 'Direito', position: '2º' }
    ]
  },
  {
    id: 'nacativa',
    name: 'NaCativa Cast',
    category: 'Esporte',
    description: 'A resenha esportiva mais autêntica e vibrante.',
    host: 'Leão, Goda, Marcel e Paulinho',
    youtubeUrl: 'https://www.youtube.com/@NaCativaCast',
    subscribers: '2.138',
    views: '2.524.989',
    themeColor: '#22c55e', // Green
    image: 'logo-nacativa.png',
    stats: [
      { label: 'Programas Ao Vivo', value: '70' },
      { label: 'Público Masc.', value: '96.8%' },
      { label: 'Idade Principal', value: '35-44 anos' }
    ],
    awards: [
      { year: '2024', title: 'Prêmio MPB', category: 'Esporte', position: '2º' },
      { year: '2025', title: 'Prêmio MPB', category: 'Esporte', position: '3º' }
    ]
  },
  {
    id: 'podcofrinho',
    name: 'PodCofrinho',
    category: 'Finanças',
    description: 'Educação financeira descomplicada para o seu bolso.',
    host: 'Silvio Cezar (@silviocezar.mf)',
    youtubeUrl: 'https://www.youtube.com/@podcofrinho',
    subscribers: '1k+',
    views: '19.700',
    themeColor: '#10b981', // Emerald
    image: 'logo-podcofrinho.png',
    stats: [
      { label: 'Programas Ao Vivo', value: '7' },
      { label: 'Público Masc.', value: '71.5%' },
      { label: 'Idade Principal', value: '35-44 anos' }
    ],
    awards: []
  },
  {
    id: 'inspiracast',
    name: 'Inspiracast',
    category: 'Histórias / Autocuidado',
    description: 'Histórias inspiradoras de pessoas comuns.',
    host: 'Thays Jurado (@thaysjurado)',
    youtubeUrl: 'https://youtube.com/@inspiracast16.15',
    subscribers: '1k+',
    views: '23.203',
    themeColor: '#db2777', // Pink
    image: 'logo-inspiracast.png',
    stats: [
      { label: 'Dispositivos Móveis', value: '90.8%' },
      { label: 'Público Fem.', value: '51.2%' },
      { label: 'Idade Principal', value: '35-44 anos' }
    ],
    awards: [
       { year: '2025', title: 'Prêmio MPB', category: 'Autocuidado', position: '3º' }
    ]
  },
  {
    id: 'labios-labirintos',
    name: 'Lábios e Labirintos',
    category: 'Diversidade',
    description: 'Empoderamento feminino, autoestima e diversidade.',
    host: 'Nina Teixeira (@ninateixera)',
    youtubeUrl: 'https://youtube.com/@ninateixera',
    subscribers: '1k+',
    views: '17.223',
    themeColor: '#9333ea', // Purple
    image: 'logo-labios-labirintos.png',
    stats: [
      { label: 'Público Fem.', value: '73%' },
      { label: 'Idade Principal', value: '45-54 anos' },
      { label: 'Alcance', value: '2 Países' }
    ],
    awards: [
      { year: '2025', title: 'Prêmio MPB', category: 'Diversidade', position: '2º' }
    ]
  },
  {
    id: 'ubuntu',
    name: 'Ubuntu Cast',
    category: 'Comunicação',
    description: 'Eu sou porque nós somos. Comunicação e diversidade.',
    host: 'Alex Cassini (@eismeaqui2022)',
    youtubeUrl: 'https://www.youtube.com/@UbuntuCast16.15',
    subscribers: '500+',
    views: '10.000',
    themeColor: '#f97316', // Orange
    image: 'logo-ubuntu.png',
    stats: [],
    awards: [
        { year: '2025', title: 'Prêmio MPB', category: 'Comunicação', position: '3º' }
    ]
  },
  {
    id: 'cicatrizes',
    name: 'Cicatrizes que Viram Asas',
    category: 'Superação',
    description: 'Transformando dor em força.',
    host: 'Mallu Mattos (@mallumattosoficial)',
    youtubeUrl: 'https://www.youtube.com/@cicatrizesqueviramasas',
    subscribers: '800+',
    views: '15.000',
    themeColor: '#0ea5e9', // Sky
    image: 'logo-cicatrizes.png',
    stats: [],
    awards: []
  }
];

export const SPONSORS: Sponsor[] = [
  { name: 'EKK BRINDES', logoUrl: 'logo-EKK.png', phone: '5511985749584' },
  { name: 'M&F SOLUÇÕES', logoUrl: 'logo-M&F.png', phone: '5511961241771' },
  { name: 'SOS ASSOCIADOS', logoUrl: 'logo-Sos.png', phone: '5511975557317' },
  { name: 'ORSEGUPS', logoUrl: 'logo-Orsegups.png', phone: '5519983070434' }
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, author: "Carlos M.", role: "Fã do NaCativa", text: "A melhor resenha esportiva que já vi. Autêntico demais!" },
  { id: 2, author: "Ana P.", role: "Seguidora 16.15", text: "As mensagens espirituais mudaram minha semana. Gratidão!" },
  { id: 3, author: "EKK Brindes", role: "Parceiro Estratégico", text: "O retorno sobre o investimento com a PO Labs foi incrível. Estrutura de ponta e visibilidade real para nossa marca." },
  { id: 4, author: "Ricardo Silva", role: "Podcaster", text: "Gravar no estúdio PO Labs elevou a percepção de valor do meu conteúdo. A equipe de edição é genial." },
  { id: 5, author: "Julia Costa", role: "Ouvinte Lábios e Labirintos", text: "Finalmente um espaço que fala sobre nós mulheres com profundidade e respeito. Não perco um episódio!" },
  { id: 6, author: "Garage Motors", role: "Anunciante", text: "Anunciar no Parada Obrigatória conectou nossa loja exatamente com quem ama carros. Resultado imediato." }
];