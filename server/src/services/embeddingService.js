function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  if (magA === 0 || magB === 0) return 0;
  return dot / (magA * magB);
}

async function getEmbedding(text, retries = 3) {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(
      "https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2/pipeline/feature-extraction",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: text }),
      }
    );

    const data = await res.json();

    // Model is loading — wait and retry
    if (data.error && data.error.includes("loading")) {
      console.log(`Model loading, retrying in ${data.estimated_time || 10}s...`);
      await new Promise((r) => setTimeout(r, (data.estimated_time || 10) * 1000));
      continue;
    }

    if (!res.ok) {
      console.error("HuggingFace error:", data);
      throw new Error(data.error || "HuggingFace API error");
    }

    return Array.isArray(data[0]) ? data[0] : data;
  }
  throw new Error("HuggingFace model failed after retries");
}

export async function getSemanticSimilarity(candidateSkills, roleSkills) {
  if (process.env.USE_EMBEDDINGS !== "true") return null;

  try {
    const candidateText = candidateSkills.join(", ");
    const roleText = roleSkills.join(", ");

    const [embA, embB] = await Promise.all([
      getEmbedding(candidateText),
      getEmbedding(roleText),
    ]);

    const similarity = cosineSimilarity(embA, embB);
    return Math.round(similarity * 100);
  } catch (err) {
    console.error("Embedding error:", err.message);
    return null;
  }
}