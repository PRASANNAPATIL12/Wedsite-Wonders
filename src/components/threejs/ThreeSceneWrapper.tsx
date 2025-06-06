'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

interface ThreeSceneWrapperProps {
  sceneType: 'countdown' | 'rings' | 'venue';
  className?: string;
  canvasClassName?: string;
}

const ThreeSceneWrapper: React.FC<ThreeSceneWrapperProps> = ({ sceneType, className, canvasClassName }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Component has mounted on client
  }, []);

  const initScene = useCallback(() => {
    if (!mountRef.current || typeof window === 'undefined') return;

    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    currentMount.appendChild(renderer.domElement);

    let animationFrameId: number;
    let hoverState = false; // For rings

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Softer ambient light
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    camera.position.z = 3;

    if (sceneType === 'countdown') {
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: 0xF7B7D3, // Soft Rose
        shininess: 80,
        transparent: true,
        opacity: 0.85
      });
      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);

      const wireframeGeometry = new THREE.SphereGeometry(1.05, 16, 16);
      const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });
      const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
      scene.add(wireframe);
      
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        sphere.rotation.x += 0.003;
        sphere.rotation.y += 0.005;
        wireframe.rotation.x -= 0.002;
        wireframe.rotation.y -= 0.004;
        renderer.render(scene, camera);
      };
      animate();
    } else if (sceneType === 'rings') {
      camera.position.z = 4;
      const ringGeometry = new THREE.TorusGeometry(0.8, 0.15, 16, 32);
      const ring1Material = new THREE.MeshPhongMaterial({ color: 0xffd700, shininess: 100 }); // Gold
      const ring2Material = new THREE.MeshPhongMaterial({ color: 0xe0e0e0, shininess: 100 }); // Silver
      const ring1 = new THREE.Mesh(ringGeometry, ring1Material);
      const ring2 = new THREE.Mesh(ringGeometry, ring2Material);
      ring1.position.x = -0.7;
      ring2.position.x = 0.7;
      ring1.rotation.y = Math.PI / 5;
      ring2.rotation.y = -Math.PI / 5;
      scene.add(ring1, ring2);

      currentMount.addEventListener('mouseenter', () => hoverState = true);
      currentMount.addEventListener('mouseleave', () => hoverState = false);

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        if (hoverState) {
          ring1.position.x += (0 - ring1.position.x) * 0.05;
          ring2.position.x += (0 - ring2.position.x) * 0.05;
          ring1.rotation.z += 0.02;
          ring2.rotation.z -= 0.02;
        } else {
          ring1.position.x += (-0.7 - ring1.position.x) * 0.05;
          ring2.position.x += (0.7 - ring2.position.x) * 0.05;
          ring1.rotation.y += 0.005;
          ring2.rotation.y -= 0.005;
        }
        renderer.render(scene, camera);
      };
      animate();
    } else if (sceneType === 'venue') {
      camera.position.set(0, 1.5, 3.5);
      camera.lookAt(0, 0.5, 0);
      const group = new THREE.Group();
      const baseGeometry = new THREE.BoxGeometry(1.5, 0.8, 1);
      const baseMaterial = new THREE.MeshPhongMaterial({ color: 0xE0C9A6, shininess: 50 }); // Creamy beige
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      base.position.y = 0.4;
      group.add(base);
      const roofGeometry = new THREE.ConeGeometry(1, 0.6, 4); // Pyramid like roof
      const roofMaterial = new THREE.MeshPhongMaterial({ color: 0xA0522D, shininess: 70 }); // Sienna brown
      const roof = new THREE.Mesh(roofGeometry, roofMaterial);
      roof.position.y = 0.8 + 0.3; // base height/2 + roof height/2
      roof.rotation.y = Math.PI / 4;
      group.add(roof);
      scene.add(group);
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        group.rotation.y += 0.005;
        renderer.render(scene, camera);
      };
      animate();
    }

    const handleResize = () => {
      if (currentMount.clientWidth > 0 && currentMount.clientHeight > 0) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      currentMount.removeEventListener('mouseenter', () => hoverState = true); // Clean up if added
      currentMount.removeEventListener('mouseleave', () => hoverState = false); // Clean up if added
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement.parentNode === currentMount) {
         currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      // Dispose geometries and materials if complex
    };
  }, [sceneType]);


  useEffect(() => {
    if (isMounted) { // Only run initScene if component is mounted on client
      const cleanup = initScene();
      return cleanup;
    }
  }, [isMounted, initScene]); // Re-run if sceneType changes (though not expected here)

  if (!isMounted) {
    // Render a placeholder or null on the server and during initial client render
    return <div ref={mountRef} className={className || "w-full h-48 md:h-64 rounded-lg bg-muted/50"} />;
  }

  return <div ref={mountRef} className={className || "w-full h-48 md:h-64 rounded-lg bg-transparent relative overflow-hidden"} />;
};

export default ThreeSceneWrapper;
