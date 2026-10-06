export type SortKey = 'name' | 'category' | 'area'
export type SortOrder = 'asc' | 'desc'

interface SortControlsProps {
  sortKey: SortKey
  sortOrder: SortOrder
  onSortKeyChange: (nextSortKey: SortKey) => void
  onSortOrderChange: (nextSortOrder: SortOrder) => void
}

function SortControls({
  sortKey,
  sortOrder,
  onSortKeyChange,
  onSortOrderChange,
}: SortControlsProps) {
  return (
    <div className="sort-controls">
      <label className="control-group" htmlFor="sort-key">
        <span>Sort by</span>
        <select
          id="sort-key"
          value={sortKey}
          onChange={(event) => onSortKeyChange(event.target.value as SortKey)}
        >
          <option value="name">Meal name</option>
          <option value="category">Category</option>
          <option value="area">Area</option>
        </select>
      </label>

      <label className="control-group" htmlFor="sort-order">
        <span>Order</span>
        <select
          id="sort-order"
          value={sortOrder}
          onChange={(event) => onSortOrderChange(event.target.value as SortOrder)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
    </div>
  )
}

export default SortControls
