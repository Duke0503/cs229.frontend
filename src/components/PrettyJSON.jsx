import { theme } from "../styles/theme";

export default function PrettyJSON({ data }) {
  return (
    <pre
      style={{
        background: theme.colors.neutral[100],
        padding: "12px",
        borderRadius: theme.borderRadius.md,
        overflowX: "auto",
        fontSize: "13px",
        margin: 0,
        fontFamily: "'Fira Code', 'Monaco', monospace",
        lineHeight: "1.6",
        border: `1px solid ${theme.colors.neutral[200]}`,
        color: theme.colors.neutral[800],
      }}
    >
      {data ? JSON.stringify(data, null, 2) : "—"}
    </pre>
  );
}
