import { useState } from 'react';
import Modal from '../common/Modal';
import { companyAPI } from '../../api/api';
import Spinner from '../common/Spinner';

const AddCompanyModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '', // used for "Location" field
    foundedOn: '',
    city: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Default description for backend validation if required
      const submissionData = {
        ...formData,
        description: `A company located in ${formData.city}`, 
      };
      await companyAPI.create(submissionData);
      // Wait for re-fetch to complete before closing modal for best UX
      await onSuccess();
      onClose();
      setFormData({ name: '', address: '', foundedOn: '', city: '' });
    } catch (err) {
      setError(err || 'Failed to add company');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Company">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Company name</label>
          <input 
            type="text" name="name" required 
            value={formData.name} onChange={handleChange} 
            placeholder="Enter..."
          />
        </div>

        <div className="form-group" style={{ position: 'relative' }}>
          <label>Location</label>
          <input 
            type="text" name="address" required 
            value={formData.address} onChange={handleChange}
            placeholder="Select Location"
            style={{ paddingRight: '2.5rem' }}
          />
          <span style={{ position: 'absolute', right: '1rem', top: '2.7rem', color: '#64748b' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          </span>
        </div>

        <div className="form-group" style={{ position: 'relative' }}>
          <label>Founded on</label>
          <input 
            type="date" name="foundedOn" required 
            value={formData.foundedOn} onChange={handleChange}
            style={{ paddingRight: '2.5rem' }}
          />
        </div>

        <div className="form-group">
          <label>City</label>
          <input 
            type="text" name="city" required 
            value={formData.city} onChange={handleChange}
            placeholder="Indore"
          />
        </div>

        {error && <div className="form-error" style={{ marginBottom: '1rem' }}>{error}</div>}

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <button type="submit" className="btn-primary" disabled={loading} style={{ minWidth: '120px', justifyContent: 'center', padding: '0.6rem 2rem' }}>
            {loading ? <Spinner size="sm" color="white" /> : 'Save'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddCompanyModal;
