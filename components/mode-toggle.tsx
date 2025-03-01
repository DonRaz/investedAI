"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/lib/store/theme-store";
import { useTranslationStore } from "@/lib/translations";
import { commonTranslations } from "@/lib/translations/common";

export function ModeToggle() {
  const { theme, setTheme } = useThemeStore();
  const { language } = useTranslationStore();
  const t = commonTranslations[language];
  const [mounted, setMounted] = React.useState(false);

  // Apply theme transition class to body when component mounts
  React.useEffect(() => {
    setMounted(true);
    
    // Add theme-transition class to relevant elements
    document.body.classList.add('theme-transition');
    
    // Get all major UI containers that should have transitions
    const transitionElements = document.querySelectorAll('header, main, footer, .card, .button, nav');
    transitionElements.forEach(el => {
      el.classList.add('theme-transition');
    });
    
    return () => {
      document.body.classList.remove('theme-transition');
    };
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    // Apply the theme change
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative h-9 w-9 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground theme-transition"
    >
      <Sun className="h-4 w-4 absolute transition-all duration-200 ease-in-out" 
        style={{
          opacity: theme === 'light' ? 1 : 0,
          transform: `scale(${theme === 'light' ? 1 : 0}) rotate(${theme === 'light' ? 0 : -90}deg)`
        }}
      />
      <Moon className="h-4 w-4 absolute transition-all duration-200 ease-in-out"
        style={{
          opacity: theme === 'dark' ? 1 : 0,
          transform: `scale(${theme === 'dark' ? 1 : 0}) rotate(${theme === 'dark' ? 0 : 90}deg)`
        }}
      />
      <span className="sr-only">{t.changeTheme}</span>
    </Button>
  );
}