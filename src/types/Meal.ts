export interface Meal {
  idMeal: string
  strMeal: string
  strCategory?: string
  strArea?: string
  strInstructions?: string
  strMealThumb: string
  strYoutube?: string
  strSource?: string
  [key: string]: string | undefined
}

export interface Category {
  idCategory: string
  strCategory: string
  strCategoryThumb: string
  strCategoryDescription: string
}

export interface MealApiResponse {
  meals: Meal[] | null
}

export interface CategoriesApiResponse {
  categories: Category[]
}
