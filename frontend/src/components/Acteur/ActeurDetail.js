import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActeurDetail = ({ acteurId }) => {
  const [acteur, setActeur] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/acteurs/${acteurId}`)
      .then(response => {
        if (response.data) {
          setActeur(response.data);
          setLoading(false);
        } else {
          setError("Acteur non trouvé");
          setLoading(false);
        }
      })
      .catch(error => {
        console.error(`Erreur lors de la récupération des détails de l'acteur`, error.response ? error.response.data : error.message);
        setError("Une erreur s'est produite lors de la récupération des données");
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
          {error ? (
            <p>{error}</p>
          ) : (
            <>
              <p>ID: {acteur.id}</p>
              <p>Nom: {acteur.name}</p>
              {/* Ajouter d'autres champs selon votre besoin */}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ActeurDetail;