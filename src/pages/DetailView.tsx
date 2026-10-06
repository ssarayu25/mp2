import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import { lookupMealById } from '../services/mealApi'
import type { Meal } from '../types/Meal'

interface DetailLocationState {
  mealIds?: string[]
}

function DetailView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const locationState = (location.state as DetailLocationState) ?? {}

  const [meal, setMeal] = useState<Meal | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) {
      return
    }
    const mealId = id

    let isCancelled = false

    async function loadMeal() {
      setLoading(true)
      setError('')

      try {
        const result = await lookupMealById(mealId)
        if (!isCancelled) {
          setMeal(result)
        }
      } catch {
        if (!isCancelled) {
          setError('Could not load meal details right now.')
          setMeal(null)
        }
      } finally {
        if (!isCancelled) {
          setLoading(false)
        }
      }
    }

    loadMeal()

    return () => {
      isCancelled = true
    }
  }, [id])

  const ingredients = useMemo(() => {
    if (!meal) {
      return [] as { ingredient: string; measure: string }[]
    }

    const pairs: { ingredient: string; measure: string }[] = []

    for (let index = 1; index <= 20; index += 1) {
      const ingredient = meal[`strIngredient${index}`]?.trim() ?? ''
      const measure = meal[`strMeasure${index}`]?.trim() ?? ''

      if (ingredient) {
        pairs.push({ ingredient, measure })
      }
    }

    return pairs
  }, [meal])

  const mealIds = locationState.mealIds ?? []
  const currentIndex = id ? mealIds.indexOf(id) : -1
  const previousMealId = currentIndex > 0 ? mealIds[currentIndex - 1] : null
  const nextMealId =
    currentIndex >= 0 && currentIndex < mealIds.length - 1
      ? mealIds[currentIndex + 1]
      : null

  return (
    <section className="page-section">
      <div className="detail-header">
        <h2>Detail View</h2>
        <div className="detail-actions">
          <button
            type="button"
            onClick={() =>
              previousMealId
                ? navigate(`/meal/${previousMealId}`, { state: { mealIds } })
                : undefined
            }
            disabled={!previousMealId}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() =>
              nextMealId
                ? navigate(`/meal/${nextMealId}`, { state: { mealIds } })
                : undefined
            }
            disabled={!nextMealId}
          >
            Next
          </button>
        </div>
      </div>

      <p>
        <Link to="/list" className="back-link">
          Back to List
        </Link>
      </p>

      {loading ? <p className="feedback">Loading meal details...</p> : null}
      {error ? <p className="feedback feedback-error">{error}</p> : null}
      {!loading && !error && !meal ? (
        <p className="feedback">Meal not found.</p>
      ) : null}

      {meal ? (
        <article className="detail-card">
          <img src={meal.strMealThumb} alt={meal.strMeal} className="detail-image" />

          <div className="detail-content">
            <h3>{meal.strMeal}</h3>
            <p className="meta-line">
              <strong>Category:</strong> {meal.strCategory ?? 'Unknown'}
            </p>
            <p className="meta-line">
              <strong>Area:</strong> {meal.strArea ?? 'Unknown'}
            </p>

            <h4>Ingredients</h4>
            <ul className="ingredient-list">
              {ingredients.map((item) => (
                <li key={`${item.ingredient}-${item.measure}`}>
                  {item.ingredient}
                  {item.measure ? ` - ${item.measure}` : ''}
                </li>
              ))}
            </ul>

            <h4>Instructions</h4>
            <p className="instructions">{meal.strInstructions ?? 'No instructions provided.'}</p>

            <div className="external-links">
              {meal.strYoutube ? (
                <a href={meal.strYoutube} target="_blank" rel="noreferrer">
                  YouTube Video
                </a>
              ) : null}
              {meal.strSource ? (
                <a href={meal.strSource} target="_blank" rel="noreferrer">
                  Source Link
                </a>
              ) : null}
            </div>
          </div>
        </article>
      ) : null}
    </section>
  )
}

export default DetailView
