
import { Palette, Smartphone, Sparkles, MailOpen, Camera, MapPin, Check, HeartHandshake, Wand2, ExternalLink } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  bgColor?: string; // Optional background color for icon
}

export const features: Feature[] = [
  {
    icon: Palette,
    title: 'Beautiful Templates',
    description: 'Choose from our collection of professionally designed templates, each crafted with love and attention to detail.',
    bgColor: 'bg-rose-100 text-rose-600',
  },
  {
    icon: Smartphone,
    title: 'Mobile Responsive',
    description: 'Your wedding website looks perfect on every device - phones, tablets, and desktops.',
    bgColor: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Sparkles,
    title: 'Interactive 3D Elements',
    description: 'Engage your guests with stunning 3D animations, countdown timers, and interactive wedding rings.',
    bgColor: 'bg-yellow-100 text-yellow-600',
  },
  {
    icon: MailOpen,
    title: 'RSVP Management',
    description: 'Easy-to-use RSVP system that collects responses and manages your guest list automatically.',
    bgColor: 'bg-green-100 text-green-600',
  },
  {
    icon: Camera,
    title: 'Photo Gallery',
    description: 'Share your love story with beautiful photo galleries and image sliders.',
    bgColor: 'bg-purple-100 text-purple-600',
  },
  {
    icon: MapPin,
    title: 'Venue Integration',
    description: 'Interactive maps and venue details to help your guests find their way to your special day.',
    bgColor: 'bg-teal-100 text-teal-600',
  },
];

export interface Template {
  id: string;
  name: string;
  description: string;
  coupleNames?: string; // Optional for external template
  date?: string; // Optional for external template
  colors?: [string, string]; // [gradientFrom, gradientTo] - Optional for external template
  previewImage?: string; 
  previewStyle?: React.CSSProperties; 
  fontFamily?: string; // Optional
  aiHint: string;
  isExternal?: boolean;
  externalLink?: string;
  externalPreviewImage?: string; // Specific preview for external template card
}

export const templates: Template[] = [
  {
    id: 'classic',
    name: 'Classic Elegance',
    description: 'Timeless design with soft pastels and elegant typography. Perfect for traditional ceremonies.',
    coupleNames: 'Sarah & James',
    date: 'June 15, 2025',
    colors: ['#fdf2f8', '#f9a8d4'], 
    fontFamily: 'var(--font-serif)',
    previewStyle: { background: 'linear-gradient(135deg, #fdf2f8 0%, #f9a8d4 100%)' },
    aiHint: "elegant floral"
  },
  {
    id: 'modern',
    name: 'Modern Minimalist',
    description: 'Clean lines and contemporary design. Ideal for couples who love modern aesthetics.',
    coupleNames: 'Emma & David',
    date: 'September 22, 2025',
    colors: ['#f8fafc', '#e2e8f0'], 
    fontFamily: 'var(--font-sans)',
    previewStyle: { background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' },
    aiHint: "minimalist geometric"
  },
  {
    id: 'rustic',
    name: 'Rustic Romance',
    description: 'Warm earth tones and natural textures. Perfect for outdoor and countryside weddings.',
    coupleNames: 'Olivia & Michael',
    date: 'October 12, 2025',
    colors: ['#fef7ed', '#fed7aa'], 
    fontFamily: 'var(--font-serif)',
    previewStyle: { background: 'linear-gradient(135deg, #fef7ed 0%, #fed7aa 100%)' },
    aiHint: "rustic barn"
  },
  {
    id: 'garden',
    name: 'Garden Party',
    description: 'Fresh greens and floral elements. Ideal for spring and summer garden weddings.',
    coupleNames: 'Sophia & Alexander',
    date: 'May 18, 2025',
    colors: ['#f0fdf4', '#bbf7d0'], 
    fontFamily: 'var(--font-serif)',
    previewStyle: { background: 'linear-gradient(135deg, #f0fdf4 0%, #bbf7d0 100%)' },
    aiHint: "garden flowers"
  },
  {
    id: 'vintage',
    name: 'Vintage Glamour',
    description: 'Art deco inspired design with gold accents. Perfect for elegant vintage-themed weddings.',
    coupleNames: 'Isabella & Richard',
    date: 'August 8, 2025',
    colors: ['#fdf2f8', '#f9a8d4'], 
    previewStyle: { background: 'linear-gradient(135deg, #fff1f2 0%, #fbcfe8 100%)' },
    fontFamily: 'var(--font-serif)',
    aiHint: "vintage artdeco"
  },
  {
    id: 'beach',
    name: 'Beach Bliss',
    description: 'Ocean-inspired blues and sandy textures. Ideal for destination beach weddings.',
    coupleNames: 'Mia & Christopher',
    date: 'July 25, 2025',
    colors: ['#ecfeff', '#67e8f9'], 
    previewStyle: { background: 'linear-gradient(135deg, #ecfeff 0%, #67e8f9 100%)' },
    fontFamily: 'var(--font-serif)',
    aiHint: "beach ocean"
  },
  // Removed the 'shraddha-deepak-special' template entry
];

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  isFeatured?: boolean;
  buttonText: string;
  buttonVariant: 'default' | 'secondary' | 'outline' | 'ghost' | 'link';
  Icon?: LucideIcon;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Basic',
    price: '29',
    period: '/month',
    features: [
      '1 Wedding Website',
      '3 Template Options',
      'Basic RSVP System',
      'Photo Gallery (20 photos)',
      'Basic Support',
    ],
    buttonText: 'Get Started',
    buttonVariant: 'outline',
    Icon: HeartHandshake,
  },
  {
    name: 'Popular',
    price: '59',
    period: '/month',
    features: [
      '1 Wedding Website',
      'All Templates + Special Layouts',
      'Advanced RSVP + Guest Management',
      'Unlimited Photo Gallery',
      '3D Interactive Elements',
      'Custom Domain',
      'Priority Support',
    ],
    isFeatured: true,
    buttonText: 'Choose Popular',
    buttonVariant: 'default', 
    Icon: Sparkles,
  },
  {
    name: 'Premium',
    price: '99',
    period: '/month',
    features: [
      'Unlimited Wedding Websites',
      'All Templates + Custom Design Options',
      'Advanced Features & Special Layouts',
      'White-label Solution',
      'Analytics Dashboard',
      'Gift Registry Integration',
      '24/7 Premium Support',
    ],
    buttonText: 'Go Premium',
    buttonVariant: 'outline',
    Icon: Wand2,
  },
];

export type ShowcaseItemComponentName = 'CountdownSphere' | 'InteractiveRings' | 'VenueModel';

export interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  componentName: ShowcaseItemComponentName; 
  aiHint: string;
}

export const showcaseItems: ShowcaseItem[] = [
   {
    id: 'countdown',
    title: 'Elegant Countdown Sphere',
    description: 'A beautifully animated 3D sphere with orbiting particles and a pulsing glow, elegantly counting down to your special day. Built with advanced materials for a realistic look.',
    componentName: 'CountdownSphere',
    aiHint: "countdown clock"
  },
  {
    id: 'rings',
    title: 'Interactive Linked Rings',
    description: 'Exquisite 3D wedding rings in gold and silver, subtly interlinked and responsive to hover, symbolizing eternal unity. Features realistic metal shaders and soft shadows.',
    componentName: 'InteractiveRings',
    aiHint: "wedding rings"
  },
  {
    id: 'venue',
    title: 'Charming Venue Model',
    description: 'A detailed and stylized 3D model of a wedding venue, featuring realistic textures, windows, and a gently rotating view. Perfect for showcasing your ceremony location.',
    componentName: 'VenueModel',
    aiHint: "church building"
  },
];

export { Check, ExternalLink }; // Export Check icon for pricing plans

