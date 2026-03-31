import neo4j from "neo4j-driver";
import dotenv from "dotenv";
dotenv.config();

let driver = null;

export function getDriver() {
  if (!driver) {
    driver = neo4j.driver(
      process.env.NEO4J_URI,
      neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
    );
  }
  return driver;
}

export async function runQuery(cypher, params = {}) {
  const session = getDriver().session();
  try {
    const result = await session.run(cypher, params);
    return result.records;
  } finally {
    await session.close();
  }
}

export async function testConnection() {
  try {
    await runQuery("RETURN 1");
    console.log("✅ Neo4j connected successfully");
  } catch (err) {
    console.error("❌ Neo4j connection failed:", err.message);
  }
}