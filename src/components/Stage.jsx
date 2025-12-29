import { theme } from "../styles/theme";
import PrettyJSON from "./PrettyJSON";

export default function Stage({ title, data }) {
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
      <div
        style={{
          fontWeight: 700,
          fontSize: "15px",
          marginBottom: "12px",
          background: theme.gradients.headerAccent,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {title}
      </div>
      <PrettyJSON data={data} />
    </div>
  );
}
