import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import matchRoutes from "./api/match.routes.js";
import { testConnection, runQuery } from "./config/neo4j.config.js";
import { seedSkillGraph } from "./services/skillGraph.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", matchRoutes);

async function start() {
  try {
    await testConnection();

    // Only seed if graph is empty
    const records = await runQuery("MATCH (s:Skill) RETURN count(s) AS count");
    const count = records[0].get("count").toNumber();
    if (count === 0) {
      await seedSkillGraph();
    } else {
      console.log(`✅ Skill graph already has ${count} skills in Neo4j`);
    }
  } catch (err) {
    console.warn("⚠️  Neo4j not available - some features may be limited");
    console.warn("To enable full features, install and start Neo4j locally");
  }

  app.listen(PORT, () => {
    console.log(`WeaveNet server running on http://localhost:${PORT}`);
  });
}

start();