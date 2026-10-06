interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="control-group" htmlFor="meal-search">
      <span>Search meals</span>
      <input
        id="meal-search"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Type a meal name (example: chicken)"
      />
    </label>
  )
}

export default SearchBar
