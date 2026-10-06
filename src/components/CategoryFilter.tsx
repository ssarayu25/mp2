interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="category-filter" role="group" aria-label="Meal categories">
      {categories.map((category) => {
        const isActive = category === selectedCategory

        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
            className={isActive ? 'filter-btn filter-btn-active' : 'filter-btn'}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}

export default CategoryFilter
