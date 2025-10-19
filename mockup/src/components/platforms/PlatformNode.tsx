import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import type { Platform } from '../../data/kuwaitData';
import { useAppStore } from '../../store/appStore';

interface PlatformNodeProps {
  platform: Platform;
  isActive?: boolean;
  intensity?: number; // 0 to 1, activity intensity
}

export const PlatformNode = ({ platform, isActive = true, intensity = 0.5 }: PlatformNodeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const selectPlatform = useAppStore((state) => state.selectPlatform);
  const selectedPlatform = useAppStore((state) => state.selectedPlatform);
  const isSelected = selectedPlatform === platform.id;
  
  // Layer colors
  const layerColors = {
    truth: '#10b981',
    speed: '#3b82f6',
    depth: '#a855f7',
  };
  
  const baseColor = layerColors[platform.layer];
  
  // Pulsing animation based on activity
  useFrame((state) => {
    if (meshRef.current && glowRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Organic breathing pulse
      const pulse = Math.sin(time * 2 + platform.position[0]) * 0.1 + 0.9;
      const activityPulse = isActive ? Math.sin(time * 3 + intensity * 5) * 0.15 * intensity : 0;
      
      meshRef.current.scale.setScalar(1 + activityPulse + (hovered ? 0.2 : 0) + (isSelected ? 0.3 : 0));
      
      // Rotating slowly
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
      
      // Glow effect
      if (glowRef.current.material instanceof THREE.MeshBasicMaterial) {
        glowRef.current.scale.setScalar(1.3 + pulse * 0.2 + activityPulse * 0.3);
        glowRef.current.material.opacity = (0.2 + activityPulse * 0.3 + (hovered ? 0.2 : 0)) * (isActive ? 1 : 0.3);
      }
      
      // Floating motion
      meshRef.current.position.y = platform.position[1] + Math.sin(time * 0.7 + platform.position[0] * 2) * 0.2;
    }
  });
  
  const handleClick = () => {
    selectPlatform(isSelected ? null : platform.id);
  };
  
  return (
    <group position={platform.position}>
      {/* Outer glow sphere */}
      <Sphere ref={glowRef} args={[1.5, 32, 32]}>
        <meshBasicMaterial
          color={baseColor}
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Main platform node - artistic geometric shape */}
      <group
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Core crystal/gem shape */}
        <RoundedBox args={[1.2, 1.2, 1.2]} radius={0.1} smoothness={4}>
          <meshPhysicalMaterial
            color={baseColor}
            emissive={baseColor}
            emissiveIntensity={isActive ? 0.5 + intensity * 0.5 : 0.2}
            metalness={0.8}
            roughness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transparent
            opacity={0.9}
          />
        </RoundedBox>
        
        {/* Inner energy core */}
        <Sphere args={[0.4, 16, 16]}>
          <meshBasicMaterial
            color={baseColor}
            transparent
            opacity={isActive ? 0.8 : 0.3}
          />
        </Sphere>
        
        {/* Rotating rings (orbit effect) */}
        <group rotation={[Math.PI / 4, 0, 0]}>
          <mesh>
            <torusGeometry args={[0.9, 0.03, 8, 32]} />
            <meshBasicMaterial
              color={baseColor}
              transparent
              opacity={0.4}
            />
          </mesh>
        </group>
        
        <group rotation={[0, Math.PI / 4, Math.PI / 2]}>
          <mesh>
            <torusGeometry args={[0.9, 0.03, 8, 32]} />
            <meshBasicMaterial
              color={baseColor}
              transparent
              opacity={0.4}
            />
          </mesh>
        </group>
      </group>
      
      {/* Platform label */}
      <Text
        position={[0, -2, 0]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {platform.icon} {platform.name}
      </Text>
      
      {/* Arabic label */}
      <Text
        position={[0, -2.4, 0]}
        fontSize={0.2}
        color="#aaaaaa"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {platform.nameArabic}
      </Text>
      
      {/* Activity indicator particles */}
      {isActive && intensity > 0.5 && (
        <group>
          {[...Array(5)].map((_, i) => (
            <FloatingParticle key={i} index={i} color={baseColor} />
          ))}
        </group>
      )}
    </group>
  );
};

// Small floating particles around active nodes
const FloatingParticle = ({ index, color }: { index: number; color: string }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      const angle = (index / 5) * Math.PI * 2 + time;
      const radius = 1.8;
      ref.current.position.x = Math.cos(angle) * radius;
      ref.current.position.z = Math.sin(angle) * radius;
      ref.current.position.y = Math.sin(time * 2 + index) * 0.3;
    }
  });
  
  return (
    <Sphere ref={ref} args={[0.05, 8, 8]}>
      <meshBasicMaterial color={color} />
    </Sphere>
  );
};

