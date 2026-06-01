"use client";

import { useState } from "react";
import clsx from "clsx";
import { questions, calculateResult, results, type Result } from "@/data/quiz";
import ProgressBar from "@/components/ProgressBar";
import OptionCard from "@/components/OptionCard";
import ScoreBar from "@/components/ScoreBar";

// 计算用户最终结果
function computeResult(scores: {
  expression: number;
  mystery: number;
  chaos: number;
  social: number;
}): Result {
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

  // 处理混合情况
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [top, second] = sorted;

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

  // 根据主维度返回
  const resultId = mapping[top[0]] || mapping[maxDimension];
  return results.find(r => r.id === resultId) || results[0];
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

  const handleStart = () => {
    setPage("quiz");
    setCurrentQuestion(0);
    setScores({ expression: 0, mystery: 0, chaos: 0, social: 0 });
  };

  const handleSelectOption = (optionIndex: number) => {
    setSelectedOption(optionIndex);

    // 添加分数
    const question = questions[currentQuestion];
    const selectedScore = question.options[optionIndex].scores;
    setScores(prev => ({
      expression: prev.expression + selectedScore.expression,
      mystery: prev.mystery + selectedScore.mystery,
      chaos: prev.chaos + selectedScore.chaos,
      social: prev.social + selectedScore.social,
    }));

    // 延迟后进入下一题或结果
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(null);
      } else {
        // 显示分析页面
        setPage("analyzing");
        const computed = computeResult(scores);
        setResult(computed);

        // 3秒后显示结果
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
  };

  return (
    <main className="min-h-screen px-4 py-8 flex flex-col items-center justify-center">
      {/* 首页 */}
      {page === "home" && (
        <div className="animate-fade-in max-w-md w-full text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-dark leading-relaxed">
              你的朋友圈隐藏人设测试
            </h1>
            <p className="text-gray-500 text-base leading-relaxed">
              你以为你只是随便发发，<br />别人可能早就给你立好了人设。
            </p>
          </div>

          {/* 漂浮标签 */}
          <div className="relative h-48">
            <div className="absolute top-0 left-4 animate-pulse-soft">
              <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-medium">
                神秘 NPC
              </span>
            </div>
            <div className="absolute top-12 right-0 animate-pulse-soft" style={{ animationDelay: "0.2s" }}>
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                气氛组组长
              </span>
            </div>
            <div className="absolute bottom-8 left-0 animate-pulse-soft" style={{ animationDelay: "0.4s" }}>
              <span className="px-3 py-1 bg-amber-100 text-amber-600 rounded-full text-sm font-medium">
                深夜诗人
              </span>
            </div>
            <div className="absolute bottom-0 right-4 animate-pulse-soft" style={{ animationDelay: "0.6s" }}>
              <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                快乐废话机
              </span>
            </div>
          </div>

          <button
            onClick={handleStart}
            className="w-full py-4 bg-gradient-to-r from-pink to-accent text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            开始测试
          </button>

          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <span>12 道题</span>
            <span>1 分钟完成</span>
            <span>生成专属人设卡</span>
          </div>
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
            <h2 className="text-xl font-bold text-dark text-center">
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
                />
              ))}
            </div>
          </div>

          <div className="text-center text-sm text-gray-400">
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
            <p className="text-lg font-medium text-dark animate-pulse-soft">
              正在读取你的朋友圈气质...
            </p>
            <p className="text-sm text-gray-400 animate-pulse-soft" style={{ animationDelay: "0.3s" }}>
              正在分析你的点赞习惯...
            </p>
            <p className="text-sm text-gray-400 animate-pulse-soft" style={{ animationDelay: "0.6s" }}>
              正在生成你的隐藏人设卡...
            </p>
          </div>
        </div>
      )}

      {/* 结果页 */}
      {page === "result" && result && (
        <div className="animate-fade-in max-w-md w-full space-y-6">
          {/* 结果卡片 */}
          <div className="bg-white rounded-3xl p-6 shadow-lg space-y-4">
            <div className="text-center space-y-3">
              <div className="inline-block px-4 py-1 bg-gradient-to-r from-pink to-accent text-white text-sm font-medium rounded-full">
                你的隐藏人设
              </div>
              <h2 className="text-2xl font-bold text-dark">{result.title}</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                {result.tagline}
              </p>
            </div>

            {/* 关键词标签 */}
            <div className="flex justify-center gap-2 flex-wrap">
              {result.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>

            {/* 四项指数 */}
            <div className="space-y-3 pt-2">
              <ScoreBar label="表达欲" value={result.scores.expression} color="bg-gradient-to-r from-blue-400 to-blue-500" />
              <ScoreBar label="神秘感" value={result.scores.mystery} color="bg-gradient-to-r from-purple-400 to-purple-500" />
              <ScoreBar label="发疯指数" value={result.scores.chaos} color="bg-gradient-to-r from-amber-400 to-orange-500" />
              <ScoreBar label="社交电量" value={result.scores.social} color="bg-gradient-to-r from-green-400 to-emerald-500" />
            </div>

            {/* 代表文案 */}
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <p className="text-gray-500 text-sm">朋友圈代表文案</p>
              <p className="text-lg font-medium text-dark mt-1">
                「{result.quote}」
              </p>
            </div>

            {/* 结果描述 */}
            <p className="text-gray-600 text-sm leading-relaxed text-center">
              {result.description}
            </p>
          </div>

          {/* 建议 */}
          <div className="bg-gradient-to-r from-pink/10 to-accent/10 rounded-2xl p-4 text-center">
            <p className="text-sm text-dark">
              💡 {result.advice}
            </p>
          </div>

          {/* 操作按钮 */}
          <div className="space-y-3">
            <button
              onClick={handleRestart}
              className="w-full py-4 bg-gradient-to-r from-pink to-accent text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              再测一次
            </button>
            <button className="w-full py-3 bg-white text-pink font-medium rounded-2xl border-2 border-pink/20 hover:bg-pink/5 transition-all duration-200">
              分享给朋友
            </button>
          </div>

          {/* 底部提示 */}
          <p className="text-center text-xs text-gray-400">
            结果仅供娱乐，请勿当真
          </p>
        </div>
      )}
    </main>
  );
}