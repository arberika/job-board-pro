'use client'

import React, { useState } from 'react'
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { VacancyCard } from '@/components/vacancies/VacancyCard'
import { vacancies, categories, countries } from '@/data/vacancies'

export default function VacanciesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const filteredVacancies = vacancies.filter(vacancy => {
    if (searchQuery && !vacancy.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    if (selectedCountries.length > 0 && !selectedCountries.includes(vacancy.countryCode)) {
      return false
    }
    if (selectedCategories.length > 0 && !selectedCategories.includes(vacancy.category)) {
      return false
    }
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Все вакансии
          </h1>
          <p className="text-xl text-primary-100">
            Найдено {filteredVacancies.length} вакансий
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Поиск по названию вакансии..."
                icon={<Search size={20} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="md"
              onClick={() => setShowFilters(!showFilters)}
              className="md:w-auto"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Фильтры
              <ChevronDown className={`w-5 h-5 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="border-t pt-6 space-y-6">
              {/* Country Filter */}
              <div>
                <h3 className="font-semibold mb-3">Страна</h3>
                <div className="flex flex-wrap gap-2">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => {
                        setSelectedCountries(prev =>
                          prev.includes(country.code)
                            ? prev.filter(c => c !== country.code)
                            : [...prev, country.code]
                        )
                      }}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        selectedCountries.includes(country.code)
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {country.flag} {country.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="font-semibold mb-3">Категория</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategories(prev =>
                          prev.includes(category.id)
                            ? prev.filter(c => c !== category.id)
                            : [...prev, category.id]
                        )
                      }}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        selectedCategories.includes(category.id)
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {category.icon} {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset */}
              {(selectedCountries.length > 0 || selectedCategories.length > 0) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCountries([])
                    setSelectedCategories([])
                  }}
                >
                  Сбросить фильтры
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVacancies.map((vacancy) => (
            <VacancyCard key={vacancy.id} vacancy={vacancy} />
          ))}
        </div>

        {filteredVacancies.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold mb-2">Вакансии не найдены</h2>
            <p className="text-gray-600 mb-6">
              Попробуйте изменить параметры поиска
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                setSearchQuery('')
                setSelectedCountries([])
                setSelectedCategories([])
              }}
            >
              Сбросить все фильтры
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
