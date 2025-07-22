import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import Chart from './Chart'
import ChartToggle from './ChartToggle'
import DataFilter from './DataFilter'
import './Dashboard.css'

const Dashboard = () => {
  const { data, filteredData, loading, error, activeChart, updateFilteredData } = useData()

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner">Loading dashboard...</div>
    </div>
  )
  if (error) return (
    <div className="error-container">
      <h2>Error Loading Dashboard</h2>
      <p>{error}</p>
      <button onClick={() => window.location.reload()} className="retry-button">
        Retry
      </button>
    </div>
  )

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Product Performance Analytics Dashboard</h1>
        <p className="dashboard-description">
          Welcome to our comprehensive product performance analytics dashboard! This dataset reveals fascinating insights about 
          product sales, revenue generation, and growth patterns across different categories. Our analysis uncovers 
          unexpected correlations between sales volume and revenue, seasonal trends in consumer behavior, and 
          category-specific performance indicators that can inform strategic business decisions.
        </p>
        <div className="dashboard-highlights">
          <div className="highlight-item">
            <span className="highlight-icon">📈</span>
            <span>Strong correlation between sales volume and revenue growth</span>
          </div>
          <div className="highlight-item">
            <span className="highlight-icon">🎯</span>
            <span>Electronics category shows highest revenue per unit</span>
          </div>
          <div className="highlight-item">
            <span className="highlight-icon">📊</span>
            <span>Seasonal patterns in clothing and sports categories</span>
          </div>
        </div>
      </header>

      <ChartToggle />
      
      <DataFilter data={data} onFilterChange={updateFilteredData} />

      <div className="charts-container">
        {activeChart === 'chart1' && (
          <div className="chart-section">
            <h3>Distribution Analysis</h3>
            <p className="chart-annotation">
              This chart shows the distribution of key metrics across different categories.
              Notice the significant peak in Electronics - this suggests strong performance in this category.
            </p>
            <Chart 
              data={filteredData} 
              type="bar" 
              title="Category Distribution"
              dataKey="category"
            />
          </div>
        )}

        {activeChart === 'chart2' && (
          <div className="chart-section">
            <h3>Trend Over Time</h3>
            <p className="chart-annotation">
              The time series reveals patterns and growth trends across different products.
              Try exploring individual items for detailed analysis.
            </p>
            <Chart 
              data={filteredData} 
              type="line" 
              title="Product Performance Trends"
              dataKey="name"
            />
          </div>
        )}

        {activeChart === 'chart3' && (
          <div className="chart-section">
            <h3>Correlation Analysis</h3>
            <p className="chart-annotation">
              This scatter plot shows the relationship between sales and revenue across products.
              Look for clustering patterns and outliers.
            </p>
            <Chart 
              data={filteredData} 
              type="scatter" 
              title="Sales vs Revenue Correlation"
              dataKey="correlation"
            />
          </div>
        )}

        {activeChart === 'chart4' && (
          <div className="chart-section">
            <h3>Performance Metrics</h3>
            <p className="chart-annotation">
              This pie chart shows the revenue breakdown by product.
              Identify which products contribute most to overall revenue.
            </p>
            <Chart 
              data={filteredData} 
              type="pie" 
              title="Revenue Distribution"
              dataKey="performance"
            />
          </div>
        )}
      </div>

      <div className="data-list">
        <h2>Data Items</h2>
        <div className="list-container">
          {filteredData.map(item => (
            <Link 
              key={item.id} 
              to={`/item/${item.id}`} 
              className="list-item-link"
            >
              <div className="list-item">
                <h3>{item.name}</h3>
                <p>Category: {item.category}</p>
                <div className="item-stats">
                  <span className="stat">Sales: {item.sales}</span>
                  <span className="stat">Revenue: ${item.revenue.toLocaleString()}</span>
                  <span className="stat">Growth: {item.growth}%</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="dashboard-insights">
        <h2>Key Insights & Recommendations</h2>
        <div className="insights-grid">
          <div className="insight-card">
            <h4>🎯 Strategic Recommendations</h4>
            <p>Focus on Electronics category products as they show the highest revenue per unit sold. Consider expanding the Books category which demonstrates strong volume sales.</p>
          </div>
          <div className="insight-card">
            <h4>📊 Data Patterns</h4>
            <p>Products with growth rates above 15% consistently outperform in revenue generation. Look for clustering patterns in the scatter plot to identify optimal price-performance ratios.</p>
          </div>
          <div className="insight-card">
            <h4>🔍 Analysis Tips</h4>
            <p>Use the bar chart to compare category performance, the line chart for trend analysis, and the scatter plot to identify outliers and correlations between sales and revenue.</p>
          </div>
                      <div className="insight-card">
              <h4>📈 Performance Metrics</h4>
              <p>The dataset contains {data.length} products across {new Set(data.map(item => item.category)).size} categories, with Electronics leading in revenue generation and Books in sales volume. Currently showing {filteredData.length} filtered results.</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard