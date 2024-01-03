import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RealisateurForm = () => {
  const { id } = useParams();
  const [realisateur, setRealisateur] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Faire une requête GET à votre endpoint backend pour récupérer les détails du réalisateur
      axios.get(`http://localhost:8080/realisateurs/${id}`)
        .then(response => {
          setRealisateur(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error(`Erreur lors de la récupération des détails du réalisateur avec l'ID ${id}`, error.response ? error.response.data : error.message);
          setLoading(false);
        });
    }
  }, [id]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Envoyer les données du formulaire à votre endpoint backend pour la création ou la mise à jour du réalisateur
    axios.post('http://localhost:8080/realisateurs', realisateur)
      .then(response => {
        console.log('Données du formulaire envoyées avec succès', response.data);
        // Rediriger ou effectuer d'autres actions après la création ou la mise à jour
      })
      .catch(error => console.error('Erreur lors de l\'envoi des données du formulaire', error.response ? error.response.data : error.message));
  };

  return (
    <div>
      <h2>Formulaire du réalisateur</h2>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <form onSubmit={handleFormSubmit}>
          {/* Créer les champs de formulaire en fonction de la structure de votre réalisateur */}
          <label>Nom:</label>
          <input type="text" value={realisateur.name || ''} onChange={(e) => setRealisateur({ ...realisateur, name: e.target.value })} />

          {/* Ajouter d'autres champs selon votre besoin */}

          <button type="submit">Soumettre</button>
        </form>
      )}
    </div>
  );
};

export default RealisateurForm;