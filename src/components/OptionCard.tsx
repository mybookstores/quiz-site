"use client";

import clsx from "clsx";

interface OptionCardProps {
  text: string;
  index: number;
  onClick: () => void;
  selected?: boolean;
  isDark?: boolean;
}

export default function OptionCard({
  text,
  index,
  onClick,
  selected,
  isDark = false,
}: OptionCardProps) {
  const letters = ["A", "B", "C", "D"];
  const colors = [
    "from-pink-100 to-rose-100 border-pink-200",
    "from-blue-100 to-indigo-100 border-blue-200",
    "from-amber-100 to-orange-100 border-amber-200",
    "from-green-100 to-emerald-100 border-green-200",
  ];
  const letterColors = [
    "bg-pink text-white",
    "bg-blue text-white",
    "bg-amber text-white",
    "bg-green text-white",
  ];

  return (
    <button
      onClick={onClick}
      className={clsx(
        "w-full p-4 rounded-2xl border-2 text-left transition-all duration-200",
        "flex items-start gap-3",
        "hover:scale-[1.02] active:scale-[0.98]",
        "min-h-[56px]",
        selected
          ? `${colors[index]} border-current shadow-md`
          : isDark
            ? "bg-gray-800/50 border-transparent hover:bg-gray-700/50"
            : "bg-white/60 border-transparent hover:bg-white/80"
      )}
    >
      <span
        className={clsx(
          "flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm",
          selected ? letterColors[index] : isDark ? "bg-gray-700 text-gray-400" : "bg-gray-100 text-gray-400"
        )}
      >
        {letters[index]}
      </span>
      <span
        className={clsx(
          "font-medium leading-relaxed",
          selected ? "text-dark" : isDark ? "text-gray-300" : "text-gray-600"
        )}
      >
        {text}
      </span>
    </button>
  );
}