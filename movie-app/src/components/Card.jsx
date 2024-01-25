import React from 'react';
import './card.css';

const Card = ({ movie }) => {
    const { _id, title, genre, releaseYear, ratings, image } = movie;
  
    return (
      <div className="movie-card" key={_id}>
        <img src={image} alt={title} className="card-image" />
        <div className="card-details">
          <h2 className="card-title">{title}</h2>
          {genre && <p className="card-genre">Genre: {genre.join(', ')}</p>}
          <p className="card-year">Release Year: {releaseYear}</p>
          <p className="card-ratings">Ratings: {ratings}</p>
        </div>
      </div>
    );
  };

export default Card;
