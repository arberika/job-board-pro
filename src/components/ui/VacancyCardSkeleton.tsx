import React from 'react'

export const VacancyCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6 animate-pulse">
      {/* Image skeleton */}
      <div className="h-40 bg-gray-200 rounded-lg mb-4" />

      {/* Badges skeleton */}
      <div className="flex gap-2 mb-3">
        <div className="h-5 w-16 bg-gray-200 rounded-full" />
        <div className="h-5 w-20 bg-gray-200 rounded-full" />
      </div>

      {/* Title skeleton */}
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />

      {/* Location skeleton */}
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />

      {/* Salary skeleton */}
      <div className="h-8 bg-gray-200 rounded w-2/3 mb-4" />

      {/* Benefits skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
      </div>

      {/* Tags skeleton */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="h-6 w-16 bg-gray-200 rounded-full" />
        <div className="h-6 w-20 bg-gray-200 rounded-full" />
        <div className="h-6 w-24 bg-gray-200 rounded-full" />
      </div>

      {/* Buttons skeleton */}
      <div className="flex gap-2">
        <div className="flex-1 h-10 bg-gray-200 rounded-lg" />
        <div className="flex-1 h-10 bg-gray-200 rounded-lg" />
      </div>
    </div>
  )
}

export const VacancyCardSkeletonGrid: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <VacancyCardSkeleton key={i} />
      ))}
    </>
  )
}
