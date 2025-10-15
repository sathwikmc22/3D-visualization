import { create } from 'zustand';

export interface PaintOption {
  id: string;
  label: string;
  baseColor: string;
  roughness: number;
  metalness: number;
  clearcoat: number;
}

export interface RimOption {
  id: string;
  label: string;
  mesh: string;
}

export interface AccessoryOption {
  id: string;
  label: string;
  mesh: string;
  enabled: boolean;
}

export interface LightingPreset {
  id: string;
  label: string;
  hdri: string;
}

export interface ConfiguratorState {
  selectedPaint: PaintOption;
  selectedRims: RimOption;
  accessories: AccessoryOption[];
  selectedLighting: LightingPreset;
  isLoading: boolean;
  
  // Actions
  setPaint: (paint: PaintOption) => void;
  setRims: (rims: RimOption) => void;
  toggleAccessory: (accessoryId: string) => void;
  setLighting: (lighting: LightingPreset) => void;
  setLoading: (loading: boolean) => void;
}

// Toyota Fortuner Configuration Data
export const paintOptions: PaintOption[] = [
  {
    id: 'pearl_white',
    label: 'Pearl White Crystal',
    baseColor: '#f8fafc',
    roughness: 0.15,
    metalness: 0.4,
    clearcoat: 0.9
  },
  {
    id: 'metallic_black',
    label: 'Attitude Black',
    baseColor: '#1c1c1c',
    roughness: 0.05,
    metalness: 0.2,
    clearcoat: 1.0
  },
  {
    id: 'dark_brown',
    label: 'Dark Brown Mica',
    baseColor: '#4a3728',
    roughness: 0.1,
    metalness: 0.6,
    clearcoat: 0.8
  },
  {
    id: 'silver_metallic',
    label: 'Silver Metallic',
    baseColor: '#8e9aaf',
    roughness: 0.08,
    metalness: 0.85,
    clearcoat: 0.9
  },
  {
    id: 'grey_metallic',
    label: 'Grey Metallic',
    baseColor: '#5d6d7e',
    roughness: 0.1,
    metalness: 0.7,
    clearcoat: 0.8
  },
  {
    id: 'red_mica',
    label: 'Red Mica Metallic',
    baseColor: '#c0392b',
    roughness: 0.12,
    metalness: 0.75,
    clearcoat: 0.85
  }
];

export const rimOptions: RimOption[] = [
  { id: 'standard_17', label: '17" Standard Alloy', mesh: 'StandardRims' },
  { id: 'diamond_cut_18', label: '18" Diamond Cut', mesh: 'DiamondRims' },
  { id: 'black_alloy_18', label: '18" Black Alloy', mesh: 'BlackRims' }
];

export const accessoryOptions: AccessoryOption[] = [
  { id: 'bull_bar', label: 'Bull Bar', mesh: 'BullBar', enabled: false },
  { id: 'roof_rails', label: 'Roof Rails', mesh: 'RoofRails', enabled: false },
  { id: 'side_steps', label: 'Side Steps', mesh: 'SideSteps', enabled: false },
  { id: 'tinted_windows', label: 'Tinted Windows', mesh: 'TintedGlass', enabled: false },
  { id: 'roof_carrier', label: 'Roof Carrier', mesh: 'RoofCarrier', enabled: false },
  { id: 'chrome_kit', label: 'Chrome Kit', mesh: 'ChromeKit', enabled: false }
];

export const lightingPresets: LightingPreset[] = [
  { id: 'showroom', label: 'Showroom', hdri: '/hdri/showroom.hdr' },
  { id: 'outdoor', label: 'Outdoor Drive', hdri: '/hdri/outdoor.hdr' },
  { id: 'off_road', label: 'Off-Road Trail', hdri: '/hdri/trail.hdr' },
  { id: 'city_night', label: 'City Night', hdri: '/hdri/city.hdr' }
];

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
  selectedPaint: paintOptions[0],
  selectedRims: rimOptions[0],
  accessories: accessoryOptions,
  selectedLighting: lightingPresets[0],
  isLoading: true,

  setPaint: (paint) => set({ selectedPaint: paint }),
  setRims: (rims) => set({ selectedRims: rims }),
  toggleAccessory: (accessoryId) =>
    set((state) => ({
      accessories: state.accessories.map((acc) =>
        acc.id === accessoryId ? { ...acc, enabled: !acc.enabled } : acc
      )
    })),
  setLighting: (lighting) => set({ selectedLighting: lighting }),
  setLoading: (loading) => set({ isLoading: loading })
}));