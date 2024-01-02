// Genres.js
import React, { useState, useEffect } from 'react';
import GenreList from './GenreList';
import axios from 'axios';

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Charger la liste des genres lors du montage du composant
    axios.get('http://localhost:8080/genres')
      .then(response => {
        setGenres(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des genres', error.response ? error.response.data : error.message);
        setError("Une erreur s'est produite lors de la récupération des genres");
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Liste des genres</h2>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <>
          {error ? (
            <p>{error}</p>
          ) : (
            <GenreList genres={genres} />
          )}
        </>
      )}
    </div>
  );
};

export default Genres;