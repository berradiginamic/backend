import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FilmList = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Faire une requête GET à votre endpoint backend pour récupérer la liste des films
    axios.get('http://localhost:8080/films')
      .then(response => {
        setFilms(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des films', error.response ? error.response.data : error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Liste des films</h2>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <ul>
          {films.map(film => (
            <li key={film.id}>
              <Link to={`/films/${film.id}`}>{film.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilmList;