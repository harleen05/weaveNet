# 🧠 WeaveIQ

Deployed Link: https://weave-net-two.vercel.app/

> **An AI-powered talent intelligence engine that goes beyond resumes to uncover hidden potential using skill relationships and explainable matching.**

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
* **AI/ML :** Hugging Face Embeddings
* **Graph Logic:** Neo4j-ready
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


---
