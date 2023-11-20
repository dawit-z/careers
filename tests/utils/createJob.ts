import type { Job } from '@/api/types'

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
