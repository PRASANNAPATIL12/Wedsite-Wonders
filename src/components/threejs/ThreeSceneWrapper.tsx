
'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

interface ThreeSceneWrapperProps {
  sceneType: 'countdown' | 'rings' | 'venue';
  className?: string;
  canvasClassName?: string; // This prop isn't currently used but kept for API consistency
}

const ThreeSceneWrapper: React.FC<ThreeSceneWrapperProps> = ({ sceneType, className }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    setIsMounted(true); // Component has mounted on client
  }, []);

  const initScene = useCallback(() => {
    if (!mountRef.current || typeof window === 'undefined') return;

    const currentMount = mountRef.current;
    animationFrameIdRef.current = null; // Clear previous animation frame id

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentMount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    scene.add(hemisphereLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);

    camera.position.z = 5;

    let hoverState = false; // For rings interactivity
    const clock = new THREE.Clock();

    // Specific scene setups
    if (sceneType === 'countdown') {
      camera.position.z = 4;
      const sphereGeometry = new THREE.IcosahedronGeometry(1, 3); // More faceted
      const sphereMaterial = new THREE.MeshStandardMaterial({
        color: 0xF7B7D3, // Soft Rose from theme
        metalness: 0.2,
        roughness: 0.5,
        emissive: 0xaa00aa,
        emissiveIntensity: 0.1,
      });
      const mainSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      mainSphere.castShadow = true;
      scene.add(mainSphere);

      const particleCount = 100;
      const particlesGeometry = new THREE.BufferGeometry();
      const posArray = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
      }
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const particleMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xffffff,
        transparent: true,
        opacity: 0.7,
      });
      const particles = new THREE.Points(particlesGeometry, particleMaterial);
      scene.add(particles);
      
      const animate = () => {
        animationFrameIdRef.current = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();
        mainSphere.rotation.y = elapsedTime * 0.3;
        mainSphere.rotation.x = elapsedTime * 0.2;
        particles.rotation.y = -elapsedTime * 0.1;
        // Pulse emissive intensity
        mainSphere.material.emissiveIntensity = (Math.sin(elapsedTime * 2) + 1) * 0.15 + 0.1;
        renderer.render(scene, camera);
      };
      animate();

    } else if (sceneType === 'rings') {
      camera.position.z = 5;
      const ringGroup = new THREE.Group();
      scene.add(ringGroup);

      const ringGeometry = new THREE.TorusGeometry(1, 0.1, 32, 64);
      const goldMaterial = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.8, roughness: 0.2, envMapIntensity: 0.5 });
      const silverMaterial = new THREE.MeshStandardMaterial({ color: 0xe0e0e0, metalness: 0.9, roughness: 0.15, envMapIntensity: 0.5 });
      
      const ring1 = new THREE.Mesh(ringGeometry, goldMaterial);
      ring1.castShadow = true;
      ring1.position.x = -0.6;
      ring1.rotation.set(Math.PI / 5, Math.PI / 4, 0);
      
      const ring2 = new THREE.Mesh(ringGeometry, silverMaterial);
      ring2.castShadow = true;
      ring2.position.x = 0.6;
      ring2.rotation.set(Math.PI / 5, -Math.PI / 4, 0);
      
      ringGroup.add(ring1, ring2);

      // Subtle ground plane for shadows
      const groundGeo = new THREE.PlaneGeometry(5, 5);
      const groundMat = new THREE.ShadowMaterial({ opacity: 0.3 });
      const ground = new THREE.Mesh(groundGeo, groundMat);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -1.5;
      ground.receiveShadow = true;
      scene.add(ground);

      currentMount.addEventListener('mouseenter', () => hoverState = true);
      currentMount.addEventListener('mouseleave', () => hoverState = false);

      const initialRing1Pos = ring1.position.clone();
      const initialRing2Pos = ring2.position.clone();
      const initialRing1Rot = ring1.rotation.clone();
      const initialRing2Rot = ring2.rotation.clone();

      const animate = () => {
        animationFrameIdRef.current = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();
        if (hoverState) {
          ring1.position.lerp(new THREE.Vector3(0, 0.1, 0), 0.07);
          ring2.position.lerp(new THREE.Vector3(0, -0.1, 0), 0.07);
          ring1.rotation.z = Math.sin(elapsedTime * 3) * 0.2 + initialRing1Rot.z;
          ring2.rotation.z = -Math.sin(elapsedTime * 3) * 0.2 + initialRing2Rot.z;
        } else {
          ring1.position.lerp(initialRing1Pos, 0.07);
          ring2.position.lerp(initialRing2Pos, 0.07);
          ring1.rotation.y += (initialRing1Rot.y - ring1.rotation.y + Math.sin(elapsedTime * 0.5) * 0.01) * 0.05;
          ring2.rotation.y += (initialRing2Rot.y - ring2.rotation.y - Math.sin(elapsedTime * 0.5) * 0.01) * 0.05;
        }
        ringGroup.rotation.y = elapsedTime * 0.1;
        renderer.render(scene, camera);
      };
      animate();

    } else if (sceneType === 'venue') {
      camera.position.set(0, 2, 6);
      camera.lookAt(0, 0.8, 0);

      const venueGroup = new THREE.Group();
      scene.add(venueGroup);

      const baseMaterial = new THREE.MeshStandardMaterial({ color: 0xDECAB5, metalness: 0.1, roughness: 0.8 });
      const roofMaterial = new THREE.MeshStandardMaterial({ color: 0xA0522D, metalness: 0.1, roughness: 0.9 });
      const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x6F4E37, metalness: 0.1, roughness: 0.8 });
      const windowMaterial = new THREE.MeshStandardMaterial({ color: 0xAADDFF, metalness: 0, roughness: 0.1, transparent: true, opacity: 0.7 });

      const mainBuilding = new THREE.Mesh(new THREE.BoxGeometry(2.5, 1.8, 1.5), baseMaterial);
      mainBuilding.castShadow = true;
      mainBuilding.receiveShadow = true;
      mainBuilding.position.y = 1.8 / 2;
      venueGroup.add(mainBuilding);

      const roof = new THREE.Mesh(new THREE.ConeGeometry(1.6, 1, 4), roofMaterial); // Pyramid roof
      roof.castShadow = true;
      roof.position.y = 1.8 + 1 / 2;
      roof.rotation.y = Math.PI / 4;
      venueGroup.add(roof);
      
      const door = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 1.2), doorMaterial);
      door.position.set(0, 1.2 / 2, 1.5 / 2 + 0.01);
      venueGroup.add(door);

      const windowPositions = [
        { x: -0.7, y: 1.2, z: 1.5 / 2 + 0.01 },
        { x: 0.7, y: 1.2, z: 1.5 / 2 + 0.01 },
        { x: -2.5/2 - 0.01, y: 1.2, z: 0, ry: Math.PI/2 },
        { x: 2.5/2 + 0.01, y: 1.2, z: 0, ry: Math.PI/2 },
      ];
      windowPositions.forEach(pos => {
        const windowMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.7), windowMaterial);
        windowMesh.position.set(pos.x, pos.y, pos.z);
        if (pos.ry) windowMesh.rotation.y = pos.ry;
        venueGroup.add(windowMesh);
      });

      const groundGeo = new THREE.PlaneGeometry(10, 10);
      const groundMat = new THREE.MeshStandardMaterial({ color: 0x556B2F, metalness: 0, roughness: 1 });
      const ground = new THREE.Mesh(groundGeo, groundMat);
      ground.rotation.x = -Math.PI / 2;
      ground.receiveShadow = true;
      venueGroup.add(ground);
      
      const animate = () => {
        animationFrameIdRef.current = requestAnimationFrame(animate);
        venueGroup.rotation.y += 0.003;
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

    return () => { // Cleanup function
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      // Dispose Three.js objects
      scene.traverse(object => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      renderer.dispose();
      if (currentMount && renderer.domElement.parentNode === currentMount) {
         currentMount.removeChild(renderer.domElement);
      }
    };
  }, [sceneType]); // Add sceneType to dependencies so scene re-initializes if type changes (though not expected usage here)

  useEffect(() => {
    let cleanupFunction: (() => void) | undefined;
    if (isMounted && mountRef.current) {
      // Clear previous canvas if any
      while (mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
      cleanupFunction = initScene();
    }
    return () => {
      if (cleanupFunction) {
        cleanupFunction();
      }
    };
  }, [isMounted, initScene]); // Re-run if isMounted or initScene changes

  // Placeholder for SSR or before client-side mount
  if (!isMounted) {
    return <div ref={mountRef} className={className || "w-full h-48 md:h-64 rounded-lg bg-muted/50"} />;
  }

  return <div ref={mountRef} className={className || "w-full h-48 md:h-64 rounded-lg bg-transparent relative overflow-hidden"} />;
};

export default ThreeSceneWrapper;

    