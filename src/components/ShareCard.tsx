"use client";

import { useRef, useCallback, useState } from "react";
import { toPng } from "html-to-image";
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
  const [isGenerating, setIsGenerating] = useState(false);

  const showToastMsg = (text: string) => {
    setToastText(text);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleSaveImage = useCallback(async () => {
    if (!cardRef.current) {
      showToastMsg("加载中，请稍后重试");
      return;
    }

    setIsGenerating(true);

    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        // 忽略 visibility 和 display 样式
        style: {
          transform: "none",
          transformOrigin: "top left",
        },
        // 允许渲染 visibility:hidden 的元素
        filter: (node) => {
          // 不过滤任何节点
          return true;
        },
      });

      const link = document.createElement("a");
      link.download = `朋友圈人设-${result.title}.png`;
      link.href = dataUrl;
      link.click();
      showToastMsg("✓ 图片已保存");
    } catch (error) {
      console.error("生成图片失败:", error);
      showToastMsg("生成失败，请重试");
    } finally {
      setIsGenerating(false);
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
      {/* 分享卡片 - 始终可见，只是不占用视觉空间 */}
      <div
        ref={cardRef}
        className="pointer-events-none"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "320px",
          backgroundColor: "#ffffff",
          fontFamily: "system-ui, -apple-system, 'PingFang SC', sans-serif",
          padding: "20px",
          boxSizing: "border-box",
          zIndex: -1,
          opacity: 1,
        }}
      >
        {/* 标题 */}
        <div style={{ textAlign: "center", marginBottom: "14px" }}>
          <div style={{
            fontSize: "13px",
            color: "#1f2937",
            fontWeight: "600",
            marginBottom: "8px"
          }}>
            朋友圈人设测试
          </div>
          <div style={{
            display: "inline-block",
            padding: "4px 14px",
            backgroundColor: "#1f2937",
            borderRadius: "12px",
            color: "white",
            fontSize: "11px",
            fontWeight: "500",
          }}>
            你的隐藏人设
          </div>
        </div>

        {/* 主卡片 */}
        <div style={{
          backgroundColor: "#f9fafb",
          borderRadius: "14px",
          padding: "16px",
        }}>
          {/* 人设名称 */}
          <h2 style={{
            fontSize: "17px",
            fontWeight: "700",
            textAlign: "center",
            color: "#111827",
            margin: "0 0 6px",
          }}>
            {result.title}
          </h2>

          {/* 标语 */}
          <p style={{
            fontSize: "11px",
            color: "#6b7280",
            textAlign: "center",
            margin: "0 0 12px",
            lineHeight: "1.4",
          }}>
            {result.tagline}
          </p>

          {/* 关键词 */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "4px",
            marginBottom: "12px",
            flexWrap: "wrap" as const
          }}>
            {result.keywords.map((keyword, idx) => (
              <span
                key={idx}
                style={{
                  padding: "2px 7px",
                  backgroundColor: "#fee2e2",
                  color: "#dc2626",
                  borderRadius: "6px",
                  fontSize: "9px",
                }}
              >
                {keyword}
              </span>
            ))}
          </div>

          {/* 四项指数 */}
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "6px", marginBottom: "10px" }}>
            {[
              { label: "表达欲", value: result.scores.expression, color: "#3b82f6" },
              { label: "神秘感", value: result.scores.mystery, color: "#8b5cf6" },
              { label: "发疯指数", value: result.scores.chaos, color: "#f59e0b" },
              { label: "社交电量", value: result.scores.social, color: "#10b981" },
            ].map((item, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "9px", color: "#6b7280", width: "44px" }}>{item.label}</span>
                <div style={{ flex: 1, height: "5px", backgroundColor: "#e5e7eb", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{
                    width: `${item.value}%`,
                    height: "100%",
                    backgroundColor: item.color,
                    borderRadius: "2px",
                  }} />
                </div>
                <span style={{ fontSize: "9px", color: "#374151", fontWeight: "500", width: "28px", textAlign: "right" as const }}>
                  {item.value}%
                </span>
              </div>
            ))}
          </div>

          {/* 代表文案 */}
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            padding: "8px",
            marginBottom: "8px",
            textAlign: "center" as const,
          }}>
            <p style={{ fontSize: "8px", color: "#9ca3af", margin: "0 0 2px" }}>朋友圈代表文案</p>
            <p style={{ fontSize: "12px", fontWeight: "600", color: "#111827", margin: 0 }}>
              「{result.quote}」
            </p>
          </div>

          {/* 建议 */}
          <p style={{
            fontSize: "9px",
            color: "#6b7280",
            textAlign: "center" as const,
            lineHeight: "1.4",
            margin: 0,
          }}>
            💡 {result.advice}
          </p>

          {/* 百分比 */}
          {percentage && (
            <div style={{
              marginTop: "8px",
              paddingTop: "8px",
              borderTop: "1px solid #e5e7eb",
              textAlign: "center" as const,
            }}>
              <p style={{ fontSize: "12px", fontWeight: "700", color: "#dc2626", margin: 0 }}>
                🏆 超过了 {percentage}% 的测试者
              </p>
            </div>
          )}
        </div>

        {/* 底部链接 */}
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <p style={{ fontSize: "9px", color: "#9ca3af", margin: 0 }}>
            mybookstores.github.io/quiz-site
          </p>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="space-y-3">
        <button
          onClick={handleSaveImage}
          disabled={isGenerating}
          className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800 active:scale-[0.99] disabled:opacity-60"
        >
          {isGenerating ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              生成中...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              保存图片
            </>
          )}
        </button>

        <button
          onClick={handleCopyLink}
          className="w-full py-3 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 active:scale-[0.99]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          复制链接
        </button>

        {showToast && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-gray-900 text-white text-sm rounded-full shadow-xl z-50">
            {toastText}
          </div>
        )}
      </div>
    </>
  );
}