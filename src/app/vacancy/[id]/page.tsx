'use client'

import React, { useState, useEffect } from 'react'
import { use } from 'react'
import Link from 'next/link'
import { ArrowLeft, MapPin, Briefcase, DollarSign, Home, FileText, CheckCircle2, Clock, Heart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { vacancies } from '@/data/vacancies'
import { getCountryFlag, formatSalary, formatDate } from '@/lib/utils'

export default function VacancyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const vacancy = vacancies.find(v => v.id === id)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showStickyCTA, setShowStickyCTA] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    messenger: 'whatsapp',
  })

  // Sticky CTA on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Check if vacancy is in favorites
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
      setIsFavorite(favorites.includes(vacancy?.id))
    }
  }, [vacancy?.id])

  // Toggle favorite
  const toggleFavorite = () => {
    if (typeof window !== 'undefined' && vacancy) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
      if (isFavorite) {
        const updated = favorites.filter((favId: string) => favId !== vacancy.id)
        localStorage.setItem('favorites', JSON.stringify(updated))
        setIsFavorite(false)
      } else {
        favorites.push(vacancy.id)
        localStorage.setItem('favorites', JSON.stringify(favorites))
        setIsFavorite(true)
      }
    }
  }

  if (!vacancy) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Вакансия не найдена</h1>
        <Link href="/vacancies">
          <Button variant="primary" size="lg">
            Вернуться к вакансиям
          </Button>
        </Link>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Здесь будет интеграция с amoCRM
    alert('Ваш отклик отправлен! Мы свяжемся с вами в течение 24 часов.')
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-primary-600">Главная</Link>
            <span className="text-gray-400">/</span>
            <Link href="/vacancies" className="text-gray-600 hover:text-primary-600">Вакансии</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{vacancy.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div
                className="h-64 bg-cover bg-center"
                style={{ backgroundImage: `url(${vacancy.heroImage})` }}
              />
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex gap-2 mb-4">
                      {vacancy.isNew && <Badge variant="new">Новое</Badge>}
                      {vacancy.isHot && <Badge variant="hot">🔥 Горящая</Badge>}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{vacancy.title}</h1>
                    <div className="flex flex-wrap gap-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getCountryFlag(vacancy.countryCode)}</span>
                        <span>{vacancy.country}, {vacancy.city}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={20} />
                        <span>{formatDate(vacancy.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={toggleFavorite}
                    className="p-3 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
                  >
                    <Heart
                      className={`w-7 h-7 transition-all ${
                        isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'
                      }`}
                    />
                  </button>
                </div>

                {/* Key Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-gray-50 rounded-xl">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Зарплата</div>
                    <div className="text-xl font-bold text-primary-600">
                      {formatSalary(vacancy.salary.min, vacancy.salary.max, vacancy.salary.currency)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {vacancy.salary.type === 'net' ? 'нетто' : 'брутто'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Тип занятости</div>
                    <div className="text-lg font-semibold">
                      {vacancy.employmentType === 'full-time' ? 'Полная' : 'Вахта'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Опыт работы</div>
                    <div className="text-lg font-semibold">{vacancy.experience}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Описание</h2>
              <p className="text-gray-700 whitespace-pre-line">{vacancy.description}</p>
            </div>

            {/* Responsibilities */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Обязанности</h2>
              <ul className="space-y-3">
                {vacancy.responsibilities.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Требования</h2>
              <ul className="space-y-3">
                {vacancy.requirements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Условия и преимущества</h2>
              <ul className="space-y-3">
                {vacancy.benefits.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Info */}
            <div className="bg-white rounded-xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <FileText size={20} className="text-primary-600" />
                  Виза
                </h3>
                <p className="text-gray-700">{vacancy.visa.provided ? vacancy.visa.type : 'Не требуется'}</p>
                {vacancy.visa.cost && <p className="text-sm text-gray-600">{vacancy.visa.cost}</p>}
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Home size={20} className="text-primary-600" />
                  Жильё
                </h3>
                <p className="text-gray-700">
                  {vacancy.accommodation.provided
                    ? vacancy.accommodation.type || 'Предоставляется'
                    : 'Не предоставляется'}
                </p>
                {vacancy.accommodation.cost && (
                  <p className="text-sm text-gray-600">{vacancy.accommodation.cost}</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Apply Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-2xl font-bold text-primary-600 mb-2">
                  {formatSalary(vacancy.salary.min, vacancy.salary.max, vacancy.salary.currency)}
                </div>
                <p className="text-gray-600 mb-6">
                  {vacancy.salary.type === 'net' ? 'нетто (на руки)' : 'брутто (до налогов)'}
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full mb-4"
                  onClick={() => setIsModalOpen(true)}
                >
                  Откликнуться
                </Button>
                <p className="text-sm text-center text-gray-600">
                  Свяжемся в течение <strong>24 часов</strong>
                </p>
              </div>

              {/* Curator */}
              {vacancy.curator && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="font-bold mb-4">Куратор вакансии</h3>
                  <div className="space-y-3">
                    <p className="font-semibold">{vacancy.curator.name}</p>
                    <p className="text-sm text-gray-600">{vacancy.curator.phone}</p>
                    <p className="text-sm text-gray-600">{vacancy.curator.email}</p>
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold mb-4">Теги</h3>
                <div className="flex flex-wrap gap-2">
                  {vacancy.tags.map((tag) => (
                    <Badge key={tag} variant="default">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Откликнуться на вакансию"
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">{vacancy.title}</h3>
            <p className="text-sm text-gray-600">
              {vacancy.country}, {vacancy.city}
            </p>
          </div>

          <Input
            label="Ваше имя *"
            placeholder="Иван Иванов"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            label="Телефон *"
            type="tel"
            placeholder="+7 (999) 123-45-67"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />

          <Input
            label="Email"
            type="email"
            placeholder="ivan@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Предпочитаемый мессенджер *
            </label>
            <div className="flex gap-3">
              {['whatsapp', 'telegram', 'viber'].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setFormData({ ...formData, messenger: m })}
                  className={`flex-1 px-4 py-2 rounded-lg border-2 capitalize transition-all ${
                    formData.messenger === m
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-gray-600">
            <input type="checkbox" required className="mr-2" />
            Я согласен с{' '}
            <Link href="/privacy" className="text-primary-600 hover:underline">
              политикой конфиденциальности
            </Link>
            {' '}и обработкой персональных данных
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full">
            Отправить отклик
          </Button>

          <p className="text-sm text-center text-gray-600">
            Наш менеджер свяжется с вами в течение 24 часов
          </p>
        </form>
      </Modal>

      {/* Sticky CTA for Mobile */}
      {showStickyCTA && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 md:hidden z-40 animate-slide-up">
          <div className="flex gap-3">
            <button
              onClick={toggleFavorite}
              className="p-3 rounded-lg border-2 border-gray-200 hover:border-red-500 transition-colors"
              aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
            >
              <Heart
                className={`w-6 h-6 transition-all ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                }`}
              />
            </button>
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              onClick={() => setIsModalOpen(true)}
            >
              Откликнуться на вакансию
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
