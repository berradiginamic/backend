import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActeurForm = ({ acteurId }) => {
  const [acteur, setActeur] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (acteurId) {
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

  const handleInputChange = (fieldName, value) => {
    setActeur({ ...acteur, [fieldName]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Ajoutez ici la logique de validation si nécessaire

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
          {Object.keys(acteur).map(fieldName => (
            <div key={fieldName}>
              <label>{fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:</label>
              <input
                type="text"
                value={acteur[fieldName] || ''}
                onChange={(e) => handleInputChange(fieldName, e.target.value)}
              />
            </div>
          ))}

          <button type="submit">Soumettre</button>
        </form>
      )}
    </div>
  );
};

export default ActeurForm;