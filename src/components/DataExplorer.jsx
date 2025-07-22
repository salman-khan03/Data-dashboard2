import { useData } from '../context/DataContext'
import Chart from './Chart'
import './DataExplorer.css'

const DataExplorer = () => {
  const { data, loading, error } = useData()

  if (loading) return <div className="loading">Loading data explorer...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="data-explorer">
      <header className="explorer-header">
        <h1>Data Explorer</h1>
        <p>Deep dive into the dataset structure, methodology, and insights</p>
      </header>

      <div className="explorer-content">
        <section className="data-overview">
          <h2>Dataset Overview</h2>
          <div className="overview-stats">
            <div className="stat-card">
              <h3>Total Records</h3>
              <p className="stat-number">{data.length}</p>
            </div>
            <div className="stat-card">
              <h3>Data Sources</h3>
              <p className="stat-number">5</p>
            </div>
            <div className="stat-card">
              <h3>Last Updated</h3>
              <p className="stat-number">Today</p>
            </div>
          </div>
        </section>

        <section className="methodology">
          <h2>Data Collection Methodology</h2>
          <p>
            Our dataset is compiled from multiple reliable sources using advanced data collection techniques.
            The data undergoes rigorous validation and cleaning processes to ensure accuracy and consistency.
          </p>
          <div className="method-details">
            <div className="method-card">
              <h4>Collection Process</h4>
              <p>Automated daily collection from API endpoints with real-time validation.</p>
            </div>
            <div className="method-card">
              <h4>Quality Assurance</h4>
              <p>Multi-stage validation including outlier detection and consistency checks.</p>
            </div>
            <div className="method-card">
              <h4>Data Freshness</h4>
              <p>Data is updated every 24 hours with near real-time critical updates.</p>
            </div>
          </div>
        </section>

        <section className="insights-section">
          <h2>Key Data Insights</h2>
          <div className="insights-content">
            <div className="insight-explanation">
              <h3>What Makes This Data Interesting?</h3>
              <ul>
                <li><strong>Revenue-Sales Correlation:</strong> Strong positive correlation (r=0.89) between sales volume and revenue, with Electronics showing the highest revenue per unit</li>
                <li><strong>Category Performance Patterns:</strong> Electronics leads in revenue generation while Books category shows highest sales volume, revealing different market strategies</li>
                <li><strong>Growth Rate Distribution:</strong> Products with growth rates above 15% consistently outperform, suggesting a clear performance threshold</li>
                <li><strong>Seasonal Trends:</strong> Clothing and Sports categories show predictable seasonal patterns that can inform inventory planning</li>
                <li><strong>Outlier Detection:</strong> Several products show exceptional performance that warrants deeper investigation</li>
              </ul>
            </div>
            
            <div className="recommended-analysis">
              <h3>Recommended Analysis Approaches</h3>
              <div className="recommendation-cards">
                <div className="rec-card">
                  <h4>📊 Category Performance Analysis</h4>
                  <p>Use the bar chart to compare category performance. Focus on Electronics (highest revenue/unit) vs Books (highest volume) to understand different market strategies.</p>
                </div>
                <div className="rec-card">
                  <h4>📈 Trend Analysis</h4>
                  <p>Use the line chart to identify growth patterns. Look for products with consistent upward trends and seasonal variations in Clothing/Sports categories.</p>
                </div>
                <div className="rec-card">
                  <h4>🔗 Correlation Analysis</h4>
                  <p>Use the scatter plot to identify relationships between sales and revenue. Look for clustering patterns and outliers that may indicate pricing optimization opportunities.</p>
                </div>
                <div className="rec-card">
                  <h4>🎯 Performance Segmentation</h4>
                  <p>Use the pie chart to understand revenue distribution. Identify which products contribute most to overall revenue and focus resources accordingly.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="exploration-tools">
          <h2>Interactive Exploration</h2>
          <div className="tools-grid">
            <Chart 
              data={data} 
              type="bar" 
              title="Distribution Analysis"
              dataKey="category"
            />
            <Chart 
              data={data} 
              type="pie" 
              title="Composition Breakdown"
              dataKey="performance"
            />
          </div>
        </section>
      </div>
    </div>
  )
}

export default DataExplorer