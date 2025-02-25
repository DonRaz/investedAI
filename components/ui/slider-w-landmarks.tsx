'use client';

import React, { useEffect, useRef, type KeyboardEvent } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';

type Advisor = {
  name: string;
  value: number;
  logic: string;
  date: string;
  link: string;
  type: 'person' | 'pastPerformance';
};

type CustomInterestSliderProps = {
  className?: string;
  advisors?: Advisor[];
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange: (value: number) => void;
  isShowingHeader?: boolean;
};

const defaultAdvisors: Advisor[] = [
  {
    name: 'S&P 500 - 20 years',
    value: 7.75,
    logic: '2005 to 2025',
    date: '1st Jan 2025',
    link: 'https://www.wsj.com/market-data/quotes/index/SPX/historical-prices',
    type: 'pastPerformance',
  },
  {
    name: 'Nasdaq 100 - 20 Years',
    value: 13.04,
    logic: '2020 to 2025',
    date: '1st Jan 2025',
    link: 'https://www.nasdaq.com/market-activity/index/ndx/historical?page=1&rows_per_page=10&timeline=m1',
    type: 'pastPerformance',
  },
  {
    name: 'S&P 500 - 5 years',
    value: 12.49,
    logic: '2020 to 2025',
    date: '1st Jan 2025',
    link: 'https://www.wsj.com/market-data/quotes/index/SPX/historical-prices',
    type: 'pastPerformance',
  },

  {
    name: 'Nasdaq 100 - 5 years',
    value: 19.68,
    logic: '2020 to 2025',
    date: '1st Jan 2025',
    link: 'https://www.nasdaq.com/market-activity/index/ndx/historical?page=1&rows_per_page=10&timeline=m1',
    type: 'pastPerformance',
  },

  // {
  //   name: 'Apple',
  //   value: 26.56,
  //   logic: '2020 to 2025',
  //   date: 'Jan 2025',
  //   link: 'https://finance.yahoo.com/quote/AAPL/history/?utm_source=chatgpt.com',
  //   type: 'pastPerformance'
  // },
];

const getAdvisorSummary = (a: Advisor): string => {
  // TODO: continue - while making the name and the date clickable to reach the link

  // Format the return value with percentage

  if (a.type == 'pastPerformance') {
    return `${a.name} @ ${a.date}`;
  }
  const formattedValue = `${a.value.toFixed(1)}%`;
  return `${formattedValue} - [ ${a.name} @ ${a.date} ]`;
};

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex w-full touch-none select-none items-center',
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-gray-100">
      <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-teal-500 to-emerald-400" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-100 shadow-lg ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
      <div className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-400" />
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export function CustomInterestSlider({
  className,
  advisors = defaultAdvisors,
  value,
  min = 0,
  max = 20,
  step = 0.1,
  onValueChange,
  isShowingHeader = false,
}: CustomInterestSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleSliderChange = (newValue: number[]) => {
    onValueChange(newValue[0]);
  };

  const handlePinClick = (advisor: Advisor) => {
    onValueChange(advisor.value);
  };

  const findClosestAdvisor = (value: number): Advisor | null => {
    const sortedAdvisors = [...advisors].sort(
      (a, b) => Math.abs(a.value - value) - Math.abs(b.value - value)
    );
    return Math.abs(sortedAdvisors[0].value - value) <= 0.5
      ? sortedAdvisors[0]
      : null;
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    let newValue = value;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = Math.min(value + step, max);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = Math.max(value - step, min);
        break;
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      default:
        return;
    }

    onValueChange(newValue);
  };

  const selectedAdvisor = findClosestAdvisor(value);
  return (
    <div className={cn('w-full max-w-2xl mx-auto px-4 py-0', className)}>
      <div className="flex justify-between items-start mb-12">
        {isShowingHeader && (
          <>
            <h2 className="text-md sm:text-lg text-gray-600 mr-auto">
              Estimate Average Returns
            </h2>
            <div className="mb-auto">
              <span className="text-lg sm:text-xl font-bold text-gray-700">
                {value.toFixed(1)}
              </span>
              <span className="text-md sm:text-base mt-auto font-bold text-gray-700">
                %
              </span>
            </div>
          </>
        )}
      </div>

      <div className="relative mb-4">
        {advisors.map((advisor) => (
          <div
            key={advisor.name}
            className="absolute -top-6 transform -translate-x-1/2 cursor-pointer group"
            style={{ left: `${((advisor.value - min) / (max - min)) * 100}%` }}
            onClick={() => handlePinClick(advisor)}
          >
            <svg
              className={cn(
                'transform transition-transform duration-200 rotate-45',
                selectedAdvisor?.name === advisor.name
                  ? 'scale-125'
                  : 'hover:scale-110'
              )}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 0L16 16H0L8 0Z"
                fill={
                  selectedAdvisor?.name === advisor.name ? '#6B7280' : '#D1D5DB'
                }
                className="transition-colors duration-200"
              />
            </svg>
          </div>
        ))}
        <div
          className="mt-6"
          ref={sliderRef}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-label="Interest Rate"
        >
          <Slider
            value={[value]}
            min={min}
            max={max}
            step={step}
            onValueChange={handleSliderChange}
          />
        </div>
      </div>

      <div className="h-[2.5rem] mb-2">
        {selectedAdvisor && (
          <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-4 italic">
            {/* Replace Play icon with custom SVG */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 flex-shrink-0"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <span className="line-clamp-2">
              <a
                href={selectedAdvisor.link}
                className="text-blue-700/50 bold hover:underline dark:text-emerald-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedAdvisor.value.toFixed(1)}%
              </a>
              - {getAdvisorSummary(selectedAdvisor)}
              {/* {selectedAdvisor.logic} */}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
