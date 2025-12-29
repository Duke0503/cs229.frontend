export const theme = {
  colors: {
    // Primary gradient colors
    primary: {
      start: "#667eea",
      mid: "#764ba2",
      end: "#f093fb",
    },
    // Secondary accent
    accent: {
      blue: "#4F46E5",
      purple: "#7C3AED",
      pink: "#EC4899",
    },
    // Neutral colors
    neutral: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#e5e5e5",
      300: "#d4d4d4",
      700: "#404040",
      800: "#262626",
      900: "#171717",
    },
    // Status colors
    status: {
      success: "#10b981",
      error: "#ef4444",
      warning: "#f59e0b",
      info: "#3b82f6",
    },
  },
  
  gradients: {
    primary: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
    card: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
    button: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
    headerAccent: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
  },
  
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    glow: "0 0 20px rgba(102, 126, 234, 0.4)",
  },
  
  // Consistent spacing scale (4px base)
  spacing: {
    xs: "8px",    // 2 units
    sm: "12px",   // 3 units
    md: "16px",   // 4 units
    lg: "24px",   // 6 units
    xl: "32px",   // 8 units
    "2xl": "48px", // 12 units
  },
  
  animations: {
    fadeIn: "fadeIn 0.3s ease-in",
    slideUp: "slideUp 0.4s ease-out",
    pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
  
  borderRadius: {
    sm: "6px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    full: "9999px",
  },
};
