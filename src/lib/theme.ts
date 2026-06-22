// src/lib/theme.ts

export const theme = {
  colors: {
    primary: "#0066CC",
    primaryHover: "#0052A3",
    primaryFocus: "#004080",
    secondary: "#E8F0FE",
    accent: "#FF6B35",
    accentHover: "#E55A2B",
    background: "#F8F9FA",
    surface: "#FFFFFF",
    surfaceHover: "#F1F3F4",
    border: "#E0E0E0",
    borderFocus: "#0066CC",
    textPrimary: "#1A1A1A",
    textSecondary: "#5F6368",
    textDisabled: "#9AA0A6",
    textOnPrimary: "#FFFFFF",
    success: "#1E8E3E",
    error: "#D93025",
    warning: "#F29900",
    focusRing: "#0066CC",
    focusRingOffset: "#FFFFFF",
  },

  typography: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontFamilySans: "'Helvetica Neue', 'Arial', sans-serif",
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: "1.25",
      normal: "1.5",
      relaxed: "1.75",
    },
  },

  spacing: {
    "1": "0.25rem",
    "2": "0.5rem",
    "3": "0.75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "8": "2rem",
    "10": "2.5rem",
    "12": "3rem",
    "16": "4rem",
  },

  radii: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "9999px",
  },

  shadows: {
    sm: "0 1px 3px rgba(0,0,0,0.08)",
    md: "0 4px 12px rgba(0,0,0,0.10)",
    lg: "0 8px 24px rgba(0,0,0,0.12)",
    focus: "0 0 0 3px rgba(0, 102, 204, 0.3)",
  },

  breakpoints: {
    sm: "480px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },

  transitions: {
    fast: "150ms ease",
    normal: "250ms ease",
    slow: "350ms ease",
  },
} as const;

export type AppTheme = typeof theme;
