import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="app-header">
      <div className="container nav-inner">
        <h1 className="site-title">Meal Explorer</h1>
        <nav aria-label="Main navigation" className="main-nav">
          <NavLink
            to="/list"
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
          >
            List
          </NavLink>
          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
          >
            Gallery
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
