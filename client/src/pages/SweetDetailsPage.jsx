import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SweetDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sweet, setSweet] = useState(null);
  const [purchaseQty, setPurchaseQty] = useState('');
  const [restockQty, setRestockQty] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchSweet();
  }, []);

  const fetchSweet = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/sweets`);
      const found = res.data.data.find((s) => s._id === id);
      setSweet(found);
    } catch (err) {
      console.error('Error fetching sweet:', err);
    }
  };

// 🛒 Purchase Handler
const handlePurchase = async () => {
  try {
    const res = await axios.post(
      `http://localhost:5000/api/sweets/${id}/purchase`,
      { quantity: parseInt(purchaseQty) }
    );
    setMessage({ type: 'success', text: res.data.message });
    setSweet(res.data.data);
    setPurchaseQty('');
  } catch (err) {
    setMessage({
      type: 'error',
      text: err.response?.data?.message || 'Purchase failed.',
    });
  }
};


// 📦 Restock Handler
const handleRestock = async () => {
  try {
    const res = await axios.post(
      `http://localhost:5000/api/sweets/${id}/restock`,
      { quantity: parseInt(restockQty) }
    );
    setMessage({ type: 'success', text: res.data.message });
    setSweet(res.data.data);
    setRestockQty('');
  } catch (err) {
    setMessage({
      type: 'error',
      text: err.response?.data?.message || 'Restock failed.',
    });
  }
};


  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this sweet?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/sweets/${id}`);
      navigate('/');
    } catch (err) {
      setMessage({
        type: 'error',
        text: 'Failed to delete sweet.',
      });
    }
  };

  if (!sweet) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{sweet.name}</h1>
      <p><strong>Category:</strong> {sweet.category}</p>
      <p><strong>Price:</strong> ₹{sweet.price}</p>
      <p><strong>Available Quantity:</strong> {sweet.quantity}</p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Purchase Quantity:</label>
          <input
            type="number"
            value={purchaseQty}
            onChange={(e) => setPurchaseQty(e.target.value)}
            className="p-2 border w-full rounded"
          />
          <button
            onClick={handlePurchase}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Purchase
          </button>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Restock Quantity:</label>
          <input
            type="number"
            value={restockQty}
            onChange={(e) => setRestockQty(e.target.value)}
            className="p-2 border w-full rounded"
          />
          <button
            onClick={handleRestock}
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Restock
          </button>
        </div>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete Sweet
        </button>
      </div>

      {message && (
        <div
          className={`mt-6 p-3 rounded ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
