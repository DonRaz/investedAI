"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface TransparentImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function TransparentImage({
  src,
  alt,
  width = 400,
  height = 400,
  className = "",
}: TransparentImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="text-center p-4">
          <p className="text-muted-foreground text-6xl">🐶</p>
          <p className="text-sm text-muted-foreground mt-2">Image not found</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative ${className}`}
      style={{ 
        width: width, 
        height: height,
        backgroundColor: 'transparent'
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`(max-width: 1024px) ${width * 0.75}px, ${width}px`}
        className="object-contain drop-shadow-md transparent-image"
        style={{ 
          objectFit: 'contain',
          backgroundColor: 'transparent'
        }}
        priority
        unoptimized={true}
        onError={() => setError(true)}
      />
    </div>
  );
} 