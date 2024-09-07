
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ChartPage from './pages/ChartPage';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the root path "/" */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        {/* Route for the Dashboard and Chart pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chart" element={<ChartPage />} />
      </Routes>
    </Router>
  );
};

export default App;
