"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import { questions, results, type Result } from "@/data/quiz";
import ProgressBar from "@/components/ProgressBar";
import OptionCard from "@/components/OptionCard";
import ScoreBar from "@/components/ScoreBar";
import ShareCard from "@/components/ShareCard";

// 计算用户最终结果
function computeResult(scores: {
  expression: number;
  mystery: number;
  chaos: number;
  social: number;
}): Result {
  // 处理混合情况
  // 如果神秘感极高
  if (scores.mystery >= 15) return results.find(r => r.id === "npc")!;

  // 如果发疯指数和社交电量都很高
  if (scores.chaos >= 12 && scores.social >= 12) {
    return results.find(r => r.id === "nonsense")!;
  }

  // 如果神秘感和表达欲都高
  if (scores.mystery >= 10 && scores.expression >= 8) {
    return results.find(r => r.id === "curator")!;
  }

  // 如果神秘感高但社交低
  if (scores.mystery >= 12 && scores.social <= 6) {
    return results.find(r => r.id === "night")!;
  }

  // 找出最高分维度
  const maxDimension = Object.entries(scores).reduce((a, b) =>
    b[1] > a[1] ? b : a
  )[0];

  // 根据维度匹配结果
  const mapping: Record<string, string> = {
    mystery: "low-profile",
    expression: "real",
    chaos: "chaos",
    social: "vibe",
  };

  const resultId = mapping[maxDimension];
  return results.find(r => r.id === resultId) ?? results[0];
}

// 生成随机百分比（基于结果的稀有度）
function generatePercentage(resultId: string): number {
  const rarity: Record<string, [number, number]> = {
    npc: [30, 50],
    night: [40, 60],
    curator: [50, 70],
    vibe: [60, 80],
    chaos: [45, 70],
    real: [50, 75],
    "low-profile": [35, 55],
    nonsense: [55, 80],
  };

  const [min, max] = rarity[resultId] ?? [50, 80];
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

type Page = "home" | "quiz" | "analyzing" | "result";

export default function Home() {
  const [page, setPage] = useState<Page>("home");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({
    expression: 0,
    mystery: 0,
    chaos: 0,
    social: 0,
  });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [percentage, setPercentage] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 监听系统暗色模式
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // 设置暗色模式 class
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  // 微信分享优化
  useEffect(() => {
    if (page === "result" && result) {
      const shareData = {
        title: `我是「${result.title}」！来测测你的朋友圈人设`,
        desc: result.tagline,
        link: "https://mybookstores.github.io/quiz-site",
        imgUrl: "https://mybookstores.github.io/quiz-site/og-image.png",
      };

      // 更新页面标题
      document.title = shareData.title;

      // 尝试调用微信 JSSDK（需要后端支持，这里做基础优化）
      if ((window as any).wx) {
        (window as any).wx.updateAppMessageShareData(shareData);
        (window as any).wx.updateTimelineShareData({
          title: shareData.title,
          link: shareData.link,
          imgUrl: shareData.imgUrl,
        });
      }
    }
  }, [page, result]);

  const handleStart = () => {
    setPage("quiz");
    setCurrentQuestion(0);
    setScores({ expression: 0, mystery: 0, chaos: 0, social: 0 });
  };

  const handleSelectOption = (optionIndex: number) => {
    setSelectedOption(optionIndex);

    const question = questions[currentQuestion];
    const selectedScore = question.options[optionIndex].scores;
    setScores(prev => ({
      expression: prev.expression + selectedScore.expression,
      mystery: prev.mystery + selectedScore.mystery,
      chaos: prev.chaos + selectedScore.chaos,
      social: prev.social + selectedScore.social,
    }));

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(null);
      } else {
        setPage("analyzing");
        const computed = computeResult(scores);
        setResult(computed);
        setPercentage(generatePercentage(computed.id));

        setTimeout(() => {
          setPage("result");
        }, 3000);
      }
    }, 300);
  };

  const handleRestart = () => {
    setPage("home");
    setCurrentQuestion(0);
    setScores({ expression: 0, mystery: 0, chaos: 0, social: 0 });
    setSelectedOption(null);
    setResult(null);
    document.title = "你的朋友圈隐藏人设测试";
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <main className={clsx(
      "min-h-screen px-4 py-8 flex flex-col items-center justify-center transition-colors duration-300",
      isDarkMode ? "bg-gray-900" : "bg-[#FFF1F2]"
    )}>
      {/* 暗色模式切换按钮 */}
      <button
        onClick={toggleDarkMode}
        className={clsx(
          "fixed top-4 right-4 p-2 rounded-full transition-all duration-200",
          "hover:scale-110 active:scale-95",
          isDarkMode ? "bg-gray-800 text-yellow-400" : "bg-white/80 text-gray-600"
        )}
        aria-label="切换暗色模式"
      >
        {isDarkMode ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      {/* 首页 */}
      {page === "home" && (
        <div className="animate-fade-in max-w-md w-full text-center">
          {/* 标题 */}
          <div className="space-y-4 mb-8">
            {/* 品牌图标 */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>

            <h1 className={clsx(
              "text-2xl font-bold tracking-tight",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              朋友圈隐藏人设测试
            </h1>
            <p className={clsx(
              "text-sm leading-relaxed px-4",
              isDarkMode ? "text-gray-400" : "text-gray-500"
            )}>
              你以为你只是随便发发<br />别人可能早就给你立好了人设
            </p>
          </div>

          {/* 人设预览 */}
          <div className={clsx(
            "rounded-2xl p-5 mb-8",
            isDarkMode ? "bg-gray-800/40" : "bg-gray-50"
          )}>
            <div className="flex flex-wrap justify-center gap-2">
              {["神秘人", "艺术家", "发疯", "组长", "诗人", "记录", "废话", "潜水"].map((label, i) => (
                <span
                  key={i}
                  className={clsx(
                    "px-4 py-2 rounded-full text-sm font-medium",
                    isDarkMode
                      ? "bg-gray-700 text-gray-200"
                      : "bg-white text-gray-700 shadow-sm"
                  )}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* 数据 */}
          <div className="flex justify-center gap-12 mb-8">
            {[
              { num: "8", label: "人设" },
              { num: "12", label: "道题" },
              { num: "1", label: "分钟" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className={clsx(
                  "text-3xl font-bold tracking-tight",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  {stat.num}
                </div>
                <div className={clsx(
                  "text-xs mt-1",
                  isDarkMode ? "text-gray-500" : "text-gray-400"
                )}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* 开始按钮 */}
          <button
            onClick={handleStart}
            className={clsx(
              "w-full py-4 rounded-2xl font-semibold text-sm tracking-wide transition-all duration-200",
              isDarkMode
                ? "bg-white text-gray-900 hover:bg-gray-100"
                : "bg-gray-900 text-white hover:bg-gray-800"
            )}
          >
            开始测试
          </button>

          {/* 底部 */}
          <p className={clsx(
            "mt-4 text-xs",
            isDarkMode ? "text-gray-600" : "text-gray-400"
          )}>
            10,000+ 人已测试
          </p>
        </div>
      )}

      {/* 答题页 */}
      {page === "quiz" && (
        <div className="animate-fade-in max-w-md w-full space-y-8">
          <ProgressBar
            current={currentQuestion + 1}
            total={questions.length}
          />

          <div className="space-y-6">
            <h2 className={clsx(
              "text-xl font-bold text-center",
              isDarkMode ? "text-white" : "text-[#881337]"
            )}>
              {questions[currentQuestion].text}
            </h2>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <OptionCard
                  key={index}
                  text={option.text}
                  index={index}
                  selected={selectedOption === index}
                  onClick={() => selectedOption === null && handleSelectOption(index)}
                  isDark={isDarkMode}
                />
              ))}
            </div>
          </div>

          <div className={clsx("text-center text-sm", isDarkMode ? "text-gray-500" : "text-gray-400")}>
            点击选项自动进入下一题
          </div>
        </div>
      )}

      {/* 分析页 */}
      {page === "analyzing" && (
        <div className="animate-fade-in max-w-md w-full text-center space-y-6">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 border-4 border-pink/30 rounded-full animate-ping" />
            <div className="absolute inset-2 border-4 border-pink/50 rounded-full animate-ping" style={{ animationDelay: "0.5s" }} />
            <div className="absolute inset-4 border-4 border-pink rounded-full animate-pulse" />
          </div>

          <div className="space-y-2">
            {[
              "正在读取你的朋友圈气质...",
              "正在分析你的点赞习惯...",
              "正在生成你的隐藏人设卡...",
            ].map((text, i) => (
              <p
                key={i}
                className={clsx(
                  "text-lg font-medium animate-pulse-soft",
                  i === 0 ? (isDarkMode ? "text-white" : "text-[#881337]") : (isDarkMode ? "text-gray-500" : "text-gray-400")
                )}
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* 结果页 */}
      {page === "result" && result && (
        <div className="animate-fade-in max-w-md w-full space-y-6">
          {/* 结果卡片 */}
          <div className={clsx(
            "rounded-3xl p-6 shadow-lg space-y-4",
            isDarkMode ? "bg-gray-800" : "bg-white"
          )}>
            <div className="text-center space-y-3">
              <div className="inline-block px-4 py-1 bg-gradient-to-r from-pink to-accent text-white text-sm font-medium rounded-full">
                你的隐藏人设
              </div>
              <h2 className={clsx(
                "text-2xl font-bold",
                isDarkMode ? "text-white" : "text-[#881337]"
              )}>
                {result.title}
              </h2>
              <p className={clsx(
                "text-sm leading-relaxed",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}>
                {result.tagline}
              </p>
            </div>

            {/* 关键词标签 */}
            <div className="flex justify-center gap-2 flex-wrap">
              {result.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className={clsx(
                    "px-3 py-1 rounded-full text-sm",
                    isDarkMode ? "bg-gray-700 text-gray-300" : "bg-pink-50 text-pink-600"
                  )}
                >
                  {keyword}
                </span>
              ))}
            </div>

            {/* 四项指数 */}
            <div className="space-y-3 pt-2">
              <ScoreBar label="表达欲" value={result.scores.expression} color="bg-gradient-to-r from-blue-400 to-blue-500" isDark={isDarkMode} />
              <ScoreBar label="神秘感" value={result.scores.mystery} color="bg-gradient-to-r from-purple-400 to-purple-500" isDark={isDarkMode} />
              <ScoreBar label="发疯指数" value={result.scores.chaos} color="bg-gradient-to-r from-amber-400 to-orange-500" isDark={isDarkMode} />
              <ScoreBar label="社交电量" value={result.scores.social} color="bg-gradient-to-r from-green-400 to-emerald-500" isDark={isDarkMode} />
            </div>

            {/* 代表文案 */}
            <div className={clsx(
              "rounded-2xl p-4 text-center",
              isDarkMode ? "bg-gray-700" : "bg-gray-50"
            )}>
              <p className={clsx("text-sm", isDarkMode ? "text-gray-500" : "text-gray-500")}>
                朋友圈代表文案
              </p>
              <p className={clsx(
                "text-lg font-medium mt-1",
                isDarkMode ? "text-white" : "text-[#881337]"
              )}>
                「{result.quote}」
              </p>
            </div>

            {/* 结果描述 */}
            <p className={clsx(
              "text-sm leading-relaxed text-center",
              isDarkMode ? "text-gray-400" : "text-gray-600"
            )}>
              {result.description}
            </p>

            {/* 百分比统计 */}
            <div className={clsx(
              "rounded-2xl p-4 text-center",
              isDarkMode ? "bg-pink-900/30" : "bg-pink-50"
            )}>
              <p className={clsx(
                "text-lg font-bold",
                isDarkMode ? "text-pink-400" : "text-pink-500"
              )}>
                🏆 你超过了 {percentage}% 的测试者
              </p>
            </div>
          </div>

          {/* 建议 */}
          <div className={clsx(
            "rounded-2xl p-4 text-center",
            isDarkMode ? "bg-gray-800/50" : "bg-gradient-to-r from-pink/10 to-accent/10"
          )}>
            <p className={clsx(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-[#881337]"
            )}>
              💡 {result.advice}
            </p>
          </div>

          {/* 分享功能 */}
          <ShareCard result={result} percentage={percentage} />

          {/* 操作按钮 */}
          <button
            onClick={handleRestart}
            className={clsx(
              "w-full py-4 rounded-2xl shadow-lg transition-all duration-200 font-bold",
              isDarkMode
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-gradient-to-r from-pink to-accent text-white hover:shadow-xl"
            )}
          >
            再测一次
          </button>

          {/* 底部提示 */}
          <p className={clsx(
            "text-center text-xs",
            isDarkMode ? "text-gray-600" : "text-gray-400"
          )}>
            结果仅供娱乐，请勿当真
          </p>
        </div>
      )}
    </main>
  );
}