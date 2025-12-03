import React from 'react'
import Link from 'next/link'
import { MapPin, Briefcase, CheckCircle2, Heart } from 'lucide-react'
import { Vacancy } from '@/types/vacancy'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { getCountryFlag, formatSalary } from '@/lib/utils'

interface VacancyCardProps {
  vacancy: Vacancy
}

export const VacancyCard: React.FC<VacancyCardProps> = ({ vacancy }) => {
  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 hover:border-primary-500 hover:shadow-xl transition-all p-6 animate-slide-up">
      {/* Badges */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          {vacancy.isNew && <Badge variant="new">Новое</Badge>}
          {vacancy.isHot && <Badge variant="hot">🔥 Горящая</Badge>}
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
        </button>
      </div>

      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="text-4xl">{getCountryFlag(vacancy.countryCode)}</div>
        <div className="flex-1 min-w-0">
          <Link href={`/vacancy/${vacancy.id}`}>
            <h3 className="font-bold text-lg mb-1 line-clamp-2 hover:text-primary-600 transition-colors">
              {vacancy.title}
            </h3>
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{vacancy.country}, {vacancy.city}</span>
          </div>
        </div>
      </div>

      {/* Salary */}
      <div className="mb-4">
        <div className="text-2xl font-bold text-primary-600">
          {formatSalary(vacancy.salary.min, vacancy.salary.max, vacancy.salary.currency)}
        </div>
        <div className="text-sm text-gray-500">
          {vacancy.salary.type === 'net' ? 'нетто (на руки)' : 'брутто (до вычета налогов)'}
        </div>
      </div>

      {/* Key Benefits */}
      <div className="space-y-2 mb-4">
        {[
          vacancy.visa.provided && `Виза: ${vacancy.visa.cost}`,
          vacancy.accommodation.provided && `Жильё: ${vacancy.accommodation.cost || 'Предоставляется'}`,
          vacancy.employmentType === 'full-time' ? 'Полная занятость' : 'Вахтовый метод',
        ].filter(Boolean).slice(0, 3).map((benefit, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">{benefit}</span>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {vacancy.tags.slice(0, 4).map((tag) => (
          <Badge key={tag} variant="default" className="text-xs">{tag}</Badge>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Link href={`/vacancy/${vacancy.id}`} className="flex-1">
          <Button variant="outline" size="md" className="w-full">
            Подробнее
          </Button>
        </Link>
        <Link href={`/vacancy/${vacancy.id}#apply`} className="flex-1">
          <Button variant="primary" size="md" className="w-full">
            Откликнуться
          </Button>
        </Link>
      </div>
    </div>
  )
}
