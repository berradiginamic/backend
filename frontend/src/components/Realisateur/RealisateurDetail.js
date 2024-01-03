import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RealisateurDetail = () => {
  const { id } = useParams();
  const [realisateur, setRealisateur] = useState({});
  const [films, setFilms] = useState([]);

  useEffect(() => {
    // Create a cancel token source
    const source = axios.CancelToken.source();

    // Faire une requête GET à votre endpoint backend pour récupérer les détails du réalisateur
    axios.get(`http://localhost:8080/realisateurs/${id}`, {
      cancelToken: source.token,
    })
      .then(response => setRealisateur(response.data))
      .catch(error => {
        if (!axios.isCancel(error)) {
          console.error(`Erreur lors de la récupération des détails du réalisateur avec l'ID ${id}`, error);
        }
      });

    // Faire une requête GET à votre endpoint backend pour récupérer les films du réalisateur
    axios.get(`http://localhost:8080/realisateurs/${id}/films`, {
      cancelToken: source.token,
    })
      .then(response => setFilms(response.data))
      .catch(error => {
        if (!axios.isCancel(error)) {
          console.error(`Erreur lors de la récupération des films du réalisateur avec l'ID ${id}`, error);
        }
      });

    // Cleanup function to cancel the axios requests when the component is unmounted
    return () => {
      source.cancel('Component unmounted');
    };
  }, [id]);

  return (
    <div>
      <h2>Détails du réalisateur</h2>
      <p>Nom: {realisateur.name}</p>
      <h3>Films réalisés par {realisateur.name}</h3>
      <ul>
        {films.map(film => (
          <li key={film.id}>{film.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default RealisateurDetail;