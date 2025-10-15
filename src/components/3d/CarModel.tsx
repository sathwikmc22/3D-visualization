import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useConfiguratorStore } from '../../store/configuratorStore';

export const CarModel = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { selectedPaint, accessories } = useConfiguratorStore();

  // Load your Fortuner .glb file (replace path with actual file)
  const { scene } = useGLTF('/models/fortuner.glb');

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        const matName = child.material.name.toLowerCase();

        // 🔍 Debug: see actual material names
        console.log("Mesh:", child.name, "| Material:", child.material.name);

        // 🎨 Car body (base paint)
        if (matName.includes('carpaint') || matName.includes('body')) {
          child.material.color = new THREE.Color(selectedPaint.baseColor);
          child.material.metalness = selectedPaint.metalness;
          child.material.roughness = selectedPaint.roughness;
          child.material.clearcoat = selectedPaint.clearcoat;
          child.material.needsUpdate = true;
        }

        // 🪟 Windows
        if (matName.includes('glass') || matName.includes('window')) {
          const tinted = accessories.find(acc => acc.id === 'tinted_windows')?.enabled;
          child.material.color = new THREE.Color(tinted ? "#1a1a1a" : "#87ceeb");
          child.material.transmission = tinted ? 0.3 : 0.9;
          child.material.opacity = tinted ? 0.6 : 0.3;
          child.material.transparent = true;
          child.material.needsUpdate = true;
        }

        // ⚙️ Wheels
        if (matName.includes('wheel') || matName.includes('rim')) {
          child.material.color = new THREE.Color("#e8e8e8");
          child.material.metalness = 0.9;
          child.material.roughness = 0.05;
        }

        if (matName.includes('tire')) {
          child.material.color = new THREE.Color("#1a1a1a");
        }
      }
    });
  }, [scene, selectedPaint, accessories]);

  // Subtle breathing animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.03;
      groupRef.current.position.y = -1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]} scale={[1.1, 1.1, 1.1]}>
      <primitive object={scene} />
    </group>
  );
};
