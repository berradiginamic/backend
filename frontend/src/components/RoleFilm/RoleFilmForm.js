import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoleFilmForm = ({ roleFilmId }) => {
  const [roleFilm, setRoleFilm] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (roleFilmId) {
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
    } else {
      setLoading(false);
    }
  }, [roleFilmId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Send form data to your backend endpoint for creating or updating the roleFilm
    const endpoint = roleFilmId ? `http://localhost:8080/rolefilms/roleFilmId` : 'http://localhost:8080/rolefilms';

    axios({
      method: roleFilmId ? 'put' : 'post',
      url: endpoint,
      data: roleFilm,
    })
      .then(response => {
        console.log('Form data submitted successfully', response.data);
        // Redirect or perform other actions after creation or update
      })
      .catch(error => console.error('Error submitting form data', error.response ? error.response.data : error.message));
  };

  return (
    <div>
      <h2>RoleFilm Form</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleFormSubmit}>
          {/* Create form fields based on the structure of your roleFilm */}
          <label>Name:</label>
          <input type="text" value={roleFilm.name || ''} onChange={(e) => setRoleFilm({ ...roleFilm, name: e.target.value })} />

          {/* Add other fields as needed */}

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default RoleFilmForm;