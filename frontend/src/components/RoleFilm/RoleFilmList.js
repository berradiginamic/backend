import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RoleFilmList = () => {
  const [roleFilms, setRoleFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make a GET request to your backend endpoint to fetch the list of roleFilms
    axios.get('http://localhost:8080/rolefilms')
      .then(response => {
        setRoleFilms(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching roleFilms', error.response ? error.response.data : error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>List of RoleFilms</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {roleFilms.map(roleFilm => (
            <li key={roleFilm.id}>
              <Link to={`/rolefilms/${roleFilm.id}`}>{roleFilm.name}</Link> {/* Link to details */}
              {' | '}
              <Link to={`/rolefilms/edit/${roleFilm.id}`}>Edit</Link> {/* Link to edit form */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RoleFilmList;