import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { pricingPlans, Check, type PricingPlan } from '@/lib/constants';
import { cn } from '@/lib/utils';

const PricingCard: React.FC<PricingPlan & { index: number }> = ({ name, price, period, features, isFeatured, buttonText, buttonVariant, Icon, index }) => (
  <Card 
    className={cn(
      "flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1.5 animate-fade-in-up",
      isFeatured ? "bg-gradient-to-br from-primary via-accent/70 to-secondary text-primary-foreground border-2 border-primary relative scale-100 md:scale-105" : "bg-card",
      isFeatured ? "text-card-foreground" : "" 
    )}
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    {isFeatured && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-neutral-900 text-neutral-50 px-4 py-1 rounded-full text-sm font-semibold shadow-md">
        Most Popular
      </div>
    )}
    <CardHeader className="text-center pt-10">
      {Icon && <Icon className={cn("w-10 h-10 mx-auto mb-3", isFeatured ? "text-primary-foreground" : "text-primary")} />}
      <CardTitle className={cn("font-headline text-3xl", isFeatured ? "text-primary-foreground" : "text-foreground")}>{name}</CardTitle>
      <div className={cn("font-headline text-5xl font-bold my-4", isFeatured ? "text-primary-foreground" : "text-foreground")}>
        ${price}
        <span className={cn("text-base font-normal", isFeatured ? "text-primary-foreground/80" : "text-muted-foreground")}>{period}</span>
      </div>
    </CardHeader>
    <CardContent className="flex-grow">
      <ul className="space-y-3">
        {features.map((feature, i) => (
          <li key={i} className={cn("flex items-start", isFeatured ? "text-primary-foreground/90" : "text-foreground/80")}>
            <Check className={cn("w-5 h-5 mr-2 mt-0.5 shrink-0", isFeatured ? "text-primary-foreground" : "text-primary")} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter>
      <Button 
        size="lg" 
        className={cn(
          "w-full text-lg py-3", 
          isFeatured ? "bg-card text-card-foreground hover:bg-card/90" : "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
      >
        {buttonText}
      </Button>
    </CardFooter>
  </Card>
);

export default function PricingSection() {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-neutral-900">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's perfect for your special day.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={plan.name} {...plan} index={index}/>
          ))}
        </div>
      </div>
    </section>
  );
}
