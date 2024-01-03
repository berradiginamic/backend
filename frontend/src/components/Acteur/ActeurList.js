import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActeurList = () => {
  const [acteurs, setActeurs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Faire une requête GET à votre endpoint backend
    axios.get('http://localhost:8080/acteurs')
      .then(response => {
        setActeurs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des acteurs', error.response ? error.response.data : error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Liste des acteurs</h2>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <ul>
          {acteurs.map(acteur => (
            <li key={acteur.id}>{acteur.nom}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActeurList;