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
        onclone: (clonedDoc) => {
          const clone = clonedDoc.body.querySelector('[data-share-card="true"]') as HTMLElement;
          if (clone) {
            clone.style.position = "fixed";
            clone.style.left = "0";
            clone.style.top = "0";
            clone.style.opacity = "1";
            clone.style.pointerEvents = "none";
          }
        },
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
      {/* 隐藏的分享卡片容器 */}
      <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
        <div
          ref={cardRef}
          data-share-card="true"
          style={{
            width: "360px",
            minHeight: "580px",
            background: "linear-gradient(180deg, #FFF9FA 0%, #FFFFFF 40%)",
            padding: "0",
            fontFamily: "system-ui, -apple-system, 'PingFang SC', sans-serif",
          }}
        >
          {/* 顶部背景 */}
          <div style={{
            background: "linear-gradient(180deg, #FFF1F2 0%, transparent 100%)",
            padding: "24px 24px 16px",
            textAlign: "center",
          }}>
            {/* 品牌标识 */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "12px",
            }}>
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #FB7185, #E11D48)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <span style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}>测</span>
              </div>
              <span style={{ fontSize: "13px", color: "#6B7280", fontWeight: "500" }}>朋友圈人设测试</span>
            </div>

            {/* 标签 */}
            <div style={{
              display: "inline-block",
              padding: "6px 16px",
              background: "linear-gradient(135deg, #FB7185, #E11D48)",
              borderRadius: "16px",
              color: "white",
              fontSize: "12px",
              fontWeight: "500",
            }}>
              你的隐藏人设
            </div>
          </div>

          {/* 主卡片 */}
          <div style={{
            margin: "0 20px",
            background: "white",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}>
            {/* 人设名称 */}
            <h2 style={{
              fontSize: "22px",
              fontWeight: "800",
              textAlign: "center",
              color: "#1F2937",
              margin: "0 0 4px",
            }}>
              {result.title}
            </h2>

            {/* 标语 */}
            <p style={{
              fontSize: "13px",
              color: "#6B7280",
              textAlign: "center",
              margin: "0 0 16px",
              lineHeight: "1.5",
            }}>
              {result.tagline}
            </p>

            {/* 关键词标签 */}
            <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginBottom: "16px", flexWrap: "wrap" }}>
              {result.keywords.map((keyword, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: "4px 10px",
                    background: "#FFF1F2",
                    color: "#E11D48",
                    borderRadius: "12px",
                    fontSize: "11px",
                    fontWeight: "500",
                  }}
                >
                  {keyword}
                </span>
              ))}
            </div>

            {/* 四项指数 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
              {[
                { label: "表达欲", value: result.scores.expression, color: "#3B82F6" },
                { label: "神秘感", value: result.scores.mystery, color: "#8B5CF6" },
                { label: "发疯指数", value: result.scores.chaos, color: "#F59E0B" },
                { label: "社交电量", value: result.scores.social, color: "#10B981" },
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "11px", color: "#6B7280", width: "52px" }}>{item.label}</span>
                  <div style={{ flex: 1, height: "8px", background: "#F3F4F6", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{
                      width: `${item.value}%`,
                      height: "100%",
                      background: item.color,
                      borderRadius: "4px",
                    }} />
                  </div>
                  <span style={{ fontSize: "11px", color: "#374151", fontWeight: "600", width: "32px", textAlign: "right" }}>
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>

            {/* 代表文案 */}
            <div style={{
              background: "#F9FAFB",
              borderRadius: "12px",
              padding: "12px",
              marginBottom: "12px",
              textAlign: "center",
            }}>
              <p style={{ fontSize: "10px", color: "#9CA3AF", margin: "0 0 4px" }}>朋友圈代表文案</p>
              <p style={{ fontSize: "14px", fontWeight: "600", color: "#1F2937", margin: 0 }}>
                「{result.quote}」
              </p>
            </div>

            {/* 建议 */}
            <p style={{
              fontSize: "11px",
              color: "#6B7280",
              textAlign: "center",
              lineHeight: "1.5",
              margin: 0,
            }}>
              💡 {result.advice}
            </p>

            {/* 百分比 */}
            {percentage && (
              <div style={{
                marginTop: "12px",
                paddingTop: "12px",
                borderTop: "1px solid #F3F4F6",
                textAlign: "center",
              }}>
                <p style={{ fontSize: "14px", fontWeight: "700", color: "#E11D48", margin: 0 }}>
                  🏆 超过了 {percentage}% 的测试者
                </p>
              </div>
            )}
          </div>

          {/* 底部 */}
          <div style={{ textAlign: "center", padding: "16px" }}>
            <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0 }}>
              🔗 mybookstores.github.io/quiz-site
            </p>
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="space-y-3">
        <button
          onClick={handleSaveImage}
          className={clsx(
            "w-full py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200",
            "flex items-center justify-center gap-2",
            "bg-gray-900 text-white",
            "hover:bg-gray-800 active:scale-[0.99]"
          )}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          保存图片
        </button>

        <button
          onClick={handleCopyLink}
          className={clsx(
            "w-full py-3 rounded-2xl font-medium text-sm transition-all duration-200",
            "flex items-center justify-center gap-2",
            "border border-gray-200 text-gray-600",
            "hover:bg-gray-50 active:scale-[0.99]"
          )}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          复制链接
        </button>

        {showToast && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-gray-900 text-white text-sm rounded-full shadow-xl flex items-center gap-2 z-50">
            {toastText}
          </div>
        )}
      </div>
    </>
  );
}