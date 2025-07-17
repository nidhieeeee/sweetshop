import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HomePage() {
  const [sweets, setSweets] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    fetchSweets();
  }, [sortBy, order]);

  const fetchSweets = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/sweets`, {
        params: { sortBy, order },
      });
      setSweets(res.data.data);
    } catch (err) {
      console.error('Failed to fetch sweets:', err);
    }
  };

  return (
    <motion.div
      className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-start p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-emerald-800 text-center mt-10">
        🍬 All Sweets
      </h1>

      <div className="flex gap-4 mb-6">
        <select
          className="border p-2 rounded"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="category">Category</option>
          <option value="quantity">Quantity</option>
        </select>

        <select
          className="border p-2 rounded"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>

      {/* Empty State */}
      {sweets.length === 0 ? (
        <div className="text-center text-gray-600 mt-10 text-xl">
          📭 Your database is empty. No sweets added yet!
        </div>
      ) : (
        <motion.ul
          className="space-y-4 w-full max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 1 },
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {sweets.map((sweet) => (
            <motion.li
              key={sweet._id}
              className="border p-4 rounded-md shadow hover:shadow-lg transition bg-white"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h2 className="text-xl font-semibold text-emerald-700 text-center">
                {sweet.name}
              </h2>
              <p className="text-center">Category: {sweet.category}</p>
              <p className="text-center">Price: ₹{sweet.price}</p>
              <p className="text-center">Quantity: {sweet.quantity}</p>
              <div className="text-center mt-2">
                <Link
                  to={`/sweets/${sweet._id}`}
                  className="text-blue-600 underline"
                >
                  View / Manage
                </Link>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
}
