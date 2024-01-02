import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActeurFilms = ({ acteurId }) => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/acteurs/${acteurId}/films`)
      .then(response => {
        if (response.data) {
          setFilms(response.data);
          setLoading(false);
        } else {
          setError("Aucun film trouvé pour cet acteur");
          setLoading(false);
        }
      })
      .catch(error => {
        console.error(`Erreur lors de la récupération des films pour l'acteur avec l'ID ${acteurId}`, error.response ? error.response.data : error.message);
        setError("Une erreur s'est produite lors de la récupération des données");
        setLoading(false);
      });
  }, [acteurId]);

  return (
    <div>
      <h2>Films de l'acteur</h2>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <>
          {error ? (
            <p>{error}</p>
          ) : (
            <ul>
              {films.map(film => (
                <li key={film.id}>{film.title} ({film.anneeSortie})</li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default ActeurFilms;