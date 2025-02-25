'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useTranslationStore } from '@/lib/translations';

const styles = {
  switch: `relative block cursor-pointer h-8 w-[52px]
    [--c-active:#10B981]
    [--c-success:#10B981]
    [--c-warning:#F59E0B]
    [--c-danger:#EF4444]
    [--c-active-inner:#FFFFFF]
    [--c-default:#D2D6E9]
    [--c-default-dark:#C7CBDF]
    [--c-black:#1B1B22]
    [transform:translateZ(0)]
    [-webkit-transform:translateZ(0)]
    [backface-visibility:hidden]
    [-webkit-backface-visibility:hidden]
    [perspective:1000]
    [-webkit-perspective:1000]`,
  input: `h-full w-full cursor-pointer appearance-none rounded-full
    bg-[--c-default] outline-none transition-colors duration-500
    hover:bg-[--c-default-dark]
    [transform:translate3d(0,0,0)]
    [-webkit-transform:translate3d(0,0,0)]
    data-[checked=true]:bg-[--c-background]
    dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:data-[checked=true]:bg-[--c-background]`,
  svg: `pointer-events-none absolute inset-0 fill-white
    [transform:translate3d(0,0,0)]
    [-webkit-transform:translate3d(0,0,0)]`,
  circle: `transform-gpu transition-transform duration-500
    [transform:translate3d(0,0,0)]
    [-webkit-transform:translate3d(0,0,0)]
    [backface-visibility:hidden]
    [-webkit-backface-visibility:hidden]`,
  dropCircle: `transform-gpu transition-transform duration-700
    [transform:translate3d(0,0,0)]
    [-webkit-transform:translate3d(0,0,0)]`
};

const variantStyles = {
  default: '[--c-background:var(--c-active)]',
  success: '[--c-background:var(--c-success)]',
  warning: '[--c-background:var(--c-warning)]',
  danger: '[--c-background:var(--c-danger)]',
};

interface LiquidToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  leftLabel?: string;
  rightLabel?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  forceDirection?: 'ltr' | 'rtl';
}

export function LiquidToggle({
  checked,
  onCheckedChange,
  disabled = false,
  leftLabel,
  rightLabel,
  variant = 'default',
  forceDirection,
  className,
  ...props
}: LiquidToggleProps) {
  const { direction } = useTranslationStore();
  const isRtl = forceDirection === 'rtl' || (!forceDirection && direction() === 'rtl');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onCheckedChange(!checked);
    }
  };

  // Adjust the label order based on RTL/LTR
  const renderToggleWithLabels = () => {
    // For RTL, we need to reverse the order of labels
    const firstLabel = isRtl ? rightLabel : leftLabel;
    const secondLabel = isRtl ? leftLabel : rightLabel;
    const firstLabelBold = isRtl ? checked : !checked;
    const secondLabelBold = isRtl ? !checked : checked;

    return (
      <>
        {firstLabel && (
          <span className={cn('text-gray-700 dark:text-gray-300 text-sm', firstLabelBold && 'font-bold')}>
            {firstLabel}
          </span>
        )}
        <label className={cn(styles.switch, disabled && 'opacity-50 cursor-not-allowed')}>
          <input
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            data-checked={checked}
            disabled={disabled}
            className={cn(styles.input, variantStyles[variant])}
          />
          <svg
            viewBox="0 0 52 32"
            filter="url(#goo)"
            className={styles.svg}
          >
            <circle
              className={styles.circle}
              cx="16"
              cy="16"
              r="10"
              style={{
                transformOrigin: '16px 16px',
                transform: `translateX(${checked ? '12px' : '0px'}) scale(${checked ? '0' : '1'})`,
              }}
            />
            <circle
              className={styles.circle}
              cx="36"
              cy="16"
              r="10"
              style={{
                transformOrigin: '36px 16px',
                transform: `translateX(${checked ? '0px' : '-12px'}) scale(${checked ? '1' : '0'})`,
              }}
            />
            {checked && (
              <circle
                className={styles.dropCircle}
                cx="35"
                cy="-1"
                r="2.5"
              />
            )}
          </svg>
        </label>
        {secondLabel && (
          <span className={cn('text-gray-700 dark:text-gray-300 text-sm', secondLabelBold && 'font-bold')}>
            {secondLabel}
          </span>
        )}
      </>
    );
  };

  return (
    <div 
      className={cn('flex items-center gap-2 relative', className)} 
      dir={forceDirection || direction()}
      {...props}
    >
      {renderToggleWithLabels()}
    </div>
  );
}

export function GooeyFilter() {
  return (
    <svg className="fixed w-0 h-0">
      <defs>
        <filter id="goo">
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="2"
            result="blur"
          />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="goo"
          />
          <feComposite
            in="SourceGraphic"
            in2="goo"
            operator="atop"
          />
        </filter>
      </defs>
    </svg>
  );
} 