import { useState } from 'react';
import Modal from '../common/Modal';
import { FaStar } from 'react-icons/fa';
import { reviewAPI } from '../../api/api';
import Spinner from '../common/Spinner';

const AddReviewModal = ({ isOpen, onClose, companyId, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    subject: '',
    reviewText: '',
    rating: 0
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRating = (value) => {
    setFormData({ ...formData, rating: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.rating === 0) {
      setError('Please select a rating');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await reviewAPI.create({ ...formData, companyId });
      onSuccess();
      onClose();
      setFormData({ fullName: '', subject: '', reviewText: '', rating: 0 });
    } catch (err) {
      setError(err || 'Failed to add review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Review">
      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <label style={{ fontSize: '1.1rem' }}>Overall Rating</label>
          <div className="star-rating-input" style={{ justifyContent: 'center' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar 
                key={star}
                className={`star-icon ${(hoverRating || formData.rating) >= star ? 'active' : ''}`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleRating(star)}
              />
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            name="fullName" 
            required 
            value={formData.fullName} 
            onChange={handleChange}
            placeholder="e.g. John Doe"
          />
        </div>
        <div className="form-group">
          <label>Subject</label>
          <input 
            type="text" 
            name="subject" 
            required 
            value={formData.subject} 
            onChange={handleChange}
            placeholder="e.g. Great work environment"
          />
        </div>
        <div className="form-group">
          <label>Review Text</label>
          <textarea 
            name="reviewText" 
            required 
            rows="4"
            value={formData.reviewText} 
            onChange={handleChange}
            placeholder="Share your experience..."
          ></textarea>
        </div>

        {error && <div className="form-error" style={{ marginBottom: '1rem' }}>{error}</div>}

        <div className="modal-footer" style={{ padding: '1rem 0 0 0', border: 'none' }}>
          <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading} 
            style={{ minWidth: '140px', justifyContent: 'center' }}
          >
            {loading ? <Spinner size="sm" color="white" /> : 'Submit Review'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddReviewModal;
