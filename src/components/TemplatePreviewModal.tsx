'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Template } from '@/lib/constants';
import Image from 'next/image';

interface TemplatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: Template | null;
}

export default function TemplatePreviewModal({ isOpen, onClose, template }: TemplatePreviewModalProps) {
  if (!template) return null;

  const gradientStyle = template.previewStyle || { background: `linear-gradient(135deg, ${template.colors[0]} 0%, ${template.colors[1]} 100%)` };
  const textContrastColor = '#333'; // A generic dark color for text on light gradients

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <div className="max-h-[85vh] overflow-y-auto">
          <div style={gradientStyle} className="p-6 md:p-12 lg:p-16 text-center rounded-t-lg">
            <DialogHeader>
              <DialogTitle className="font-headline text-3xl sm:text-4xl md:text-5xl mb-2" style={{ color: textContrastColor }}>
                {template.coupleNames}
              </DialogTitle>
            </DialogHeader>
            <p className="text-lg sm:text-xl md:text-2xl mb-6" style={{ color: textContrastColor, fontFamily: template.fontFamily }}>
              {template.date}
            </p>
            <p className="italic text-md" style={{ color: textContrastColor, opacity: 0.8 }}>
              "Two hearts, one love, forever together"
            </p>
          </div>

          <div className="p-6 md:p-8 space-y-8 bg-card">
            <section className="bg-muted p-6 rounded-lg shadow">
              <h2 className="font-headline text-xl sm:text-2xl md:text-3xl text-center mb-6 text-foreground">RSVP</h2>
              <div className="max-w-md mx-auto space-y-4">
                <div>
                  <Label htmlFor="attending" className="text-foreground/80">Will you be attending?</Label>
                  <Select defaultValue="yes">
                    <SelectTrigger id="attending">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes, I'll be there!</SelectItem>
                      <SelectItem value="no">Sorry, can't make it</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="guests" className="text-foreground/80">Number of guests</Label>
                  <Input type="number" id="guests" defaultValue="2" />
                </div>
                <Button style={gradientStyle} className="w-full text-base py-2 sm:text-lg sm:py-3" 
                        onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
                        onMouseOut={(e) => e.currentTarget.style.filter = 'brightness(1)'}>
                  Send RSVP
                </Button>
              </div>
            </section>

            <section>
              <h2 className="font-headline text-xl sm:text-2xl md:text-3xl text-center mb-6 text-foreground">Our Story</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden bg-gray-200">
                     <Image
                        src={`https://placehold.co/300x300.png?p=${template.id}${i}`}
                        alt={`Photo ${i + 1} for ${template.name}`}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                        data-ai-hint={`${template.aiHint} couple`}
                      />
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-muted p-6 rounded-lg shadow">
              <h2 className="font-headline text-xl sm:text-2xl md:text-3xl text-center mb-6 text-foreground">Event Details</h2>
              <div className="grid md:grid-cols-2 gap-6 text-center">
                <div>
                  <h3 className="font-semibold text-lg sm:text-xl mb-1 text-foreground/90">Ceremony</h3>
                  <p className="text-foreground/70">{template.date}</p>
                  <p className="text-foreground/70">4:00 PM</p>
                  <p className="text-foreground/70">St. Mary's Church</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg sm:text-xl mb-1 text-foreground/90">Reception</h3>
                  <p className="text-foreground/70">{template.date}</p>
                  <p className="text-foreground/70">6:00 PM</p>
                  <p className="text-foreground/70">Grand Ballroom</p>
                </div>
              </div>
            </section>
            
            <DialogFooter className="sm:justify-center text-center pt-4">
              <div className="w-full">
                <DialogDescription className="mb-4 text-foreground/70">{template.description}</DialogDescription>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                   <Button style={gradientStyle} size="lg" className="flex-1" 
                           onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
                           onMouseOut={(e) => e.currentTarget.style.filter = 'brightness(1)'}>
                    Use This Template
                  </Button>
                  <Button variant="outline" size="lg" onClick={onClose} className="flex-1">
                    Close Preview
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
