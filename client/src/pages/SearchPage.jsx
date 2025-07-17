// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';

// export default function SearchPage() {
//   const [filters, setFilters] = useState({
//     name: '',
//     category: '',
//     min: '',
//     max: '',
//   });

//   const [results, setResults] = useState([]);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     setFilters({
//       ...filters,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       const query = Object.entries(filters)
//         .filter(([_, v]) => v !== '')
//         .map(([k, v]) => `${k}=${v}`)
//         .join('&');

//       const res = await axios.get(`http://localhost:5000/api/sweets/search?${query}`);
//       setResults(res.data.data);
//     } catch (err) {
//       console.error(err);
//       setError('Search failed. Please check your inputs.');
//     }
//   };

//   return (
//     <motion.div
//       className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-emerald-50 p-6"
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <motion.div
//         className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-xl"
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.2, duration: 0.4 }}
//       >
//         <h1 className="text-2xl font-bold text-center text-emerald-700 mb-6">🔍 Search Sweets</h1>

//         <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={filters.name}
//             onChange={handleChange}
//             className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
//           />
//           <input
//             type="text"
//             name="category"
//             placeholder="Category"
//             value={filters.category}
//             onChange={handleChange}
//             className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
//           />
//           <input
//             type="number"
//             name="min"
//             placeholder="Min Price"
//             value={filters.min}
//             onChange={handleChange}
//             className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
//           />
//           <input
//             type="number"
//             name="max"
//             placeholder="Max Price"
//             value={filters.max}
//             onChange={handleChange}
//             className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
//           />
//           <button
//             type="submit"
//             className="col-span-1 sm:col-span-2 bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition"
//           >
//             Search
//           </button>
//         </form>

//         {error && <div className="text-red-600 text-center mb-4">{error}</div>}

//         {results.length > 0 ? (
//           <ul className="space-y-4">
//             {results.map((sweet) => (
//               <motion.li
//                 key={sweet._id}
//                 className="border p-4 rounded-md shadow hover:shadow-lg transition bg-gray-50"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//               >
//                 <h2 className="text-xl font-semibold text-emerald-700">{sweet.name}</h2>
//                 <p>Category: {sweet.category}</p>
//                 <p>Price: ₹{sweet.price}</p>
//                 <p>Available: {sweet.quantity}</p>
//                 <Link
//                   to={`/sweets/${sweet._id}`}
//                   className="text-blue-600 underline mt-2 inline-block"
//                 >
//                   View Details
//                 </Link>
//               </motion.li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-center text-gray-600 mt-4">
//             {error ? '' : '🔎 No results yet. Try searching!'}
//           </p>
//         )}
//       </motion.div>
//     </motion.div>
//   );
// }

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function SearchPage() {
  const [filters, setFilters] = useState({
    name: '',
    category: '',
    min: '',
    max: '',
  });

  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const query = Object.entries(filters)
        .filter(([_, v]) => v !== '')
        .map(([k, v]) => `${k}=${v}`)
        .join('&');

      const res = await axios.get(`http://localhost:5000/api/sweets/search?${query}`);
      setResults(res.data.data);
    } catch (err) {
      console.error(err);
      setError('Search failed. Please check your inputs.');
    }
  };

  return (
    <motion.div
      className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-emerald-50 p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title OUTSIDE Card */}
      <h1 className="text-3xl font-bold text-center text-emerald-700 mb-6">
        🔍 Search Sweets
      </h1>

      {/* Card */}
      <motion.div
        className="w-full max-w-4xl bg-white p-10 rounded-3xl shadow-xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {/* Form */}
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={filters.name}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={filters.category}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <input
            type="number"
            name="min"
            placeholder="Min Price"
            value={filters.min}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <input
            type="number"
            name="max"
            placeholder="Max Price"
            value={filters.max}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <button
            type="submit"
            className="col-span-1 sm:col-span-2 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition"
          >
            Search
          </button>
        </form>

        {/* Error Message */}
        {error && <div className="text-red-600 text-center mb-6">{error}</div>}

        {/* Search Results */}
        {results.length > 0 ? (
          <ul className="space-y-4">
            {results.map((sweet) => (
              <motion.li
                key={sweet._id}
                className="border p-4 rounded-md shadow hover:shadow-lg transition bg-gray-50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-xl font-semibold text-emerald-700">{sweet.name}</h2>
                <p>Category: {sweet.category}</p>
                <p>Price: ₹{sweet.price}</p>
                <p>Available: {sweet.quantity}</p>
                <Link
                  to={`/sweets/${sweet._id}`}
                  className="text-blue-600 underline mt-2 inline-block"
                >
                  View Details
                </Link>
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600 mt-4">
            {error ? '' : '🔎 No results yet. Try searching!'}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
