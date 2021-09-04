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
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isloading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isloading && movies.length === 0 && !error && <p>No Movies Found!</p>}
        {!isloading && error && <p>{error}</p>}
        {isloading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
