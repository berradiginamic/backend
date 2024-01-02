import React, { useState, useEffect } from 'react';
import GenreList from './GenreList';
import axios from 'axios';

const GenreForm = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Charger la liste des genres lors du montage du composant
    fetchGenres();
  }, []);

  const fetchGenres = () => {
    // Faire une requête pour obtenir la liste des genres depuis l'API
    axios.get('http://localhost:8080/genres')
      .then(response => setGenres(response.data))
      .catch(error => console.error('Erreur lors de la récupération des genres', error))
      .finally(() => setLoading(false));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Envoyer les données du formulaire à votre endpoint backend pour la création du genre
    axios.post('http://localhost:8080/genres', { name })
      .then(response => {
        console.log('Genre créé avec succès', response.data);
        // Réinitialiser le champ du formulaire et actualiser la liste des genres
        setName('');
        fetchGenres();
      })
      .catch(error => {
        console.error('Erreur lors de la création du genre', error.response ? error.response.data : error.message);
        setError('Erreur lors de la création du genre. Veuillez réessayer.');
      });
  };

  return (
    <div>
      <h2>Formulaire du genre</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Nom:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button type="submit">Ajouter</button>
      </form>

      {/* Afficher la liste des genres uniquement s'il y en a */}
      {genres.length > 0 && (
        <>
          <h2>Liste des genres</h2>
          <GenreList genres={genres} />
        </>
      )}

      {/* Afficher les erreurs */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default GenreForm;