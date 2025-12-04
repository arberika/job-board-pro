# 🎯 План доработки сайта до ПРО-уровня

## ✅ Уже готово (базовая версия)

- [x] Next.js 14 с TypeScript
- [x] Главная страница с Hero и поиском
- [x] Каталог вакансий с фильтрами
- [x] Детальные страницы вакансий
- [x] 15 реальных вакансий
- [x] Форма отклика (готова к amoCRM)
- [x] Адаптивный дизайн
- [x] Header/Footer
- [x] SEO оптимизация

---

## 🔧 Критичные доработки (Приоритет 1)

### 1. Автокомплит в поиске ⚡
**Файл:** `src/app/page.tsx`

```typescript
// Добавить в компонент поиска
const [suggestions, setSuggestions] = useState<string[]>([])
const [showSuggestions, setShowSuggestions] = useState(false)

const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value
  setSearchQuery(value)

  if (value.length > 2) {
    // Фильтруем вакансии и категории для подсказок
    const results = [
      ...vacancies.filter(v => v.title.toLowerCase().includes(value.toLowerCase())).map(v => v.title),
      ...categories.filter(c => c.name.toLowerCase().includes(value.toLowerCase())).map(c => c.name)
    ].slice(0, 5)

    setSuggestions(results)
    setShowSuggestions(true)
  } else {
    setShowSuggestions(false)
  }
}

// Добавить dropdown для suggestions под полем поиска
```

### 2. Слайдер зарплаты в фильтрах 💰
**Файл:** `src/app/vacancies/page.tsx`

Установить: `npm install rc-slider`

```typescript
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

const [salaryRange, setSalaryRange] = useState([1000, 5000])

<div className="mb-6">
  <h3 className="font-semibold mb-3">Зарплата (EUR)</h3>
  <Slider
    range
    min={1000}
    max={8000}
    value={salaryRange}
    onChange={setSalaryRange}
    marks={{ 1000: '1000', 8000: '8000' }}
  />
  <div className="flex justify-between mt-2 text-sm text-gray-600">
    <span>{salaryRange[0]} EUR</span>
    <span>{salaryRange[1]} EUR</span>
  </div>
</div>
```

### 3. Bottom Sheet для mobile фильтров 📱
**Создать:** `src/components/ui/BottomSheet.tsx`

```typescript
'use client'

import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 md:hidden',
          'transform transition-transform duration-300',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}
        style={{ maxHeight: '90vh' }}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-bold text-lg">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto p-4" style={{ maxHeight: 'calc(90vh - 64px)' }}>
          {children}
        </div>
      </div>
    </>
  )
}
```

### 4. Sticky CTA кнопка на mobile 📌
**Файл:** `src/app/vacancy/[id]/page.tsx`

```typescript
const [showStickyCTA, setShowStickyCTA] = useState(false)

useEffect(() => {
  const handleScroll = () => {
    // Показываем кнопку после прокрутки 300px
    setShowStickyCTA(window.scrollY > 300)
  }

  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])

// Добавить в конец компонента
{showStickyCTA && (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 md:hidden z-40">
    <Button
      variant="primary"
      size="lg"
      className="w-full"
      onClick={() => setIsModalOpen(true)}
    >
      Откликнуться на вакансию
    </Button>
  </div>
)}
```

---

## 🎨 Важные улучшения (Приоритет 2)

### 5. Блок отзывов с слайдером 💬
**Создать:** `src/components/shared/Testimonials.tsx`

Установить: `npm install swiper`

```typescript
'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const testimonials = [
  {
    name: 'Андрей К.',
    from: 'Украина',
    to: 'Польша',
    position: 'Водитель',
    avatar: '👨',
    text: 'Отличная компания! Помогли с визой и документами. Работаю водителем в Польше уже 8 месяцев.',
    rating: 5,
  },
  {
    name: 'Марина С.',
    from: 'Россия',
    to: 'Германия',
    position: 'Работник склада',
    avatar: '👩',
    text: 'Нашла работу на складе Amazon за 2 недели. Зарплата стабильная, условия отличные!',
    rating: 5,
  },
  // ... добавить ещё отзывы
]

export const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Отзывы наших клиентов
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{item.avatar}</div>
                  <div>
                    <h4 className="font-bold">{item.name}</h4>
                    <p className="text-sm text-gray-600">
                      {item.from} → {item.to}
                    </p>
                    <p className="text-xs text-gray-500">{item.position}</p>
                  </div>
                </div>

                <div className="mb-3">
                  {'⭐'.repeat(item.rating)}
                </div>

                <p className="text-gray-700">{item.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
```

### 6. Блок партнёров 🤝
**Создать:** `src/components/shared/Partners.tsx`

```typescript
export const Partners = () => {
  const partners = [
    { name: 'Amazon', logo: '📦' },
    { name: 'DHL', logo: '🚚' },
    { name: 'DPD', logo: '📮' },
    { name: 'Schenker', logo: '🏭' },
    { name: 'IKEA', logo: '🛋️' },
  ]

  return (
    <section className="py-12 bg-white border-y">
      <div className="container mx-auto px-4">
        <p className="text-center text-gray-600 mb-6">Наши партнёры:</p>
        <div className="flex justify-center items-center gap-8 flex-wrap">
          {partners.map((partner) => (
            <div key={partner.name} className="flex items-center gap-2">
              <span className="text-3xl">{partner.logo}</span>
              <span className="text-xl font-bold text-gray-400">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### 7. Сохранение фильтров в URL 🔗
**Файл:** `src/app/vacancies/page.tsx`

```typescript
import { useRouter, useSearchParams } from 'next/navigation'

export default function VacanciesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Читаем из URL
  useEffect(() => {
    const countries = searchParams.get('countries')?.split(',') || []
    const categories = searchParams.get('categories')?.split(',') || []
    const search = searchParams.get('q') || ''

    setSelectedCountries(countries)
    setSelectedCategories(categories)
    setSearchQuery(search)
  }, [searchParams])

  // Сохраняем в URL
  const updateURL = () => {
    const params = new URLSearchParams()

    if (selectedCountries.length > 0) {
      params.set('countries', selectedCountries.join(','))
    }
    if (selectedCategories.length > 0) {
      params.set('categories', selectedCategories.join(','))
    }
    if (searchQuery) {
      params.set('q', searchQuery)
    }

    router.push(`/vacancies?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    updateURL()
  }, [selectedCountries, selectedCategories, searchQuery])
}
```

---

## 🚀 Дополнительные фичи (Приоритет 3)

### 8. Skeleton loaders 💀
**Создать:** `src/components/ui/VacancyCardSkeleton.tsx`

```typescript
export const VacancyCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6 animate-pulse">
      <div className="h-40 bg-gray-200 rounded-lg mb-4" />
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
      <div className="h-8 bg-gray-200 rounded w-2/3 mb-4" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded" />
      </div>
    </div>
  )
}

// Использование
{loading ? (
  <>
    {[...Array(6)].map((_, i) => (
      <VacancyCardSkeleton key={i} />
    ))}
  </>
) : (
  // ... реальные карточки
)}
```

### 9. Добавить в избранное ❤️
**Файл:** `src/app/vacancy/[id]/page.tsx`

```typescript
const [isFavorite, setIsFavorite] = useState(false)

// Проверяем localStorage
useEffect(() => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
  setIsFavorite(favorites.includes(vacancy.id))
}, [vacancy.id])

const toggleFavorite = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')

  if (isFavorite) {
    const updated = favorites.filter((id: string) => id !== vacancy.id)
    localStorage.setItem('favorites', JSON.stringify(updated))
    setIsFavorite(false)
  } else {
    favorites.push(vacancy.id)
    localStorage.setItem('favorites', JSON.stringify(favorites))
    setIsFavorite(true)
  }
}

// Кнопка
<button
  onClick={toggleFavorite}
  className="p-2 rounded-lg hover:bg-gray-100 transition"
>
  <Heart
    className={cn(
      'w-6 h-6',
      isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
    )}
  />
</button>
```

### 10. Google Analytics 📊
**Файл:** `src/app/layout.tsx`

```typescript
import Script from 'next/script'

export default function RootLayout() {
  return (
    <html lang="ru">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body>
        {/* ... */}
      </body>
    </html>
  )
}
```

---

## 📝 Checklist финальной проверки

- [ ] Автокомплит работает
- [ ] Фильтры сохраняются в URL
- [ ] Слайдер зарплаты работает
- [ ] Bottom sheet открывается на mobile
- [ ] Sticky CTA появляется на mobile
- [ ] Отзывы листаются
- [ ] Избранное сохраняется
- [ ] Форма отклика отправляет в amoCRM
- [ ] SEO теги на всех страницах
- [ ] Изображения оптимизированы
- [ ] Lighthouse score >90
- [ ] Mobile адаптивность проверена
- [ ] Работает на медленном интернете

---

## 🎯 Приоритетный порядок внедрения

1. **День 1** - Автокомплит, Слайдер зарплаты, URL фильтры
2. **День 2** - Bottom Sheet, Sticky CTA, Skeleton loaders
3. **День 3** - Отзывы, Партнёры, Избранное
4. **День 4** - Analytics, SEO проверка, Оптимизация изображений
5. **День 5** - Тестирование, багфиксы, финальная проверка

---

**Готово!** После этих доработок сайт будет на 100% ПРО-уровне и готов к продакшену 🚀
