import { api } from '@/api'
import { getJobs } from '@/api/index'
import { expect } from 'vitest'

vi.mock('@/api')

describe('getJobs', () => {
  it('fetches and extracts jobs from response', async () => {
    const jobs = await getJobs()

    expect(api).toHaveBeenCalledWith('http://myfakeapi.com/jobs')
    expect(jobs).toEqual([{ id: 1, title: 'Vue Developer' }])
  })
})
