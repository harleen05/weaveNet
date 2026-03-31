# 🧠 WeaveIQ

> **An AI-powered talent intelligence engine that goes beyond resumes to uncover hidden potential using skill relationships and explainable matching.**

---

## 🚩 Problem

Organizations often overlook capable internal talent because:

* Hiring relies heavily on **resume keywords**
* Employees’ **real skills remain hidden**
* Near-fit candidates are **rejected instead of upskilled**
* Systems lack **transparency in decision-making**

---

## 💡 Solution

**WeaveIQ** introduces a **skill-driven intelligence layer** that:

* Extracts capabilities from raw data (resume / GitHub)
* Builds relationships between skills using a **graph-based model**
* Identifies **adjacent (transferable) skills**
* Matches candidates to roles intelligently
* Provides **explainable recommendations**

---

## ⚙️ How It Works

```text
Input (Resume / GitHub)
        ↓
Skill Extraction
        ↓
Skill Graph (Relationships)
        ↓
Adjacency Detection
        ↓
Matching + Scoring
        ↓
Explainable Output
```

---

## 🔥 Key Features

* 🧠 **Skill Extraction Engine**
  Extracts capabilities from unstructured text

* 🔗 **Skill Graph Intelligence**
  Models relationships between skills

* 🔥 **Adjacency Engine (Core USP)**
  Detects near-fit candidates via related skills

* 📊 **Scoring System**
  Combines direct and adjacent matches

* 🧾 **Explainability Layer**
  Transparent reasoning behind every decision

* 🌐 **API Layer**
  Enables seamless frontend integration

---

## 🧰 Tech Stack

* **Backend:** Node.js, Express
* **AI/ML (Optional):** Hugging Face Embeddings
* **Graph Logic:** In-memory skill graph (Neo4j-ready)
* **APIs:** RESTful endpoints

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/harleen05/weaveNet.git
cd weaveNet/server
```

### 2. Setup environment variables

```bash
cp .env.example .env
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run the server

```bash
npm run dev
```

---

## 📥 Example Input

```json
{
  "candidate_text": "Experience in React, JavaScript and Express",
  "role_skills": ["Node.js", "MongoDB", "React"]
}
```

---

## 📤 Example Output

```json
{
  "score": 75,
  "matched": ["React"],
  "adjacent": ["Node.js"],
  "missing": ["MongoDB"],
  "explanation": "Strong frontend skills with some backend exposure. Missing database experience."
}

---

## 🌟 Why This Project Stands Out

Unlike traditional systems, WeaveIQ:

* Goes beyond keyword matching
* Recognizes **trainable talent**
* Maintains **transparency**
* Uses **intelligent relationships between skills**

---
