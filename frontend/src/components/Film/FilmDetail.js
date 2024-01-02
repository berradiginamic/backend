import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilmDetail = ({ filmId }) => {
  const [film, setFilm] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/films/${filmId}`)
      .then(response => {
        if (response.data) {
          setFilm(response.data);
          setLoading(false);
        } else {
          setError("Aucun détail trouvé pour ce film");
          setLoading(false);
        }
      })
      .catch(error => {
        console.error(`Erreur lors de la récupération des détails du film`, error.response ? error.response.data : error.message);
        setError("Une erreur s'est produite lors de la récupération des données");
        setLoading(false);
      });
  }, [filmId]);

  return (
    <div>
      <h2>Détails du film</h2>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <>
          {error ? (
            <p>{error}</p>
          ) : (
            <div>
              <p>ID: {film.id}</p>
              <p>Titre: {film.title}</p>
              <p>Date de sortie: {new Date(film.releaseDate).toLocaleDateString()}</p>
              {/* Ajouter d'autres champs selon votre besoin */}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FilmDetail;