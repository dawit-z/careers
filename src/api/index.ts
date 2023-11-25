import axios from 'axios'
import type { Degree, Job, Spotlight } from './types'

const baseUrl = import.meta.env.VITE_APP_API_URL

async function fetchData<T>(endpoint: string): Promise<T> {
  const url = `${baseUrl}/${endpoint}`
  try {
    const response = await axios.get<T>(url)
    return response.data
  }
  catch (error) {
    console.error(`Failed to fetch data from ${url}`, error)
    throw error
  }
}

export function getDegrees() {
  return fetchData<Degree[]>('degrees')
}

export function getJobs() {
  return fetchData<Job[]>('jobs')
}

export function getSpotlights() {
  return fetchData<Spotlight[]>('spotlights')
}
