'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search, User, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              Work<span className="text-primary-600">Abroad</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/vacancies"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Все вакансии
            </Link>
            <Link
              href="/countries"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Страны
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              О нас
            </Link>
            <Link
              href="/contacts"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Контакты
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/profile">
              <Button variant="ghost" size="sm">
                <User className="w-5 h-5 mr-2" />
                Войти
              </Button>
            </Link>
            <Link href="/vacancies">
              <Button variant="primary" size="sm">
                <Search className="w-5 h-5 mr-2" />
                Найти работу
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t animate-slide-down">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/vacancies"
                className="text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Все вакансии
              </Link>
              <Link
                href="/countries"
                className="text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Страны
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                О нас
              </Link>
              <Link
                href="/contacts"
                className="text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Контакты
              </Link>
              <div className="pt-4 space-y-3">
                <Link href="/profile" className="block">
                  <Button variant="outline" size="md" className="w-full">
                    <User className="w-5 h-5 mr-2" />
                    Войти
                  </Button>
                </Link>
                <Link href="/vacancies" className="block">
                  <Button variant="primary" size="md" className="w-full">
                    <Search className="w-5 h-5 mr-2" />
                    Найти работу
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
