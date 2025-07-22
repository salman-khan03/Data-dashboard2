import { Link, useLocation } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = () => {
  const location = useLocation()

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h2>Data Dashboard</h2>
      </div>
      
      <ul className="sidebar-menu">
        <li>
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'active' : ''}
          >
            📊 Dashboard
          </Link>
        </li>
        <li>
          <Link 
            to="/explorer" 
            className={location.pathname === '/explorer' ? 'active' : ''}
          >
            🔍 Data Explorer
          </Link>
        </li>
      </ul>
      
      <div className="sidebar-footer">
        <p>Explore data insights</p>
      </div>
    </nav>
  )
}

export default Sidebar