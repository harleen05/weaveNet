import { runQuery } from "../config/neo4j.config.js";

// Seed all skill relationships into Neo4j
export async function seedSkillGraph() {
  const relations = [
    ["React", "JavaScript"], ["React", "TypeScript"], ["React", "Next.js"],
    ["Vue", "JavaScript"], ["Angular", "TypeScript"],
    ["Node.js", "JavaScript"], ["Node.js", "Express"],
    ["Express", "JavaScript"], ["Next.js", "Node.js"],
    ["MongoDB", "Node.js"], ["MongoDB", "Express"],
    ["PostgreSQL", "SQL"], ["MySQL", "SQL"],
    ["GraphQL", "Node.js"], ["GraphQL", "REST"],
    ["Docker", "Kubernetes"], ["Docker", "Linux"],
    ["AWS", "Docker"], ["AWS", "Terraform"],
    ["Python", "FastAPI"], ["Python", "Django"],
    ["Python", "Flask"], ["Python", "Machine Learning"],
    ["TensorFlow", "Machine Learning"], ["PyTorch", "Machine Learning"],
    ["Redis", "Node.js"], ["Firebase", "JavaScript"],
    ["Tailwind CSS", "CSS"],
  ];

  for (const [a, b] of relations) {
    await runQuery(
      `MERGE (a:Skill {name: $a})
       MERGE (b:Skill {name: $b})
       MERGE (a)-[:RELATED_TO]->(b)
       MERGE (b)-[:RELATED_TO]->(a)`,
      { a, b }
    );
  }

  console.log("✅ Skill graph seeded into Neo4j");
}

export async function getRelatedSkills(skill) {
  const records = await runQuery(
    `MATCH (a:Skill {name: $skill})-[:RELATED_TO]->(b:Skill)
     RETURN b.name AS related`,
    { skill }
  );
  return new Set(records.map((r) => r.get("related")));
}