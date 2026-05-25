import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar.jsx';
import Home from './pages/Home.jsx';
import CompanyDetails from './pages/CompanyDetails.jsx';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="app-container">
      <Navbar onSearch={setSearchTerm} />
      <main>
        <Routes>
          <Route path="/" element={<Home globalSearch={searchTerm} />} />
          <Route path="/company/:id" element={<CompanyDetails />} />
          <Route path="/signup" element={<div style={{ padding: '2rem', textAlign: 'center' }}><h1>Sign Up Page</h1></div>} />
          <Route path="/login" element={<div style={{ padding: '2rem', textAlign: 'center' }}><h1>Login Page</h1></div>} />
          <Route path="*" element={
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h1>404 - Page Not Found</h1>
            </div>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
