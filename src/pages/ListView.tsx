import { useEffect, useMemo, useState } from 'react'

import MealCard from '../components/MealCard'
import SearchBar from '../components/SearchBar'
import SortControls, {
  type SortKey,
  type SortOrder,
} from '../components/SortControls'
import { searchMealsByName } from '../services/mealApi'
import type { Meal } from '../types/Meal'

function ListView() {
  const [query, setQuery] = useState('chicken')
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  useEffect(() => {
    let isCancelled = false

    const timeoutId = window.setTimeout(async () => {
      setLoading(true)
      setError('')

      try {
        const response = await searchMealsByName(query)
        if (!isCancelled) {
          setMeals(response)
        }
      } catch {
        if (!isCancelled) {
          setError('Could not load meals right now. Please try again.')
          setMeals([])
        }
      } finally {
        if (!isCancelled) {
          setLoading(false)
        }
      }
    }, 300)

    return () => {
      isCancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [query])

  const sortedMeals = useMemo(() => {
    const mealsCopy = [...meals]

    mealsCopy.sort((firstMeal, secondMeal) => {
      const firstValue =
        sortKey === 'name'
          ? firstMeal.strMeal
          : sortKey === 'category'
            ? firstMeal.strCategory ?? ''
            : firstMeal.strArea ?? ''

      const secondValue =
        sortKey === 'name'
          ? secondMeal.strMeal
          : sortKey === 'category'
            ? secondMeal.strCategory ?? ''
            : secondMeal.strArea ?? ''

      const compareResult = firstValue.localeCompare(secondValue)

      return sortOrder === 'asc' ? compareResult : -compareResult
    })

    return mealsCopy
  }, [meals, sortKey, sortOrder])

  const mealIds = sortedMeals.map((meal) => meal.idMeal)

  return (
    <section className="page-section">
      <h2>List View</h2>
      <p className="page-subtitle">Search, sort, and open meals by detail page.</p>

      <div className="controls-row">
        <SearchBar value={query} onChange={setQuery} />
        <SortControls
          sortKey={sortKey}
          sortOrder={sortOrder}
          onSortKeyChange={setSortKey}
          onSortOrderChange={setSortOrder}
        />
      </div>

      {loading ? <p className="feedback">Loading meals...</p> : null}
      {error ? <p className="feedback feedback-error">{error}</p> : null}
      {!loading && !error && sortedMeals.length === 0 ? (
        <p className="feedback">No meals found. Try another search term.</p>
      ) : null}

      <div className="list-grid">
        {sortedMeals.map((meal) => (
          <MealCard
            key={meal.idMeal}
            meal={meal}
            mealIds={mealIds}
            showMeta={true}
          />
        ))}
      </div>
    </section>
  )
}

export default ListView
