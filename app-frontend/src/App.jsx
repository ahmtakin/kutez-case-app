import { useState } from 'react'
import './App.css'

import HomePage from './pages/HomePage';

const App = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <HomePage />
    </div>
  );
};

export default App;
