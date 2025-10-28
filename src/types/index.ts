// Type definitions for the bike application

export interface Bike {
  id: string;
  name: string;
  image: string;
  price: number;
  origin: string;
  battery: string;
  range: number;
  maxSpeed: number;
  weight: number;
  warranty: number;
  description?: string;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}
