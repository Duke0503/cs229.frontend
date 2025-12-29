import { useState } from "react";
import { theme } from "../styles/theme";
import PrettyJSON from "./PrettyJSON";
import TreeVisualizer from "./TreeVisualizer";

export default function EnhancedStage({ title, data }) {
  const [viewMode, setViewMode] = useState("tree"); // 'tree' or 'json'

  // Check if data is complex enough to benefit from tree view
  const isComplexData = data && typeof data === "object";

  return (
    <div
      style={{
        flex: 1,
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        border: `1px solid ${theme.colors.neutral[200]}`,
        borderRadius: theme.borderRadius.lg,
        padding: "16px",
        minWidth: "240px",
        boxShadow: theme.shadows.md,
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = theme.shadows.xl;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = theme.shadows.md;
      }}
    >
      {/* Header with view toggle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: "15px",
            background: theme.gradients.headerAccent,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {title}
        </div>

        {isComplexData && (
          <div
            style={{
              display: "flex",
              gap: "4px",
              background: theme.colors.neutral[100],
              borderRadius: theme.borderRadius.sm,
              padding: "2px",
            }}
          >
            <button
              onClick={() => setViewMode("tree")}
              style={{
                padding: "4px 10px",
                border: "none",
                background:
                  viewMode === "tree"
                    ? theme.gradients.button
                    : "transparent",
                color: viewMode === "tree" ? "white" : theme.colors.neutral[600],
                borderRadius: theme.borderRadius.sm,
                fontSize: "11px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              🌳 Tree
            </button>
            <button
              onClick={() => setViewMode("json")}
              style={{
                padding: "4px 10px",
                border: "none",
                background:
                  viewMode === "json"
                    ? theme.gradients.button
                    : "transparent",
                color: viewMode === "json" ? "white" : theme.colors.neutral[600],
                borderRadius: theme.borderRadius.sm,
                fontSize: "11px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {"{}"} JSON
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      {!data ? (
        <div
          style={{
            padding: "20px",
            textAlign: "center",
            color: theme.colors.neutral[400],
            fontStyle: "italic",
          }}
        >
          No data yet
        </div>
      ) : viewMode === "tree" && isComplexData ? (
        <TreeVisualizer data={data} />
      ) : (
        <PrettyJSON data={data} />
      )}
    </div>
  );
}
