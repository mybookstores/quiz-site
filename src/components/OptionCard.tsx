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

  // 暗色模式配色
  const darkSelectedBg = [
    "bg-pink-500/20 border-pink-500",
    "bg-blue-500/20 border-blue-500",
    "bg-amber-500/20 border-amber-500",
    "bg-green-500/20 border-green-500",
  ];
  const darkLetterBg = [
    "bg-pink-500 text-white",
    "bg-blue-500 text-white",
    "bg-amber-500 text-white",
    "bg-green-500 text-white",
  ];

  // 亮色模式配色
  const lightSelectedBg = [
    "from-pink-100 to-rose-100 border-pink-300 shadow-sm",
    "from-blue-100 to-indigo-100 border-blue-300 shadow-sm",
    "from-amber-100 to-orange-100 border-amber-300 shadow-sm",
    "from-green-100 to-emerald-100 border-green-300 shadow-sm",
  ];
  const lightLetterBg = [
    "bg-pink-500 text-white",
    "bg-blue-500 text-white",
    "bg-amber-500 text-white",
    "bg-green-500 text-white",
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
          ? isDark
            ? darkSelectedBg[index]
            : lightSelectedBg[index]
          : isDark
            ? "bg-gray-800/60 border-gray-700 hover:bg-gray-700/60 hover:border-gray-600"
            : "bg-white/60 border-transparent hover:bg-white/80 hover:border-gray-200"
      )}
    >
      <span
        className={clsx(
          "flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-200",
          selected
            ? isDark
              ? darkLetterBg[index]
              : lightLetterBg[index]
            : isDark
              ? "bg-gray-700 text-gray-400"
              : "bg-gray-100 text-gray-400"
        )}
      >
        {letters[index]}
      </span>
      <span
        className={clsx(
          "font-medium leading-relaxed transition-colors duration-200",
          selected
            ? isDark ? "text-white" : "text-gray-800"
            : isDark
              ? "text-gray-300"
              : "text-gray-600"
        )}
      >
        {text}
      </span>
    </button>
  );
}