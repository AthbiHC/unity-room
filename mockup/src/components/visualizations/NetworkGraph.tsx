import { useRef } from 'react';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { platforms } from '../../data/kuwaitData';
import { PlatformNode } from '../platforms/PlatformNode';
import { DataParticles } from '../effects/DataParticles';
import { ConnectionLines } from '../effects/ConnectionLines';
import { useAppStore } from '../../store/appStore';
import { useScenario } from '../../hooks/useScenario';

export const NetworkGraph = () => {
  const metrics = useAppStore((state) => state.metrics);
  const { isActive: scenarioActive, activePlatforms: scenarioActivePlatforms } = useScenario();
  
  // Determine active platforms
  const activePlatforms = scenarioActive 
    ? scenarioActivePlatforms 
    : Object.keys(metrics).filter(id => metrics[id]?.activeNow);
  
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 8, 20]} />
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={10}
        maxDistance={40}
        maxPolarAngle={Math.PI / 1.8}
      />
      
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#3b82f6" />
      
      {/* Environment */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <fog attach="fog" args={['#0a0a0a', 20, 60]} />
      
      {/* Central Juhainah Core - the brain of the system */}
      <JuhainahCore activePlatforms={activePlatforms} />
      
      {/* Platform nodes */}
      {platforms.map((platform) => {
        const isActive = activePlatforms.includes(platform.id);
        const intensity = metrics[platform.id]?.volume ? metrics[platform.id].volume / 100 : 0.5;
        
        return (
          <PlatformNode
            key={platform.id}
            platform={platform}
            isActive={isActive}
            intensity={intensity}
          />
        );
      })}
      
      {/* Connection lines between platforms */}
      <ConnectionLines activePlatforms={activePlatforms} showAll />
      
      {/* Data particles flowing between platforms */}
      <DataParticles count={300} activePlatforms={activePlatforms} />
      
      {/* Layer indicator rings */}
      <LayerRings />
    </>
  );
};

// Central Juhainah core - pulsing energy center that receives all data
const JuhainahCore = ({ activePlatforms }: { activePlatforms: string[] }) => {
  const coreRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (coreRef.current && innerRef.current) {
      const time = state.clock.elapsedTime;
      
      // Rotation
      coreRef.current.rotation.y = time * 0.2;
      coreRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
      
      // Pulsing based on activity
      const pulse = 1 + Math.sin(time * 2) * 0.1 + (activePlatforms.length / 8) * 0.2;
      innerRef.current.scale.setScalar(pulse);
      
      // Glow intensity
      if (innerRef.current.material instanceof THREE.MeshPhysicalMaterial) {
        innerRef.current.material.emissiveIntensity = 0.5 + Math.sin(time * 3) * 0.3;
      }
    }
  });
  
  return (
    <group ref={coreRef} position={[0, 0, 0]}>
      {/* Outer shell */}
      <mesh>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshPhysicalMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>
      
      {/* Inner core */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshPhysicalMaterial
          color="#fbbf24"
          emissive="#fbbf24"
          emissiveIntensity={0.8}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
      
      {/* Orbiting energy rings */}
      {[0, 1, 2].map((i) => (
        <group key={i} rotation={[Math.PI / 3 * i, Math.PI / 4 * i, 0]}>
          <mesh>
            <torusGeometry args={[1.8, 0.05, 8, 32]} />
            <meshBasicMaterial
              color="#10b981"
              transparent
              opacity={0.4}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// Visual indicators for the three layers
const LayerRings = () => {
  const ringsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });
  
  const layers = [
    { y: -3, color: '#10b981', radius: 12, name: 'TRUTH LAYER' },
    { y: 1, color: '#3b82f6', radius: 10, name: 'SPEED LAYER' },
    { y: 5, color: '#a855f7', radius: 8, name: 'DEPTH LAYER' },
  ];
  
  return (
    <group ref={ringsRef}>
      {layers.map((layer, i) => (
        <mesh key={i} position={[0, layer.y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[layer.radius, layer.radius + 0.1, 64]} />
          <meshBasicMaterial
            color={layer.color}
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
};

