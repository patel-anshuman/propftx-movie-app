# Movie Listing App

## Overview

This application serves as a movie management system, allowing users to browse, add, update, and recommend movies. It also includes a watchlist feature for users to keep track of their favorite movies.

## Features

- Browse Movies
- Add and Update Movies
- Movie Recommendations - Get movie recommendations based on the genre of a current movie.
- Watchlist - View the watchlist, sorted by the most recently watched movies.

## Usage

### Backend

1. Locate to `backend` folder
2. Install dependencies: `npm install`
3. Run the application: `npm run server` for run or `npm run dev` for development. (Server starts at port 4000 and you can access it at `http://localhost:4000`)

### Frontend

1. Locate to `movie-app` folder.
2. Install dependencies: `npm install`
3. Run the application: `npm run start` (Application starts at port 3000)

## API Endpoints

- `GET` `/movies`: Retrieve a paginated list of movies.
- `GET` `/movies/recommend/:id`: Get movie recommendations based on the genre of a given movie.
- `GET` `/movies/watchlist`: View the watchlist, sorted by the most recently watched movies.
- `POST` `/movies/add`: Add a new movie.
- `PUT` `/movies/update/:id`: Update a movie by it's ID.
- `DELETE` `/movies/delete/:id`: Delete a movie by it's ID.

## Frontend Usage

