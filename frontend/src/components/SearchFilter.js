import Tooltip from './Tooltip'

const SearchFilter = ({ searchTerm, setSearchTerm, sortBy, setSortBy }) => {
  return (
    <div className="search-filter-container">
      <Tooltip text="Search workouts by exercise name" position="bottom">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search workouts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            title="Search workouts by exercise name"
          />
        </div>
      </Tooltip>

      <div className="filter-box">
        <label htmlFor="sort-select" className="filter-label">Sort by:</label>
        <Tooltip text="Sort your workouts by different criteria" position="bottom">
          <select 
            id="sort-select"
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
            title="Sort your workouts"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="load-high">Highest Weight</option>
            <option value="load-low">Lowest Weight</option>
            <option value="reps-high">Most Repetitions</option>
            <option value="reps-low">Least Repetitions</option>
          </select>
        </Tooltip>
      </div>
    </div>
  )
}

export default SearchFilter

