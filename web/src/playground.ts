import type { InferType } from 'yup'
import { date, number, object, string } from 'yup'

const userSchema = object({
  name: string().required(),
  age: number().required().positive().integer(),
  email: string().email(),
  website: string().url().nullable(),
  createdOn: date().default(() => new Date()),
})

// parse and assert validity
type User = InferType<typeof userSchema>
