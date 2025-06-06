
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TemplatePreviewModal from '@/components/TemplatePreviewModal';
import { templates, type Template as TemplateType, ExternalLink } from '@/lib/constants'; // Added ExternalLink
import { ArrowRight } from 'lucide-react';

interface TemplateCardProps {
  template: TemplateType;
  onPreview: (template: TemplateType) => void;
  index: number;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onPreview, index }) => {
  const gradientStyle = template.isExternal ? 
    { background: 'linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--card)) 100%)' } : 
    template.previewStyle || { background: `linear-gradient(135deg, ${template.colors?.[0]} 0%, ${template.colors?.[1]} 100%)` };
  
  const textContrastColor = template.isExternal ? 'hsl(var(--foreground))' : '#333';

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1.5 flex flex-col animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="relative h-64 w-full" style={gradientStyle}>
        {!template.isExternal && template.coupleNames && template.date && (
          <div className="absolute inset-4 bg-background/80 rounded-md backdrop-blur-sm flex flex-col items-center justify-center p-4">
            <div style={{ fontFamily: template.fontFamily, color: textContrastColor }} className="text-2xl font-semibold mb-1 text-center">{template.coupleNames}</div>
            <div style={{ color: textContrastColor, opacity: 0.8 }} className="text-sm text-center">{template.date}</div>
          </div>
        )}
        <Image 
            src={template.isExternal && template.externalPreviewImage ? template.externalPreviewImage : `https://placehold.co/400x250.png/${template.colors?.[0]?.substring(1) || 'EEE'}/${template.colors?.[1]?.substring(1) || 'DDD'}?text=?`}
            alt={`${template.name} preview image`}
            layout="fill"
            objectFit="cover"
            className={template.isExternal ? "" : "opacity-10 absolute inset-0"}
            data-ai-hint={template.aiHint}
        />
      </div>
      <CardHeader className="flex-grow">
        <CardTitle className="font-headline text-2xl">{template.name}</CardTitle>
        <CardDescription className="text-muted-foreground min-h-[3em]">{template.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex gap-2">
        {template.isExternal && template.externalLink ? (
          <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href={template.externalLink}>
              View Special Layout <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <>
            <Button onClick={() => onPreview(template)} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Preview</Button>
            <Button variant="outline" className="w-full">
              Use Template <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default function TemplatesSection() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePreview = (template: TemplateType) => {
    if (template.isExternal) return; // External templates are handled by direct link
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTemplate(null), 300);
  };

  return (
    <section id="templates" className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-neutral-900">
            Choose Your Perfect Template
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Each template is fully customizable and comes with all the features you need. Explore our special layouts too!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <TemplateCard key={template.id} template={template} onPreview={handlePreview} index={index} />
          ))}
        </div>
      </div>
      {selectedTemplate && !selectedTemplate.isExternal && (
        <TemplatePreviewModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          template={selectedTemplate}
        />
      )}
    </section>
  );
}
