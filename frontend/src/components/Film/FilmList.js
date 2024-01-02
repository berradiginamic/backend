import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { Link } from 'react-router-dom';

const FilmList = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/films')
      .then(response => {
        if (response.data) {
          setFilms(response.data);
          setLoading(false);
        } else {
          setError("Aucun film trouvé");
          setLoading(false);
        }
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des films', error.response ? error.response.data : error.message);
        setError("Une erreur s'est produite lors de la récupération des données");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h2>Liste des films</h2>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <>
          {error ? (
            <p>{error}</p>
          ) : (
            <ul>
              {films.map(film => (
                <li key={film.id}>
                  {film.title}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
};

export default FilmList;