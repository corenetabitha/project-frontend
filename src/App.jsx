import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/HomePage'
import Admin from './pages/Admin'


function App() {
  const [count, setCount] = useState(0)

  return (

    <Router>
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/admin" element={<Admin />}/>
      </Routes>
    </Router>

  )
}

export default App
