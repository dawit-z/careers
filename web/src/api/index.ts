import type { AxiosError } from 'axios'
import axios from 'axios'
import type { Degree, Job, Spotlight } from './types'

const baseUrl = import.meta.env.VITE_APP_API_URL

async function getDegrees(): Promise<Degree[]> {
  try {
    const response = await axios.get(`${baseUrl}/degrees`)
    return response.data
  }
  catch (error) {
    if (axios.isAxiosError(error))
      handleAxiosError(error)
    else
      console.error('An error occured retre degrees: ', error)

    return []
  }
}

async function getJobs(): Promise<Job[]> {
  try {
    const response = await axios.get(`${baseUrl}/jobs`)
    return response.data
  }
  catch (error) {
    if (axios.isAxiosError(error))
      handleAxiosError(error)
    else
      console.error('An error occured retreiving jobs: ', error)

    return []
  }
}

async function getSpotlights(): Promise<Spotlight[]> {
  try {
    const response = await axios.get(`${baseUrl}/spotlights`)
    return response.data
  }
  catch (error) {
    if (axios.isAxiosError(error))
      handleAxiosError(error)
    else
      console.error('An error occured retreiving spotlights: ', error)

    return []
  }
}

function handleAxiosError(error: AxiosError) {
  if (error.response) {
    // The request was made and the server responded with a bad status code
    console.error('Status: ', error.response.status)
    console.error('Error response: ', error.response.data)
  }
  else if (error.request) {
    // The request was made but no response was received
    console.error('No response received: ', error.request)
  }
  else {
    // Something happened in setting up the request that triggered an error
    console.error('Error: ', error.message)
  }
}

export { getDegrees, getJobs, getSpotlights }
