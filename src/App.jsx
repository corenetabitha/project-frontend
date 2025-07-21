import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import DashboardLayout from './components/DashboardLayout';
import BookList from './components/BookList';

import Bookstore from './pages/Bookstore';
import Admin from './pages/AdminPage';

function App() {
  const [refreshListKey, setRefreshListKey] = useState(0);

  const handleBookAdded = () => {
    setRefreshListKey(prevKey => prevKey + 1);
  };

  return (
    <Routes>

      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Bookstore />} />
        <Route path="/books" element={<BookList key={refreshListKey} />} />
        <Route path="/admin" element={<Admin />} />
       <Route path="*" element={<h1 className="text-center text-2xl mt-10">404 - Page Not Found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;




// // src/App.jsx
// import React, { useState } from 'react';
// import { Routes, Route } from 'react-router-dom';

// // Components
// import DashboardLayout from './components/DashboardLayout';
// import BookForm from './components/BookForm';
// import BookList from './components/BookList';

// // Pages
// import Bookstore from './pages/Bookstore';
// import Admin from './pages/AdminPage';

// function App() {
//   const [refreshListKey, setRefreshListKey] = useState(0);

//   const handleBookAdded = () => {
//     setRefreshListKey(prevKey => prevKey + 1);
//   };

//   return (
//     <Routes>

//       <Route element={<DashboardLayout />}>
//         <Route path="/" element={<Bookstore />} />


//         <Route path="/books" element={<BookList key={refreshListKey} />} />


//         <Route
//           path="/admin"
//           element={
//             <Admin>
//               <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
//                 <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900">BOOKED Admin</h1>
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                   <div className="lg:col-span-1">
//                     <BookForm onBookAdded={handleBookAdded} />
//                   </div>
//                   <div className="lg:col-span-2">
//                     <BookList key={refreshListKey} />
//                   </div>
//                 </div>
//               </div>
//             </Admin>
//           }
//         />

//         <Route path="*" element={<h1 className="text-center text-2xl mt-10">404 - Page Not Found</h1>} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;

