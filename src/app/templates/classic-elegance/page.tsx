
import { templates, type Template } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Heart } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ClassicElegancePage() {
  const template = templates.find(t => t.id === 'classic');

  if (!template) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="font-headline text-3xl mb-4">Template not found</h1>
            <p className="text-muted-foreground mb-8">The Classic Elegance template could not be loaded.</p>
            <Button asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const gradientStyle = template.previewStyle || { background: `linear-gradient(135deg, ${template.colors?.[0] || '#fdf2f8'} 0%, ${template.colors?.[1] || '#f9a8d4'} 100%)` };
  const textContrastColor = '#333'; // A generic dark color for text on light gradients

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <div style={gradientStyle} className="py-16 md:py-24 lg:py-32 text-center">
          <div className="container">
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl mb-4" style={{ color: textContrastColor }}>
              {template.coupleNames}
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl mb-8" style={{ color: textContrastColor, fontFamily: template.fontFamily }}>
              {template.date}
            </p>
            <p className="italic text-lg md:text-xl" style={{ color: textContrastColor, opacity: 0.8 }}>
              "Two hearts, one love, forever together"
            </p>
          </div>
        </div>

        <div className="container py-12 md:py-16 space-y-12 md:space-y-16">
          <section className="bg-card p-6 md:p-8 rounded-xl shadow-xl">
            <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl text-center mb-8 text-foreground">RSVP</h2>
            <div className="max-w-lg mx-auto space-y-6">
              <div>
                <Label htmlFor="attending" className="text-foreground/80 block mb-2 text-lg">Will you be attending?</Label>
                <Select defaultValue="yes">
                  <SelectTrigger id="attending" className="h-12 text-base">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes, I'll be there!</SelectItem>
                    <SelectItem value="no">Sorry, can't make it</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="guests" className="text-foreground/80 block mb-2 text-lg">Number of guests</Label>
                <Input type="number" id="guests" defaultValue="2" className="h-12 text-base" />
              </div>
              <Button 
                style={{ backgroundColor: template.colors?.[1] || '#f9a8d4', color: textContrastColor }} 
                className="w-full text-lg py-3 hover:opacity-90 transition-opacity"
              >
                Send RSVP
              </Button>
            </div>
          </section>

          <section>
            <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl text-center mb-8 text-foreground">Our Story</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-video sm:aspect-square rounded-lg overflow-hidden shadow-lg bg-muted">
                   <Image
                      src={`https://placehold.co/600x400.png?p=classic${i}`}
                      alt={`Our Story Photo ${i + 1}`}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      data-ai-hint={`${template.aiHint} couple story`}
                    />
                </div>
              ))}
            </div>
          </section>

          <section className="bg-card p-6 md:p-8 rounded-xl shadow-xl">
            <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl text-center mb-8 text-foreground">Event Details</h2>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 text-center">
              <div className="bg-muted/50 p-6 rounded-lg">
                <h3 className="font-semibold text-xl sm:text-2xl mb-2 text-foreground/90">Ceremony</h3>
                <p className="text-foreground/70 text-lg">{template.date}</p>
                <p className="text-foreground/70 text-lg">4:00 PM</p>
                <p className="text-foreground/70 text-lg">St. Mary's Church</p>
              </div>
              <div className="bg-muted/50 p-6 rounded-lg">
                <h3 className="font-semibold text-xl sm:text-2xl mb-2 text-foreground/90">Reception</h3>
                <p className="text-foreground/70 text-lg">{template.date}</p>
                <p className="text-foreground/70 text-lg">6:00 PM</p>
                <p className="text-foreground/70 text-lg">Grand Ballroom</p>
              </div>
            </div>
          </section>
          
          <section className="text-center pt-8">
            <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">{template.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="text-lg flex-1 sm:flex-none"
                  style={{ backgroundColor: template.colors?.[1] || '#f9a8d4', color: textContrastColor }} 
                >
                <Link href="#pricing"> {/* Consider linking to pricing or a specific "use" page */}
                  Use This Template <Heart className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg flex-1 sm:flex-none">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-5 w-5" /> Back to All Templates
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
