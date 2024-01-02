import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoleFilmDetail = ({ roleFilmId }) => {
  const [roleFilm, setRoleFilm] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make a GET request to your backend endpoint to fetch roleFilm details
    axios.get(`http://localhost:8080/rolefilms/${roleFilmId}`)
      .then(response => {
        setRoleFilm(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(`Error fetching roleFilm details`, error.response ? error.response.data : error.message);
        setLoading(false);
      });
  }, [roleFilmId]);

  return (
    <div>
      <h2>RoleFilm Details</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>ID: {roleFilm.id}</p>
          <p>Name: {roleFilm.name}</p>
          {/* Add other fields as needed */}
        </div>
      )}
    </div>
  );
};

export default RoleFilmDetail;