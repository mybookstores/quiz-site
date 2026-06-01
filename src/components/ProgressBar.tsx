"use client";

import clsx from "clsx";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm text-pink font-medium">
        <span>第 {current} / {total} 题</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="h-2 bg-white/50 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-pink to-accent rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}