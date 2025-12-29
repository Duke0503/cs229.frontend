import { useState, useEffect, useRef } from "react";
import { theme } from "../styles/theme";
import EnhancedStage from "./EnhancedStage";
import "./StepByStepViewer.css";

export default function StepByStepViewer({ pipeline, onStepChange }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); // Don't auto-play initially
  const [autoPlaySpeed, setAutoPlaySpeed] = useState(3000); // 3 seconds
  const autoPlayTimerRef = useRef(null);

  const steps = [
    { 
      key: "tokens", 
      titleFull: "1. Tokenize",
      titleShort: "1. Words",
      data: pipeline.tokens, 
      description: "Breaking text into words" 
    },
    { 
      key: "parse", 
      titleFull: "2. Parse / Lambda",
      titleShort: "2. Grammar",
      data: pipeline.parse, 
      description: "Understanding sentence structure" 
    },
    { 
      key: "drs", 
      titleFull: "3. DRS",
      titleShort: "3. Meaning",
      data: pipeline.drs, 
      description: "Extracting meaning" 
    },
    { 
      key: "folProver", 
      titleFull: "4. FOL / Prover",
      titleShort: "4. Answer",
      data: pipeline.folProver, 
      description: "Finding the answer" 
    },
  ];

  const currentStepData = steps[currentStep];

  // Auto-play logic - only if there's data
  useEffect(() => {
    // Check if pipeline has any data
    const hasData = pipeline.tokens || pipeline.parse || pipeline.drs || pipeline.folProver;
    
    if (hasData && isPlaying && currentStep < steps.length - 1) {
      autoPlayTimerRef.current = setTimeout(() => {
        setCurrentStep((prev) => {
          const nextStep = prev + 1;
          // Notify parent when reaching last step
          if (nextStep === steps.length - 1 && onStepChange) {
            onStepChange();
          }
          return nextStep;
        });
      }, autoPlaySpeed);
    }

    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, [isPlaying, currentStep, autoPlaySpeed, steps.length, onStepChange, pipeline]);

  // Reset to first step and start playing when pipeline changes with data
  const prevPipelineRef = useRef(pipeline);
  useEffect(() => {
    if (prevPipelineRef.current !== pipeline) {
      prevPipelineRef.current = pipeline;
      // Check if new pipeline has data
      const hasData = pipeline.tokens || pipeline.parse || pipeline.drs || pipeline.folProver;
      
      if (hasData) {
        const timer = setTimeout(() => {
          setCurrentStep(0);
          setIsPlaying(true); // Start auto-play only when there's data
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, [pipeline]);

  const handlePrevious = () => {
    setIsPlaying(false);
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStep((prev) => {
      const nextStep = Math.min(steps.length - 1, prev + 1);
      if (nextStep === steps.length - 1 && onStepChange) {
        onStepChange();
      }
      return nextStep;
    });
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(true);
  };

  return (
    <div>
      {/* Control Panel - Compact */}
      <div
        style={{
          marginBottom: theme.spacing.sm,
          padding: theme.spacing.sm,
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          borderRadius: theme.borderRadius.md,
          border: `1px solid ${theme.colors.neutral[200]}`,
          boxShadow: theme.shadows.sm,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: theme.spacing.sm,
            flexWrap: "wrap",
          }}
        >
          {/* Left side - Controls */}
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: theme.spacing.xs,
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}>
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: theme.borderRadius.sm,
                border: `1px solid ${theme.colors.neutral[200]}`,
                background: currentStep === 0 ? theme.colors.neutral[200] : "white",
                color: currentStep === 0 ? theme.colors.neutral[400] : theme.colors.accent.purple,
                fontSize: "14px",
                cursor: currentStep === 0 ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: currentStep === 0 ? "none" : theme.shadows.sm,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (currentStep !== 0) {
                  e.currentTarget.style.boxShadow = theme.shadows.md;
                  e.currentTarget.style.transform = "scale(1.05)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = theme.shadows.sm;
                e.currentTarget.style.transform = "scale(1)";
              }}
              title="Previous"
            >
              ⏮
            </button>

            <button
              onClick={handlePlayPause}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: theme.borderRadius.sm,
                border: "none",
                background: theme.gradients.button,
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: theme.shadows.md,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = theme.shadows.lg;
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = theme.shadows.md;
                e.currentTarget.style.transform = "scale(1)";
              }}
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? "⏸" : "▶"}
            </button>

            <button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: theme.borderRadius.sm,
                border: `1px solid ${theme.colors.neutral[200]}`,
                background: currentStep === steps.length - 1 ? theme.colors.neutral[200] : "white",
                color: currentStep === steps.length - 1 ? theme.colors.neutral[400] : theme.colors.accent.purple,
                fontSize: "14px",
                cursor: currentStep === steps.length - 1 ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: currentStep === steps.length - 1 ? "none" : theme.shadows.sm,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (currentStep !== steps.length - 1) {
                  e.currentTarget.style.boxShadow = theme.shadows.md;
                  e.currentTarget.style.transform = "scale(1.05)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = theme.shadows.sm;
                e.currentTarget.style.transform = "scale(1)";
              }}
              title="Next"
            >
              ⏭
            </button>

            <button
              onClick={handleReset}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: theme.borderRadius.sm,
                border: `1px solid ${theme.colors.neutral[200]}`,
                background: "white",
                color: theme.colors.neutral[700],
                fontSize: "14px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: theme.shadows.sm,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = theme.shadows.md;
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = theme.shadows.sm;
                e.currentTarget.style.transform = "scale(1)";
              }}
              title="Restart"
            >
              🔄
            </button>
          </div>

          {/* Center - Progress */}
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: theme.spacing.xs, 
            flex: 1, 
            minWidth: "150px",
          }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: theme.colors.neutral[700], whiteSpace: "nowrap" }}>
              <span className="progress-text-full">Step {currentStep + 1}/{steps.length}</span>
              <span className="progress-text-short">{currentStep + 1}/{steps.length}</span>
            </span>
            <div
              style={{
                flex: 1,
                height: "6px",
                background: theme.colors.neutral[200],
                borderRadius: theme.borderRadius.full,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                  height: "100%",
                  background: theme.gradients.button,
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>

          {/* Right side - Speed control - Desktop only */}
          <div className="speed-control" style={{ display: "flex", alignItems: "center", gap: theme.spacing.xs }}>
            <label style={{ fontSize: "11px", color: theme.colors.neutral[600], whiteSpace: "nowrap" }}>
              {autoPlaySpeed / 1000}s
            </label>
            <input
              type="range"
              min="1000"
              max="10000"
              step="500"
              value={autoPlaySpeed}
              onChange={(e) => setAutoPlaySpeed(Number(e.target.value))}
              style={{
                width: "80px",
                accentColor: theme.colors.accent.purple,
              }}
            />
          </div>
        </div>
      </div>

      {/* Step Indicator Pills - Responsive */}
      <div
        style={{
          display: "flex",
          gap: theme.spacing.xs,
          marginBottom: theme.spacing.sm,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {steps.map((step, index) => (
          <button
            key={step.key}
            onClick={() => {
              setCurrentStep(index);
              setIsPlaying(false);
              // Notify parent when clicking to last step
              if (index === steps.length - 1 && onStepChange) {
                onStepChange();
              }
            }}
            style={{
              padding: `8px ${theme.spacing.sm}`,
              borderRadius: theme.borderRadius.full,
              border: "none",
              background: currentStep === index ? theme.gradients.button : theme.colors.neutral[100],
              color: currentStep === index ? "white" : theme.colors.neutral[600],
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: currentStep === index ? theme.shadows.sm : "none",
              minHeight: "40px",
            }}
            onMouseEnter={(e) => {
              if (currentStep !== index) {
                e.currentTarget.style.background = theme.colors.neutral[200];
              }
            }}
            onMouseLeave={(e) => {
              if (currentStep !== index) {
                e.currentTarget.style.background = theme.colors.neutral[100];
              }
            }}
          >
            <span className="step-title-full">{step.titleFull}</span>
            <span className="step-title-short">{step.titleShort}</span>
          </button>
        ))}
      </div>

      {/* Current Step Content - Compact */}
      <div
        style={{
          animation: "fadeIn 0.4s ease-in",
        }}
      >
        <div
          style={{
            marginBottom: theme.spacing.xs,
            padding: theme.spacing.sm,
            background: `linear-gradient(135deg, ${theme.colors.accent.purple}10, ${theme.colors.accent.blue}10)`,
            borderLeft: `3px solid ${theme.colors.accent.purple}`,
            borderRadius: theme.borderRadius.sm,
          }}
        >
          <h3
            className="step-current-title"
            style={{
              margin: 0,
              fontSize: "16px",
              fontWeight: 700,
              background: theme.gradients.headerAccent,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "4px",
            }}
          >
            <span className="step-title-full">{currentStepData.titleFull}</span>
            <span className="step-title-short">{currentStepData.titleShort}</span>
          </h3>
          <p
            className="step-description"
            style={{
              margin: 0,
              fontSize: "12px",
              color: theme.colors.neutral[600],
            }}
          >
            {currentStepData.description}
          </p>
        </div>

        <EnhancedStage title={currentStepData.title} data={currentStepData.data} />
      </div>

      {/* Status Message - Compact */}
      {currentStep === steps.length - 1 && (
        <div
          style={{
            marginTop: theme.spacing.sm,
            padding: theme.spacing.sm,
            background: `linear-gradient(90deg, ${theme.colors.status.success}15, ${theme.colors.status.success}25)`,
            border: `1px solid ${theme.colors.status.success}`,
            borderRadius: theme.borderRadius.md,
            display: "flex",
            alignItems: "center",
            gap: theme.spacing.xs,
            animation: "slideUp 0.4s ease-out",
          }}
        >
          <span style={{ fontSize: "16px" }}>✅</span>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: theme.colors.status.success,
            }}
          >
            <span className="completion-message-full">Analysis complete!</span>
            <span className="completion-message-short">Done!</span>
          </span>
        </div>
      )}
    </div>
  );
}
