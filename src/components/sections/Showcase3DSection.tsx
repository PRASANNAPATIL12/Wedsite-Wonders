
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { showcaseItems, type ShowcaseItem, type ShowcaseItemComponentName } from '@/lib/constants';
import ThreeSceneWrapper from '@/components/threejs/ThreeSceneWrapper'; 

// Explicitly define the props for ThreeSceneWrapper if not already imported or defined locally
interface ThreeSceneWrapperProps {
  sceneType: 'countdown' | 'rings' | 'venue';
  className?: string;
  canvasClassName?: string;
}

// Helper function to map component names from constants to scene types for ThreeSceneWrapper
const getSceneType = (componentName: ShowcaseItemComponentName): ThreeSceneWrapperProps['sceneType'] => {
  switch (componentName) {
    case 'CountdownSphere':
      return 'countdown';
    case 'InteractiveRings':
      return 'rings';
    case 'VenueModel':
      return 'venue';
    default:
      // Fallback, though ideally, this should not be reached if constants are correct
      // You might want to throw an error here or handle it more robustly
      const exhaustiveCheck: never = componentName;
      return exhaustiveCheck; 
  }
};


export default function Showcase3DSection() {
  return (
    <section id="showcase" className="py-16 md:py-24 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black text-neutral-50">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Interactive 3D Features
          </h2>
          <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto">
            Engage your guests with stunning 3D animations and interactive elements.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {showcaseItems.map((item, index) => (
            <Card 
              key={item.id} 
              className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1.5 animate-fade-in-up flex flex-col"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardHeader className="pb-2">
                <CardTitle className="font-headline text-2xl text-neutral-50">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <div className="h-48 md:h-56 mb-4 rounded-lg overflow-hidden bg-black/20" data-ai-hint={item.aiHint}>
                  <ThreeSceneWrapper sceneType={getSceneType(item.componentName)} />
                </div>
                <CardDescription className="text-neutral-300">{item.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

    