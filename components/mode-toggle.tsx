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

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative h-9 w-9 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
    >
      <Sun className="h-4 w-4 scale-100 transition-transform duration-400 rotate-0 dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-4 w-4 scale-0 transition-transform duration-400 rotate-90 dark:scale-100 dark:rotate-0" />
      <span className="sr-only">{t.changeTheme}</span>
    </Button>
  );
}