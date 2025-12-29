import { useState, useEffect } from "react";
import { theme } from "../styles/theme";

// Helper to check if value is a complex object with functor/args
function isComplexNode(value) {
  return (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    ("functor" in value || "args" in value)
  );
}

// Recursive tree node component
function TreeNode({ data, depth = 0, nodeIndex, totalNodes, animationDelay }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    // Animate node appearance based on its order
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, animationDelay);

    return () => clearTimeout(timer);
  }, [animationDelay]);

  if (!data) {
    return (
      <span style={{ color: theme.colors.neutral[500], fontStyle: "italic" }}>
        null
      </span>
    );
  }

  // Handle primitive types
  if (typeof data !== "object") {
    return (
      <span
        style={{
          color:
            typeof data === "string"
              ? theme.colors.status.success
              : theme.colors.accent.blue,
          fontWeight: 500,
        }}
      >
        {typeof data === "string" ? `"${data}"` : String(data)}
      </span>
    );
  }

  // Handle arrays
  if (Array.isArray(data)) {
    if (data.length === 0) {
      return (
        <span style={{ color: theme.colors.neutral[500] }}>
          []
        </span>
      );
    }

    return (
      <div style={{ marginLeft: depth > 0 ? "20px" : 0 }}>
        <div
          style={{
            color: theme.colors.neutral[600],
            fontWeight: 600,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span style={{ fontSize: "12px" }}>
            {isExpanded ? "▼" : "▶"}
          </span>
          <span>[{data.length} items]</span>
        </div>
        {isExpanded && (
          <div style={{ marginLeft: "16px", marginTop: "6px" }}>
            {data.map((item, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: "8px",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateX(0)" : "translateX(-10px)",
                  transition: `all 0.3s ease ${idx * 50}ms`,
                }}
              >
                <span
                  style={{
                    color: theme.colors.neutral[400],
                    fontSize: "12px",
                    marginRight: "8px",
                  }}
                >
                  [{idx}]
                </span>
                <TreeNode
                  data={item}
                  depth={depth + 1}
                  nodeIndex={nodeIndex + idx}
                  totalNodes={totalNodes}
                  animationDelay={animationDelay + idx * 100}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Handle complex nodes with functor/args
  if (isComplexNode(data)) {
    const { functor, args } = data;

    return (
      <div
        style={{
          marginLeft: depth > 0 ? "20px" : 0,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(-10px)",
          transition: "all 0.4s ease",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: `linear-gradient(135deg, ${theme.colors.accent.purple}15, ${theme.colors.accent.blue}15)`,
            border: `2px solid ${theme.colors.accent.purple}`,
            borderRadius: theme.borderRadius.md,
            padding: "8px 12px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onClick={() => setIsExpanded(!isExpanded)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.02)";
            e.currentTarget.style.boxShadow = theme.shadows.md;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <span style={{ fontSize: "12px", color: theme.colors.neutral[500] }}>
            {isExpanded ? "▼" : "▶"}
          </span>
          <span
            style={{
              fontWeight: 700,
              color: theme.colors.accent.purple,
              fontSize: "14px",
            }}
          >
            {functor || "node"}
          </span>
        </div>

        {isExpanded && args !== undefined && (
          <div
            style={{
              marginLeft: "24px",
              marginTop: "10px",
              paddingLeft: "12px",
              borderLeft: `2px solid ${theme.colors.neutral[200]}`,
            }}
          >
            <div style={{ fontSize: "12px", color: theme.colors.neutral[500], marginBottom: "6px" }}>
              args:
            </div>
            <TreeNode
              data={args}
              depth={depth + 1}
              nodeIndex={nodeIndex + 1}
              totalNodes={totalNodes}
              animationDelay={animationDelay + 150}
            />
          </div>
        )}
      </div>
    );
  }

  // Handle regular objects
  const keys = Object.keys(data);
  if (keys.length === 0) {
    return (
      <span style={{ color: theme.colors.neutral[500] }}>
        {"{"}
        {"}"}
      </span>
    );
  }

  return (
    <div style={{ marginLeft: depth > 0 ? "20px" : 0 }}>
      <div
        style={{
          color: theme.colors.neutral[600],
          fontWeight: 600,
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span style={{ fontSize: "12px" }}>
          {isExpanded ? "▼" : "▶"}
        </span>
        <span>{"{"}...{"}"}</span>
      </div>
      {isExpanded && (
        <div style={{ marginLeft: "16px", marginTop: "6px" }}>
          {keys.map((key, idx) => (
            <div
              key={key}
              style={{
                marginBottom: "8px",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateX(0)" : "translateX(-10px)",
                transition: `all 0.3s ease ${idx * 50}ms`,
              }}
            >
              <span
                style={{
                  color: theme.colors.accent.pink,
                  fontWeight: 600,
                  marginRight: "8px",
                }}
              >
                {key}:
              </span>
              <TreeNode
                data={data[key]}
                depth={depth + 1}
                nodeIndex={nodeIndex + idx}
                totalNodes={totalNodes}
                animationDelay={animationDelay + idx * 100}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TreeVisualizer({ data, className }) {
  const [animationSpeed, setAnimationSpeed] = useState(100);

  return (
    <div
      className={className}
      style={{
        background: theme.colors.neutral[50],
        padding: "16px",
        borderRadius: theme.borderRadius.md,
        border: `1px solid ${theme.colors.neutral[200]}`,
        overflowX: "auto",
        fontFamily: "'Fira Code', 'Monaco', monospace",
        fontSize: "13px",
        lineHeight: "1.8",
      }}
    >
      {/* Control panel */}
      <div
        style={{
          marginBottom: "16px",
          paddingBottom: "12px",
          borderBottom: `1px solid ${theme.colors.neutral[200]}`,
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span style={{ fontSize: "12px", fontWeight: 600, color: theme.colors.neutral[700] }}>
          Animation Speed:
        </span>
        <input
          type="range"
          min="0"
          max="300"
          value={animationSpeed}
          onChange={(e) => setAnimationSpeed(Number(e.target.value))}
          style={{ flex: 1, maxWidth: "200px", accentColor: theme.colors.accent.purple }}
        />
        <span style={{ fontSize: "12px", color: theme.colors.neutral[600] }}>
          {animationSpeed === 0 ? "Instant" : `${animationSpeed}ms`}
        </span>
      </div>

      {/* Tree content */}
      <TreeNode
        data={data}
        depth={0}
        nodeIndex={0}
        totalNodes={100}
        animationDelay={0}
      />
    </div>
  );
}
