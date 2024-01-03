import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilmDetail = ({ filmId }) => {
  const [film, setFilm] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Faire une requête GET à votre endpoint backend pour récupérer les détails du film
    axios.get(`http://localhost:8080/films/${filmId}`)
      .then(response => {
        setFilm(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(`Erreur lors de la récupération des détails du film`, error.response ? error.response.data : error.message);
        setLoading(false);
      });
  }, [filmId]);

  return (
    <div>
      <h2>Détails du film</h2>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <div>
          <p>ID: {film.id}</p>
          <p>Titre: {film.title}</p>
          <p>Date de sortie: {film.releaseDate}</p>
          {/* Ajouter d'autres champs selon votre besoin */}
        </div>
      )}
    </div>
  );
};

export default FilmDetail;