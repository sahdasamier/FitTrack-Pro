const SearchFilter = ({ searchTerm, setSearchTerm, sortBy, setSortBy }) => {
  return (
    <div className="search-filter-container">
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search workouts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-box">
        <label htmlFor="sort-select" className="filter-label">Sort by:</label>
        <select 
          id="sort-select"
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="filter-select"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="load-high">Highest Load</option>
          <option value="load-low">Lowest Load</option>
          <option value="reps-high">Most Reps</option>
          <option value="reps-low">Least Reps</option>
        </select>
      </div>
    </div>
  )
}

export default SearchFilter

