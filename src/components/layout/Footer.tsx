import React from 'react'
import Link from 'next/link'
import { Briefcase, Mail, Phone, MapPin } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Work<span className="text-primary-400">Abroad</span>
              </span>
            </Link>
            <p className="text-sm mb-4">
              Официальное трудоустройство за рубежом. Помогаем найти работу мечты в Европе и ОАЭ с 2018 года.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Быстрые ссылки</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/vacancies" className="hover:text-primary-400 transition-colors">
                  Все вакансии
                </Link>
              </li>
              <li>
                <Link href="/countries" className="hover:text-primary-400 transition-colors">
                  Страны
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary-400 transition-colors">
                  О компании
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary-400 transition-colors">
                  Часто задаваемые вопросы
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Правовая информация</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-primary-400 transition-colors">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary-400 transition-colors">
                  Условия использования
                </Link>
              </li>
              <li>
                <Link href="/license" className="hover:text-primary-400 transition-colors">
                  Лицензии и сертификаты
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-primary-400 transition-colors">
                  Возврат средств
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <a href="tel:+48123456789" className="hover:text-primary-400 transition-colors">
                    +48 123 456 789
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <a href="mailto:info@workabroad.com" className="hover:text-primary-400 transition-colors">
                    info@workabroad.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm">Варшава, Польша</p>
                  <p className="text-sm">ул. Маршалковская 1</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>&copy; 2018-2024 WorkAbroad. Все права защищены.</p>
          <p className="mt-2 text-gray-500">
            ИП Сидоров И.И., ИНН 1234567890, Лицензия на трудоустройство №12345
          </p>
        </div>
      </div>
    </footer>
  )
}
