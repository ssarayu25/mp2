import axios from 'axios'
import type {
  CategoriesApiResponse,
  Meal,
  MealApiResponse,
} from '../types/Meal'

const mealApi = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
})

export async function searchMealsByName(query: string): Promise<Meal[]> {
  const response = await mealApi.get<MealApiResponse>('/search.php', {
    params: { s: query },
  })

  return response.data.meals ?? []
}

export async function lookupMealById(id: string): Promise<Meal | null> {
  const response = await mealApi.get<MealApiResponse>('/lookup.php', {
    params: { i: id },
  })

  return response.data.meals?.[0] ?? null
}

export async function fetchCategories(): Promise<string[]> {
  const response = await mealApi.get<CategoriesApiResponse>('/categories.php')

  return response.data.categories.map((category) => category.strCategory)
}

export async function fetchMealsByCategory(category: string): Promise<Meal[]> {
  const response = await mealApi.get<MealApiResponse>('/filter.php', {
    params: { c: category },
  })

  return response.data.meals ?? []
}

export async function fetchMealsByArea(area: string): Promise<Meal[]> {
  const response = await mealApi.get<MealApiResponse>('/filter.php', {
    params: { a: area },
  })

  return response.data.meals ?? []
}
