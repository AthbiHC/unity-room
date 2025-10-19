import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { platforms } from '../../data/kuwaitData';

interface ConnectionLinesProps {
  activePlatforms?: string[];
  showAll?: boolean;
}

export const ConnectionLines = ({ activePlatforms = [], showAll = true }: ConnectionLinesProps) => {
  return (
    <group>
      {/* Connect platforms within same layer */}
      {platforms.map((platform) => {
        const sameLayers = platforms.filter(p => p.layer === platform.layer && p.id !== platform.id);
        return sameLayers.map((target) => (
          <ConnectionLine
            key={`${platform.id}-${target.id}`}
            start={platform.position as [number, number, number]}
            end={target.position as [number, number, number]}
            color={platform.color}
            active={activePlatforms.includes(platform.id) && activePlatforms.includes(target.id)}
            opacity={showAll ? 0.15 : activePlatforms.includes(platform.id) ? 0.4 : 0.05}
          />
        ));
      })}
      
      {/* Central hub connections (all platforms to center) */}
      {platforms.map((platform) => (
        <ConnectionLine
          key={`center-${platform.id}`}
          start={[0, 0, 0]}
          end={platform.position as [number, number, number]}
          color={platform.color}
          active={activePlatforms.includes(platform.id)}
          opacity={0.1}
          dashed
        />
      ))}
    </group>
  );
};

interface ConnectionLineProps {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  active?: boolean;
  opacity?: number;
  dashed?: boolean;
}

const ConnectionLine = ({ start, end, color, active = false, opacity = 0.2 }: ConnectionLineProps) => {
  const materialRef = useRef<THREE.LineBasicMaterial>(null);
  
  // Create curved path between points
  const points = getCurvedPath(start, end, 0.5);
  
  useFrame((state) => {
    if (materialRef.current) {
      const time = state.clock.elapsedTime;
      
      // Pulsing opacity
      const pulse = Math.sin(time * 2) * 0.1 + 0.9;
      materialRef.current.opacity = (active ? opacity * 2 : opacity) * pulse;
    }
  });
  
  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
          args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        ref={materialRef}
        color={color}
        transparent
        opacity={opacity}
        linewidth={active ? 2 : 1}
      />
    </line>
  );
};

// Generate curved path between two points
const getCurvedPath = (start: [number, number, number], end: [number, number, number], curvature: number): THREE.Vector3[] => {
  const points: THREE.Vector3[] = [];
  const segments = 20;
  
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    
    // Quadratic bezier curve
    const midPoint = [
      (start[0] + end[0]) / 2,
      (start[1] + end[1]) / 2 + curvature,
      (start[2] + end[2]) / 2,
    ];
    
    const x = 
      (1 - t) * (1 - t) * start[0] +
      2 * (1 - t) * t * midPoint[0] +
      t * t * end[0];
    
    const y =
      (1 - t) * (1 - t) * start[1] +
      2 * (1 - t) * t * midPoint[1] +
      t * t * end[1];
    
    const z =
      (1 - t) * (1 - t) * start[2] +
      2 * (1 - t) * t * midPoint[2] +
      t * t * end[2];
    
    points.push(new THREE.Vector3(x, y, z));
  }
  
  return points;
};

