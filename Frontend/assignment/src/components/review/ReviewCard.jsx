import React from 'react';
import { FaStar, FaRegStar, FaThumbsUp, FaShareAlt } from 'react-icons/fa';
import './ReviewCard.css';

const ReviewCard = ({ review, onLike }) => {
  const {
    _id,
    fullName,
    subject,
    reviewText,
    rating,
    likes,
    createdAt
  } = review;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? <FaStar key={i} /> : <FaRegStar key={i} />);
    }
    return stars;
  };

  const formattedDate = new Date(createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="review-card">
      <div className="reviewer-avatar">
        {getInitials(fullName)}
      </div>
      
      <div className="review-content">
        <div className="review-header">
          <div className="reviewer-info">
            <h4>{fullName}</h4>
            <span className="review-date">{formattedDate}</span>
          </div>
          <div className="review-rating">
            {renderStars(rating)}
          </div>
        </div>

        <div className="review-subject">{subject}</div>
        <p className="review-text">{reviewText}</p>

        <div className="review-actions">
          <button className="action-btn" onClick={() => onLike(_id)}>
            <FaThumbsUp /> Like ({likes})
          </button>
          <button className="action-btn">
            <FaShareAlt /> Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
