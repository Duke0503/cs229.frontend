import { useState, useEffect, useRef } from "react";
import { theme } from "../styles/theme";
import EnhancedStage from "./EnhancedStage";
import Arrow from "./Arrow";

export default function AnimatedPipeline({ pipeline, onComplete }) {
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(800); // ms between steps
  const prevPipelineRef = useRef(pipeline);

  const steps = [
    { key: "tokens", title: "1. Tokenize", data: pipeline.tokens },
    { key: "parse", title: "2. Parse / Lambda", data: pipeline.parse },
    { key: "drs", title: "3. DRS", data: pipeline.drs },
    { key: "folProver", title: "4. FOL / Prover", data: pipeline.folProver },
  ];

  // Auto-advance animation
  useEffect(() => {
    if (visibleSteps < steps.length) {
      const timer = setTimeout(() => {
        setVisibleSteps((prev) => prev + 1);
        if (visibleSteps === steps.length - 1 && onComplete) {
          onComplete();
        }
      }, animationSpeed);

      return () => clearTimeout(timer);
    }
  }, [visibleSteps, steps.length, animationSpeed, onComplete]);

  // Reset animation when pipeline data changes
  useEffect(() => {
    if (prevPipelineRef.current !== pipeline) {
      prevPipelineRef.current = pipeline;
      // Use timeout to avoid synchronous state update
      const timer = setTimeout(() => setVisibleSteps(0), 0);
      return () => clearTimeout(timer);
    }
  }, [pipeline]);

  const handleSpeedChange = (speed) => {
    setAnimationSpeed(speed);
  };

  const handleReset = () => {
    setVisibleSteps(0);
  };

  const handleShowAll = () => {
    setVisibleSteps(steps.length);
  };

  return (
    <div>
      {/* Controls */}
      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
          padding: "12px",
          background: "rgba(255, 255, 255, 0.5)",
          borderRadius: theme.borderRadius.md,
          border: `1px solid ${theme.colors.neutral[200]}`,
        }}
      >
        <span
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: theme.colors.neutral[700],
          }}
        >
          Animation:
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
          <label
            style={{
              fontSize: "12px",
              color: theme.colors.neutral[600],
              minWidth: "80px",
            }}
          >
            Speed: {animationSpeed}ms
          </label>
          <input
            type="range"
            min="0"
            max="2000"
            step="100"
            value={animationSpeed}
            onChange={(e) => handleSpeedChange(Number(e.target.value))}
            style={{
              flex: 1,
              maxWidth: "200px",
              accentColor: theme.colors.accent.purple,
            }}
          />
        </div>

        <button
          onClick={handleReset}
          style={{
            padding: "8px 16px",
            borderRadius: theme.borderRadius.sm,
            border: `1px solid ${theme.colors.neutral[300]}`,
            background: "white",
            color: theme.colors.neutral[700],
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme.colors.neutral[100];
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "white";
          }}
        >
          🔄 Replay
        </button>

        <button
          onClick={handleShowAll}
          disabled={visibleSteps === steps.length}
          style={{
            padding: "8px 16px",
            borderRadius: theme.borderRadius.sm,
            border: "none",
            background:
              visibleSteps === steps.length
                ? theme.colors.neutral[200]
                : theme.gradients.button,
            color: "white",
            fontSize: "12px",
            fontWeight: 600,
            cursor: visibleSteps === steps.length ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
          }}
        >
          ⏩ Show All
        </button>

        <div
          style={{
            fontSize: "12px",
            color: theme.colors.neutral[600],
            padding: "6px 12px",
            background: theme.colors.neutral[100],
            borderRadius: theme.borderRadius.sm,
          }}
        >
          Step {Math.min(visibleSteps, steps.length)} / {steps.length}
        </div>
      </div>

      {/* Pipeline Steps */}
      <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
        {steps.map((step, index) => (
          <div
            key={step.key}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              opacity: visibleSteps > index ? 1 : 0.3,
              transform:
                visibleSteps > index ? "scale(1)" : "scale(0.95)",
              transition: "all 0.5s ease",
              filter: visibleSteps > index ? "none" : "blur(2px)",
            }}
          >
            <div
              style={{
                position: "relative",
                animation:
                  visibleSteps === index + 1
                    ? "pulse 1s ease-in-out 3"
                    : "none",
              }}
            >
              {/* Step indicator */}
              {visibleSteps === index + 1 && (
                <div
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    width: "24px",
                    height: "24px",
                    background: theme.gradients.button,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "white",
                    boxShadow: theme.shadows.lg,
                    animation: "pulse 1s ease-in-out infinite",
                    zIndex: 10,
                  }}
                >
                  ✓
                </div>
              )}
              <EnhancedStage title={step.title} data={step.data} />
            </div>

            {index < steps.length - 1 && (
              <Arrow
                style={{
                  opacity: visibleSteps > index + 1 ? 1 : 0.3,
                  transition: "opacity 0.5s ease",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Loading indicator for current step */}
      {visibleSteps < steps.length && visibleSteps > 0 && (
        <div
          style={{
            marginTop: "16px",
            padding: "12px 16px",
            background: `linear-gradient(90deg, ${theme.colors.accent.purple}15, ${theme.colors.accent.blue}15)`,
            border: `1px solid ${theme.colors.accent.purple}`,
            borderRadius: theme.borderRadius.md,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            animation: "fadeIn 0.3s ease-in",
          }}
        >
          <div
            style={{
              width: "16px",
              height: "16px",
              border: `3px solid ${theme.colors.accent.purple}`,
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <span
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: theme.colors.accent.purple,
            }}
          >
            Processing {steps[visibleSteps]?.title}...
          </span>
        </div>
      )}

      {/* Completion message */}
      {visibleSteps === steps.length && (
        <div
          style={{
            marginTop: "16px",
            padding: "12px 16px",
            background: `linear-gradient(90deg, ${theme.colors.status.success}15, ${theme.colors.status.success}25)`,
            border: `1px solid ${theme.colors.status.success}`,
            borderRadius: theme.borderRadius.md,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            animation: "slideUp 0.4s ease-out",
          }}
        >
          <span style={{ fontSize: "18px" }}>✅</span>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: theme.colors.status.success,
            }}
          >
            Pipeline processing complete!
          </span>
        </div>
      )}
    </div>
  );
}
