import React, { useEffect, useState } from 'react';
import './movies.css';
import Card from '../components/Card';

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch movies data from your backend API
    fetch('https://cyan-wide-eyed-angelfish.cyclic.app/movies/')
      .then(response => response.json())
      .then(data => setMovies(data.movies))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  return (
    <div>
      <h2>Movies</h2>
      <div className="movies-container">
      {movies && movies.map(movie => (
        <Card key={movie._id} movie={movie} />
      ))}
    </div>
    </div>
  );
}

export default Movies;
