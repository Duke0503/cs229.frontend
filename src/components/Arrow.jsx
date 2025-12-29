import { theme } from "../styles/theme";

export default function Arrow() {
  return (
    <div
      style={{
        alignSelf: "center",
        fontSize: "32px",
        background: theme.gradients.primary,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        fontWeight: "bold",
        animation: "pulse 2s ease-in-out infinite",
      }}
    >
      →
    </div>
  );
}
