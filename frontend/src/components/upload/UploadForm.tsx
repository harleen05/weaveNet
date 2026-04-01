"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Briefcase, Loader2, Sparkles, ChevronDown, Code2 } from "lucide-react"
import { matchRole } from "@/services/api"

const ROLES = [
  { value: "frontend", label: "Frontend Developer", icon: "🎨" },
  { value: "backend", label: "Backend Developer", icon: "⚙️" },
  { value: "fullstack", label: "Full Stack Developer", icon: "🚀" },
  { value: "devops", label: "DevOps Engineer", icon: "🔧" },
  { value: "machine learning", label: "Machine Learning Engineer", icon: "🤖" },
  { value: "data science", label: "Data Scientist", icon: "📊" },
  { value: "mobile", label: "Mobile Developer", icon: "📱" },
  { value: "security", label: "Security Engineer", icon: "🔒" },
]

export default function UploadForm() {
  const router = useRouter()
  const [github, setGithub] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showRoleDropdown, setShowRoleDropdown] = useState(false)

  const handleSubmit = async () => {
    if (!github.trim() || !selectedRole) {
      setError("Please fill in both fields")
      return
    }

    setLoading(true)
    setError("")

    try {
      const roleSkillsMap: Record<string, string[]> = {
        "frontend": ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Next.js", "Git", "Redux", "Webpack"],
        "backend": ["Node.js", "Python", "Java", "Go", "SQL", "PostgreSQL", "MongoDB", "Express", "Docker", "AWS", "GraphQL"],
        "fullstack": ["React", "Node.js", "TypeScript", "Python", "SQL", "MongoDB", "AWS", "Git", "Docker", "Next.js"],
        "devops": ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux", "Python", "Terraform", "Jenkins", "Ansible", "GCP"],
        "machine learning": ["Python", "TensorFlow", "PyTorch", "Machine Learning", "Deep Learning", "NLP", "Computer Vision", "Pandas", "NumPy", "Scikit-learn"],
        "data science": ["Python", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "SQL", "Machine Learning", "Deep Learning", "Data Visualization"],
        "mobile": ["React Native", "Flutter", "Swift", "Kotlin", "iOS", "Android", "Git"],
        "security": ["Cybersecurity", "Penetration Testing", "OWASP", "Cryptography", "Linux", "Python", "Network Security"],
      }

      const roleSkills = roleSkillsMap[selectedRole] || roleSkillsMap.fullstack
      const roleLabel = ROLES.find(r => r.value === selectedRole)?.label || selectedRole

      const result = await matchRole({
        candidate_text: `GitHub: ${github.trim()}`,
        github_username: github.trim(),
        role_skills: roleSkills
      })

      localStorage.setItem('analysisResults', JSON.stringify(result))
      localStorage.setItem('githubUsername', github.trim())
      localStorage.setItem('targetRole', roleLabel)

      router.push("/dashboard")
    } catch (err: any) {
      console.error('Analysis error:', err)
      setError(err.response?.data?.error || err.message || "Failed to analyze profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-[440px] p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl shadow-[#7375db]/20"
    >
      {/* Animated Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-3 mb-8"
      >
        <motion.div 
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="p-3 bg-gradient-to-br from-[#7375db] to-[#8b8deb] rounded-xl shadow-lg shadow-[#7375db]/30"
        >
          <Sparkles className="w-6 h-6 text-white" />
        </motion.div>
        <div>
          <h2 className="text-xl font-bold text-white">Profile Analysis</h2>
          <p className="text-white/50 text-sm">Get detailed skill insights</p>
        </div>
      </motion.div>

      {/* GitHub Input */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-5 mb-6"
      >
        <div className="relative group">
          <Code2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-[#7375db] transition-colors" />
          <input
            placeholder="GitHub Username"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#7375db] focus:border-transparent transition-all duration-300 hover:bg-black/50"
            disabled={loading}
          />
        </div>

        {/* Role Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            disabled={loading}
            className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-xl text-left focus:outline-none focus:ring-2 focus:ring-[#7375db] focus:border-transparent transition-all duration-300 hover:bg-black/50 flex items-center justify-between"
          >
            <span className={selectedRole ? "text-white" : "text-white/40"}>
              {selectedRole ? ROLES.find(r => r.value === selectedRole)?.label : "Select Target Role"}
            </span>
            <ChevronDown className={`w-5 h-5 text-white/40 transition-transform duration-300 ${showRoleDropdown ? 'rotate-180' : ''}`} />
          </button>
          <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          
          <AnimatePresence>
            {showRoleDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 bg-[#1a1835] border border-white/10 rounded-xl overflow-hidden shadow-xl z-50 max-h-60 overflow-y-auto"
              >
                {ROLES.map((role) => (
                  <button
                    key={role.value}
                    onClick={() => {
                      setSelectedRole(role.value)
                      setShowRoleDropdown(false)
                    }}
                    className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-white/5 transition-colors ${
                      selectedRole === role.value ? 'bg-[#7375db]/20 text-[#7375db]' : 'text-white/70'
                    }`}
                  >
                    <span className="text-xl">{role.icon}</span>
                    <span className="font-medium">{role.label}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-5 p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
          >
            <p className="text-red-300 text-sm text-center">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Button */}
      <motion.button
        onClick={handleSubmit}
        disabled={loading}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: loading ? 1 : 1.02, boxShadow: "0 20px 40px -10px rgba(115, 117, 219, 0.5)" }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className="w-full relative overflow-hidden bg-gradient-to-r from-[#7375db] via-[#8b8deb] to-[#7375db] bg-[length:200%_100%] animate-gradient py-4 rounded-xl font-semibold text-white shadow-lg shadow-[#7375db]/30 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Analyzing Profile...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            Analyze Profile
          </span>
        )}
      </motion.button>

      {/* Info Text */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-5 text-center text-white/40 text-sm"
      >
        We&apos;ll analyze your GitHub repos and compare with role requirements
      </motion.p>
    </motion.div>
  )
}