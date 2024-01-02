import React from 'react';
import './GenreButton.css';

const GenreButton = ({ genre, imageSrc, onClick }) => {
  return (
    <button className="genre-button" onClick={() => onClick(genre)}>
      <img src={imageSrc} alt={`Icon for ${genre}`} />
      <span>{genre}</span>
    </button>
  );
};

export default GenreButton;