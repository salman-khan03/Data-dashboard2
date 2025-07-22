import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'

const Chart = ({ data, type, title, dataKey }) => {
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1']

  const processDataForChart = () => {
    if (!data || data.length === 0) {
      return []
    }

    // Process data based on the chart type and dataKey
    switch (type) {
      case 'bar':
        return data.reduce((acc, item) => {
          const category = item.category || 'Unknown'
          const existing = acc.find(a => a.name === category)
          if (existing) {
            existing.sales += item.sales || 0
            existing.revenue += item.revenue || 0
            existing.count += 1
          } else {
            acc.push({ 
              name: category, 
              sales: item.sales || 0,
              revenue: item.revenue || 0,
              count: 1
            })
          }
          return acc
        }, [])
      
      case 'line':
        return data.map((item, index) => ({
          name: item.name || `Item ${index + 1}`,
          sales: item.sales || 0,
          revenue: item.revenue || 0,
          growth: item.growth || 0,
          date: item.date || `Day ${index + 1}`
        }))
      
      case 'pie':
        return data.slice(0, 5).map((item, index) => ({
          name: item.name || `Item ${index + 1}`,
          value: item.revenue || 0
        }))
      
      case 'scatter':
        return data.map((item, index) => ({
          name: item.name || `Item ${index + 1}`,
          x: item.sales || 0,
          y: item.revenue || 0,
          size: item.growth || 0
        }))
      
      default:
        return data
    }
  }

  const chartData = processDataForChart()

  const renderChart = () => {
    if (chartData.length === 0) {
      return <div className="no-data">No data available for this chart</div>
    }

    switch (type) {
      case 'bar':
        return (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value, name) => [value.toLocaleString(), name]} />
            <Legend />
            <Bar dataKey="sales" fill={colors[0]} name="Sales" />
            <Bar dataKey="revenue" fill={colors[1]} name="Revenue" />
          </BarChart>
        )
      
      case 'line':
        return (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value, name) => [value.toLocaleString(), name]} />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke={colors[1]} name="Sales" />
            <Line type="monotone" dataKey="revenue" stroke={colors[2]} name="Revenue" />
          </LineChart>
        )
      
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
            <Legend />
          </PieChart>
        )
      
      case 'scatter':
        return (
          <ScatterChart data={chartData}>
            <CartesianGrid />
            <XAxis dataKey="x" name="Sales" />
            <YAxis dataKey="y" name="Revenue" />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              formatter={(value, name) => [value.toLocaleString(), name]}
            />
            <Scatter dataKey="size" fill={colors[3]} name="Growth %" />
          </ScatterChart>
        )
      
      default:
        return <div>Chart type not supported</div>
    }
  }

  return (
    <div className="chart-container">
      <h4>{title}</h4>
      <ResponsiveContainer width="100%" height={300}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  )
}

export default Chart