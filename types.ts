export interface Podcast {
  id: string;
  name: string;
  category: string;
  description: string;
  host: string;
  youtubeUrl: string;
  subscribers: string;
  views: string;
  stats: {
    label: string;
    value: string;
  }[];
  themeColor: string;
  image: string; // Placeholder or parsed from request
  awards: Award[];
  latestVideo?: {
    title: string;
    thumbnail: string;
    summary?: string;
  };
}

export interface Award {
  year: string;
  title: string;
  position: string; // 1º, 2º, 3º
  category: string;
}

export interface Sponsor {
  name: string;
  logoUrl: string;
  phone?: string;
}

export interface Testimonial {
  id: number;
  author: string;
  text: string;
  role: string;
}