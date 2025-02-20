"use client";

import * as React from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslationStore, Language } from "@/lib/translations";
import { useRouter, usePathname } from "next/navigation";

const languages: { code: Language; name: string }[] = [
  { code: "en", name: "English" },
  { code: "he", name: "עברית" },
];

export function LanguageToggle() {
  const { language } = useTranslationStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLanguage: Language) => {
    const currentPath = pathname.split('/').slice(2).join('/');
    router.push(`/${newLanguage}/${currentPath}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={language === lang.code ? "bg-accent" : ""}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}