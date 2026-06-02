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
    if (!cardRef.current) {
      showToastMsg("加载中，请稍后重试");
      return;
    }

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
      });

      const link = document.createElement("a");
      link.download = `朋友圈人设-${result.title}.png`;
      link.href = canvas.toDataURL("image/png", 0.95);
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
      {/* 隐藏的分享卡片 */}
      <div
        ref={cardRef}
        style={{
          position: "absolute",
          left: "-9999px",
          top: "-9999px",
          width: "340px",
          backgroundColor: "#ffffff",
          fontFamily: "system-ui, -apple-system, 'PingFang SC', sans-serif",
          padding: "24px 20px",
          boxSizing: "border-box",
        }}
      >
        {/* 顶部品牌区 */}
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "10px",
          }}>
            <div style={{
              width: "22px",
              height: "22px",
              borderRadius: "5px",
              background: "#1f2937",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <span style={{ color: "white", fontSize: "10px", fontWeight: "bold" }}>测</span>
            </div>
            <span style={{ fontSize: "11px", color: "#6b7280", fontWeight: "500" }}>
              朋友圈人设测试
            </span>
          </div>
          <div style={{
            display: "inline-block",
            padding: "4px 12px",
            background: "#1f2937",
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
          background: "#f9fafb",
          borderRadius: "16px",
          padding: "16px",
        }}>
          {/* 人设名称 */}
          <h2 style={{
            fontSize: "18px",
            fontWeight: "800",
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
            lineHeight: "1.5",
          }}>
            {result.tagline}
          </p>

          {/* 关键词 */}
          <div style={{ display: "flex", justifyContent: "center", gap: "5px", marginBottom: "12px", flexWrap: "wrap" }}>
            {result.keywords.map((keyword, idx) => (
              <span
                key={idx}
                style={{
                  padding: "2px 8px",
                  background: "#fee2e2",
                  color: "#dc2626",
                  borderRadius: "8px",
                  fontSize: "10px",
                  fontWeight: "500",
                }}
              >
                {keyword}
              </span>
            ))}
          </div>

          {/* 四项指数 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
            {[
              { label: "表达欲", value: result.scores.expression, color: "#3b82f6" },
              { label: "神秘感", value: result.scores.mystery, color: "#8b5cf6" },
              { label: "发疯指数", value: result.scores.chaos, color: "#f59e0b" },
              { label: "社交电量", value: result.scores.social, color: "#10b981" },
            ].map((item, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "10px", color: "#6b7280", width: "48px" }}>{item.label}</span>
                <div style={{ flex: 1, height: "6px", background: "#e5e7eb", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{
                    width: `${item.value}%`,
                    height: "100%",
                    background: item.color,
                    borderRadius: "3px",
                  }} />
                </div>
                <span style={{ fontSize: "10px", color: "#374151", fontWeight: "600", width: "30px", textAlign: "right" }}>
                  {item.value}%
                </span>
              </div>
            ))}
          </div>

          {/* 代表文案 */}
          <div style={{
            background: "#ffffff",
            borderRadius: "10px",
            padding: "10px",
            marginBottom: "10px",
            textAlign: "center",
          }}>
            <p style={{ fontSize: "9px", color: "#9ca3af", margin: "0 0 3px" }}>朋友圈代表文案</p>
            <p style={{ fontSize: "13px", fontWeight: "600", color: "#111827", margin: 0 }}>
              「{result.quote}」
            </p>
          </div>

          {/* 建议 */}
          <p style={{
            fontSize: "10px",
            color: "#6b7280",
            textAlign: "center",
            lineHeight: "1.4",
            margin: 0,
          }}>
            💡 {result.advice}
          </p>

          {/* 百分比 */}
          {percentage && (
            <div style={{
              marginTop: "10px",
              paddingTop: "10px",
              borderTop: "1px solid #e5e7eb",
              textAlign: "center",
            }}>
              <p style={{ fontSize: "13px", fontWeight: "700", color: "#dc2626", margin: 0 }}>
                🏆 超过了 {percentage}% 的测试者
              </p>
            </div>
          )}
        </div>

        {/* 底部链接 */}
        <div style={{ textAlign: "center", marginTop: "12px" }}>
          <p style={{ fontSize: "10px", color: "#9ca3af", margin: 0 }}>
            mybookstores.github.io/quiz-site
          </p>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="space-y-3">
        <button
          onClick={handleSaveImage}
          className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800 active:scale-[0.99]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          保存图片
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