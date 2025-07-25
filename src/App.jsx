import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Bookstore from './pages/Bookstore';
import Admin from './pages/AdminPage';
import Cart from './pages/Cart';
import CartProvider from './context/CartProvider';

function App() {
  return (
    <CartProvider>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Bookstore />} />  
            <Route path="/admin" element={<Admin />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<h1 className="text-center text-2xl mt-10">404 - Page Not Found</h1>} />
          </Route>
        </Routes>
    </CartProvider>
  );
}

export default App;
