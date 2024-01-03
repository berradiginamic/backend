import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GenreDetail = ({ genreId }) => {
  const [genre, setGenre] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenreDetails = async () => {
      // Vérifiez si genreId est défini avant de faire la requête
      if (!genreId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/genres/${genreId}`);
        setGenre(response.data);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching genre details`, error.response ? error.response.data : error.message);
        setLoading(false);
      }
    };

    fetchGenreDetails();
  }, [genreId]); // Utilisez genreId comme dépendance

  return (
    <div>
      <h2>Genre Details</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>ID: {genre.id}</p>
          <p>Name: {genre.name}</p>
          {/* Ajoutez d'autres champs au besoin */}
        </div>
      )}
    </div>
  );
};

export default GenreDetail;