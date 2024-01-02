// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import './Home.css'; // Assurez-vous d'importer le fichier de styles CSS

const Home = () => {
  const titleAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 500, // Délai pour retarder l'animation
  });

  return (
    <div className="home-page">
      <animated.h1 style={titleAnimation} className="title">
        MovieStar
      </animated.h1>
      <img
        src={`${process.env.PUBLIC_URL}/cinemaa.jpg`}
        alt="Cinema"
        className="full-width-image"
      />
      <div className="button-container">
        <Link to="/acteurs" className="decorated-button">
          Acteurs
        </Link>
        <Link to="/films" className="decorated-button">
          Films
        </Link>
        <Link to="/realisateurs" className="decorated-button">
          Réalisateurs
        </Link>
        <Link to="/genres" className="decorated-button">
          Genres
        </Link>
      </div>
    </div>
  );
};

export default Home;