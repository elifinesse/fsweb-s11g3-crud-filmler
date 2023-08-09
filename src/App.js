import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import MovieList from "./components/MovieList";
import Movie from "./components/Movie";
import EditMovieForm from "./components/EditMovieForm";

import MovieHeader from "./components/MovieHeader";

import FavoriteMovieList from "./components/FavoriteMovieList";

import axios from "axios";
import { MovieContext } from "./components/MovieContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const { push } = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/movies")
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
    push("/movies");
  };

  const addToFavorites = (movie) => {
    setFavoriteMovies([...favoriteMovies, movie]);
  };

  return (
    <div>
      <MovieContext.Provider
        value={{ movies, setMovies, addToFavorites, deleteMovie }}
      >
        <nav className="bg-zinc-800 px-6 py-3">
          <h1 className="text-xl text-white">HTTP / CRUD Film Projesi</h1>
        </nav>

        <div className="max-w-4xl mx-auto px-3 pb-4">
          <MovieHeader />
          <div className="flex flex-col sm:flex-row gap-4">
            <FavoriteMovieList favoriteMovies={favoriteMovies} />

            <Switch>
              <Route path="/movies/edit/:id">
                <EditMovieForm />
              </Route>

              <Route path="/movies/:id">
                <Movie />
              </Route>

              <Route path="/movies">
                <MovieList movies={movies} />
              </Route>

              <Route path="/">
                <Redirect to="/movies" />
              </Route>
            </Switch>
          </div>
        </div>
      </MovieContext.Provider>
    </div>
  );
};

export default App;
