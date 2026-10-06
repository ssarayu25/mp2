import { useEffect, useMemo, useState } from 'react'

import CategoryFilter from '../components/CategoryFilter'
import MealCard from '../components/MealCard'
import {
  fetchCategories,
  fetchMealsByCategory,
  searchMealsByName,
} from '../services/mealApi'
import type { Meal } from '../types/Meal'

function GalleryView() {
  const [categories, setCategories] = useState<string[]>(['All'])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let isCancelled = false

    async function loadCategories() {
      try {
        const categoryNames = await fetchCategories()
        if (!isCancelled) {
          setCategories(['All', ...categoryNames])
        }
      } catch {
        if (!isCancelled) {
          setError('Could not load meal categories right now.')
        }
      }
    }

    loadCategories()

    return () => {
      isCancelled = true
    }
  }, [])

  useEffect(() => {
    let isCancelled = false

    async function loadMeals() {
      setLoading(true)
      setError('')

      try {
        const result =
          selectedCategory === 'All'
            ? await searchMealsByName('')
            : await fetchMealsByCategory(selectedCategory)

        if (!isCancelled) {
          setMeals(result)
        }
      } catch {
        if (!isCancelled) {
          setError('Could not load gallery meals right now.')
          setMeals([])
        }
      } finally {
        if (!isCancelled) {
          setLoading(false)
        }
      }
    }

    loadMeals()

    return () => {
      isCancelled = true
    }
  }, [selectedCategory])

  const visibleMeals = useMemo(() => meals.slice(0, 60), [meals])
  const mealIds = visibleMeals.map((meal) => meal.idMeal)

  return (
    <section className="page-section">
      <h2>Gallery View</h2>
      <p className="page-subtitle">Browse food photos by category.</p>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {loading ? <p className="feedback">Loading gallery...</p> : null}
      {error ? <p className="feedback feedback-error">{error}</p> : null}
      {!loading && !error && visibleMeals.length === 0 ? (
        <p className="feedback">No meals found for this category.</p>
      ) : null}

      <div className="gallery-grid">
        {visibleMeals.map((meal) => (
          <MealCard key={meal.idMeal} meal={meal} mealIds={mealIds} />
        ))}
      </div>
    </section>
  )
}

export default GalleryView
