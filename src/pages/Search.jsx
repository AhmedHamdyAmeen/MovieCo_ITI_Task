import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../network/config";
import LanguageContext from "./../context/language";

import MovieCard from "../components/MovieCard/MovieCard";
import Loader from "./../components/Loader/Loader";

function Search() {
  const [movieList, setMovieList] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let [page, setPage] = useState(1);
  const params = useParams();



  useEffect(() => {
    axiosInstance
      .get(`/3/search/movie?query=${params.key}&page=${page}`)
      .then((res) => {
        // console.log(params.id);
        setPage(params.page);
        setMovieList(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [params, page]);

  // console.log(movieList);
  // console.log(movieList.results);
  console.log(movieList.total_pages, "Total pages");
  console.log(page, "current page");

  const goBack = (e) => {
    console.log(page);
    if (page > 1) {
      setPage(page--);
    }
  };
  const goNext = (e) => {
    console.log(page);
    if (page < movieList.total_pages) {
      setPage(page++);
    }
  };

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
          <Link to={`/search/${params.key}/${page > 1 ? +page - 1 : page}`}>
            {" "}
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
            to={`/search/${params.key}/${
              page < movieList.total_pages ? +page + 1 : page
            }`}
          >
            {" "}
            Next -&gt;
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Search;
