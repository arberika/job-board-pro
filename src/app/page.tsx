'use client'

import React from 'react'
import Link from 'next/link'
import { Search, ArrowRight, CheckCircle2, Users, Briefcase, Globe, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { vacancies, categories, countries } from '@/data/vacancies'

export default function HomePage() {
  const featuredVacancies = vacancies.filter(v => v.isFeatured).slice(0, 6)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="new" className="mb-6 text-lg px-4 py-2">
              🔥 5000+ актуальных вакансий
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Найдите работу мечты<br />
              <span className="text-primary-200">за рубежом за 2 минуты</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Официальное трудоустройство в Европе и ОАЭ.<br />
              Помощь с визой, жильём и документами.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-3xl mx-auto">
              {[
                { label: 'Вакансий', value: '5000+', icon: Briefcase },
                { label: 'Трудоустроено', value: '10000+', icon: Users },
                { label: 'Стран', value: '15', icon: Globe },
                { label: 'Лет опыта', value: '6+', icon: Star },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary-200" />
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-primary-200">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Должность или ключевое слово..."
                    icon={<Search size={20} />}
                    className="h-14"
                  />
                </div>
                <Link href="/vacancies">
                  <Button variant="primary" size="lg" className="w-full md:w-auto">
                    Найти вакансию
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>

              {/* Quick Search Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-sm text-gray-600">Популярные:</span>
                {['Водитель CE', 'Склад', 'Строитель', 'Сварщик', 'IT'].map((tag) => (
                  <Link key={tag} href={`/vacancies?search=${tag}`}>
                    <button className="px-3 py-1 bg-gray-100 hover:bg-primary-50 text-gray-700 hover:text-primary-700 rounded-full text-sm transition-colors">
                      {tag}
                    </button>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/vacancies">
                <Button variant="primary" size="lg" className="w-full sm:w-auto bg-white text-primary-600 hover:bg-gray-50">
                  Все вакансии
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                  Как это работает
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Как это работает</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Простой и прозрачный процесс трудоустройства в 4 шага
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: '01',
                title: 'Выберите вакансию',
                description: 'Найдите подходящую работу в каталоге из 5000+ вакансий',
                icon: Search,
              },
              {
                step: '02',
                title: 'Откликнитесь',
                description: 'Заполните простую форму — наш менеджер свяжется в течение 24 часов',
                icon: CheckCircle2,
              },
              {
                step: '03',
                title: 'Оформление документов',
                description: 'Помогаем с визой, контрактом и всеми необходимыми документами',
                icon: Briefcase,
              },
              {
                step: '04',
                title: 'Начните работать',
                description: 'Встречаем на месте, помогаем с жильём и адаптацией',
                icon: Star,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all animate-slide-up"
              >
                <div className="text-5xl font-bold text-primary-100 mb-4">{item.step}</div>
                <item.icon className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vacancies */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Горящие вакансии</h2>
              <p className="text-xl text-gray-600">
                Самые актуальные предложения с высокой зарплатой
              </p>
            </div>
            <Link href="/vacancies">
              <Button variant="outline" size="lg" className="hidden md:flex">
                Все вакансии
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVacancies.map((vacancy) => (
              <Link key={vacancy.id} href={`/vacancy/${vacancy.id}`}>
                <div className="bg-white rounded-xl border-2 border-gray-200 hover:border-primary-500 hover:shadow-xl transition-all p-6 h-full">
                  {(vacancy.isNew || vacancy.isHot) && (
                    <div className="flex gap-2 mb-4">
                      {vacancy.isNew && <Badge variant="new">Новое</Badge>}
                      {vacancy.isHot && <Badge variant="hot">Горящая</Badge>}
                    </div>
                  )}

                  <div className="flex items-start gap-3 mb-4">
                    <div className="text-3xl">{countries.find(c => c.code === vacancy.countryCode)?.flag}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1 line-clamp-2">{vacancy.title}</h3>
                      <p className="text-gray-600 text-sm">
                        {vacancy.country}, {vacancy.city}
                      </p>
                    </div>
                  </div>

                  <div className="text-2xl font-bold text-primary-600 mb-4">
                    {vacancy.salary.min.toLocaleString()} - {vacancy.salary.max.toLocaleString()} {vacancy.salary.currency}
                    <span className="text-sm text-gray-500 font-normal ml-2">
                      {vacancy.salary.type === 'net' ? 'нетто' : 'брутто'}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {vacancy.benefits.slice(0, 3).map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700 line-clamp-1">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {vacancy.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="default">{tag}</Badge>
                    ))}
                  </div>

                  <Button variant="primary" size="md" className="w-full">
                    Подробнее
                  </Button>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12 md:hidden">
            <Link href="/vacancies">
              <Button variant="primary" size="lg" className="w-full">
                Смотреть все вакансии
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Популярные категории</h2>
            <p className="text-xl text-gray-600">
              Выберите сферу деятельности
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {categories.map((category) => (
              <Link key={category.id} href={`/vacancies?category=${category.id}`}>
                <div className="bg-white rounded-xl p-6 text-center hover:shadow-xl hover:scale-105 transition-all">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.count} вакансий</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Countries */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Страны</h2>
            <p className="text-xl text-gray-600">
              Работа в лучших странах Европы и ОАЭ
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {countries.map((country) => (
              <Link key={country.code} href={`/vacancies?country=${country.code}`}>
                <div className="bg-white rounded-xl border-2 border-gray-200 hover:border-primary-500 p-6 text-center hover:shadow-xl transition-all">
                  <div className="text-5xl mb-3">{country.flag}</div>
                  <h3 className="font-semibold mb-2">{country.name}</h3>
                  <p className="text-sm text-primary-600 font-medium">{country.count} вакансий</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Почему выбирают нас
            </h2>
            <p className="text-xl text-primary-100 mb-12">
              Более 10,000 человек нашли работу мечты с нашей помощью
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Легально и безопасно',
                  description: 'Все вакансии проверены. Официальные контракты и лицензии.',
                  icon: CheckCircle2,
                },
                {
                  title: 'Полное сопровождение',
                  description: 'Помогаем с визой, документами, жильём и адаптацией.',
                  icon: Users,
                },
                {
                  title: 'Без скрытых платежей',
                  description: 'Прозрачные условия. Никаких сюрпризов и доплат.',
                  icon: Star,
                },
              ].map((item) => (
                <div key={item.title} className="text-center">
                  <item.icon className="w-16 h-16 mx-auto mb-4 text-primary-200" />
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-primary-100">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Готовы начать новую жизнь?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Найдите работу мечты за рубежом уже сегодня
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/vacancies">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Найти вакансию за 2 минуты
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contacts">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                  Связаться с нами
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
