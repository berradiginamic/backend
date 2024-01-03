// Component: ActorMovies.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActeurFilms = ({ acteurId }) => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8080/acteurs/${acteurId}/films`)
      .then(response => {
        setFilms(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(`Error fetching movies for acteur with ID ${acteurId}`, error.response ? error.response.data : error.message);
        setLoading(false);
      });
  }, [acteurId]);

  return (
    <div>
      <h2>Films de l'acteur</h2>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <ul>
          {films.map(film => (
            <li key={film.id}>{film.title} ({film.anneeSortie})</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActeurFilms;