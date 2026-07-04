export const FONT_FAMILY_MAP: Record<string, string> = {
  lexend: '"Lexend", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  inter: '"Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  roboto: '"Roboto", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  jetbrains: '"JetBrains Mono", monospace',
  system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  poppins: '"Poppins", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  montserrat: '"Montserrat", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  'plus-jakarta': '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  outfit: '"Outfit", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  'space-grotesk': '"Space Grotesk", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  'fira-code': '"Fira Code", monospace',
  quicksand: '"Quicksand", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
};

export function getFontFamilyStyle(fontId: string): string {
  return FONT_FAMILY_MAP[fontId] || FONT_FAMILY_MAP.system;
}
