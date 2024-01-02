import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditFilm = ({ filmId }) => {
  const [film, setFilm] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/films/${filmId}`)
      .then(response => {
        setFilm(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(`Erreur lors de la récupération des détails du film avec l'ID ${filmId}`, error.response ? error.response.data : error.message);
        setLoading(false);
      });
  }, [filmId]);

  const handleInputChange = (fieldName, value) => {
    setFilm({ ...film, [fieldName]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Ajoutez ici la logique de validation si nécessaire

    axios.put(`http://localhost:8080/films/${filmId}`, film)
      .then(response => {
        console.log('Données du film mises à jour avec succès', response.data);
        // Rediriger ou effectuer d'autres actions après la mise à jour
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour des données du film', error.response ? error.response.data : error.message);
        setError("Une erreur s'est produite lors de la mise à jour des données du film");
      });
  };

  return (
    <div>
      <h2>Modifier le film</h2>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <>
          {error ? (
            <p>{error}</p>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <label>Titre:</label>
              <input type="text" value={film.title} onChange={(e) => handleInputChange('title', e.target.value)} />
              {/* Ajouter d'autres champs selon votre besoin */}
              <button type="submit">Enregistrer les modifications</button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default EditFilm;