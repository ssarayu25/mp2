import { Link } from 'react-router-dom'

import type { Meal } from '../types/Meal'

interface MealCardProps {
  meal: Meal
  mealIds: string[]
  showMeta?: boolean
}

function MealCard({ meal, mealIds, showMeta = false }: MealCardProps) {
  return (
    <article className={showMeta ? 'meal-card meal-card-list' : 'meal-card'}>
      <Link
        to={`/meal/${meal.idMeal}`}
        state={{ mealIds }}
        className="meal-link"
      >
        <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-image" />
        <div className="meal-content">
          <h3>{meal.strMeal}</h3>
          {showMeta ? (
            <p>
              <span>{meal.strCategory ?? 'Unknown category'}</span>
              {' • '}
              <span>{meal.strArea ?? 'Unknown area'}</span>
            </p>
          ) : null}
        </div>
      </Link>
    </article>
  )
}

export default MealCard
