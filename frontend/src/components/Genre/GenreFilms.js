// GenreFilms.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GenreFilms = () => {
  const { genreId } = useParams();
  const [films, setFilms] = useState([]);

  useEffect(() => {
    // Make a request to fetch the list of films for the specified genre
    axios.get(`http://localhost:8080/films/byGenre/${genreId}`)
      .then(response => setFilms(response.data))
      .catch(error => console.error(`Error fetching films for the genre ${genreId}`, error));
  }, [genreId]);

  return (
    <div>
      <h2>Liste des films pour le genre {genreId}</h2>
      <ul>
        {films.map(film => (
          <li key={film.id}>{film.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default GenreFilms;