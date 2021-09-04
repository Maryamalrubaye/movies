import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films");
      if (!response.ok) {
        throw new Error("Somthing went wrong!");
      }
      const data = await response.json();
      const translatedMovies = data.results.map((movieDate) => {
        return {
          id: movieDate.episode_id,
          title: movieDate.title,
          openingText: movieDate.opening_crawl,
          releaseDate: movieDate.release_date,
        };
      });
      setMovies(translatedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }
  let content = <p>No Movies Found!</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (isloading) {
    content = <p>Loading...</p>;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
