import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'WorkAbroad - Официальное трудоустройство за рубежом',
  description: 'Найдите работу мечты в Европе и ОАЭ. Более 5000 вакансий, легальное трудоустройство, помощь с визой и жильём. Работаем с 2018 года.',
  keywords: 'работа за границей, вакансии в Европе, работа в Польше, работа в Германии, работа в ОАЭ, трудоустройство за рубежом',
  openGraph: {
    title: 'WorkAbroad - Работа за рубежом',
    description: 'Официальное трудоустройство в Европе и ОАЭ. Более 5000 вакансий.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
