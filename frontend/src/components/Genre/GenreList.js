import React from 'react';
import GenreButton from './GenreButton';

const GenreList = ({ genres, handleGenreClick }) => {
  console.log('Genres:', genres);

  if (!genres || genres.length === 0) {
    console.log("Aucun genre disponible.");
    return <p>Aucun genre disponible.</p>;
  }

  return (
    <div className="genre-list">
      {genres.map((genre) => {
        console.log('Genre:', genre); // Ajoutez cette ligne pour afficher chaque genre
        if (genre && genre.id && genre.name && genre.imageSrc) {
          return (
            <GenreButton
              key={genre.id}
              genre={genre.name}
              imageSrc={genre.imageSrc}
              onClick={handleGenreClick}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default GenreList;