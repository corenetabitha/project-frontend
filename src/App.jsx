import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Library from './pages/Library';

function App() {
  return (
    <Router>
      <div className="p-6">
    <Routes>
      <Route path="/library" element={<Library/>} />
    </Routes>
  </div>
</Router>
  );
}

export default App;