const express = require("express");

const { MovieModel } = require("../models/movie.model");
const { UserModel } = require("../models/user.model");

const { authenticate } = require("../middleware/authenticate");

const movieRouter = express.Router();

// Get all movies
movieRouter.get("/", authenticate, async (req, res) => {
  const limit = parseInt(req.query.limit) || 15;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * limit;

  try {
    const totalMoviesCount = await MovieModel.countDocuments();
    const totalPages = Math.ceil(totalMoviesCount / limit);

    const movies = await MovieModel.find().skip(skip).limit(limit);

    res.status(200).json({ total_pages: totalPages, page, movies });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
});

// Recommended movies
movieRouter.get("/movies/recommend/:id", async (req, res) => {
  try {
    const movieId = req.params.id;

    // Find the current movie by ID
    const currentMovie = await MovieModel.findById(movieId);

    if (!currentMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Extract genres from the current movie
    const genre = currentMovie.genre;

    // Find other movies with similar genres (limit to 5)
    const recommendedMovies = await MovieModel.find({
      _id: { $ne: movieId }, // Exclude the current movie
      genre: { $in: genre }, // Find movies with at least one common genre
    }).limit(5);

    res.status(200).json({ recommendedMovies });
  } catch (error) {
    console.error("Failed to recommend movies", error);
    res.status(500).json({ message: "Failed to recommend movies" });
  }
});

// Get watchlist with the same client
movieRouter.get("/watchlist", authenticate, async (req, res) => {
  try {
    const userId = req.user.id; // User information is stored in req.user after authentication

    // Find watchlist entries with the provided user ID
    const watchlist = await WatchlistModel.find({ user: userId }).populate('movies').sort({ watchedAt: -1 });

    res.json({ watchlist });
  } catch (error) {
    console.error("Failed to retrieve watchlist", error);
    res.status(500).json({ message: "Failed to retrieve watchlist" });
  }
});

// Add a new movie
movieRouter.post("/movies/add", async (req, res) => {
  try {
    const { title, genre, releaseYear, ratings, image } = req.body;

    // Check if a movie with the same title and release year already exists
    const existingMovie = await MovieModel.findOne({ title, releaseYear });

    if (existingMovie) {
      return res.status(400).json({ message: "Movie already exists" });
    }

    // Create a new movie
    const newMovie = new MovieModel({
      title,
      genre,
      releaseYear,
      ratings,
      image,
    });

    // Save the new movie to the database
    await newMovie.save();

    res.status(201).json({ message: "Movie added successfully" });
  } catch (error) {
    console.error("Failed to add movie", error);
    res.status(500).json({ message: "Failed to add movie" });
  }
});

// Update a movie by ID
movieRouter.put("/movies/update/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const { title, genre, releaseYear, ratings, image } = req.body;

    // Find the movie by ID
    const movieToUpdate = await MovieModel.findById(movieId);

    if (!movieToUpdate) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Update movie data
    movieToUpdate.title = title || movieToUpdate.title;
    movieToUpdate.genre = genre || movieToUpdate.genre;
    movieToUpdate.releaseYear = releaseYear || movieToUpdate.releaseYear;
    movieToUpdate.ratings = ratings || movieToUpdate.ratings;
    movieToUpdate.image = image || movieToUpdate.image;

    // Save the updated movie to the database
    await movieToUpdate.save();

    res.status(200).json({ message: "Movie updated successfully" });
  } catch (error) {
    console.error("Failed to update movie", error);
    res.status(500).json({ message: "Failed to update movie" });
  }
});

// Delete a movie by ID
movieRouter.delete("/movies/delete/:id", async (req, res) => {
  try {
    const movieId = req.params.id;

    // Delete the movie from the Movie collection
    const deletedMovie = await MovieModel.findByIdAndDelete(movieId);

    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Delete documents in the Watchlist collection where the movie is referenced
    await WatchlistModel.updateMany(
      { movies: movieId },
      { $pull: { movies: movieId } }
    );

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error("Failed to delete movie", error);
    res.status(500).json({ message: "Failed to delete movie" });
  }
});

module.exports = movieRouter;
