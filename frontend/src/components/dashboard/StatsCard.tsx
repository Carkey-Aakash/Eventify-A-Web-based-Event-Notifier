
import React from 'react';
import { cn } from '../../utils/helpers';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  subtext?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  trend,
  className,
  subtext,
}) => {
  return (
    <div
      className={cn(
        // container
        'relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm',
        // light gradient wash
        'before:pointer-events-none before:absolute before:-inset-1 before:bg-gradient-to-br before:from-gray-50 before:to-white/0 before:opacity-60',
        'p-5',
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            {title}
          </p>
          <p className="truncate pt-1 text-3xl font-extrabold text-gray-900">
            {value}
          </p>

          <div className="mt-1 flex items-center gap-2">
            {trend && (
              <span
                className={cn(
                  'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset',
                  trend.isPositive
                    ? 'bg-green-50 text-green-700 ring-green-200'
                    : 'bg-red-50 text-red-700 ring-red-200'
                )}
              >
                {trend.isPositive ? '▲' : '▼'} {trend.isPositive ? '+' : ''}
                {trend.value}%
              </span>
            )}
            {subtext && (
              <span className="text-xs text-gray-500">{subtext}</span>
            )}
          </div>
        </div>

        {icon && (
          <div className="shrink-0 rounded-xl bg-gray-50 p-3 ring-1 ring-gray-200">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};