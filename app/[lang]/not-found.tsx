"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslationStore, Language } from '@/lib/translations';

export default function NotFound({ params }: { params: { lang: string } }) {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    console.log("Language-specific not-found page mounted with params:", params);
    
    // Set a flag to prevent multiple redirects
    if (!isRedirecting) {
      setIsRedirecting(true);
      
      // Redirect to our custom 404 page
      setTimeout(() => {
        const targetPath = `/${params.lang}/404`;
        console.log("Redirecting to:", targetPath);
        router.push(targetPath);
      }, 100);
    }
  }, [router, params, isRedirecting]);

  // Show a simple loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Redirecting to 404 page...</p>
    </div>
  );
} 