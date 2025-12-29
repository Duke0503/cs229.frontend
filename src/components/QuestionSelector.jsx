import { theme } from "../styles/theme";
import "./QuestionSelector.css";

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
      <div className="question-selector-container">
        {/* Demo Questions Section */}
        <div className="question-section">
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing.xs,
              cursor: "pointer",
              fontSize: "clamp(14px, 2.5vw, 15px)",
              fontWeight: 600,
              color: theme.colors.neutral[700],
            }}
          >
            <input
              type="radio"
              checked={!useCustom}
              onChange={() => setUseCustom(false)}
              style={{
                width: "20px",
                height: "20px",
                cursor: "pointer",
                accentColor: theme.colors.accent.purple,
              }}
            />
            📚 Sample Questions
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
              fontSize: "clamp(13px, 2.5vw, 14px)",
              background: useCustom ? theme.colors.neutral[100] : "white",
              cursor: useCustom ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              outline: "none",
              minHeight: "44px",
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
        <div className="question-section">
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              fontSize: "clamp(14px, 2.5vw, 15px)",
              fontWeight: 600,
              color: theme.colors.neutral[700],
            }}
          >
            <input
              type="radio"
              checked={useCustom}
              onChange={() => setUseCustom(true)}
              style={{
                width: "20px",
                height: "20px",
                cursor: "pointer",
                accentColor: theme.colors.accent.purple,
              }}
            />
            ✏️ Your Question
          </label>

          <input
            disabled={!useCustom}
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            placeholder="Type your question here... (e.g., Who owns Excalibur?)"
            style={{
              flex: 1,
              padding: "12px 16px",
              borderRadius: theme.borderRadius.md,
              border: `2px solid ${theme.colors.neutral[200]}`,
              fontSize: "clamp(13px, 2.5vw, 14px)",
              background: !useCustom ? theme.colors.neutral[100] : "white",
              cursor: !useCustom ? "not-allowed" : "text",
              transition: "all 0.2s ease",
              outline: "none",
              minHeight: "44px",
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
          className="run-button"
          style={{
            padding: "14px 24px",
            borderRadius: theme.borderRadius.md,
            border: "none",
            background: loading || !questionToRun
              ? theme.colors.neutral[300]
              : theme.gradients.button,
            color: "white",
            fontWeight: 700,
            fontSize: "clamp(14px, 2.5vw, 15px)",
            cursor: loading || !questionToRun ? "not-allowed" : "pointer",
            boxShadow: loading || !questionToRun ? "none" : theme.shadows.lg,
            transition: "all 0.2s ease",
            minHeight: "48px",
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
              <span className="button-text">Processing...</span>
              <span className="button-text-short">Wait...</span>
            </span>
          ) : (
            <span style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
              🚀 <span className="button-text">Get Answer</span>
              <span className="button-text-short">Go</span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
