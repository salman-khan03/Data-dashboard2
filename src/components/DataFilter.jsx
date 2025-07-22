import { useState } from 'react'
import './DataFilter.css'

const DataFilter = ({ data, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [growthFilter, setGrowthFilter] = useState('all')

  // Handle case where data might be undefined or empty
  const safeData = data || []
  const categories = ['all', ...new Set(safeData.map(item => item?.category).filter(Boolean))]

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    applyFilters(category, growthFilter)
  }

  const handleGrowthChange = (growth) => {
    setGrowthFilter(growth)
    applyFilters(selectedCategory, growth)
  }

  const applyFilters = (category, growth) => {
    let filteredData = safeData

    if (category !== 'all') {
      filteredData = filteredData.filter(item => item?.category === category)
    }

    if (growth !== 'all') {
      switch (growth) {
        case 'high':
          filteredData = filteredData.filter(item => (item?.growth || 0) >= 15)
          break
        case 'medium':
          filteredData = filteredData.filter(item => (item?.growth || 0) >= 8 && (item?.growth || 0) < 15)
          break
        case 'low':
          filteredData = filteredData.filter(item => (item?.growth || 0) < 8)
          break
        default:
          break
      }
    }

    onFilterChange(filteredData)
  }

  const clearFilters = () => {
    setSelectedCategory('all')
    setGrowthFilter('all')
    onFilterChange(safeData)
  }

  return (
    <div className="data-filter">
      <h3>🔍 Filter Data</h3>
      <div className="filter-controls">
        <div className="filter-group">
          <label htmlFor="category-filter">Category:</label>
          <select 
            id="category-filter"
            value={selectedCategory} 
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="growth-filter">Growth Rate:</label>
          <select 
            id="growth-filter"
            value={growthFilter} 
            onChange={(e) => handleGrowthChange(e.target.value)}
          >
            <option value="all">All Growth Rates</option>
            <option value="high">High (≥15%)</option>
            <option value="medium">Medium (8-14%)</option>
            <option value="low">Low (&lt;8%)</option>
          </select>
        </div>

        <button className="clear-filters" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>
    </div>
  )
}

export default DataFilter 