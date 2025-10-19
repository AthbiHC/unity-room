import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { platforms } from '../../data/kuwaitData';

interface DataParticlesProps {
  count?: number;
  activePlatforms?: string[];
}

export const DataParticles = ({ count = 200 }: DataParticlesProps) => {
  const particlesRef = useRef<THREE.Points>(null);
  const targetsRef = useRef<number[]>([]); // Target platform index for each particle
  const progressRef = useRef<Float32Array>(new Float32Array(count)); // Progress along path (0 to 1)
  
  // Data type colors
  const dataTypeColors = {
    news: new THREE.Color('#fbbf24'), // yellow
    social: new THREE.Color('#3b82f6'), // blue
    official: new THREE.Color('#10b981'), // green
    financial: new THREE.Color('#f97316'), // orange
  };
  
  const dataTypes = ['news', 'social', 'official', 'financial'] as const;
  
  // Create particle system
  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const targets = new Array(count);
    const progress = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Random starting position
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      // Random data type color
      const dataType = dataTypes[Math.floor(Math.random() * dataTypes.length)];
      const color = dataTypeColors[dataType];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      // Random size
      sizes[i] = Math.random() * 0.1 + 0.05;
      
      // Random target platform
      targets[i] = Math.floor(Math.random() * platforms.length);
      
      // Random progress
      progress[i] = Math.random();
    }
    
    targetsRef.current = targets;
    progressRef.current = progress;
    
    return { positions, colors, sizes };
  }, [count]);
  
  // Animate particles flowing between platforms
  useFrame((state) => {
    if (!particlesRef.current || !targetsRef.current || !progressRef.current) return;
    
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const delta = state.clock.getDelta();
    
    for (let i = 0; i < count; i++) {
      const targetIndex = targetsRef.current[i];
      const targetPlatform = platforms[targetIndex];
      
      // Get source platform (previous platform in array, wrapping around)
      const sourceIndex = (targetIndex - 1 + platforms.length) % platforms.length;
      const sourcePlatform = platforms[sourceIndex];
      
      // Update progress
      const speed = 0.3 + Math.random() * 0.3; // Variable speed
      progressRef.current[i] += delta * speed;
      
      // Reset when reached target
      if (progressRef.current[i] >= 1) {
        progressRef.current[i] = 0;
        // Pick new random target
        targetsRef.current[i] = Math.floor(Math.random() * platforms.length);
      }
      
      // Interpolate position with curved path (bezier-like)
      const t = progressRef.current[i];
      const easeT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // ease in-out
      
      // Create arc between platforms
      const midPoint = [
        (sourcePlatform.position[0] + targetPlatform.position[0]) / 2,
        (sourcePlatform.position[1] + targetPlatform.position[1]) / 2 + 2, // Arc upward
        (sourcePlatform.position[2] + targetPlatform.position[2]) / 2,
      ];
      
      // Quadratic bezier curve
      const x = 
        (1 - easeT) * (1 - easeT) * sourcePlatform.position[0] +
        2 * (1 - easeT) * easeT * midPoint[0] +
        easeT * easeT * targetPlatform.position[0];
      
      const y =
        (1 - easeT) * (1 - easeT) * sourcePlatform.position[1] +
        2 * (1 - easeT) * easeT * midPoint[1] +
        easeT * easeT * targetPlatform.position[1];
      
      const z =
        (1 - easeT) * (1 - easeT) * sourcePlatform.position[2] +
        2 * (1 - easeT) * easeT * midPoint[2] +
        easeT * easeT * targetPlatform.position[2];
      
      // Add some organic wobble
      const wobble = Math.sin(state.clock.elapsedTime * 3 + i * 0.1) * 0.1;
      
      positions[i * 3] = x + wobble;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

