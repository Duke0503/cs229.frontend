export const API_URL = "https://duke0503-cs229-demo.hf.space";

export async function fetchQuestions() {
  try {
    const response = await fetch(`${API_URL}/questions`);
    return await response.json();
  } catch (error) {
    console.warn("Failed to fetch questions:", error);
    return [];
  }
}

export async function runQuery(question) {
  const response = await fetch(`${API_URL}/run`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `HTTP ${response.status}`);
  }

  return await response.json();
}
