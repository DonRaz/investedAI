"use client";

import { useTranslationStore } from "@/lib/translations";
import { commonTranslations } from "@/lib/translations/common";
import { useEffect, useState } from "react";

export function Footer() {
  const { language, direction } = useTranslationStore();
  const t = commonTranslations[language];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <footer className="border-t">
      <div className="container flex h-14 items-center justify-between mx-auto" dir={direction()}>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} InvestCalc. {t.allRightsReserved}
        </p>
        <nav className="flex items-center space-x-6">
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {t.terms}
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {t.privacy}
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {t.contact}
          </a>
        </nav>
      </div>
    </footer>
  );
}