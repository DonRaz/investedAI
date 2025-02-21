"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { Calculator, LineChart, PieChart, Wallet, Menu, X } from "lucide-react";
import { useTranslationStore } from "@/lib/translations";
import { commonTranslations } from "@/lib/translations/common";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useRouter } from "next/navigation";

const navigation = [
  { name: "portfolio", href: "/loan-vs-sell", icon: Calculator },
  { name: "compound", href: "/compound", icon: LineChart },
  // { name: "tax", href: "/tax", icon: PieChart },
  { name: "pension", href: "/pension", icon: Wallet },
] as const;

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { language, direction } = useTranslationStore();
  const t = commonTranslations[language];
  const [isOpen, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Extract the base path without language prefix
  const basePath = pathname.split('/').slice(2).join('/');

  // Prefetch all routes on mount
  React.useEffect(() => {
    const prefetchRoutes = () => {
      navigation.forEach((item) => {
        const href = `/${language}${item.href}`;
        router.prefetch(href);
      });
    };

    prefetchRoutes();
  }, [language, router]);

  const toggleMenu = React.useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  // New helper function to determine active state
  const isRouteActive = React.useCallback((itemHref: string) => {
    // Remove leading slash and split into segments
    const itemPath = itemHref.replace('/', '');
    // Compare with basePath, also handling the home page case
    return basePath.includes(itemPath) ;
  }, [basePath]);

  if (!mounted) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="container relative flex h-14 items-center justify-between mx-auto" dir={direction()}>
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href={`/${language}`} className="flex items-center space-x-2" prefetch={true}>
            <Calculator className="h-6 w-6" />
            <span className="font-semibold">InvestCalc</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {navigation.map((item) => {
                const Icon = item.icon;
                const href = `/${language}${item.href}`;
                const isActive = isRouteActive(item.href);
                
                return (
                  <NavigationMenuItem key={item.href}>
                    <Link href={href} legacyBehavior passHref prefetch={true}>
                      <NavigationMenuLink
                        className={`flex items-center space-x-2 px-4 py-2 text-sm transition-colors hover:text-foreground/80 ${
                          isActive ? "text-foreground font-semibold" : "text-foreground font-medium"
                        }`}
                      >
                        <Icon className={`${isActive ? "h-5 w-5 stroke-[2.5]" : "h-4 w-4 stroke-[1.5]"}`} />
                        <span>{t[item.name]}</span>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Theme and Language Toggles */}
        <div className="flex items-center space-x-2">
          <LanguageToggle />
          <ModeToggle />
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-[3.5rem] left-0 right-0 border-b bg-background p-4 md:hidden">
            <nav className="flex flex-col space-y-3">
              {navigation.map((item) => {
                const Icon = item.icon;
                const href = `/${language}${item.href}`;
                const isActive = isRouteActive(item.href);
                
                return (
                  <Link
                    key={item.href}
                    href={href}
                    prefetch={true}
                    className={`flex items-center space-x-3 rounded-md px-3 py-2.5 text-sm transition-colors relative ${
                      isActive 
                        ? "bg-accent/50 font-semibold after:absolute after:left-0 after:top-0 after:h-full after:w-1 after:bg-primary after:rounded-full" 
                        : "font-medium hover:bg-accent/30"
                    }`}
                    onClick={toggleMenu}
                  >
                    <Icon className={`${isActive ? "h-5 w-5 stroke-[2.5]" : "h-4 w-4 stroke-[1.5]"}`} />
                    <span>{t[item.name]}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}