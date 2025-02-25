"use client";

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import { Button } from "./button"

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: {
    regular: string
    gradient: string
  }
  description?: string
  ctaText?: string
  ctaSecondaryText?: string
  ctaHref?: string
  ctaSecondaryHref?: string
  ctaOnClick?: () => void
  bottomImage?: {
    light: string
    dark: string
  }
  gridOptions?: {
    angle?: number
    cellSize?: number
    opacity?: number
    lightLineColor?: string
    darkLineColor?: string
  }
}

const RetroGrid = ({
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  lightLineColor = "rgba(16, 185, 129, 0.2)",
  darkLineColor = "rgba(16, 185, 129, 0.2)",
}) => {
  const gridStyles = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity,
    "--light-line": lightLineColor,
    "--dark-line": darkLineColor,
  } as React.CSSProperties

  return (
    <div
      className={cn(
        "pointer-events-none absolute size-full overflow-hidden [perspective:200px]",
        `opacity-[var(--opacity)]`,
      )}
      style={gridStyles}
    >
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div className="animate-grid [background-image:linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)] [background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw] dark:[background-image:linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent to-90% dark:from-black" />
    </div>
  )
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      className,
      title = "Financial Freedom Starts Here",
      subtitle = {
        regular: "Make informed decisions for ",
        gradient: "today and tomorrow.",
      },
      description = "Our AI-powered calculators help you balance your current financial needs while maximizing your future wealth potential.",
      ctaText = "Explore Calculators",
      ctaSecondaryText = "Learn More",
      ctaHref = "#calculators",
      ctaSecondaryHref = "#how-it-works",
      ctaOnClick,
      bottomImage,
      gridOptions,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("relative", className)} ref={ref} {...props}>
        <div className="absolute top-0 z-[0] h-full w-screen bg-emerald-600/5 dark:bg-emerald-600/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(16,185,129,0.3),rgba(255,255,255,0))]" />
        <section className="relative max-w-full mx-auto z-1">
          <RetroGrid {...gridOptions} />
          <div className="max-w-screen-xl z-10 mx-auto px-4 py-20 md:py-28 gap-12 md:px-8">
            <div className="space-y-5 max-w-3xl leading-0 lg:leading-5 mx-auto text-center">
              <h1 className="text-sm text-zinc-700 dark:text-zinc-400 group font-sans mx-auto px-5 py-2 bg-gradient-to-tr from-zinc-300/30 via-zinc-400/30 to-transparent dark:from-zinc-600/30 dark:via-zinc-700/30 border-[2px] border-black/5 dark:border-white/5 rounded-3xl w-fit">
                {title}
                <ChevronRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
              </h1>
              <h2 className="text-4xl tracking-tighter font-sans bg-clip-text text-transparent mx-auto md:text-6xl bg-[linear-gradient(180deg,_#18181b_0%,_rgba(24,24,27,0.8)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,255,255,0.8)_100%)]">
                <span className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  Invested AI
                </span>
                <div className="mt-2">
                  {subtitle.regular}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-400 dark:to-emerald-300">
                    {subtitle.gradient}
                  </span>
                </div>
              </h2>
              <p className="max-w-2xl mx-auto text-zinc-700 dark:text-zinc-300">
                {description}
              </p>
              <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
                <span className="relative inline-block overflow-hidden rounded-full p-[1.5px]">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#10B981_0%,#059669_50%,#10B981_100%)]" />
                  <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white dark:bg-zinc-900 text-xs font-medium backdrop-blur-3xl">
                    <a
                      href={ctaHref}
                      onClick={(e) => {
                        if (ctaOnClick) {
                          e.preventDefault();
                          ctaOnClick();
                        }
                      }}
                      className="inline-flex rounded-full text-center group items-center w-full justify-center bg-gradient-to-tr from-zinc-300/30 via-emerald-400/30 to-transparent dark:from-zinc-700/30 dark:via-emerald-400/20 text-zinc-900 dark:text-white border-input border-[1px] hover:bg-gradient-to-tr hover:from-zinc-300/40 hover:via-emerald-400/40 hover:to-transparent dark:hover:from-zinc-700/40 dark:hover:via-emerald-400/30 transition-all sm:w-auto py-3 px-8 md:py-4 md:px-10"
                    >
                      {ctaText}
                    </a>
                  </div>
                </span>
              </div>
            </div>
            {bottomImage && (
              <div className="mt-20 md:mt-32 mx-4 md:mx-10 relative z-10">
                <img
                  src={bottomImage.light}
                  className="w-full shadow-lg rounded-lg border border-zinc-300 dark:hidden"
                  alt="Dashboard preview"
                />
                <img
                  src={bottomImage.dark}
                  className="hidden w-full shadow-lg rounded-lg border border-zinc-700 dark:block"
                  alt="Dashboard preview"
                />
              </div>
            )}
          </div>
        </section>
      </div>
    )
  },
)
HeroSection.displayName = "HeroSection"

export { HeroSection } 