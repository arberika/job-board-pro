import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatSalary(min: number, max: number, currency: string): string {
  const formatNumber = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return `${formatNumber(min)} - ${formatNumber(max)} ${currency}`
}

export function getCountryFlag(countryCode: string): string {
  const flags: Record<string, string> = {
    PL: '🇵🇱',
    DE: '🇩🇪',
    CZ: '🇨🇿',
    AE: '🇦🇪',
    QA: '🇶🇦',
    NL: '🇳🇱',
    BE: '🇧🇪',
  }
  return flags[countryCode] || '🌍'
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Сегодня'
  if (diffDays === 1) return 'Вчера'
  if (diffDays < 7) return `${diffDays} дней назад`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} недель назад`

  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
