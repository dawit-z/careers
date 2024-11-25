import type { Degree, Job, Spotlight } from '@/api/types'

export function createJob(job: Partial<Job> = {}): Job {
  return {
    id: 1,
    title: 'Angular Developer',
    organization: 'Vue and Me',
    degree: 'Master\'s',
    jobType: 'Intern',
    locations: ['Lisbon'],
    minimumQualifications: ['Mesh'],
    preferredQualifications: ['Mesh'],
    description: ['Awww'],
    dateAdded: '2021-07-04',
    ...job,
  }
}

export function createDegree(degree: Partial<Degree> = {}): Degree {
  return {
    id: 1,
    degree: 'Master\'s',
    ...degree,
  }
}

export function createSpotlight(spotlight: Partial<Spotlight> = {}) {
  return {
    id: 1,
    img: 'https://example.com',
    title: 'Vue and Me',
    description: 'Awww',
    ...spotlight,
  }
}
