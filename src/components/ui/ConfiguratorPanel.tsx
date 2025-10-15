import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Switch } from '../ui/switch';
import { useConfiguratorStore, paintOptions, rimOptions, lightingPresets } from '../../store/configuratorStore';
import { Palette, Settings, Sun, Download, Smartphone, Eye } from 'lucide-react';
import { useState } from 'react';

export const ConfiguratorPanel = () => {
  const {
    selectedPaint,
    selectedRims,
    accessories,
    selectedLighting,
    setPaint,
    setRims,
    toggleAccessory,
    setLighting
  } = useConfiguratorStore();

  const [activeSection, setActiveSection] = useState<'paint' | 'accessories' | 'lighting'>('paint');

  const handleSnapshot = () => {
    // In a real implementation, this would capture the 3D canvas
    console.log('Taking snapshot...');
  };

  const handleAR = () => {
    // In a real implementation, this would trigger AR mode
    console.log('Launching AR preview...');
  };

  return (
    <div className="w-96 h-full glass-panel border-l-0 rounded-none flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Toyota Fortuner
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Premium Full-Size SUV Configurator
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">4WD Ready</span>
          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">7-Seater</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex border-b border-border/50">
        {[
          { id: 'paint', label: 'Paint', icon: Palette },
          { id: 'accessories', label: 'Accessories', icon: Settings },
          { id: 'lighting', label: 'Environment', icon: Sun }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id as any)}
            className={`flex-1 px-4 py-3 flex items-center justify-center gap-2 transition-all duration-200 ${
              activeSection === id
                ? 'bg-primary/10 text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Paint Section */}
        {activeSection === 'paint' && (
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Paint Finish
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {paintOptions.map((paint) => (
                  <button
                    key={paint.id}
                    onClick={() => setPaint(paint)}
                    className={`paint-swatch ${selectedPaint.id === paint.id ? 'active' : ''}`}
                    style={{ backgroundColor: paint.baseColor }}
                    title={paint.label}
                  />
                ))}
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">{selectedPaint.label}</h4>
                <div className="flex gap-2">
                  <Badge variant="secondary">
                    Metalness: {Math.round(selectedPaint.metalness * 100)}%
                  </Badge>
                  <Badge variant="secondary">
                    Clearcoat: {Math.round(selectedPaint.clearcoat * 100)}%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Accessories Section */}
        {activeSection === 'accessories' && (
          <div className="space-y-4">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Wheels
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {rimOptions.map((rim) => (
                  <Button
                    key={rim.id}
                    variant={selectedRims.id === rim.id ? "default" : "outline"}
                    onClick={() => setRims(rim)}
                    className="w-full justify-start btn-automotive"
                  >
                    {rim.label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Accessories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {accessories.map((accessory) => (
                  <div key={accessory.id} className="flex items-center justify-between">
                    <label htmlFor={accessory.id} className="font-medium cursor-pointer">
                      {accessory.label}
                    </label>
                    <Switch
                      id={accessory.id}
                      checked={accessory.enabled}
                      onCheckedChange={() => toggleAccessory(accessory.id)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Lighting Section */}
        {activeSection === 'lighting' && (
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="w-5 h-5" />
                Environment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {lightingPresets.map((preset) => (
                <Button
                  key={preset.id}
                  variant={selectedLighting.id === preset.id ? "default" : "outline"}
                  onClick={() => setLighting(preset)}
                  className="w-full justify-start btn-automotive"
                >
                  {preset.label}
                </Button>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Actions */}
      <div className="p-6 border-t border-border/50 space-y-3">
        <Button onClick={handleSnapshot} className="w-full btn-automotive" variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Save Snapshot
        </Button>
        <Button onClick={handleAR} className="w-full btn-automotive bg-gradient-primary">
          <Smartphone className="w-4 h-4 mr-2" />
          View in AR
        </Button>
      </div>
    </div>
  );
};