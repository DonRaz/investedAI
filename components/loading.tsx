"use client";

export function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative flex h-8 w-8">
        <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></div>
        <div className="relative inline-flex rounded-full h-8 w-8 bg-primary"></div>
      </div>
    </div>
  );
}