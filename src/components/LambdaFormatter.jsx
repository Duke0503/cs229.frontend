import { theme } from "../styles/theme";

/**
 * LambdaFormatter - Component to nicely format Lambda Calculus and DRS structures
 */
export default function LambdaFormatter({ data }) {
  // Helper to check if data is a lambda/functor structure
  const isFunctor = (obj) => {
    return obj && typeof obj === "object" && "functor" in obj;
  };

  // Helper to check if it's a DRS structure
  const isDRS = (obj) => {
    return isFunctor(obj) && obj.functor === "drs";
  };

  // Helper to check if it's a lambda
  const isLambda = (obj) => {
    return isFunctor(obj) && obj.functor === "lambda";
  };

  // Render a functor structure
  const renderFunctor = (obj, depth = 0) => {
    if (!isFunctor(obj)) {
      // Simple value
      if (typeof obj === "string") {
        return (
          <span style={{ 
            color: theme.colors.accent.purple, 
            fontWeight: 600,
            fontSize: "13px"
          }}>
            {obj}
          </span>
        );
      }
      if (Array.isArray(obj)) {
        return renderArray(obj, depth);
      }
      return <span style={{ fontSize: "13px" }}>{JSON.stringify(obj)}</span>;
    }

    const { functor, args } = obj;

    // Special formatting for lambda
    if (isLambda(obj)) {
      return (
        <div style={{ 
          marginLeft: depth > 0 ? "16px" : "0",
          marginTop: depth > 0 ? "4px" : "0"
        }}>
          <span style={{ 
            color: theme.colors.accent.blue, 
            fontWeight: 700,
            fontSize: "14px"
          }}>
            λ
          </span>
          {args && args.length > 0 && (
            <>
              <span style={{ 
                color: theme.colors.neutral[700],
                fontSize: "13px",
                fontWeight: 600,
                marginLeft: "4px"
              }}>
                {typeof args[0] === "string" ? args[0] : "?"}
              </span>
              <span style={{ 
                color: theme.colors.neutral[500],
                fontSize: "13px",
                marginLeft: "4px"
              }}>
                .
              </span>
              {args.length > 1 && (
                <div style={{ marginLeft: "20px", marginTop: "4px" }}>
                  {renderFunctor(args[1], depth + 1)}
                </div>
              )}
            </>
          )}
        </div>
      );
    }

    // Special formatting for DRS
    if (isDRS(obj)) {
      const [referents, conditions] = args || [[], []];
      return (
        <div style={{ 
          marginLeft: depth > 0 ? "12px" : "0",
          padding: "8px",
          background: "rgba(59, 130, 246, 0.05)",
          borderLeft: `3px solid ${theme.colors.accent.blue}`,
          borderRadius: "4px",
          marginTop: "4px"
        }}>
          <div style={{ 
            fontSize: "12px", 
            fontWeight: 700,
            color: theme.colors.accent.blue,
            marginBottom: "6px"
          }}>
            DRS:
          </div>
          {Array.isArray(referents) && referents.length > 0 && (
            <div style={{ marginLeft: "8px", marginBottom: "4px" }}>
              <span style={{ 
                fontSize: "11px", 
                color: theme.colors.neutral[600],
                fontWeight: 600
              }}>
                Referents:
              </span>
              {" "}
              {renderArray(referents, depth + 1)}
            </div>
          )}
          {Array.isArray(conditions) && conditions.length > 0 && (
            <div style={{ marginLeft: "8px" }}>
              <span style={{ 
                fontSize: "11px", 
                color: theme.colors.neutral[600],
                fontWeight: 600
              }}>
                Conditions:
              </span>
              <div style={{ marginLeft: "8px", marginTop: "4px" }}>
                {renderArray(conditions, depth + 1)}
              </div>
            </div>
          )}
        </div>
      );
    }

    // Special formatting for @ (application)
    if (functor === "@") {
      return (
        <div style={{ 
          marginLeft: depth > 0 ? "12px" : "0",
          marginTop: "4px"
        }}>
          <span style={{ 
            fontSize: "13px",
            color: theme.colors.neutral[600],
            fontWeight: 600
          }}>
            (
          </span>
          {args && args.map((arg, idx) => (
            <span key={idx}>
              {renderFunctor(arg, depth + 1)}
              {idx < args.length - 1 && (
                <span style={{ 
                  color: theme.colors.neutral[500],
                  fontSize: "13px",
                  margin: "0 4px"
                }}>
                  @
                </span>
              )}
            </span>
          ))}
          <span style={{ 
            fontSize: "13px",
            color: theme.colors.neutral[600],
            fontWeight: 600
          }}>
            )
          </span>
        </div>
      );
    }

    // Special formatting for comma (conjunction)
    if (functor === ",") {
      return (
        <div style={{ marginLeft: depth > 0 ? "8px" : "0" }}>
          <span style={{ 
            fontSize: "13px",
            fontWeight: 600,
            color: "#ec4899"
          }}>
            {args && args.length === 2 && `${args[0]}, ${args[1]}`}
          </span>
        </div>
      );
    }

    // Special formatting for x (existential)
    if (functor === "x") {
      return (
        <div style={{ marginLeft: depth > 0 ? "12px" : "0", marginTop: "4px" }}>
          <span style={{ 
            fontSize: "13px",
            fontWeight: 700,
            color: "#ec4899"
          }}>
            ∃
          </span>
          {args && args.map((arg, idx) => (
            <div key={idx} style={{ marginLeft: idx > 0 ? "16px" : "8px", marginTop: "4px" }}>
              {renderFunctor(arg, depth + 1)}
            </div>
          ))}
        </div>
      );
    }

    // Default functor rendering
    return (
      <div style={{ marginLeft: depth > 0 ? "12px" : "0", marginTop: "4px" }}>
        <span style={{ 
          fontSize: "13px",
          fontWeight: 700,
          color: theme.colors.accent.purple
        }}>
          {functor}
        </span>
        {args && args.length > 0 && (
          <>
            <span style={{ color: theme.colors.neutral[500], fontSize: "13px" }}>(</span>
            {args.map((arg, idx) => (
              <span key={idx}>
                {renderFunctor(arg, depth + 1)}
                {idx < args.length - 1 && (
                  <span style={{ color: theme.colors.neutral[500], fontSize: "13px" }}>, </span>
                )}
              </span>
            ))}
            <span style={{ color: theme.colors.neutral[500], fontSize: "13px" }}>)</span>
          </>
        )}
      </div>
    );
  };

  // Render array
  const renderArray = (arr, depth = 0) => {
    if (!Array.isArray(arr)) return null;
    if (arr.length === 0) {
      return <span style={{ fontSize: "12px", color: theme.colors.neutral[400] }}>[]</span>;
    }
    return (
      <div style={{ marginLeft: depth > 0 ? "8px" : "0" }}>
        {arr.map((item, idx) => (
          <div key={idx} style={{ marginTop: idx > 0 ? "4px" : "0" }}>
            {renderFunctor(item, depth)}
          </div>
        ))}
      </div>
    );
  };

  // Check if data is an array
  if (Array.isArray(data)) {
    // If it's an array with complex structures, render each item
    if (data.some(item => isFunctor(item) || typeof item === "object")) {
      return (
        <div style={{ 
          fontSize: "13px",
          fontFamily: "monospace",
          lineHeight: "1.6",
          maxHeight: "600px",
          overflowY: "auto",
          padding: "8px"
        }}>
          {data.map((item, idx) => {
            // Handle T wrapper
            const actualData = item && typeof item === "object" && "T" in item ? item.T : item;
            return (
              <div key={idx} style={{ marginBottom: idx < data.length - 1 ? "12px" : "0" }}>
                {renderFunctor(actualData, 0)}
              </div>
            );
          })}
        </div>
      );
    }
  }

  // Single object or simple data - handle T wrapper
  const actualData = data && typeof data === "object" && "T" in data ? data.T : data;
  
  return (
    <div style={{ 
      fontSize: "13px",
      fontFamily: "monospace",
      lineHeight: "1.6",
      maxHeight: "600px",
      overflowY: "auto",
      padding: "8px"
    }}>
      {renderFunctor(actualData, 0)}
    </div>
  );
}
