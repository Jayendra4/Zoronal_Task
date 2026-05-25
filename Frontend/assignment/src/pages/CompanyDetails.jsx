import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaStar, FaRegStar, FaStarHalfAlt, FaPlus, FaArrowLeft, FaRegComments } from 'react-icons/fa';
import { companyAPI, reviewAPI } from '../api/api';
import ReviewCard from '../components/review/ReviewCard';
import AddReviewModal from '../components/review/AddReviewModal';
import Spinner from '../components/common/Spinner';
import LetterAvatar from '../components/common/LetterAvatar';
import './CompanyDetails.css';

const CompanyDetails = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [sort, setSort] = useState('latest');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const fetchCompanyDetails = useCallback(async () => {
    try {
      setLoading(true);
      const response = await companyAPI.getOne(id);
      setCompany(response.data);
    } catch (err) {
      console.error('Error fetching company:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchReviews = useCallback(async () => {
    try {
      setReviewsLoading(true);
      const response = await reviewAPI.getByCompany(id, { sort });
      setReviews(response.data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setReviewsLoading(false);
    }
  }, [id, sort]);

  useEffect(() => {
    fetchCompanyDetails();
  }, [fetchCompanyDetails]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleSuccess = () => {
    fetchCompanyDetails();
    fetchReviews();
  };

  const handleLike = async (reviewId) => {
    try {
      await reviewAPI.like(reviewId);
      fetchReviews();
    } catch (err) {
      console.error('Error liking review:', err);
    }
  };

  const handleImageError = () => {
    setImgError(true);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FaStar key={i} />);
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(<FaStarHalfAlt key={i} />);
      } else {
        stars.push(<FaRegStar key={i} />);
      }
    }
    return stars;
  };

  if (loading) return (
    <div className="details-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <Spinner size="lg" />
    </div>
  );
  
  if (!company) return (
    <div className="details-container" style={{ textAlign: 'center', padding: '5rem' }}>
      <h2>Company not found</h2>
      <Link to="/" className="btn-primary" style={{ marginTop: '1rem' }}>Return to Home</Link>
    </div>
  );

  return (
    <div className="details-container">
      <Link to="/" className="action-btn" style={{ marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
        <FaArrowLeft /> Back to List
      </Link>

      <div className="company-details-header">
        <div className="company-meta">
          <div className="details-logo">
            {company.logo && !imgError ? (
              <img 
                src={company.logo} 
                alt={company.name} 
                onError={handleImageError}
              />
            ) : (
              <LetterAvatar name={company.name} fontSize="3.5rem" />
            )}
          </div>
          <div className="company-text">
            <h1>{company.name}</h1>
            <div className="address">
              <FaMapMarkerAlt /> {company.address}
            </div>
            <div className="company-stats">
              <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>{company.averageRating}</span>
              <div style={{ color: '#fbbf24', display: 'flex', gap: '0.25rem' }}>
                {renderStars(company.averageRating)}
              </div>
              <span style={{ color: 'var(--text-muted)' }}>{company.totalReviews} Reviews</span>
            </div>
          </div>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <FaPlus /> Add Review
        </button>
      </div>

      <div className="reviews-section">
        <div className="reviews-section-header">
          <h3>Reviews</h3>
          <div className="sort-wrapper">
            <span style={{ marginRight: '0.5rem', fontWeight: 500 }}>Sort:</span>
            <select 
              className="review-sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="latest">Latest</option>
              <option value="rating">Rating</option>
              <option value="likes">Likes</option>
            </select>
          </div>
        </div>

        <div className="reviews-list-container">
          {reviewsLoading ? (
            <div style={{ padding: '3rem', textAlign: 'center' }}>
              <Spinner size="md" />
              <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Fetching reviews...</p>
            </div>
          ) : reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewCard key={review._id} review={review} onLike={handleLike} />
            ))
          ) : (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <FaRegComments style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.2 }} />
              <h3>No reviews yet</h3>
              <p>Be the first to share your experience with {company.name}!</p>
            </div>
          )}
        </div>
      </div>

      <AddReviewModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        companyId={id} 
        onSuccess={handleSuccess} 
      />
    </div>
  );
};

export default CompanyDetails;
