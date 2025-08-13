import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/NavBar';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="min-h-screen bg-base-200">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="*" element={
              <div className="text-center py-20">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-xl">Página no encontrada</p>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
