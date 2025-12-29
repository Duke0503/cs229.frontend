import { theme } from "../styles/theme";

// Move ResultCard outside to avoid creating components during render
const ResultCard = ({ title, result, question, isActive }) => {
  const isMobile = window.innerWidth <= 768;
  
  return (
    <div
      style={{
        flex: 1,
        borderRadius: theme.borderRadius.md,
        overflow: "hidden",
        border: `2px solid ${
          isActive ? theme.colors.accent.purple : theme.colors.neutral[200]
        }`,
        background: isActive
          ? "rgba(255, 255, 255, 0.95)"
          : "rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(10px)",
        boxShadow: isActive ? theme.shadows.lg : theme.shadows.sm,
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          background: isActive
            ? theme.gradients.button
            : theme.colors.neutral[300],
          color: "white",
          padding: theme.spacing.sm,
          fontWeight: 700,
          fontSize: isMobile ? "13px" : "14px",
          display: "flex",
          alignItems: "center",
          gap: theme.spacing.xs,
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: isActive ? "#10b981" : "#9ca3af",
            display: "inline-block",
            animation: isActive ? "pulse 2s ease-in-out infinite" : "none",
          }}
        />
        {title}
      </div>
      <div style={{ padding: theme.spacing.sm }}>
        <div
          style={{
            fontSize: isMobile ? "11px" : "12px",
            color: theme.colors.neutral[700],
            marginBottom: theme.spacing.xs,
          }}
        >
          <strong style={{ color: theme.colors.accent.purple }}>Question:</strong>{" "}
          {question}
        </div>
        <div
          style={{
            fontSize: isMobile ? "15px" : "16px",
            fontWeight: 700,
            color: isActive ? theme.colors.accent.purple : theme.colors.neutral[500],
            padding: theme.spacing.xs,
            background: isActive
              ? "rgba(124, 58, 237, 0.1)"
              : theme.colors.neutral[100],
            borderRadius: theme.borderRadius.sm,
            border: `1px solid ${
              isActive ? theme.colors.accent.purple : theme.colors.neutral[200]
            }`,
          }}
        >
          <strong>Answer:</strong> {result}
        </div>
      </div>
    </div>
  );
};

export default function ResultPanel({ question, answer }) {
  if (!answer) return null;

  const isYesNo = answer === "Yes" || answer === "No";
  const isMobile = window.innerWidth <= 768;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing.sm,
        animation: "fadeIn 0.5s ease-in",
      }}
    >
      <ResultCard
        title={isYesNo ? (isMobile ? "✅ Yes/No" : "✅ Yes/No Answer") : (isMobile ? "💡 Answer" : "💡 Full Answer")}
        question={question}
        result={isYesNo ? answer : `${answer}`}
        isActive={true}
      />
    </div>
  );
}
