import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const healthCheck = async () => {
  const response = await api.get('/health')
  return response.data
}

export const extractSkills = async (text: string) => {
  const response = await api.post('/extract-skills', { text })
  return response.data
}

export const matchRole = async (data: {
  candidate_text?: string
  github_username?: string
  role_skills: string[]
}) => {
  const response = await api.post('/match-role', data)
  return response.data
}

export default api