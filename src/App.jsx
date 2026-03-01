import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from '@/Pages/Home'
import ITServices from '@/Pages/ITServices'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/it-services" element={<ITServices />} />
    </Routes>
  )
}

export default App
