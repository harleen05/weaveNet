import express from "express";
import {
  healthCheck,
  extractSkills,
  matchRole,
} from "../controllers/match.controller.js";

const router = express.Router();

router.get("/health", healthCheck);
router.post("/extract-skills", extractSkills);
router.post("/match-role", matchRole);

export default router;