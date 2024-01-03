// Component: EditFilm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditFilm = ({ filmId }) => {
  const [film, setFilm] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8080/films/${filmId}`)
      .then(response => {
        setFilm(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(`Error fetching film details for ID ${filmId}`, error.response ? error.response.data : error.message);
        setLoading(false);
      });
  }, [filmId]);

  const handleFormSubmit = (formData) => {
    axios.put(`http://localhost:8080/films/${filmId}`, formData)
      .then(response => {
        console.log('Film data updated successfully', response.data);
        // Redirect or perform other actions after update
      })
      .catch(error => console.error('Error updating film data', error.response ? error.response.data : error.message));
  };

  return (
    <div>
      <h2>Modifier le film</h2>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <label>Titre:</label>
          <input type="text" value={film.title} onChange={(e) => setFilm({ ...film, title: e.target.value })} />
          {/* Ajouter d'autres champs selon votre besoin */}
          <button type="submit">Enregistrer les modifications</button>
        </form>
      )}
    </div>
  );
};

export default EditFilm;

