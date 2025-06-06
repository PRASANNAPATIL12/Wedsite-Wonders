'use client';

import React from 'react';
import useIntersectionObserver from '@/hooks/use-intersection-observer';
import { cn } from '@/lib/utils';

interface AnimatedElementProps {
  children: React.ReactNode;
  className?: string;
  animationClassName?: string; // e.g., 'animate-fade-in-up'
  threshold?: number;
  delay?: string; // e.g., '0.2s'
  as?: keyof JSX.IntrinsicElements; // Allow rendering as different HTML tags
}

const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  className,
  animationClassName = 'animate-fade-in-up', // Default animation
  threshold = 0.1,
  delay,
  as: Tag = 'div',
}) => {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold, freezeOnceVisible: true });

  return (
    <Tag
      ref={ref}
      className={cn(
        'opacity-0 transition-opacity duration-500', // Start hidden, prepare for animation
        isIntersecting ? `${animationClassName} opacity-100` : '',
        className
      )}
      style={isIntersecting && delay ? { animationDelay: delay } : {}}
    >
      {children}
    </Tag>
  );
};

export default AnimatedElement;
