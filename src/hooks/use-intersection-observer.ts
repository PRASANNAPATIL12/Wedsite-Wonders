// src/hooks/use-intersection-observer.ts
'use client';

import { useEffect, useState, useRef } from 'react';

interface IntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

function useIntersectionObserver(
  options: IntersectionObserverOptions = {}
): [React.RefObject<HTMLDivElement>, boolean] {
  const { threshold = 0.1, root = null, rootMargin = '0px', freezeOnceVisible = true } = options;
  const targetRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const node = targetRef.current; // Capture current value for the effect cleanup
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const newIsIntersecting = entry.isIntersecting;
        if (freezeOnceVisible && newIsIntersecting) {
          setIsIntersecting(newIsIntersecting);
          observer.unobserve(node); // Stop observing once visible if freezeOnceVisible
        } else if (!freezeOnceVisible) {
          setIsIntersecting(newIsIntersecting);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(node);

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [targetRef, threshold, root, rootMargin, freezeOnceVisible]);

  return [targetRef, isIntersecting];
}

export default useIntersectionObserver;
