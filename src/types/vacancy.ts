export interface Vacancy {
  id: string
  title: string
  country: string
  countryCode: string
  city: string
  category: string
  salary: {
    min: number
    max: number
    currency: string
    type: 'gross' | 'net' // брутто/нетто
  }
  employmentType: 'full-time' | 'part-time' | 'shift' | 'rotation' // полная/частичная/смены/вахта
  experience: string
  language: string[]
  visa: {
    provided: boolean
    type?: string
    cost?: string
  }
  contract: {
    duration: string
    type: string
  }
  accommodation: {
    provided: boolean
    type?: string
    cost?: string
  }
  food: {
    provided: boolean
    cost?: string
  }
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
  tags: string[]
  images: string[]
  heroImage: string
  isNew: boolean
  isHot: boolean
  isFeatured: boolean
  createdAt: string
  updatedAt: string
  curator?: {
    name: string
    phone: string
    email: string
  }
}

export interface VacancyFilters {
  country?: string[]
  category?: string[]
  salaryMin?: number
  salaryMax?: number
  employmentType?: string[]
  tags?: string[]
  search?: string
}

export type SortOption = 'date' | 'salary-asc' | 'salary-desc' | 'country'

export interface VacancyCategory {
  id: string
  name: string
  icon: string
  count: number
}

export interface Country {
  code: string
  name: string
  flag: string
  count: number
}
