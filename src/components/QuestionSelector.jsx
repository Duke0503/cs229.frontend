import { useState } from "react";
import { Select, Button, Tag, Space } from "antd";
import { RocketOutlined, CheckCircleOutlined, UserOutlined, QuestionCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import "./QuestionSelector.css";

export default function QuestionSelector({
  questionGroups,
  selected,
  setSelected,
  onRun,
  loading,
  questionToRun,
}) {
  const [activeGroup, setActiveGroup] = useState(0);

  const groupConfigs = {
    0: { 
      icon: <CheckCircleOutlined />, 
      color: '#8b5cf6',
      label: 'Yes/No',
      bgColor: '#f5f3ff'
    },
    1: { 
      icon: <UserOutlined />, 
      color: '#3b82f6',
      label: 'Who',
      bgColor: '#eff6ff'
    },
    2: { 
      icon: <QuestionCircleOutlined />, 
      color: '#ec4899',
      label: 'What',
      bgColor: '#fdf2f8'
    }
  };

  const handleGroupChange = (index) => {
    setActiveGroup(index);
    if (questionGroups[index]?.questions?.[0]) {
      setSelected(questionGroups[index].questions[0]);
    }
  };

  const selectOptions = questionGroups[activeGroup]?.questions.map((question) => ({
    value: question,
    label: question,
  })) || [];

  return (
    <div
      style={{
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(249, 250, 251, 0.95) 100%)",
        backdropFilter: "blur(20px)",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid rgba(229, 231, 235, 0.8)",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div className="question-selector-container">
        {/* Compact Category Pills */}
        <div style={{ 
          display: "flex",
          gap: "8px",
          marginBottom: "16px",
          justifyContent: "center",
        }}>
          {questionGroups.map((group, index) => {
            const config = groupConfigs[index];
            const isActive = activeGroup === index;
            
            return (
              <button
                key={index}
                onClick={() => handleGroupChange(index)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "20px",
                  border: isActive 
                    ? `2px solid ${config.color}`
                    : "2px solid transparent",
                  background: isActive 
                    ? config.bgColor
                    : "#f9fafb",
                  color: isActive ? config.color : "#6b7280",
                  fontSize: "13px",
                  fontWeight: isActive ? 700 : 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: isActive 
                    ? `0 2px 4px ${config.color}30`
                    : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = config.bgColor;
                    e.currentTarget.style.borderColor = config.color;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "#f9fafb";
                    e.currentTarget.style.borderColor = "transparent";
                  }
                }}
              >
                <span style={{ fontSize: "14px" }}>{config.icon}</span>
                <span>{config.label}</span>
                <Tag 
                  color={isActive ? config.color : "default"}
                  style={{
                    margin: 0,
                    fontSize: "10px",
                    fontWeight: 600,
                    borderRadius: "8px",
                    padding: "0 6px",
                    height: "18px",
                    lineHeight: "18px",
                  }}
                >
                  {group.questions.length}
                </Tag>
              </button>
            );
          })}
        </div>

        {/* Select + Button Row */}
        <Space.Compact style={{ width: "100%", display: "flex" }}>
          <Select
            value={selected}
            onChange={setSelected}
            options={selectOptions}
            size="large"
            style={{
              flex: 1,
            }}
            placeholder="Select a question..."
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            popupMatchSelectWidth={false}
            dropdownStyle={{
              minWidth: "400px",
              maxWidth: "600px",
            }}
          />

          <Button
            type="primary"
            size="large"
            icon={loading ? <LoadingOutlined spin /> : <RocketOutlined />}
            onClick={onRun}
            disabled={loading || !questionToRun}
            loading={loading}
            style={{
              minWidth: "120px",
              height: "48px",
              fontWeight: 700,
              fontSize: "14px",
              background: loading || !questionToRun
                ? undefined
                : "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
              border: "none",
              boxShadow: loading || !questionToRun
                ? undefined
                : "0 4px 6px -1px rgba(139, 92, 246, 0.3)",
            }}
          >
            <span className="button-text">
              {loading ? "Processing..." : "Go"}
            </span>
            <span className="button-text-short">
              {loading ? "..." : "Go"}
            </span>
          </Button>
        </Space.Compact>

        {/* Compact Selected Preview */}
        {selected && (
          <div style={{
            marginTop: "12px",
            padding: "10px 12px",
            background: groupConfigs[activeGroup].bgColor,
            borderLeft: `3px solid ${groupConfigs[activeGroup].color}`,
            borderRadius: "6px",
            fontSize: "12px",
            color: "#4b5563",
            lineHeight: "1.5",
          }}>
            <span style={{ fontWeight: 600, color: "#9ca3af", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Selected:
            </span>
            <div style={{ marginTop: "2px", fontWeight: 500, color: "#1f2937" }}>
              {selected}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
