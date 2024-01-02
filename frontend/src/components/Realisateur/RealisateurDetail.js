import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RealisateurDetail = () => {
  const { id } = useParams();
  const [realisateur, setRealisateur] = useState({});
  const [films, setFilms] = useState([]);
  const [loadingRealisateur, setLoadingRealisateur] = useState(true);
  const [loadingFilms, setLoadingFilms] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchRealisateurDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/realisateurs/${id}`, {
          cancelToken: source.token,
        });
        setRealisateur(response.data);
        setLoadingRealisateur(false);
      } catch (error) {
        if (!axios.isCancel(error)) {
          setError(`Erreur lors de la récupération des détails du réalisateur avec l'ID ${id}`);
          setLoadingRealisateur(false);
        }
      }
    };

    const fetchRealisateurFilms = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/realisateurs/${id}/films`, {
          cancelToken: source.token,
        });
        setFilms(response.data);
        setLoadingFilms(false);
      } catch (error) {
        if (!axios.isCancel(error)) {
          setError(`Erreur lors de la récupération des films du réalisateur avec l'ID ${id}`);
          setLoadingFilms(false);
        }
      }
    };

    // Execute both requests concurrently
    Promise.all([fetchRealisateurDetails(), fetchRealisateurFilms()])
      .catch(error => console.error('Erreur lors de la récupération des données', error));

    return () => {
      source.cancel('Component unmounted');
    };
  }, [id]);

  if (loadingRealisateur || loadingFilms) {
    return <p>Chargement en cours...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

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