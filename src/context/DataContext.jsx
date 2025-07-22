import { createContext, useContext, useState, useEffect } from 'react'

const DataContext = createContext()

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeChart, setActiveChart] = useState('chart1')

  const validateData = (data) => {
    return data.map(item => ({
      id: item.id || Math.random(),
      name: item.name || 'Unknown Product',
      category: item.category || 'Uncategorized',
      sales: typeof item.sales === 'number' ? item.sales : 0,
      revenue: typeof item.revenue === 'number' ? item.revenue : 0,
      growth: typeof item.growth === 'number' ? item.growth : 0,
      processingTime: item.processingTime || 'N/A',
      memoryUsage: item.memoryUsage || 'N/A',
      accuracyScore: item.accuracyScore || 'N/A',
      lastOptimization: item.lastOptimization || 'N/A',
      date: item.date || 'Unknown',
      description: item.description || 'No description available'
    }))
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      // Simulate API call with sample data
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay
      
      const sampleData = [
        { 
          id: 1, 
          name: 'Product A', 
          category: 'Electronics', 
          sales: 1250, 
          revenue: 62500, 
          growth: 12.5,
          processingTime: '1.8 seconds',
          memoryUsage: '32 MB',
          accuracyScore: '96.2%',
          lastOptimization: '1 day ago',
          date: '2024-01-15',
          description: 'High-performance electronic device with advanced features'
        },
        { 
          id: 2, 
          name: 'Product B', 
          category: 'Clothing', 
          sales: 890, 
          revenue: 26700, 
          growth: 8.2,
          processingTime: '2.1 seconds',
          memoryUsage: '28 MB',
          accuracyScore: '94.8%',
          lastOptimization: '3 days ago',
          date: '2024-01-14',
          description: 'Premium clothing item with sustainable materials'
        },
        { 
          id: 3, 
          name: 'Product C', 
          category: 'Home & Garden', 
          sales: 1560, 
          revenue: 46800, 
          growth: 15.7,
          processingTime: '1.5 seconds',
          memoryUsage: '45 MB',
          accuracyScore: '97.1%',
          lastOptimization: '5 hours ago',
          date: '2024-01-16',
          description: 'Essential home improvement product with excellent durability'
        },
        { 
          id: 4, 
          name: 'Product D', 
          category: 'Electronics', 
          sales: 2100, 
          revenue: 105000, 
          growth: 22.1,
          processingTime: '2.3 seconds',
          memoryUsage: '52 MB',
          accuracyScore: '95.9%',
          lastOptimization: '12 hours ago',
          date: '2024-01-17',
          description: 'Cutting-edge electronic innovation with smart features'
        },
        { 
          id: 5, 
          name: 'Product E', 
          category: 'Sports', 
          sales: 750, 
          revenue: 22500, 
          growth: 5.8,
          processingTime: '1.9 seconds',
          memoryUsage: '38 MB',
          accuracyScore: '93.5%',
          lastOptimization: '2 days ago',
          date: '2024-01-13',
          description: 'Professional sports equipment for enhanced performance'
        },
        { 
          id: 6, 
          name: 'Product F', 
          category: 'Books', 
          sales: 3200, 
          revenue: 48000, 
          growth: 18.3,
          processingTime: '1.2 seconds',
          memoryUsage: '25 MB',
          accuracyScore: '98.3%',
          lastOptimization: '6 hours ago',
          date: '2024-01-18',
          description: 'Bestselling book with comprehensive content and insights'
        },
        { 
          id: 7, 
          name: 'Product G', 
          category: 'Clothing', 
          sales: 1100, 
          revenue: 33000, 
          growth: 9.4,
          processingTime: '2.0 seconds',
          memoryUsage: '35 MB',
          accuracyScore: '94.1%',
          lastOptimization: '1 day ago',
          date: '2024-01-15',
          description: 'Trendy clothing item with modern design elements'
        },
        { 
          id: 8, 
          name: 'Product H', 
          category: 'Electronics', 
          sales: 1800, 
          revenue: 90000, 
          growth: 16.9,
          processingTime: '2.5 seconds',
          memoryUsage: '48 MB',
          accuracyScore: '96.7%',
          lastOptimization: '8 hours ago',
          date: '2024-01-16',
          description: 'Advanced electronic system with integrated connectivity'
        }
      ]
      
      const validatedData = validateData(sampleData)
      setData(validatedData)
      setFilteredData(validatedData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const setActiveChartType = (chartId) => {
    setActiveChart(chartId)
  }

  const updateFilteredData = (newFilteredData) => {
    setFilteredData(newFilteredData)
  }

  const value = {
    data,
    filteredData,
    loading,
    error,
    activeChart,
    setActiveChartType,
    updateFilteredData,
    refreshData: fetchData
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}