import React, { useState, useEffect } from 'react';
  import axios from 'axios';

  const ActeurDetail = ({ acteurId }) => {
    const [acteur, setActeur] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Faire une requête GET à votre endpoint backend pour récupérer les détails de l'acteur
      axios.get(`http://localhost:8080/acteurs/${acteurId}`)
        .then(response => {
          setActeur(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error(`Erreur lors de la récupération des détails de l'acteur`, error.response ? error.response.data : error.message);
          setLoading(false);
        });
    }, [acteurId]);

    return (
      <div>
        <h2>Détails de l'acteur</h2>
        {loading ? (
          <p>Chargement en cours...</p>
        ) : (
          <div>
            <p>ID: {acteur.id}</p>
            <p>Nom: {acteur.name}</p>
            {/* Ajouter d'autres champs selon votre besoin */}
          </div>
        )}
      </div>
    );
  };

  export default ActeurDetail;