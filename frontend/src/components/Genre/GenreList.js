// GenreList.js
import React from 'react';
import GenreButton from './GenreButton';

const GenreList = ({ genres, handleGenreClick }) => {
  if (!genres || genres.length === 0) {
    console.log("Aucun genre disponible.");
    return <p>Aucun genre disponible.</p>;
  }

  return (
    <div className="genre-list">
      {genres.map((genre) => (
        <GenreButton
          key={genre.genreId}
          genre={genre.type}
          // Ajoutez une vérification pour les valeurs nulles ou vides
          imageSrc={genre.type ? `${process.env.PUBLIC_URL}/images/${genre.type.toLowerCase()}.png` : ''}
          onClick={handleGenreClick}
        />
      ))}
    </div>
  );
};

export default GenreList;