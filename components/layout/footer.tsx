"use client";

import { useTranslationStore } from "@/lib/translations";
import { commonTranslations } from "@/lib/translations/common";
import { useEffect, useState } from "react";
import Link from "next/link";

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
      <div className="container flex flex-col h-auto py-4 items-center justify-between mx-auto" dir={direction()}>
        <p className="bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-400 dark:to-emerald-500 bg-clip-text text-transparent font-medium text-xs mb-3">
          {t.madeWith}
        </p>
        <div className="flex w-full items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} InvestCalc. {t.allRightsReserved}
          </p>
          <nav className="flex items-center space-x-6 gap-x-6">
            <Link
              href={`/${language}/legal`}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {t.legal}
            </Link>
            <Link
              href={`/${language}/contact`}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {t.contact}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}