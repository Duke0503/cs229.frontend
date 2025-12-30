import { useEffect, useMemo, useState } from "react";
import { ConfigProvider } from "antd";
import { theme } from "./styles/theme";
import { runQuery } from "./utils/api";
import { buildPipelineView } from "./utils/pipelineHelpers";
import QuestionSelector from "./components/QuestionSelector";
import StepByStepViewer from "./components/StepByStepViewer";
import ResultPanel from "./components/ResultPanel";
import PrettyJSON from "./components/PrettyJSON";
import HelpPanel from "./components/HelpPanel";

// Ant Design theme configuration
const antdTheme = {
  token: {
    colorPrimary: "#8b5cf6",
    colorSuccess: "#10b981",
    colorWarning: "#f59e0b",
    colorError: "#ef4444",
    colorInfo: "#3b82f6",
    borderRadius: 8,
    fontSize: 14,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
    lineHeight: 1.6,
  },
  components: {
    Select: {
      controlHeight: 48,
      fontSize: 14,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
      optionFontSize: 14,
      optionLineHeight: 1.6,
      optionPadding: "10px 12px",
    },
    Button: {
      controlHeight: 48,
      fontSize: 15,
      fontWeight: 600,
      fontFamily: "'Inter', sans-serif",
    },
  },
};

export default function App() {
  const [selected, setSelected] = useState("");
  const [answer, setAnswer] = useState("");
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showHelp, setShowHelp] = useState(true); // Show help by default

  // Predefined question groups
  const questionGroups = [
    {
      name: "Nhóm Câu hỏi Yes/No",
      questions: [
        "Smaug là rồng phải không?",
        "Arthur là hiệp sĩ phải không?",
        "Kẻ thù tấn công Camelot phải không?",
        "Tiên Nữ là bạn Arthur phải không?",
        "Smaug là kẻ thù phải không?",
        "Excalibur là kiếm phải không?",
      ],
    },
    {
      name: "Nhóm Câu hỏi Who",
      questions: [
        "Ai bảo vệ Camelot?",
        "Ai tấn công Camelot?",
        "Ai trao Excalibur cho Arthur?",
        "Ai là bạn của Arthur?",
        "Ai sở hữu Excalibur?",
      ],
    },
    {
      name: "Nhóm Câu hỏi What",
      questions: ["Tiên Nữ trao cái gì cho Arthur?"],
    },
  ];

  // Set first question as default
  useEffect(() => {
    setSelected("Smaug là rồng phải không?");
  }, []);

  const questionToRun = useMemo(() => {
    return selected.trim();
  }, [selected]);

  const pipeline = useMemo(() => buildPipelineView(steps), [steps]);

  const run = async () => {
    setLoading(true);
    setErrorMsg("");
    setAnswer("");
    setSteps([]);
    setShowResults(false); // Hide results when starting new query

    try {
      const data = await runQuery(questionToRun);
      setAnswer(data.answer);
      setSteps(data.steps || []);
    } catch (e) {
      setErrorMsg(String(e.message || e));
    } finally {
      setLoading(false);
    }
  };

  const handlePipelineComplete = () => {
    setShowResults(true); // Show results when pipeline reaches step 4
  };

  return (
    <ConfigProvider theme={antdTheme}>
      <div
        style={{
          minHeight: "100vh",
          background: theme.gradients.primary,
          padding: window.innerWidth > 768 
          ? `${theme.spacing.md} ${theme.spacing.lg}` 
          : `${theme.spacing.sm} ${theme.spacing.sm}`,
      }}
    >
      <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
        {/* Header - Responsive */}
        <div
          style={{
            textAlign: "center",
            marginBottom: theme.spacing.md,
            animation: "fadeIn 0.6s ease-out",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(24px, 5vw, 32px)",
              fontWeight: 800,
              color: "white",
              marginBottom: theme.spacing.xs,
              textShadow: "0 4px 12px rgba(0,0,0,0.1)",
              letterSpacing: "-0.5px",
            }}
          >
            🤖 Smart Question Answering
          </h1>
          <p
            style={{
              fontSize: "clamp(12px, 2.5vw, 14px)",
              color: "rgba(255,255,255,0.9)",
              fontWeight: 500,
              padding: "0 16px",
            }}
          >
            Ask any question and get instant answers
          </p>
        </div>

        {/* Help Panel - Collapsible */}
        {showHelp && (
          <div style={{ animation: "slideUp 0.4s ease-out" }}>
            <HelpPanel />
          </div>
        )}
        
        {/* Toggle Help Button */}
        <div style={{ textAlign: "center", marginBottom: theme.spacing.sm }}>
          <button
            onClick={() => setShowHelp(!showHelp)}
            style={{
              padding: "8px 16px",
              borderRadius: theme.borderRadius.full,
              border: "none",
              background: "rgba(255, 255, 255, 0.8)",
              color: theme.colors.accent.purple,
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: theme.shadows.sm,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 1)";
              e.currentTarget.style.boxShadow = theme.shadows.md;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.8)";
              e.currentTarget.style.boxShadow = theme.shadows.sm;
            }}
          >
            {showHelp ? "Hide Help ▲" : "Show Help ▼"}
          </button>
        </div>

        {/* Question Selector - Compact */}
        <div style={{ animation: "slideUp 0.6s ease-out 0.1s backwards" }}>
          <QuestionSelector
            questionGroups={questionGroups}
            selected={selected}
            setSelected={setSelected}
            onRun={run}
            loading={loading}
            questionToRun={questionToRun}
          />
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div
            style={{
              marginTop: theme.spacing.sm,
              background: "rgba(239, 68, 68, 0.95)",
              backdropFilter: "blur(10px)",
              border: `2px solid ${theme.colors.status.error}`,
              padding: theme.spacing.sm,
              borderRadius: theme.borderRadius.md,
              color: "white",
              boxShadow: theme.shadows.lg,
              animation: "slideUp 0.3s ease-out",
            }}
          >
            <strong style={{ fontSize: "14px" }}>⚠️ Error:</strong>
            <div style={{ marginTop: theme.spacing.xs, fontSize: "12px" }}>{errorMsg}</div>
          </div>
        )}

        {/* Main Content: Responsive Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: window.innerWidth > 1200 
              ? "minmax(0, 1fr) minmax(350px, 450px)" 
              : window.innerWidth > 768 
                ? "1fr" 
                : "1fr",
            gap: theme.spacing.md,
            marginTop: theme.spacing.md,
            animation: "slideUp 0.6s ease-out 0.2s backwards",
          }}
        >
          {/* Left: Pipeline Visualization */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(20px)",
              padding: theme.spacing.md,
              borderRadius: theme.borderRadius.lg,
              border: `1px solid ${theme.colors.neutral[200]}`,
              boxShadow: theme.shadows.xl,
            }}
          >
            <h2
              style={{
                fontSize: "clamp(16px, 3vw, 18px)",
                fontWeight: 700,
                marginBottom: theme.spacing.md,
                background: theme.gradients.headerAccent,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {window.innerWidth > 768 ? "🔄 Processing Steps" : "🔄 Steps"}
            </h2>
            <StepByStepViewer 
              pipeline={pipeline} 
              onStepChange={handlePipelineComplete}
            />
          </div>

          {/* Right: Results */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing.md,
            }}
          >
            {/* Result Panel - Only show after step 4 */}
            {showResults && answer && (
              <ResultPanel question={questionToRun} answer={answer} />
            )}

            {/* Placeholder when results not ready */}
            {!showResults && (
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(20px)",
                  padding: theme.spacing.xl,
                  borderRadius: theme.borderRadius.lg,
                  border: `1px solid ${theme.colors.neutral[200]}`,
                  boxShadow: theme.shadows.xl,
                  textAlign: "center",
                  color: theme.colors.neutral[500],
                }}
              >
                <div style={{ fontSize: "48px", marginBottom: theme.spacing.sm }}>⏳</div>
                <div style={{ fontSize: "clamp(13px, 2.5vw, 14px)", fontWeight: 600 }}>
                  Analyzing your question...
                </div>
                <div style={{ fontSize: "clamp(11px, 2vw, 12px)", marginTop: theme.spacing.xs }}>
                  Answer will appear when complete
                </div>
              </div>
            )}

            {/* Raw Steps Compact */}
            {steps.length > 0 && (
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(20px)",
                  padding: theme.spacing.md,
                  borderRadius: theme.borderRadius.lg,
                  border: `1px solid ${theme.colors.neutral[200]}`,
                  boxShadow: theme.shadows.xl,
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
              >
                <h3
                  style={{
                    marginTop: 0,
                    marginBottom: theme.spacing.sm,
                    fontSize: "clamp(14px, 2.5vw, 16px)",
                    fontWeight: 700,
                    background: theme.gradients.headerAccent,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  🔍 Technical Details
                </h3>
                {steps.map((s, i) => (
                  <details
                    key={i}
                    style={{
                      marginBottom: theme.spacing.xs,
                      background: theme.colors.neutral[50],
                      borderRadius: theme.borderRadius.sm,
                      border: `1px solid ${theme.colors.neutral[200]}`,
                      overflow: "hidden",
                    }}
                  >
                    <summary
                      style={{
                        cursor: "pointer",
                        fontWeight: 600,
                        padding: theme.spacing.xs,
                        background: theme.colors.neutral[100],
                        transition: "background 0.2s ease",
                        fontSize: "12px",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = theme.colors.neutral[200];
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = theme.colors.neutral[100];
                      }}
                    >
                      {i + 1}. {s.step}
                    </summary>
                    <div style={{ padding: theme.spacing.xs, fontSize: "11px" }}>
                      <PrettyJSON data={s.data} />
                    </div>
                  </details>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </ConfigProvider>
  );
}
