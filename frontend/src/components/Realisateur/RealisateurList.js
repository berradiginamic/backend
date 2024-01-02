import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RealisateurList = () => {
  const [realisateurs, setRealisateurs] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    // Faire une requête GET à votre endpoint backend
    axios.get('http://localhost:8080/realisateurs')
      .then(response => setRealisateurs(response.data))
      .catch(error => console.error('Erreur lors de la récupération des realisateurs', error));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Search ID: ${searchInput}`);
  };

  const filteredRealisateurs = realisateurs.filter(
    (realisateur) => realisateur.id && realisateur.id.toString() === searchInput.toString()
  );

  return (
    <div>
      <h2>Liste des realisateurs</h2>
      <form onSubmit={handleSearch}>
        <label htmlFor="searchInput">Rechercher par ID: </label>
        <input
          type="text"
          id="searchInput"
          placeholder="Entrez un ID"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit">Rechercher</button>
      </form>
      <ul>
        {filteredRealisateurs.map(realisateur => (
          <li key={realisateur.id}>
            {realisateur.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RealisateurList;