export type ShootCategory = 'all' | 'wedding' | 'product' | 'model' | 'movie';

export type DisplayMode = '3d-circle' | '3d-helix' | 'filmstrip' | 'grid';

export interface PhotoExif {
  camera: string;
  lens: string;
  aperture: string;
  shutter: string;
  iso: string;
  focalLength: string;
}

export interface PhotoItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'wedding' | 'product' | 'model' | 'movie';
  categoryLabel: string;
  imageUrl: string;
  thumbnailUrl: string;
  clientOrProject: string;
  dateOrYear: string;
  location: string;
  exif: PhotoExif;
  story: string;
  tags: string[];
  featured?: boolean;
}

export interface StudioService {
  id: string;
  title: string;
  category: 'wedding' | 'product' | 'model' | 'movie';
  tagline: string;
  description: string;
  features: string[];
  startingPrice: string;
  deliverables: string[];
  highlight: boolean;
  image: string;
}

export interface ClientReview {
  id: string;
  clientName: string;
  roleOrOccasion: string;
  category: 'wedding' | 'product' | 'model' | 'movie';
  avatar: string;
  comment: string;
  rating: number;
  date: string;
  projectTag: string;
}

export interface GearItem {
  id: string;
  name: string;
  category: 'camera' | 'lens' | 'lighting' | 'drone-gimbal';
  specs: string;
  badge: string;
  description: string;
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  email: string;
  shootType: 'wedding' | 'product' | 'model' | 'movie' | 'other';
  eventDate: string;
  location: string;
  budgetRange: string;
  notes: string;
}
