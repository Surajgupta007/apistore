import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Weather from './pages/Weather'
import Recipe from './pages/Recipe'
import Products from './pages/Products'
import Movies from './pages/Movies'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <Navigation />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/recipes" element={<Recipe />} />
          <Route path="/products" element={<Products />} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
