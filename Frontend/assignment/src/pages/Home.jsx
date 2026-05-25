import React, { useState, useEffect, useCallback } from 'react';
import { FaMapMarkerAlt, FaPlus, FaSearch } from 'react-icons/fa';
import { companyAPI } from '../api/api.js';
import CompanyCard from '../components/company/CompanyCard.jsx';
import AddCompanyModal from '../components/company/AddCompanyModal.jsx';
import Spinner from '../components/common/Spinner.jsx';
import './Home.css';

const Home = ({ globalSearch }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Search and Filter States
  const [city, setCity] = useState('Indore'); // Default city as per Figma
  const [sort, setSort] = useState('name');

  const fetchCompanies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        sort: sort,
        city: city !== '' ? city : undefined,
        search: globalSearch !== '' ? globalSearch : undefined
      };

      const response = await companyAPI.getAll(params);
      setCompanies(response.data);
    } catch (err) {
      setError(err || 'Failed to fetch companies');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [sort, city, globalSearch]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies, globalSearch, sort]); // Added sort to dependencies for instant update on change

  const handleSearch = (e) => {
    // We can implement debouncing here if needed
    // For now, it will fetch on every city/sort change and "Find Company" click
  };

  return (
    <div className="home-container">
      <div className="controls-section">
        <div className="left-controls">
          <div className="city-selector-wrapper">
            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.25rem', color: '#6b7280' }}>Select City</label>
            <input 
              type="text" 
              className="city-input"
              placeholder="Enter city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <FaMapMarkerAlt className="location-icon" />
          </div>
          <button className="btn-primary" onClick={fetchCompanies}>Find Company</button>
        </div>

        <div className="right-controls">
          <button className="btn-add-company" onClick={() => setIsModalOpen(true)}>
            <FaPlus /> Add Company
          </button>
          <div className="sort-wrapper">
            <span className="sort-label">Sort:</span>
            <select 
              className="sort-select" 
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="rating">Average Rating</option>
              <option value="latest">Latest</option>
            </select>
          </div>
        </div>
      </div>

      <div className="results-count">
        Result Found: {companies.length}
      </div>

      <div className="company-list">
        {loading ? (
          <div className="loading-state">
            <Spinner size="lg" />
            <p>Searching for companies...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p>Oops! {error}</p>
            <button className="btn-primary" onClick={fetchCompanies} style={{ marginTop: '1rem' }}>
              Try Again
            </button>
          </div>
        ) : companies.length > 0 ? (
          companies.map((company) => (
            <CompanyCard key={company._id} company={company} />
          ))
        ) : (
          <div className="empty-state">
            <FaSearch style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.2 }} />
            <h3>No companies found</h3>
            <p>Try adjusting your search or city filters to find what you're looking for.</p>
          </div>
        )}
      </div>

      <AddCompanyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchCompanies} 
      />
    </div>
  );
};

export default Home;
