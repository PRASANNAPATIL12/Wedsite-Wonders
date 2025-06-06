import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-secondary via-accent/30 to-background py-24 md:py-32 overflow-hidden hero-bg-animation">
      <div className="container relative z-10 text-center">
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-neutral-900 animate-fade-in-up">
          Beautiful Wedding Invitations
          <br />
          Made Simple
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Create stunning, personalized wedding websites with our elegant templates and interactive 3D features. No coding required.
        </p>
        <div className="space-x-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Button asChild size="lg" className="bg-primary hover:bg-pink-400 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 px-8 py-6 text-lg">
            <Link href="#templates">Browse Templates</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="bg-card hover:bg-muted text-card-foreground border-2 border-neutral-200 hover:border-primary shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 px-8 py-6 text-lg">
            <Link href="#showcase">View Demo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
