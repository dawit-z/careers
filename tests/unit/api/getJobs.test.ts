import { type Mock, expect } from 'vitest'
import axios from 'axios'
import { getJobs } from '@/api/index'

vi.mock('axios')
const axiosGetMock = axios.get as Mock

describe('getJobs', () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [{ id: 1, title: 'Vue Developer' }],
    })
  })

  it('fetches and extracts jobs from response', async () => {
    const jobs = await getJobs()

    expect(axios.get).toHaveBeenCalledWith('http://myfakeapi.com/jobs')
    expect(jobs).toEqual([{ id: 1, title: 'Vue Developer' }])
  })
})
