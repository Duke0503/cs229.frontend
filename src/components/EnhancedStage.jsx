import { useState } from "react";
import { theme } from "../styles/theme";
import PrettyJSON from "./PrettyJSON";
import TreeVisualizer from "./TreeVisualizer";
import LambdaFormatter from "./LambdaFormatter";

export default function EnhancedStage({ title, data }) {
  const [viewMode, setViewMode] = useState("lambda"); // 'lambda', 'tree', or 'json'

  // Helper recursive function to check for functor/args patterns
  const hasLambdaStructure = (obj, depth = 0) => {
    if (depth > 5 || !obj) return false; // Prevent infinite recursion
    
    if (typeof obj === "object") {
      // Check if current object has functor or T keys
      if ("functor" in obj || "args" in obj) return true;
      
      // Check T key which contains the lambda structure
      if ("T" in obj) return hasLambdaStructure(obj.T, depth + 1);
      
      // Recursively check all values
      for (const key in obj) {
        if (hasLambdaStructure(obj[key], depth + 1)) return true;
      }
      
      // Check arrays
      if (Array.isArray(obj)) {
        return obj.some(item => hasLambdaStructure(item, depth + 1));
      }
    }
    return false;
  };

  // Check if data is complex enough to benefit from special views
  const isComplexData = data && typeof data === "object";
  
  // Check if data is a lambda/DRS structure
  const isLambdaStructure = hasLambdaStructure(data);


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
          flexWrap: "wrap",
          gap: "8px",
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
            {isLambdaStructure && (
              <button
                onClick={() => setViewMode("lambda")}
                title="Lambda Calculus view"
                style={{
                  padding: "4px 8px",
                  border: "none",
                  background:
                    viewMode === "lambda"
                      ? theme.gradients.button
                      : "transparent",
                  color: viewMode === "lambda" ? "white" : theme.colors.neutral[600],
                  borderRadius: theme.borderRadius.sm,
                  fontSize: "11px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                λ
              </button>
            )}
            <button
              onClick={() => setViewMode("tree")}
              title="Tree view"
              style={{
                padding: "4px 8px",
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
              🌳
            </button>
            <button
              onClick={() => setViewMode("json")}
              title="JSON view"
              style={{
                padding: "4px 8px",
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
              {"{}"}
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
      ) : viewMode === "lambda" && isLambdaStructure ? (
        <LambdaFormatter data={data} />
      ) : viewMode === "tree" && isComplexData ? (
        <TreeVisualizer data={data} />
      ) : (
        <PrettyJSON data={data} />
      )}
    </div>
  );
}
