import { useEffect } from 'react';
import { useConfiguratorStore } from '../../store/configuratorStore';

export const LoadingScreen = () => {
  const { setLoading } = useConfiguratorStore();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-border rounded-full animate-spin">
            <div className="w-6 h-6 bg-primary rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Loading 3D Model</h3>
          <p className="text-muted-foreground">Preparing your car configurator...</p>
        </div>

        <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-primary animate-pulse loading-shine"></div>
        </div>
      </div>
    </div>
  );
};