import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../network/config";

import MovieCard from "../components/MovieCard/MovieCard";
import Loader from "./../components/Loader/Loader";
import LanguageContext from "./../context/language";

function Movies() {
  const [movieList, setMovieList] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let [page, setPage] = useState(1);
  const params = useParams();

  const { contextLang, setContextLang } = useContext(LanguageContext);

  // https://api.themoviedb.org/3/movie/popular?api_key=99dbba108d81c1a48d5136fb6e3ebbe7

  // https://api.themoviedb.org/3/movie/338953?api_key=99dbba108d81c1a48d5136fb6e3ebbe7

  // https://api.themoviedb.org/3/search/movie?api_key=7a1c19ea3c361a4d3cc53eb70ef8298c&query=SearchKey

  // https://api.themoviedb.org/3/movie/popular?api_key={api_key=99dbba108d81c1a48d5136fb6e3ebbe7}&page=4

  useEffect(() => {
    axiosInstance
      .get(`/3/movie/popular?page=${page}&language=${contextLang}`)
      .then((res) => {
        // console.log(res.data);
        setPage(params.page);
        setMovieList(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [page, contextLang]);

  console.log(movieList);
  console.log(contextLang);
  // console.log(movieList.results);

  const goBack = (e) => {
    console.log(page);
    if (page > 1) {
      setPage(page--);
    }
  };
  const goNext = (e) => {
    if (page < movieList.total_pages) {
      setPage(page++);
    }
    // console.log(page, "goNext");
  };
  // console.log(page, "outer");

  return (
    <div className="container py-5">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="row py-5 row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {movieList.results.map((movie) => (
            <MovieCard data={movie} key={movie.id} />
          ))}
        </div>
      )}
      <div className="d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-lg btn-warning"
          onClick={goBack}
        >
          <Link to={`/movie/${page > 1 ? +page - 1 : page}`}>
            &lt;- Previous
          </Link>
        </button>
        <span>
          {page} from {movieList.total_pages}
        </span>
        <button
          type="button"
          className="btn btn-lg btn-warning"
          onClick={goNext}
        >
          <Link
            to={`/movie/${page < movieList.total_pages ? +page + 1 : page}`}
          >
            Next -&gt;
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Movies;
