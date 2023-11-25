import { type Mock, expect } from 'vitest'
import axios from 'axios'
import { getDegrees } from '@/api/index'

vi.mock('axios')
const axiosGetMock = axios.get as Mock

describe('getDegrees', () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [{ id: 1, degree: 'Bachelors' }],
    })
  })

  it('gets degrees', async () => {
    const degrees = await getDegrees()

    expect(axios.get).toHaveBeenCalledWith('http://myfakeapi.com/degrees')
    expect(degrees).toEqual([{ id: 1, degree: 'Bachelors' }])
  })
})
