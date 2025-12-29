import { theme } from "../styles/theme";

export default function QuestionSelector({
  questions,
  selected,
  setSelected,
  customQuestion,
  setCustomQuestion,
  useCustom,
  setUseCustom,
  onRun,
  loading,
  questionToRun,
}) {
  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(20px)",
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        border: `1px solid ${theme.colors.neutral[200]}`,
        boxShadow: theme.shadows.md,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: theme.spacing.sm,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Demo Questions Section */}
        <div style={{ display: "flex", alignItems: "center", gap: theme.spacing.sm, flex: "1 1 100%" }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing.xs,
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: 600,
              color: theme.colors.neutral[700],
            }}
          >
            <input
              type="radio"
              checked={!useCustom}
              onChange={() => setUseCustom(false)}
              style={{
                width: "18px",
                height: "18px",
                cursor: "pointer",
                accentColor: theme.colors.accent.purple,
              }}
            />
            Demo Questions
          </label>

          <select
            disabled={useCustom}
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            style={{
              flex: 1,
              padding: theme.spacing.sm,
              borderRadius: theme.borderRadius.md,
              border: `2px solid ${theme.colors.neutral[200]}`,
              fontSize: "14px",
              background: useCustom ? theme.colors.neutral[100] : "white",
              cursor: useCustom ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              outline: "none",
            }}
            onFocus={(e) => {
              if (!useCustom) {
                e.target.style.borderColor = theme.colors.accent.purple;
                e.target.style.boxShadow = `0 0 0 3px rgba(124, 58, 237, 0.1)`;
              }
            }}
            onBlur={(e) => {
              e.target.style.borderColor = theme.colors.neutral[200];
              e.target.style.boxShadow = "none";
            }}
          >
            {questions.map((q) => (
              <option key={q.id} value={q.text}>
                {q.text}
              </option>
            ))}
            {questions.length === 0 && (
              <option value="">(No questions available)</option>
            )}
          </select>
        </div>

        {/* Custom Question Section */}
        <div style={{ display: "flex", alignItems: "center", gap: theme.spacing.sm, flex: "1 1 100%" }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: 600,
              color: theme.colors.neutral[700],
            }}
          >
            <input
              type="radio"
              checked={useCustom}
              onChange={() => setUseCustom(true)}
              style={{
                width: "18px",
                height: "18px",
                cursor: "pointer",
                accentColor: theme.colors.accent.purple,
              }}
            />
            Custom Question
          </label>

          <input
            disabled={!useCustom}
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            placeholder="Type your question… (e.g., ai sở hữu excalibur ?)"
            style={{
              flex: 1,
              padding: "12px 16px",
              borderRadius: theme.borderRadius.md,
              border: `2px solid ${theme.colors.neutral[200]}`,
              fontSize: "14px",
              background: !useCustom ? theme.colors.neutral[100] : "white",
              cursor: !useCustom ? "not-allowed" : "text",
              transition: "all 0.2s ease",
              outline: "none",
            }}
            onFocus={(e) => {
              if (useCustom) {
                e.target.style.borderColor = theme.colors.accent.purple;
                e.target.style.boxShadow = `0 0 0 3px rgba(124, 58, 237, 0.1)`;
              }
            }}
            onBlur={(e) => {
              e.target.style.borderColor = theme.colors.neutral[200];
              e.target.style.boxShadow = "none";
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading && questionToRun) {
                onRun();
              }
            }}
          />
        </div>

        {/* Run Button */}
        <button
          onClick={onRun}
          disabled={loading || !questionToRun}
          style={{
            padding: "12px 32px",
            borderRadius: theme.borderRadius.md,
            border: "none",
            background: loading || !questionToRun
              ? theme.colors.neutral[300]
              : theme.gradients.button,
            color: "white",
            fontWeight: 700,
            fontSize: "15px",
            cursor: loading || !questionToRun ? "not-allowed" : "pointer",
            boxShadow: loading || !questionToRun ? "none" : theme.shadows.lg,
            transition: "all 0.2s ease",
            minWidth: "120px",
          }}
          onMouseEnter={(e) => {
            if (!loading && questionToRun) {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = theme.shadows.xl;
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = theme.shadows.lg;
          }}
        >
          {loading ? (
            <span style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
              <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>
                ⟳
              </span>
              Running…
            </span>
          ) : (
            "Run Query"
          )}
        </button>
      </div>
    </div>
  );
}
