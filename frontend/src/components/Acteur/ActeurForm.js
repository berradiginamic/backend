import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActeurForm = ({ acteurId }) => {
  const [acteur, setActeur] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (acteurId) {
      // Faire une requête GET à votre endpoint backend pour récupérer les détails de l'acteur
      axios.get(`http://localhost:8080/api/acteurs/${acteurId}`)
        .then(response => {
          setActeur(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error(`Erreur lors de la récupération des détails de l'acteur`, error.response ? error.response.data : error.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [acteurId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Envoyer les données du formulaire à votre endpoint backend pour la création ou la mise à jour de l'acteur
    const endpoint = acteurId ? `http://localhost:8080/acteurs/${acteurId}` : 'http://localhost:8080/acteurs';

    axios({
      method: acteurId ? 'put' : 'post',
      url: endpoint,
      data: acteur,
    })
      .then(response => {
        console.log('Données du formulaire envoyées avec succès', response.data);
        // Rediriger ou effectuer d'autres actions après la création ou la mise à jour
      })
      .catch(error => console.error('Erreur lors de l\'envoi des données du formulaire', error.response ? error.response.data : error.message));
  };

  return (
    <div>
      <h2>Formulaire de l'acteur</h2>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <form onSubmit={handleFormSubmit}>
          {/* Créer les champs de formulaire en fonction de la structure de votre acteur */}
          <label>Nom:</label>
          <input type="text" value={acteur.name || ''} onChange={(e) => setActeur({ ...acteur, name: e.target.value })} />

          {/* Ajouter d'autres champs selon votre besoin */}

          <button type="submit">Soumettre</button>
        </form>
      )}
    </div>
  );
};

export default ActeurForm;