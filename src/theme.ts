import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadOutfit } from "@remotion/google-fonts/Outfit";

export const INTER = loadInter("normal", { weights: ["300", "400", "500", "600", "700", "800"], subsets: ["latin", "latin-ext"] }).fontFamily;
export const OUTFIT = loadOutfit("normal", { weights: ["400", "500", "600", "700"], subsets: ["latin", "latin-ext"] }).fontFamily;

export const C = {
  bg: "#06162F",
  bg2: "#0B2548",
  slate900: "#0f172a",
  slate800: "#1e293b",
  slate700: "#334155",
  slate500: "#64748b",
  slate400: "#94a3b8",
  slate300: "#cbd5e1",
  slate200: "#e2e8f0",
  brand400: "#56B3F3",
  brand500: "#56B3F3",
  brand600: "#2779B5",
  accent400: "#F46A25",
  accent500: "#F46A25",
  emerald: "#45C99A",
  mente1: "#56B3F3",
  mente2: "#56B3F3",
  // Prism spectrum (logo order, top to bottom)
  violet: "#F46A25",
  blue: "#56B3F3",
  green: "#45C99A",
  yellow: "#F7FAFF",
  orange: "#F46A25",
  // Persona colors (deck slide 6)
  junior: "#7aa7ff",
  engineer: "#f472b6",
  manager: "#fbbf77",
};

export const SPECTRUM = [C.blue, C.green, C.orange];
export const RAINBOW_CONIC = `conic-gradient(from var(--a, 0deg), ${C.violet}, ${C.blue}, ${C.green}, ${C.yellow}, ${C.orange}, ${C.violet})`;
