import './App.css'
import { Route, Routes} from 'react-router-dom';
import Nav from './components/Nav'
import Home from './pages/Home';
import About from './pages/About';
import Movie from './pages/Movie';

const App = () => {
  return (
    <div className="App">
      <div className="space"></div>
      <Nav></Nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/movies" element={<Movie />} />
        </Routes>
      </main>
      </div>
  )
}

export default App