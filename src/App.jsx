import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { DataProvider } from './context/DataContext'
import Dashboard from './components/Dashboard'
import DetailView from './components/DetailView'
import DataExplorer from './components/DataExplorer'
import Sidebar from './components/Sidebar'
import './App.css'

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="app">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/item/:id" element={<DetailView />} />
              <Route path="/explorer" element={<DataExplorer />} />
            </Routes>
          </main>
        </div>
      </Router>
    </DataProvider>
  )
}

export default App
