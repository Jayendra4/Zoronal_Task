import React from 'react';
import './LetterAvatar.css';

const LetterAvatar = ({ name, fontSize = '2rem' }) => {
  const firstLetter = name ? name.charAt(0).toUpperCase() : '?';

  return (
    <div className="letter-avatar" style={{ fontSize }}>
      {firstLetter}
    </div>
  );
};

export default LetterAvatar;
