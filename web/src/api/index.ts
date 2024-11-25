import type { Degree, Job, Spotlight } from './types'
import axios from 'axios'

// const baseUrl = import.meta.env.VITE_APP_API_URL

export const api = axios.create({ baseURL: '/api' })

async function getDegrees(): Promise<Degree[]> {
  const { data } = await api.get<Array<Degree>>('degrees')
  return data
}

async function getJobs(): Promise<Job[]> {
  const { data } = await api.get<Array<Job>>('jobs')
  return data
}

async function getSpotlights(): Promise<Spotlight[]> {
  const { data } = await api.get<Array<Spotlight>>('spotlights')
  return data
}

export { getDegrees, getJobs, getSpotlights }
