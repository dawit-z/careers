import axios from 'axios'
import type { Degree, Job } from './types'

export async function getDegrees() {
  const baseUrl = import.meta.env.VITE_APP_API_URL
  const url = `${baseUrl}/degrees`
  const response = await axios.get<Degree[]>(url)
  return response.data
}

export async function getJobs() {
  const baseUrl = import.meta.env.VITE_APP_API_URL
  const url = `${baseUrl}/jobs`
  const response = await axios.get<Job[]>(url)
  return response.data
}
