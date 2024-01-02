import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilmForm = ({ filmId }) => {
  const [film, setFilm] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (filmId) {
      axios.get(`http://localhost:8080/films/${filmId}`)
        .then(response => {
          setFilm(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error(`Erreur lors de la récupération des détails du film avec l'ID ${filmId}`, error.response ? error.response.data : error.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [filmId]);

  const handleInputChange = (fieldName, value) => {
    setFilm({ ...film, [fieldName]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Ajoutez ici la logique de validation si nécessaire

    const endpoint = filmId ? `http://localhost:8080/films/${filmId}` : 'http://localhost:8080/films';

    axios({
      method: filmId ? 'put' : 'post',
      url: endpoint,
      data: film,
    })
      .then(response => {
        console.log('Données du formulaire envoyées avec succès', response.data);
        // Rediriger ou effectuer d'autres actions après la création ou la mise à jour
      })
      .catch(error => {
        console.error('Erreur lors de l\'envoi des données du formulaire', error.response ? error.response.data : error.message);
        setError("Une erreur s'est produite lors de l'envoi des données du formulaire");
      });
  };

  return (
    <div>
      <h2>Formulaire du film</h2>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <>
          {error ? (
            <p>{error}</p>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <label>Titre:</label>
              <input type="text" value={film.title || ''} onChange={(e) => handleInputChange('title', e.target.value)} />

              <label>Date de sortie:</label>
              <input type="date" value={film.releaseDate || ''} onChange={(e) => handleInputChange('releaseDate', e.target.value)} />

              {/* Ajouter d'autres champs selon votre besoin */}

              <button type="submit">Soumettre</button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default FilmForm;