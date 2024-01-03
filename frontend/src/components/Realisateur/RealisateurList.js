// RealisateurList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RealisateurList = () => {
  const [realisateurs, setRealisateurs] = useState([]);
  const [filteredRealisateurs, setFilteredRealisateurs] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    // Faire une requête GET à votre endpoint backend
    axios.get('http://localhost:8080/realisateurs')
      .then(response => setRealisateurs(response.data))
      .catch(error => console.error('Erreur lors de la récupération des realisateurs', error));
  }, []);

  const handleSearch = () => {
    console.log(`Search ID: ${searchInput}`);
    const filteredRealisateurs = realisateurs.filter(
      (realisateur) => realisateur.id && realisateur.id.toString() === searchInput.toString()
    );
    console.log('Filtered Realisateurs:', filteredRealisateurs);
    setFilteredRealisateurs(filteredRealisateurs);
  };

  return (
    <div>
      <h2>Liste des realisateurs</h2>
      <label htmlFor="searchInput">Rechercher par ID: </label>
      <input
        type="text"
        id="searchInput"
        placeholder="Entrez un ID"
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={handleSearch}>Rechercher</button>
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