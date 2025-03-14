// Global type declarations

interface Window {
  themeUtils?: {
    getTheme: () => string;
    setTheme: (theme: string) => void;
  };
} 