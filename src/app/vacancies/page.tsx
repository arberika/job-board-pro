'use client'

import React, { useState } from 'react'
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { BottomSheet } from '@/components/ui/BottomSheet'
import { VacancyCard } from '@/components/vacancies/VacancyCard'
import { VacancyCardSkeletonGrid } from '@/components/ui/VacancyCardSkeleton'
import { vacancies, categories, countries } from '@/data/vacancies'

export default function VacanciesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [salaryRange, setSalaryRange] = useState<number[]>([1000, 8000])
  const [showFilters, setShowFilters] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [loading, setLoading] = useState(false)

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
    // Фильтр по зарплате (конвертируем всё в EUR примерно)
    const salaryInEUR = vacancy.salary.currency === 'EUR'
      ? vacancy.salary.min
      : vacancy.salary.currency === 'USD'
        ? vacancy.salary.min * 0.92
        : vacancy.salary.min / 4.3 // PLN to EUR

    if (salaryInEUR < salaryRange[0] || salaryInEUR > salaryRange[1]) {
      return false
    }
    return true
  })

  const resetFilters = () => {
    setSelectedCountries([])
    setSelectedCategories([])
    setSalaryRange([1000, 8000])
    setSearchQuery('')
  }

  const FilterContent = () => (
    <>
      {/* Country Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Страна</h3>
        <div className="space-y-2">
          {countries.map((country) => (
            <label key={country.code} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="checkbox"
                className="w-4 h-4 mr-3 accent-primary-600"
                checked={selectedCountries.includes(country.code)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCountries([...selectedCountries, country.code])
                  } else {
                    setSelectedCountries(selectedCountries.filter(c => c !== country.code))
                  }
                }}
              />
              <span className="text-2xl mr-2">{country.flag}</span>
              <span className="text-sm">{country.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Категория</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="checkbox"
                className="w-4 h-4 mr-3 accent-primary-600"
                checked={selectedCategories.includes(category.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCategories([...selectedCategories, category.id])
                  } else {
                    setSelectedCategories(selectedCategories.filter(c => c !== category.id))
                  }
                }}
              />
              <span className="text-xl mr-2">{category.icon}</span>
              <span className="text-sm">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Salary Range */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Зарплата (EUR)</h3>
        <div className="px-2">
          <Slider
            range
            min={1000}
            max={8000}
            step={100}
            value={salaryRange}
            onChange={(value) => setSalaryRange(value as number[])}
            trackStyle={[{ backgroundColor: '#0ea5e9' }]}
            handleStyle={[
              { borderColor: '#0ea5e9', backgroundColor: '#fff' },
              { borderColor: '#0ea5e9', backgroundColor: '#fff' }
            ]}
            railStyle={{ backgroundColor: '#e5e7eb' }}
          />
          <div className="flex justify-between mt-4 text-sm text-gray-600">
            <span className="font-semibold">{salaryRange[0]} EUR</span>
            <span className="font-semibold">{salaryRange[1]} EUR</span>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <Button
        variant="outline"
        size="md"
        className="w-full"
        onClick={resetFilters}
      >
        Сбросить фильтры
      </Button>
    </>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Все вакансии
          </h1>
          <p className="text-xl text-primary-100">
            Найдено <span className="font-bold">{filteredVacancies.length}</span> вакансий
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
              className="hidden md:flex"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Фильтры
              <ChevronDown className={`w-5 h-5 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => setShowMobileFilters(true)}
              className="md:hidden"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Фильтры
              {(selectedCountries.length > 0 || selectedCategories.length > 0) && (
                <span className="ml-2 bg-primary-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {selectedCountries.length + selectedCategories.length}
                </span>
              )}
            </Button>
          </div>

          {/* Desktop Filters */}
          {showFilters && (
            <div className="hidden md:block border-t pt-6 animate-slide-down">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <FilterContent />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Bottom Sheet Filters */}
        <BottomSheet
          isOpen={showMobileFilters}
          onClose={() => setShowMobileFilters(false)}
          title="Фильтры"
        >
          <FilterContent />
          <div className="mt-6">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => setShowMobileFilters(false)}
            >
              Показать {filteredVacancies.length} вакансий
            </Button>
          </div>
        </BottomSheet>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <VacancyCardSkeletonGrid count={6} />
          ) : (
            filteredVacancies.map((vacancy) => (
              <VacancyCard key={vacancy.id} vacancy={vacancy} />
            ))
          )}
        </div>

        {filteredVacancies.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold mb-2">Вакансии не найдены</h2>
            <p className="text-gray-600 mb-6">
              Попробуйте изменить параметры поиска
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={resetFilters}
            >
              Сбросить все фильтры
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
