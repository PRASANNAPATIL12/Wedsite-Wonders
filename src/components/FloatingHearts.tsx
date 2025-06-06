'use client';

import React, { useEffect, useState } from 'react';

const FloatingHearts: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const createHeart = () => {
      const heart = document.createElement('div');
      heart.innerHTML = '💕'; // You can use other heart emojis like ❤️, 💖, 💗
      heart.style.position = 'fixed';
      heart.style.fontSize = `${Math.random() * 16 + 12}px`; // Random size between 12px and 28px
      heart.style.pointerEvents = 'none';
      heart.style.zIndex = '9999';
      heart.style.left = `${Math.random() * window.innerWidth}px`;
      heart.style.top = `${window.innerHeight + Math.random() * 50}px`; // Start slightly below screen
      heart.style.opacity = `${Math.random() * 0.5 + 0.3}`; // Random opacity
      heart.style.animation = `float-up ${Math.random() * 3 + 3}s ease-out forwards`; // Random duration 3-6s
      
      // Add horizontal drift
      const drift = (Math.random() - 0.5) * 200; // Random drift -100px to 100px
      (heart.style as any).setProperty('--drift-x', `${drift}px`);

      document.body.appendChild(heart);
      
      setTimeout(() => {
        heart.remove();
      }, 6000); // Remove after animation + buffer
    };

    // Add floating heart animation CSS if not already present by tailwind.config.ts
    // This is a fallback or specific override if needed. Tailwind animations are preferred.
    const styleExists = document.getElementById('floating-hearts-style');
    if (!styleExists) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'floating-hearts-style';
        styleSheet.innerHTML = `
          @keyframes float-up {
            0% {
              transform: translateY(0) translateX(0) rotate(0deg);
              opacity: var(--start-opacity, 0.7);
            }
            100% {
              transform: translateY(-110vh) translateX(var(--drift-x, 0)) rotate(${Math.random() * 720 - 360}deg);
              opacity: 0;
            }
          }
        `;
        document.head.appendChild(styleSheet);
    }
    

    const intervalId = setInterval(createHeart, 2000); // Create a heart every 2 seconds

    return () => clearInterval(intervalId);
  }, [isClient]);

  return null; // This component doesn't render anything itself
};

export default FloatingHearts;
