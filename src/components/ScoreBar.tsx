"use client";

import clsx from "clsx";

interface ScoreBarProps {
  label: string;
  value: number;
  color: string;
  isDark?: boolean;
}

export default function ScoreBar({ label, value, color, isDark = false }: ScoreBarProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className={isDark ? "text-gray-400" : "text-gray-600"}>{label}</span>
        <span className={clsx("font-medium", isDark ? "text-white" : "text-dark")}>{value}%</span>
      </div>
      <div className={clsx("h-2 rounded-full overflow-hidden", isDark ? "bg-gray-700" : "bg-gray-100")}>
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