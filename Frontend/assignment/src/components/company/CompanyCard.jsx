import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import LetterAvatar from '../common/LetterAvatar.jsx';
import './CompanyCard.css';

const CompanyCard = ({ company }) => {
  const [imgError, setImgError] = useState(false);

  const {
    _id,
    name,
    logo,
    address,
    foundedOn,
    averageRating,
    totalReviews
  } = company;

  const handleImageError = () => {
    setImgError(true);
  };

  // Function to render stars based on rating
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

  const formattedDate = new Date(foundedOn).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div className="card company-card">
      <div className="company-logo-container">
        {logo && !imgError ? (
          <img 
            src={logo} 
            alt={name} 
            className="company-logo" 
            onError={handleImageError}
          />
        ) : (
          <LetterAvatar name={name} fontSize="2.5rem" />
        )}
      </div>
      
      <div className="company-info">
        <div className="company-header">
          <h3 className="company-name">{name}</h3>
          <span className="company-founded">Founded on {formattedDate}</span>
        </div>
        
        <div className="company-address">
          <FaMapMarkerAlt /> {address}
        </div>
        
        <div className="company-rating-section">
          <span className="rating-value">{averageRating}</span>
          <div className="stars">
            {renderStars(averageRating)}
          </div>
          <span className="review-count">{totalReviews} Reviews</span>
        </div>
      </div>

      <Link to={`/company/${_id}`} className="btn-detail-review">
        Detail Review
      </Link>
    </div>
  );
};

export default CompanyCard;
