// utils.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const renderRatingStars = (rating) => {
  const stars = [];
  const yellowColor = '#ffd700'; // Yellow color code
  for (let i = 0; i < rating; i++) {
    stars.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: yellowColor }} />);
  }
  return stars;
};

export default renderRatingStars;
