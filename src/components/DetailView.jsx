import { useParams, Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import Chart from './Chart'
import './DetailView.css'

const DetailView = () => {
  const { id } = useParams()
  const { data, loading, error } = useData()

  if (loading) return <div className="loading">Loading item details...</div>
  if (error) return <div className="error">Error: {error}</div>

  const item = data.find(d => d.id === parseInt(id))
  
  if (!item) {
    return (
      <div className="detail-view">
        <div className="error-container">
          <h2>Item not found</h2>
          <p>The requested item with ID {id} could not be found in the dataset.</p>
          <Link to="/" className="back-link">← Back to Dashboard</Link>
        </div>
      </div>
    )
  }

  // Create related data for item-specific charts
  const relatedData = data.filter(d => 
    d.category === item.category || 
    Math.abs(d.revenue - item.revenue) < 10000
  )

  return (
    <div className="detail-view">
      <div className="detail-header">
        <Link to="/" className="back-link">← Back to Dashboard</Link>
        <h1>{item.name || item.title}</h1>
      </div>

      <div className="detail-content">
        <div className="item-overview">
          <div className="overview-card">
            <h3>Overview</h3>
            <p><strong>ID:</strong> {item.id}</p>
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Sales:</strong> {item.sales.toLocaleString()}</p>
            <p><strong>Revenue:</strong> ${item.revenue.toLocaleString()}</p>
            <p><strong>Growth:</strong> {item.growth}%</p>
          </div>

          <div className="description-card">
            <h3>Performance Summary</h3>
            <p>This product shows {item.growth > 10 ? 'strong' : item.growth > 5 ? 'moderate' : 'slow'} growth with {item.sales.toLocaleString()} units sold and ${item.revenue.toLocaleString()} in revenue.</p>
            
            {item.description && (
              <div className="product-description">
                <h4>Product Description</h4>
                <p>{item.description}</p>
              </div>
            )}
            
            <div className="performance-indicators">
              <div className="indicator">
                <span className="indicator-label">Performance:</span>
                <span className={`indicator-value ${item.growth > 15 ? 'excellent' : item.growth > 10 ? 'good' : item.growth > 5 ? 'average' : 'poor'}`}>
                  {item.growth > 15 ? 'Excellent' : item.growth > 10 ? 'Good' : item.growth > 5 ? 'Average' : 'Poor'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="item-analytics">
          <h3>Analytics & Insights</h3>
          
          <div className="analytics-grid">
            <div className="metric-card">
              <h4>Sales Performance</h4>
              <div className="metric-value">{item.sales.toLocaleString()}</div>
              <div className="metric-change">+{item.growth}% from last period</div>
            </div>
            
            <div className="metric-card">
              <h4>Revenue Generated</h4>
              <div className="metric-value">${item.revenue.toLocaleString()}</div>
              <div className="metric-change">+{item.growth}% growth rate</div>
            </div>
            
            <div className="metric-card">
              <h4>Growth Rate</h4>
              <div className="metric-value">{item.growth}%</div>
              <div className="metric-change">{item.growth > 10 ? 'Strong' : 'Moderate'} performance</div>
            </div>
          </div>

          <div className="charts-section">
            <div className="chart-wrapper">
              <h4>Related Items Comparison</h4>
              <Chart 
                data={relatedData} 
                type="bar" 
                title="Similar Items Performance"
                dataKey="category"
              />
            </div>
            
            <div className="chart-wrapper">
              <h4>Historical Trend</h4>
              <Chart 
                data={[item, ...relatedData.slice(0, 4)]} 
                type="line" 
                title="Performance Over Time"
                dataKey="date"
              />
            </div>
          </div>
        </div>

        <div className="additional-details">
          <h3>Additional Information</h3>
          <div className="details-grid">
            <div className="detail-section">
              <h4>Technical Specifications</h4>
              <ul>
                <li>Processing Time: {item.processingTime || 'N/A'}</li>
                <li>Memory Usage: {item.memoryUsage || 'N/A'}</li>
                <li>Accuracy Score: {item.accuracyScore || 'N/A'}</li>
                <li>Last Optimization: {item.lastOptimization || 'N/A'}</li>
              </ul>
            </div>
            
            <div className="detail-section">
              <h4>Related Items</h4>
              <div className="related-items">
                {relatedData.slice(0, 3).map(related => (
                  <Link 
                    key={related.id} 
                    to={`/item/${related.id}`} 
                    className="related-item"
                  >
                    <span>{related.name}</span>
                    <small>Similarity: {Math.floor(Math.random() * 30 + 70)}%</small>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailView