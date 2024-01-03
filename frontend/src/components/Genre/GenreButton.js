// GenreButton.js
import React from 'react';
import './GenreButton.css';

const GenreButton = ({ genre, imageSrc, onClick }) => {
  return (
    <button className="genre-button" onClick={() => onClick(genre)}>
      <img src={imageSrc} alt={genre} />
      {genre}
    </button>
  );
};

export default GenreButton;