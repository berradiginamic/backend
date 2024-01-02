import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActeurList = () => {
  const [acteurs, setActeurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/acteurs')
      .then(response => {
        setActeurs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des acteurs', error.response ? error.response.data : error.message);
        setError("Une erreur s'est produite lors de la récupération des données");
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Liste des acteurs</h2>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <>
          {error ? (
            <p>{error}</p>
          ) : (
            <ul>
              {acteurs.map(acteur => (
                <li key={acteur.id}>
                  {acteur.nom} - <a href={`/acteur/${acteur.id}`}>Détails</a>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default ActeurList;