export interface ModItem {
  id: string;
  name: string;
  category: 'pvp' | 'performance' | 'visuals' | 'utility';
  description: string;
  enabled: boolean;
  hotkey?: string;
  popular?: boolean;
}

export interface HudModule {
  id: string;
  name: string;
  enabled: boolean;
  position: { x: number; y: number };
  color: string;
}

export interface CosmeticItem {
  id: string;
  name: string;
  type: 'cape' | 'wings' | 'bandana' | 'hat';
  rarity: 'Legendary' | 'Epic' | 'Rare';
  previewColor: string;
  secondaryColor: string;
  pattern: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
