const SKILL_ALIASES = {
  "react.js": "React", "reactjs": "React", "react": "React",
  "node.js": "Node.js", "nodejs": "Node.js", "node": "Node.js",
  "express.js": "Express", "expressjs": "Express", "express": "Express",
  "vue.js": "Vue", "vuejs": "Vue", "vue": "Vue",
  "next.js": "Next.js", "nextjs": "Next.js",
  "nuxt.js": "Nuxt.js", "nuxtjs": "Nuxt.js",
  "angular": "Angular", "angularjs": "Angular",
  "svelte": "Svelte",
  "typescript": "TypeScript", "ts": "TypeScript",
  "javascript": "JavaScript", "js": "JavaScript",
  "python": "Python", "py": "Python",
  "golang": "Go", "go": "Go",
  "rust": "Rust", "ruby": "Ruby", "php": "PHP",
  "java": "Java", "kotlin": "Kotlin", "swift": "Swift",
  "c++": "C++", "cpp": "C++", "c#": "C#", "csharp": "C#",
  "mongodb": "MongoDB", "mongo": "MongoDB",
  "postgresql": "PostgreSQL", "postgres": "PostgreSQL",
  "mysql": "MySQL", "sqlite": "SQLite",
  "redis": "Redis", "cassandra": "Cassandra", "neo4j": "Neo4j",
  "graphql": "GraphQL", "rest": "REST", "grpc": "gRPC",
  "docker": "Docker", "kubernetes": "Kubernetes", "k8s": "Kubernetes",
  "aws": "AWS", "amazon web services": "AWS",
  "gcp": "GCP", "google cloud": "GCP",
  "azure": "Azure", "microsoft azure": "Azure",
  "terraform": "Terraform", "ansible": "Ansible",
  "git": "Git", "github": "GitHub", "gitlab": "GitLab",
  "linux": "Linux", "bash": "Bash", "nginx": "Nginx",
  "tensorflow": "TensorFlow", "pytorch": "PyTorch",
  "machine learning": "Machine Learning", "ml": "Machine Learning",
  "deep learning": "Deep Learning", "dl": "Deep Learning",
  "nlp": "NLP", "natural language processing": "NLP",
  "computer vision": "Computer Vision", "cv": "Computer Vision",
  "html": "HTML", "css": "CSS", "sass": "Sass", "scss": "Sass",
  "tailwind": "Tailwind CSS", "tailwindcss": "Tailwind CSS",
  "webpack": "Webpack", "vite": "Vite",
  "firebase": "Firebase", "supabase": "Supabase",
  "fastapi": "FastAPI", "django": "Django", "flask": "Flask",
  "spring": "Spring", "spring boot": "Spring Boot",
  "sql": "SQL", "nosql": "NoSQL",
  "ci/cd": "CI/CD", "github actions": "GitHub Actions",
  "jest": "Jest", "mocha": "Mocha", "cypress": "Cypress",
  "figma": "Figma", "postman": "Postman",
  "websocket": "WebSocket", "socket.io": "Socket.io",
  "prisma": "Prisma", "sequelize": "Sequelize", "mongoose": "Mongoose",
};

// Weighted skill importance (1.0 = normal, 1.5 = high demand)
const SKILL_WEIGHTS = {
  "React": 1.4, "Node.js": 1.4, "TypeScript": 1.3, "Python": 1.4,
  "AWS": 1.5, "Docker": 1.3, "Kubernetes": 1.5, "GraphQL": 1.2,
  "Machine Learning": 1.5, "TensorFlow": 1.4, "PyTorch": 1.4,
  "PostgreSQL": 1.2, "MongoDB": 1.2,
};

export function extractSkillsFromText(text) {
  const lower = text.toLowerCase();
  const found = new Map(); // skill -> weight

  // Sort aliases by length descending — match "spring boot" before "spring"
  const sortedAliases = Object.entries(SKILL_ALIASES).sort(
    (a, b) => b[0].length - a[0].length
  );

  for (const [alias, canonical] of sortedAliases) {
    // Word boundary match using regex
    const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(?<![a-z])${escaped}(?![a-z])`, "i");
    if (regex.test(lower) && !found.has(canonical)) {
      found.set(canonical, SKILL_WEIGHTS[canonical] || 1.0);
    }
  }

  // Return array of { skill, weight } sorted by weight
  return Array.from(found.entries())
    .map(([skill, weight]) => ({ skill, weight }))
    .sort((a, b) => b.weight - a.weight);
}

export function extractSkillNames(text) {
  return extractSkillsFromText(text).map((s) => s.skill);
}