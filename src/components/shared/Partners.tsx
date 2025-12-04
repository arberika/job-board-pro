import React from 'react'
import { Star } from 'lucide-react'

export const Partners: React.FC = () => {
  const partners = [
    { name: 'Amazon', description: 'Склады и логистика' },
    { name: 'DHL', description: 'Доставка и склады' },
    { name: 'DPD', description: 'Курьерская служба' },
    { name: 'Schenker', description: 'Логистика' },
    { name: 'IKEA', description: 'Производство и склады' },
  ]

  return (
    <section className="py-12 bg-white border-y">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left side */}
          <div className="text-center md:text-left">
            <p className="text-gray-600 mb-2">Работаем с крупнейшими компаниями:</p>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-gray-700 font-semibold">4.8 / 5</span>
              <a
                href="#reviews"
                className="text-primary-600 hover:underline ml-2 text-sm"
              >
                Смотреть отзывы
              </a>
            </div>
          </div>

          {/* Right side - Partners */}
          <div className="flex items-center gap-8 flex-wrap justify-center">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="text-center hover:scale-105 transition-transform"
              >
                <div className="text-2xl md:text-3xl font-bold text-gray-400 hover:text-gray-600 transition-colors">
                  {partner.name}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {partner.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
