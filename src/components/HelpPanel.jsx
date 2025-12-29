import { theme } from "../styles/theme";

export default function HelpPanel() {
  const isMobile = window.innerWidth <= 768;
  
  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(20px)",
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        border: `1px solid ${theme.colors.neutral[200]}`,
        boxShadow: theme.shadows.sm,
        marginBottom: theme.spacing.md,
      }}
    >
      <h3
        style={{
          margin: 0,
          marginBottom: theme.spacing.sm,
          fontSize: isMobile ? "14px" : "15px",
          fontWeight: 700,
          color: theme.colors.neutral[800],
          display: "flex",
          alignItems: "center",
          gap: theme.spacing.xs,
        }}
      >
        💡 How to use
      </h3>
      <ol
        style={{
          margin: 0,
          paddingLeft: isMobile ? "20px" : "24px",
          fontSize: isMobile ? "11px" : "12px",
          color: theme.colors.neutral[700],
          lineHeight: "1.6",
        }}
      >
        <li style={{ marginBottom: theme.spacing.xs }}>
          <strong>Choose a question:</strong> Pick from sample questions or type your own
        </li>
        <li style={{ marginBottom: theme.spacing.xs }}>
          <strong>Click "Get Answer":</strong> Watch as the system processes your question
        </li>
        <li style={{ marginBottom: theme.spacing.xs }}>
          <strong>See the steps:</strong> Follow along as the question is analyzed
        </li>
        <li>
          <strong>Get your answer:</strong> The result will appear when processing is complete
        </li>
      </ol>
    </div>
  );
}
