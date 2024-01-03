// Genres.js
import React from 'react';
import GenreList from './GenreList';

const Genres = () => {
  const genres = [
    { id: 11, name: 'Western', imageSrc: `${process.env.PUBLIC_URL}/images/western.png` },
    { id: 1, name: 'Drama', imageSrc: `${process.env.PUBLIC_URL}/images/drama.jpg` }
    // Ajoutez d'autres genres ici
  ];

  return (
    <div>
      <h2>Liste des genres</h2>
      <GenreList genres={genres} />
    </div>
  );
};

export default Genres;