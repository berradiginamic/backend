import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GenreFilms = () => {
  const { genreId } = useParams();
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenreFilms = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/films/byGenre/${genreId}`);
        setFilms(response.data);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching films for the genre ${genreId}`, error);
        setError("Une erreur s'est produite lors de la récupération des films.");
        setLoading(false);
      }
    };

    if (genreId) {
      fetchGenreFilms();
    } else {
      setLoading(false);
    }
  }, [genreId]);

  return (
    <div>
      <h2>Liste des films pour le genre {genreId}</h2>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {films.map(film => (
            <li key={film.id}>{film.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GenreFilms;