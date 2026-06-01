"use client";

import clsx from "clsx";

interface ScoreBarProps {
  label: string;
  value: number;
  color: string;
}

export default function ScoreBar({ label, value, color }: ScoreBarProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium text-dark">{value}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={clsx(
            "h-full rounded-full transition-all duration-1000 ease-out",
            color
          )}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}