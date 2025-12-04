'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import { Star } from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const testimonials = [
  {
    name: 'Андрей К.',
    from: 'Украина',
    to: 'Польша',
    position: 'Водитель CE',
    avatar: '👨‍💼',
    text: 'Отличная компания! Помогли с визой и документами. Работаю водителем в Польше уже 8 месяцев. Зарплата стабильная, 2500 EUR нетто каждый месяц.',
    rating: 5,
    date: '2 месяца назад',
  },
  {
    name: 'Марина С.',
    from: 'Россия',
    to: 'Германия',
    position: 'Работник склада Amazon',
    avatar: '👩‍💼',
    text: 'Нашла работу на складе Amazon за 2 недели. Зарплата стабильная, условия отличные! Жильё предоставили сразу, всё организовано на высшем уровне.',
    rating: 5,
    date: '1 месяц назад',
  },
  {
    name: 'Дмитрий Л.',
    from: 'Беларусь',
    to: 'Чехия',
    position: 'Сварщик TIG/MIG',
    avatar: '👨‍🔧',
    text: 'Работаю сварщиком в Чехии. Зарплата 2800 EUR нетто, условия труда хорошие. Менеджеры всегда на связи, помогают с любыми вопросами.',
    rating: 5,
    date: '3 недели назад',
  },
  {
    name: 'Елена В.',
    from: 'Молдова',
    to: 'ОАЭ',
    position: 'Офис-менеджер',
    avatar: '👩‍💻',
    text: 'Переехала в Дубай через эту компанию. Оформили рабочую визу за месяц, помогли с жильём и адаптацией. Очень довольна!',
    rating: 5,
    date: '2 недели назад',
  },
  {
    name: 'Игорь П.',
    from: 'Россия',
    to: 'Нидерланды',
    position: 'Комплектовщик DHL',
    avatar: '👨',
    text: 'Работаю в Нидерландах на складе DHL. Зарплата приходит каждую неделю, что очень удобно. Спасибо команде за профессионализм!',
    rating: 5,
    date: '1 неделя назад',
  },
  {
    name: 'Наталья К.',
    from: 'Казахстан',
    to: 'Германия',
    position: 'Упаковщик',
    avatar: '👩',
    text: 'Отличный сервис! Помогли найти работу в Германии. Всё легально, документы в порядке. Рекомендую всем, кто ищет работу за границей.',
    rating: 5,
    date: '3 дня назад',
  },
]

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Отзывы наших клиентов
          </h2>
          <p className="text-xl text-gray-600">
            Более 10,000 человек нашли работу мечты с нашей помощью
          </p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{
            clickable: true,
            bulletActiveClass: 'swiper-pagination-bullet-active !bg-primary-600',
          }}
          navigation
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="!pb-12"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start mb-4">
                  <div className="text-5xl mr-4">{item.avatar}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">{item.name}</h4>
                    <p className="text-sm text-gray-600">
                      {item.from} → {item.to}
                    </p>
                    <p className="text-xs text-primary-600 font-medium">
                      {item.position}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-700 mb-4 flex-1 leading-relaxed">
                  {item.text}
                </p>

                {/* Date */}
                <p className="text-xs text-gray-500">{item.date}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Trust Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <div className="text-left">
              <div className="font-bold text-lg">4.9 / 5.0</div>
              <div className="text-xs text-gray-600">Средняя оценка (2,847 отзывов)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
