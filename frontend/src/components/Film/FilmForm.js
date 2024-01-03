import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilmForm = ({ filmId }) => {
  const [film, setFilm] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (filmId) {
      // Faire une requête GET à votre endpoint backend pour récupérer les détails du film
      axios.get(`http://localhost:8080/films/${filmId}`)
        .then(response => {
          setFilm(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error(`Erreur lors de la récupération des détails du film`, error.response ? error.response.data : error.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [filmId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Envoyer les données du formulaire à votre endpoint backend pour la création ou la mise à jour du film
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
      .catch(error => console.error('Erreur lors de l\'envoi des données du formulaire', error.response ? error.response.data : error.message));
  };

  return (
    <div>
      <h2>Formulaire du film</h2>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <form onSubmit={handleFormSubmit}>
          {/* Créer les champs de formulaire en fonction de la structure de votre film */}
          <label>Titre:</label>
          <input type="text" value={film.title || ''} onChange={(e) => setFilm({ ...film, title: e.target.value })} />

          <label>Date de sortie:</label>
          <input type="date" value={film.releaseDate || ''} onChange={(e) => setFilm({ ...film, releaseDate: e.target.value })} />

          {/* Ajouter d'autres champs selon votre besoin */}

          <button type="submit">Soumettre</button>
        </form>
      )}
    </div>
  );
};

export default FilmForm;