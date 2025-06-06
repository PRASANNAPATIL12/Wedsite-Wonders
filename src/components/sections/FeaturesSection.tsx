import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { features, type Feature } from '@/lib/constants';
import { cn } from '@/lib/utils';

const FeatureCard: React.FC<Feature & { index: number }> = ({ icon: Icon, title, description, bgColor, index }) => (
  <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
    <CardHeader>
      <div className={cn("w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center", bgColor || 'bg-primary/20 text-primary')}>
        <Icon className="w-8 h-8" />
      </div>
      <CardTitle className="font-headline text-2xl">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-neutral-900">
            Everything You Need for Your Perfect Day
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional wedding websites with features that wow your guests.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
