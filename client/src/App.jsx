import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home'
import AddSweetPage from './pages/AddSweetPage'
import SearchPage from './pages/SearchPage';
import SweetDetailPage from './pages/SweetDetailsPage';

export default function App() {
  return (
    <div className="min-h-screen bg-emerald-50">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddSweetPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/sweets/:id" element={<SweetDetailPage />} />
      </Routes>
    </div>
  );
}
