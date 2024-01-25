import React, { useState } from 'react';

const AddMovie = () => {
  const [movieData, setMovieData] = useState({
    title: '',
    genre: '',
    releaseYear: '',
    ratings: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to the backend to add a new movie
      const response = await fetch('https://cyan-wide-eyed-angelfish.cyclic.app/movies/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      });

      if (response.ok) {
        // Movie added successfully
        console.log('Movie added successfully');
        // You can also redirect or update the UI as needed
      } else {
        // Handle errors if any
        console.error('Failed to add movie');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={movieData.title} onChange={handleChange} required />
        </label>
        <label>
          Genre:
          <input type="text" name="genre" value={movieData.genre} onChange={handleChange} required />
        </label>
        <label>
          Release Year:
          <input type="number" name="releaseYear" value={movieData.releaseYear} onChange={handleChange} required />
        </label>
        <label>
          Ratings:
          <input type="number" name="ratings" value={movieData.ratings} onChange={handleChange} required />
        </label>
        <label>
          Image URL:
          <input type="url" name="image" value={movieData.image} onChange={handleChange} required />
        </label>
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;
