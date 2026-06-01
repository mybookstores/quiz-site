"use client";

import { useRef, useCallback, useState } from "react";
import html2canvas from "html2canvas";
import clsx from "clsx";
import type { Result } from "@/data/quiz";

interface ShareCardProps {
  result: Result;
  percentage?: number;
}

export default function ShareCard({ result, percentage }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");

  const showToastMsg = (text: string) => {
    setToastText(text);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleSaveImage = useCallback(async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
        width: 380,
        height: 600,
      });

      const link = document.createElement("a");
      link.download = `朋友圈人设-${result.title}.png`;
      link.href = canvas.toDataURL("image/png", 1.0);
      link.click();
      showToastMsg("✓ 图片已保存");
    } catch (error) {
      console.error("生成图片失败:", error);
      showToastMsg("生成失败，请重试");
    }
  }, [result]);

  const handleCopyLink = useCallback(() => {
    const link = "https://mybookstores.github.io/quiz-site";
    navigator.clipboard.writeText(link).then(() => {
      showToastMsg("✓ 链接已复制");
    }).catch(() => {
      showToastMsg("复制失败，请手动复制");
    });
  }, []);

  return (
    <>
      {/* 可隐藏的分享卡片（用于生成图片） */}
      <div
        ref={cardRef}
        className="fixed -left-[9999px] top-0"
        style={{ width: 380, background: "linear-gradient(180deg, #FFF8FA 0%, #FFFFFF 30%, #FFFFFF 100%)" }}
      >
        {/* 顶部品牌区 */}
        <div className="px-6 pt-8 pb-4 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center">
              <span className="text-white text-sm font-bold">测</span>
            </div>
            <span className="text-sm font-semibold text-gray-700">朋友圈人设测试</span>
          </div>
          <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full text-white text-xs font-medium shadow-sm">
            你的隐藏人设
          </div>
        </div>

        {/* 主卡片区域 */}
        <div className="mx-5 p-5 bg-white rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100">
          {/* 人设标题 */}
          <h2 className="text-xl font-black text-center text-gray-900 mb-1">
            {result.title}
          </h2>
          <p className="text-sm text-center text-gray-500 mb-4 leading-relaxed">
            {result.tagline}
          </p>

          {/* 关键词 */}
          <div className="flex justify-center gap-2 mb-5">
            {result.keywords.map((keyword, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-rose-50 text-rose-500 rounded-full text-xs font-medium"
              >
                {keyword}
              </span>
            ))}
          </div>

          {/* 四项指数 */}
          <div className="space-y-3 mb-5">
            {[
              { label: "表达欲", value: result.scores.expression, color: "from-blue-400 to-blue-500" },
              { label: "神秘感", value: result.scores.mystery, color: "from-purple-400 to-purple-500" },
              { label: "发疯指数", value: result.scores.chaos, color: "from-amber-400 to-orange-500" },
              { label: "社交电量", value: result.scores.social, color: "from-green-400 to-emerald-500" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-16">{item.label}</span>
                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600 font-semibold w-10 text-right">{item.value}%</span>
              </div>
            ))}
          </div>

          {/* 代表文案 */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-4">
            <p className="text-xs text-gray-400 text-center mb-1.5">朋友圈代表文案</p>
            <p className="text-base font-medium text-gray-800 text-center">
              「{result.quote}」
            </p>
          </div>

          {/* 建议 */}
          <p className="text-xs text-gray-500 text-center leading-relaxed px-2">
            💡 {result.advice}
          </p>

          {/* 百分比 */}
          {percentage && (
            <div className="mt-4 pt-4 border-t border-gray-100 text-center">
              <p className="text-base font-bold text-rose-500">
                🏆 超过了 {percentage}% 的测试者
              </p>
            </div>
          )}
        </div>

        {/* 底部品牌 */}
        <div className="px-6 py-4 text-center">
          <p className="text-xs text-gray-400">
            🔗 mybookstores.github.io/quiz-site
          </p>
        </div>
      </div>

      {/* 操作按钮区域 */}
      <div className="space-y-3">
        {/* 第一行：保存图片 */}
        <button
          onClick={handleSaveImage}
          className="w-full py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2
            bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-200/40
            hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          保存图片到相册
        </button>

        {/* 第二行：复制链接 */}
        <button
          onClick={handleCopyLink}
          className="w-full py-3 rounded-2xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2
            bg-white text-gray-600 border border-gray-200
            hover:bg-gray-50 hover:border-gray-300 active:scale-[0.99]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          复制测试链接
        </button>

        {/* Toast 提示 */}
        {showToast && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-gray-900 text-white text-sm rounded-full shadow-xl flex items-center gap-2 z-50">
            <span>{toastText}</span>
          </div>
        )}
      </div>
    </>
  );
}