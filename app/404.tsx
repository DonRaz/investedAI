"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslationStore } from "@/lib/translations";

export default function Global404Page() {
  const router = useRouter();
  const { language } = useTranslationStore();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    console.log("Global 404 page mounted, language:", language);
    
    // Set a flag to prevent multiple redirects
    if (!isRedirecting) {
      setIsRedirecting(true);
      
      // Add a small delay to ensure store is initialized
      setTimeout(() => {
        const targetPath = `/${language}/404`;
        console.log("Redirecting to:", targetPath);
        router.push(targetPath);
      }, 100);
    }
  }, [router, language, isRedirecting]);

  // Show a simple loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Redirecting to 404 page...</p>
    </div>
  );
} 