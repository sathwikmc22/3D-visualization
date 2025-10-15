import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, PresentationControls } from '@react-three/drei';
import { CarModel } from './3d/CarModel';
import { ConfiguratorPanel } from './ui/ConfiguratorPanel';
import { LoadingScreen } from './ui/LoadingScreen';
import { useConfiguratorStore } from '../store/configuratorStore';

export const CarConfigurator = () => {
  const { isLoading, selectedLighting } = useConfiguratorStore();

  return (
    <div className="h-screen w-full flex bg-background">
      {/* 3D Viewport */}
      <div className="flex-1 relative">
        <Canvas
          camera={{ position: [4, 2, 6], fov: 50 }}
          shadows
          className="bg-gradient-to-br from-background to-muted/20"
        >
          <Suspense fallback={null}>
            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight 
              position={[10, 10, 5]} 
              castShadow 
              intensity={1}
              shadow-mapSize={[2048, 2048]}
            />
            
            {/* Environment */}
            <Environment preset="studio" background={false} />
            
            {/* Car Model */}
            <PresentationControls
              global
              config={{ mass: 2, tension: 500 }}
              snap={{ mass: 4, tension: 1500 }}
              rotation={[0, 0.3, 0]}
              polar={[-Math.PI / 3, Math.PI / 3]}
              azimuth={[-Math.PI / 1.4, Math.PI / 2]}
            >
              <CarModel />
            </PresentationControls>
            
            {/* Ground */}
            <ContactShadows 
              position={[0, -1.4, 0]} 
              opacity={0.4} 
              scale={15} 
              blur={2.5} 
              far={4.5} 
            />
            
            {/* Controls */}
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              minPolarAngle={0}
              maxPolarAngle={Math.PI / 2}
              minDistance={3}
              maxDistance={12}
            />
          </Suspense>
        </Canvas>
        
        {/* Loading Overlay */}
        {isLoading && <LoadingScreen />}
      </div>
      
      {/* Configuration Panel */}
      <ConfiguratorPanel />
    </div>
  );
};