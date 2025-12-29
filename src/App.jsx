import { useEffect, useMemo, useState } from "react";
import { theme } from "./styles/theme";
import { fetchQuestions, runQuery } from "./utils/api";
import { buildPipelineView } from "./utils/pipelineHelpers";
import QuestionSelector from "./components/QuestionSelector";
import StepByStepViewer from "./components/StepByStepViewer";
import ResultPanel from "./components/ResultPanel";
import PrettyJSON from "./components/PrettyJSON";

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState("");
  const [customQuestion, setCustomQuestion] = useState("");
  const [useCustom, setUseCustom] = useState(false);

  const [answer, setAnswer] = useState("");
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Load demo questions from backend
  useEffect(() => {
    fetchQuestions().then((data) => {
      setQuestions(data);
      if (data?.length) {
        setSelected(data[0].text);
      }
    });
  }, []);

  const questionToRun = useMemo(() => {
    if (useCustom) return customQuestion.trim();
    return selected.trim();
  }, [useCustom, customQuestion, selected]);

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
    <div
      style={{
        minHeight: "100vh",
        background: theme.gradients.primary,
        padding: `${theme.spacing.md} ${theme.spacing.lg}`,
      }}
    >
      <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
        {/* Header - Compact */}
        <div
          style={{
            textAlign: "center",
            marginBottom: theme.spacing.md,
            animation: "fadeIn 0.6s ease-out",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              fontWeight: 800,
              color: "white",
              marginBottom: theme.spacing.xs,
              textShadow: "0 4px 12px rgba(0,0,0,0.1)",
              letterSpacing: "-0.5px",
            }}
          >
            FOL Query Processor
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.9)",
              fontWeight: 500,
            }}
          >
            Dịch câu hỏi sang First-Order Logic & Kết quả
          </p>
        </div>

        {/* Question Selector - Compact */}
        <div style={{ animation: "slideUp 0.6s ease-out 0.1s backwards" }}>
          <QuestionSelector
            questions={questions}
            selected={selected}
            setSelected={setSelected}
            customQuestion={customQuestion}
            setCustomQuestion={setCustomQuestion}
            useCustom={useCustom}
            setUseCustom={setUseCustom}
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

        {/* Main Content: Pipeline and Results Side by Side */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 400px",
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
                fontSize: "18px",
                fontWeight: 700,
                marginBottom: theme.spacing.md,
                background: theme.gradients.headerAccent,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              🔄 Processing Pipeline
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
                <div style={{ fontSize: "14px", fontWeight: 600 }}>
                  Processing pipeline...
                </div>
                <div style={{ fontSize: "12px", marginTop: theme.spacing.xs }}>
                  Results will appear after step 4
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
                    fontSize: "16px",
                    fontWeight: 700,
                    background: theme.gradients.headerAccent,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  🔍 Raw Steps
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
  );
}
