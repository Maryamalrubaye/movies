import React, { useState }  from 'react';


import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,setMovies]=useState([])
  function fetchMoviesHandler() {
    fetch('https://swapi.dev/api/films').then((response) => {return response.json()}).then((data) => {
      const translatedMovies = data.results.map(movieDate=>{
        return{
          id : movieDate.episode_id,
          title : movieDate.title,
          openingText : movieDate.opening_crawl,
          releaseDate : movieDate.release_date

        }
      });
      setMovies(translatedMovies)
    })
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;