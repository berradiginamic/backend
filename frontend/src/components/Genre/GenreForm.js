// GenreForm.js
import React, { useState, useEffect } from 'react';
import GenreList from './GenreList';
import axios from 'axios';

const GenreForm = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = () => {
    console.log('Fetching genres...');
    // Faire une requête pour obtenir la liste des genres depuis l'API
    axios.get('http://localhost:8080/genres')
      .then(response => {
        console.log('Genres récupérés avec succès:', response.data);
        setGenres(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des genres', error);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Envoyer les données du formulaire à votre endpoint backend pour la création du genre
    axios.post('http://localhost:8080/genres', { name })
      .then(response => {
        console.log('Genre créé avec succès', response.data);
        // Actualiser la liste des genres
        fetchGenres();
      })
      .catch(error => console.error('Erreur lors de la création du genre', error.response ? error.response.data : error.message));
  };

  return (
    <div>
      <h2>Formulaire du genre</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Nom:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button type="submit">Ajouter</button>
      </form>

      {/* Afficher la liste des genres */}
      <h2>Liste des genres</h2>
      <GenreList genres={genres} />
    </div>
  );
};

export default GenreForm;