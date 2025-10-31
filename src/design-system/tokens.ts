// FPTU Handbook RAG - Design System Tokens
// Orange-White Theme với Professional Look

export const DESIGN_TOKENS = {
  // Color Palette - Orange-White Theme
  colors: {
    primary: {
      50: "#fff7ed",
      100: "#ffedd5",
      200: "#fed7aa",
      300: "#fdba74",
      400: "#fb923c",
      500: "#f97316", // Main FPT Orange
      600: "#ea580c",
      700: "#c2410c",
      800: "#9a3412",
      900: "#7c2d12",
    },
    neutral: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#e5e5e5",
      300: "#d4d4d4",
      400: "#a3a3a3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
    },
    background: {
      primary: "bg-gradient-to-br from-orange-50 via-white to-orange-50",
      secondary: "bg-white",
      tertiary: "bg-gray-50",
      glass: "bg-white/10 backdrop-blur-xl border border-white/20",
    },
    text: {
      primary: "text-gray-900",
      secondary: "text-gray-600",
      muted: "text-gray-500",
      white: "text-white",
      orange: "text-orange-600",
    },
  },

  // Spacing System
  spacing: {
    container: "max-w-6xl mx-auto px-4",
    containerLarge: "max-w-7xl mx-auto px-4",
    section: "py-16",
    sectionLarge: "py-20",
    card: "p-6",
    cardLarge: "p-8",
  },

  // Typography Scale
  typography: {
    heading1: "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight",
    heading2: "text-3xl md:text-4xl font-bold leading-tight",
    heading3: "text-2xl md:text-3xl font-bold leading-tight",
    heading4: "text-xl md:text-2xl font-semibold leading-tight",
    body: "text-base leading-relaxed",
    bodyLarge: "text-lg leading-relaxed",
    caption: "text-sm leading-normal",
    small: "text-xs leading-normal",
  },

  // Border Radius
  radius: {
    sm: "rounded-lg",
    md: "rounded-xl",
    lg: "rounded-2xl",
    xl: "rounded-3xl",
    full: "rounded-full",
  },

  // Shadows
  shadows: {
    sm: "shadow-sm",
    md: "shadow-lg",
    lg: "shadow-xl",
    xl: "shadow-2xl",
    glow: "shadow-orange-500/20",
  },

  // Transitions
  transitions: {
    fast: "transition-all duration-200",
    normal: "transition-all duration-300",
    slow: "transition-all duration-500",
    bounce: "transition-all duration-300 ease-out",
  },

  // Glare Effect Classes
  glare: {
    card: "glare-card hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300",
    button:
      "hover:shadow-lg transform hover:scale-105 transition-all duration-300",
    image: "transition-transform duration-500 hover:scale-110",
  },
} as const;

// Layout Components Classes
export const LAYOUT_CLASSES = {
  page: "min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50",
  container: "container mx-auto px-4 max-w-6xl",
  section: "py-16",
  sectionLarge: "py-20",
  card: "bg-white rounded-2xl shadow-lg border border-gray-100",
  cardHover:
    "hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300",
} as const;

// Professional Button Variants
export const BUTTON_VARIANTS = {
  primary:
    "bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105",
  secondary:
    "bg-white text-orange-600 border-2 border-orange-500 px-6 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-all",
  ghost:
    "text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-lg font-medium transition-all",
  danger:
    "bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition-all shadow-lg hover:shadow-xl",
} as const;

// Animation Classes
export const ANIMATIONS = {
  fadeInUp: "animate-fadeInUp",
  slideInUp: "animate-slideInUp",
  pulse: "animate-pulse",
  bounce: "animate-bounce",
  glow: "animate-glow",
} as const;
