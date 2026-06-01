"use client";

import { useRef, useCallback } from "react";
import html2canvas from "html2canvas";
import clsx from "clsx";
import type { Result } from "@/data/quiz";

interface ShareCardProps {
  result: Result;
  percentage?: number;
}

export default function ShareCard({ result, percentage }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSaveImage = useCallback(async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: "#FFF1F2",
        useCORS: true,
      });

      const link = document.createElement("a");
      link.download = `朋友圈人设-${result.title}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("生成图片失败:", error);
    }
  }, [result]);

  const handleShare = useCallback(async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: "#FFF1F2",
        useCORS: true,
      });

      canvas.toBlob(async (blob) => {
        if (blob && navigator.share && navigator.canShare({ files: [new File([blob], "result.png", { type: "image/png" })] })) {
          await navigator.share({
            files: [new File([blob], "朋友圈人设.png", { type: "image/png" })],
            title: "你的朋友圈隐藏人设",
            text: `我是「${result.title}」！${result.tagline}`,
          });
        } else {
          // fallback: 下载图片
          handleSaveImage();
        }
      });
    } catch (error) {
      console.error("分享失败:", error);
      handleSaveImage();
    }
  }, [result, handleSaveImage]);

  return (
    <>
      {/* 可隐藏的分享卡片（用于生成图片） */}
      <div
        ref={cardRef}
        className="fixed -left-[9999px] top-0 w-[375px] p-6 bg-gradient-to-b from-[#FFF1F2] to-white"
      >
        {/* 顶部标题 */}
        <div className="text-center mb-4">
          <p className="text-xs text-gray-400 mb-1">朋友圈隐藏人设测试</p>
          <h1 className="text-lg font-bold text-[#881337]">你的隐藏人设</h1>
        </div>

        {/* 结果卡片 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="text-center space-y-2 mb-3">
            <div className="inline-block px-3 py-0.5 bg-gradient-to-r from-[#FB7185] to-[#E11D48] text-white text-xs font-medium rounded-full">
              {result.title}
            </div>
            <p className="text-sm text-gray-600">{result.tagline}</p>
          </div>

          {/* 关键词 */}
          <div className="flex justify-center gap-1.5 mb-3">
            {result.keywords.map((keyword, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-pink-50 text-pink-500 rounded-full text-xs"
              >
                {keyword}
              </span>
            ))}
          </div>

          {/* 指数条 */}
          <div className="space-y-2 mb-3">
            {[
              { label: "表达欲", value: result.scores.expression, color: "from-blue-400 to-blue-500" },
              { label: "神秘感", value: result.scores.mystery, color: "from-purple-400 to-purple-500" },
              { label: "发疯指数", value: result.scores.chaos, color: "from-amber-400 to-orange-500" },
              { label: "社交电量", value: result.scores.social, color: "from-green-400 to-emerald-500" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-16">{item.label}</span>
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={clsx("h-full rounded-full bg-gradient-to-r", item.color)}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400 w-8">{item.value}%</span>
              </div>
            ))}
          </div>

          {/* 朋友圈文案 */}
          <div className="bg-gray-50 rounded-xl p-3 text-center mb-3">
            <p className="text-gray-500 text-xs mb-0.5">朋友圈代表文案</p>
            <p className="text-sm font-medium text-gray-700">「{result.quote}」</p>
          </div>

          {/* 建议 */}
          <p className="text-xs text-gray-500 text-center">
            💡 {result.advice}
          </p>

          {/* 百分比 */}
          {percentage && (
            <div className="mt-3 text-center">
              <p className="text-xs text-pink-500">
                🏆 你超过了 {percentage}% 的测试者
              </p>
            </div>
          )}
        </div>

        {/* 底部二维码/水印区域 */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">扫码测试 → mybookstores.github.io/quiz-site</p>
        </div>
      </div>

      {/* 导出按钮 */}
      <div className="flex gap-3">
        <button
          onClick={handleSaveImage}
          className="flex-1 py-3 bg-white text-pink font-medium rounded-2xl border-2 border-pink/20 hover:bg-pink/5 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          保存图片
        </button>
        <button
          onClick={handleShare}
          className="flex-1 py-3 bg-gradient-to-r from-pink to-accent text-white font-medium rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          分享
        </button>
      </div>
    </>
  );
}
