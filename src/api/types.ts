export interface Job {
  id: number
  title: string
  organization: string
  degree: string
  jobType: string
  locations: Array<string>
  minimumQualifications: Array<string>
  preferredQualifications: Array<string>
  description: Array<string>
  dateAdded: string
}

export interface Degree {
  id: number
  degree: string
}

export interface Spotlight {
  id: number
  img: string
  title: string
  description: string
}
