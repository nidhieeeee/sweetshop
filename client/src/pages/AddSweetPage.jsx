// import React, { useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';

// export default function AddSweetPage() {
//   const [formData, setFormData] = useState({
//     name: '',
//     category: '',
//     price: '',
//     quantity: '',
//   });

//   const [message, setMessage] = useState(null);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage(null);
//     try {
//       const res = await axios.post('http://localhost:5000/api/sweets', {
//         ...formData,
//         price: parseFloat(formData.price),
//         quantity: parseInt(formData.quantity),
//       });

//       setMessage({ type: 'success', text: res.data.message });
//       setFormData({ name: '', category: '', price: '', quantity: '' });
//     } catch (err) {
//       console.error(err);
//       setMessage({
//         type: 'error',
//         text:
//           err.response?.data?.message ||
//           'Failed to add sweet. Please check input.',
//       });
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
//         className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg"
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.2, duration: 0.4 }}
//       >
//         <h1 className="text-2xl font-bold text-center text-emerald-700 mb-6">
//           ➕ Add New Sweet
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Sweet Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
//             required
//           />
//           <input
//             type="text"
//             name="category"
//             placeholder="Category"
//             value={formData.category}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
//             required
//           />
//           <input
//             type="number"
//             name="price"
//             placeholder="Price (₹)"
//             value={formData.price}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
//             required
//           />
//           <input
//             type="number"
//             name="quantity"
//             placeholder="Quantity"
//             value={formData.quantity}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition"
//           >
//             Add Sweet
//           </button>
//         </form>

//         {message && (
//           <div
//             className={`mt-4 p-3 rounded text-center ${
//               message.type === 'success'
//                 ? 'bg-green-100 text-green-800'
//                 : 'bg-red-100 text-red-800'
//             }`}
//           >
//             {message.text}
//           </div>
//         )}
//       </motion.div>
//     </motion.div>
//   );
// }

import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function AddSweetPage() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await axios.post('http://localhost:5000/api/sweets', {
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
      });

      setMessage({ type: 'success', text: res.data.message });
      setFormData({ name: '', category: '', price: '', quantity: '' });
    } catch (err) {
      console.error(err);
      setMessage({
        type: 'error',
        text:
          err.response?.data?.message ||
          'Failed to add sweet. Please check input.',
      });
    }
  };

  return (
    <motion.div
      className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-emerald-50 p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title OUTSIDE the card */}
      <h1 className="text-3xl font-bold text-center text-emerald-700 mb-6">
        ➕ Add New Sweet
      </h1>

      {/* Form Card */}
      <motion.div
        className="w-full max-w-2xl bg-white p-10 rounded-3xl shadow-xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Sweet Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price (₹)"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition"
          >
            Add Sweet
          </button>
        </form>

        {message && (
          <div
            className={`mt-6 p-4 rounded text-center ${
              message.type === 'success'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {message.text}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

