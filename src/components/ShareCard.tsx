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
  const [showLinkModal, setShowLinkModal] = useState(false);

  const handleSaveImage = useCallback(async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        backgroundColor: "#FFFFFF",
        useCORS: true,
        logging: false,
      });

      const link = document.createElement("a");
      link.download = `朋友圈人设-${result.title}.png`;
      link.href = canvas.toDataURL("image/png", 1.0);
      link.click();
    } catch (error) {
      console.error("生成图片失败:", error);
      alert("生成图片失败，请重试");
    }
  }, [result]);

  const handleShareImage = useCallback(async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        backgroundColor: "#FFFFFF",
        useCORS: true,
        logging: false,
      });

      canvas.toBlob(async (blob) => {
        if (blob && navigator.share && navigator.canShare({ files: [new File([blob], "朋友圈人设.png", { type: "image/png" })] })) {
          await navigator.share({
            files: [new File([blob], "朋友圈人设.png", { type: "image/png" })],
            title: "你的朋友圈隐藏人设",
            text: `我是「${result.title}」！${result.tagline}`,
          });
        } else {
          handleSaveImage();
        }
      });
    } catch (error) {
      console.error("分享失败:", error);
      handleSaveImage();
    }
  }, [result, handleSaveImage]);

  const handleCopyLink = useCallback(() => {
    const link = "https://mybookstores.github.io/quiz-site";
    navigator.clipboard.writeText(link).then(() => {
      setShowLinkModal(true);
      setTimeout(() => setShowLinkModal(false), 2000);
    });
  }, []);

  return (
    <>
      {/* 可隐藏的分享卡片（用于生成图片） */}
      <div
        ref={cardRef}
        className="fixed -left-[9999px] top-0 w-[375px] p-5 bg-white"
        style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
      >
        {/* 顶部装饰 */}
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FB7185] to-[#E11D48] flex items-center justify-center mr-3">
            <span className="text-white text-xl">🎭</span>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">朋友圈隐藏人设测试</p>
            <p className="text-xs text-gray-500">12道题 · 测出你的隐藏人设</p>
          </div>
        </div>

        {/* 主卡片 */}
        <div className="bg-gradient-to-br from-[#FFF1F2] to-white rounded-2xl p-4 border border-pink-100">
          {/* 标签 */}
          <div className="flex justify-center mb-3">
            <span className="px-4 py-1.5 bg-gradient-to-r from-[#FB7185] to-[#E11D48] text-white text-xs font-semibold rounded-full shadow-sm">
              你的隐藏人设
            </span>
          </div>

          {/* 标题 */}
          <h2 className="text-xl font-bold text-center text-[#881337] mb-2">
            {result.title}
          </h2>

          {/* 标语 */}
          <p className="text-sm text-center text-gray-600 mb-4 leading-relaxed">
            {result.tagline}
          </p>

          {/* 关键词 */}
          <div className="flex justify-center gap-2 mb-4">
            {result.keywords.map((keyword, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-pink-50 text-pink-600 rounded-full text-xs font-medium"
              >
                {keyword}
              </span>
            ))}
          </div>

          {/* 指数条 */}
          <div className="space-y-2.5 mb-4">
            {[
              { label: "表达欲", value: result.scores.expression, color: "from-blue-500 to-blue-600" },
              { label: "神秘感", value: result.scores.mystery, color: "from-purple-500 to-purple-600" },
              { label: "发疯指数", value: result.scores.chaos, color: "from-amber-500 to-orange-500" },
              { label: "社交电量", value: result.scores.social, color: "from-green-500 to-emerald-500" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-16">{item.label}</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600 font-medium w-10 text-right">{item.value}%</span>
              </div>
            ))}
          </div>

          {/* 代表文案 */}
          <div className="bg-white rounded-xl p-3 mb-3 border border-gray-100">
            <p className="text-xs text-gray-400 text-center mb-1">朋友圈代表文案</p>
            <p className="text-sm font-medium text-gray-700 text-center">「{result.quote}」</p>
          </div>

          {/* 建议 */}
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            💡 {result.advice}
          </p>

          {/* 百分比 */}
          {percentage && (
            <div className="mt-3 pt-3 border-t border-pink-100 text-center">
              <p className="text-sm font-bold text-[#E11D48]">
                🏆 你超过了 {percentage}% 的测试者
              </p>
            </div>
          )}
        </div>

        {/* 底部 */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">
            🔗 点击体验 → mybookstores.github.io/quiz-site
          </p>
        </div>
      </div>

      {/* 按钮区域 */}
      <div className="space-y-3">
        {/* 保存图片 & 分享图片 */}
        <div className="flex gap-3">
          <button
            onClick={handleSaveImage}
            className="flex-1 py-3 bg-white text-[#E11D48] font-medium rounded-2xl border-2 border-[#E11D48]/20 hover:bg-pink-50 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            保存图片
          </button>
          <button
            onClick={handleShareImage}
            className="flex-1 py-3 bg-gradient-to-r from-[#FB7185] to-[#E11D48] text-white font-medium rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            分享图片
          </button>
        </div>

        {/* 复制链接 */}
        <button
          onClick={handleCopyLink}
          className="w-full py-3 bg-gray-100 text-gray-600 font-medium rounded-2xl hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          复制测试链接
        </button>

        {/* 链接复制提示 */}
        {showLinkModal && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 px-4 py-2 bg-gray-800 text-white text-sm rounded-full shadow-lg animate-fade-in">
            ✓ 链接已复制，快去分享吧！
          </div>
        )}
      </div>
    </>
  );
}