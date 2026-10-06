import { Navigate, Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import DetailView from './pages/DetailView'
import GalleryView from './pages/GalleryView'
import ListView from './pages/ListView'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/list" replace />} />
          <Route path="/list" element={<ListView />} />
          <Route path="/gallery" element={<GalleryView />} />
          <Route path="/meal/:id" element={<DetailView />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
