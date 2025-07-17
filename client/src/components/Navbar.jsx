// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';

// export default function Navbar() {
//   const location = useLocation();

//   const isActive = (path) =>
//     location.pathname === path ? 'text-emerald-700 font-bold underline' : '';

//   return (
//     <nav className="bg-emerald-100 py-4 shadow-sm">
//       <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-emerald-800">🍭 Sweet Shop</h1>

//         <div className="space-x-4">
//           <Link to="/" className={`hover:text-emerald-600 ${isActive('/')}`}>
//             Home
//           </Link>
//           <Link to="/add" className={`hover:text-emerald-600 ${isActive('/add')}`}>
//             Add Sweet
//           </Link>
//           <Link to="/search" className={`hover:text-emerald-600 ${isActive('/search')}`}>
//             Search
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // install lucide-react for icons

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path ? 'text-emerald-700 font-bold underline' : '';

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-emerald-100 py-4 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-emerald-800">🍭 Sweet Shop</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className={`hover:text-emerald-600 ${isActive('/')}`}>
            Home
          </Link>
          <Link to="/add" className={`hover:text-emerald-600 ${isActive('/add')}`}>
            Add Sweet
          </Link>
          <Link to="/search" className={`hover:text-emerald-600 ${isActive('/search')}`}>
            Search
          </Link>
        </div>

        {/* Mobile Burger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-emerald-50 rounded-b-lg shadow-inner">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className={`block hover:text-emerald-600 ${isActive('/')}`}
          >
            Home
          </Link>
          <Link
            to="/add"
            onClick={() => setMenuOpen(false)}
            className={`block hover:text-emerald-600 ${isActive('/add')}`}
          >
            Add Sweet
          </Link>
          <Link
            to="/search"
            onClick={() => setMenuOpen(false)}
            className={`block hover:text-emerald-600 ${isActive('/search')}`}
          >
            Search
          </Link>
        </div>
      )}
    </nav>
  );
}
