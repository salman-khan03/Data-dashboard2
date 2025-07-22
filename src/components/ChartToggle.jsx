import { useData } from '../context/DataContext'
import './ChartToggle.css'

const ChartToggle = () => {
  const { activeChart, setActiveChartType } = useData()

  const charts = [
    { id: 'chart1', name: 'Distribution Analysis', icon: '📊' },
    { id: 'chart2', name: 'Trend Over Time', icon: '📈' },
    { id: 'chart3', name: 'Correlation Matrix', icon: '🔗' },
    { id: 'chart4', name: 'Performance Metrics', icon: '🎯' }
  ]

  return (
    <div className="chart-toggle">
      <h3>Select Visualization</h3>
      <div className="toggle-buttons">
        {charts.map(chart => (
          <button
            key={chart.id}
            className={`toggle-btn ${activeChart === chart.id ? 'active' : ''}`}
            onClick={() => setActiveChartType(chart.id)}
          >
            {chart.icon} {chart.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ChartToggle