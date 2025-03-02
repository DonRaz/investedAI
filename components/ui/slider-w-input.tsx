'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SliderWithInputProps {
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  formatValue?: (value: number) => string;
  parseValue?: (value: string) => number;
  className?: string;
  allowNegative?: boolean;
}

export function SliderWithInput({
  value,
  onValueChange,
  min,
  max,
  step,
  formatValue = (v) => v.toString(),
  parseValue = (v) => Number(v.replace(/[^0-9.-]+/g, '')),
  className,
  allowNegative = false,
}: SliderWithInputProps) {
  const [inputValue, setInputValue] = React.useState(formatValue(value));
  const [sliderValue, setSliderValue] = React.useState(Math.min(value, max));

  React.useEffect(() => {
    setInputValue(formatValue(value));
    setSliderValue(Math.min(Math.max(value, min), max));
  }, [value, min, max, formatValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    const parsed = parseValue(newValue);
    if (!isNaN(parsed) && (allowNegative || parsed >= min)) {
      onValueChange(parsed);
      setSliderValue(Math.min(Math.max(parsed, min), max));
    }
  };

  const handleInputBlur = () => {
    const parsed = parseValue(inputValue);
    if (isNaN(parsed) || (!allowNegative && parsed < min)) {
      setInputValue(formatValue(min));
      onValueChange(min);
      setSliderValue(min);
    } else {
      setInputValue(formatValue(parsed));
      onValueChange(parsed);
      setSliderValue(Math.min(Math.max(parsed, min), max));
    }
  };

  const handleSliderChange = (newValue: number[]) => {
    const value = newValue[0];
    setSliderValue(value);
    onValueChange(value);
    setInputValue(formatValue(value));
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center gap-4">
        <SliderPrimitive.Root
          className="relative flex w-full touch-none select-none items-center"
          value={[sliderValue]}
          onValueChange={handleSliderChange}
          min={min}
          max={max}
          step={step}
          aria-label="Amount"
        >
          <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
            <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-primary/50 to-primary" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-gradient-to-b from-background to-background/90 shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
        </SliderPrimitive.Root>
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="w-[140px]"
        />
      </div>
    </div>
  );
}