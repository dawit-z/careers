import type { Degree } from '@/api/types'

function createDegree(degree: Partial<Degree> = {}): Degree {
  return {
    id: 1,
    degree: 'Master\'s',
    ...degree,
  }
}

export { createDegree }
