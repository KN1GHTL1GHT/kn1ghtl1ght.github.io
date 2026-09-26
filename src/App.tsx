import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import Header from './components/Header/Header'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Devlogs from './pages/Devlogs'
import './App.scss'

function App() {
  return (
    <BrowserRouter>
      <div className="site">
        <div className="panel">
          <Header />
          <div className="panel-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/devlogs" element={<Devlogs />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
