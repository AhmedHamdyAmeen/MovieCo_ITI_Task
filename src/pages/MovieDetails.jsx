import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../network/config";

import Loader from "../components/Loader/Loader";
import LanguageContext from "./../context/language";

function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  const { contextLang, setContextLang } = useContext(LanguageContext);

  // https://api.themoviedb.org/3/movie/popular?api_key=99dbba108d81c1a48d5136fb6e3ebbe7

  useEffect(() => {
    axiosInstance
      .get(`/3/movie/${params.id}?language=${contextLang}`)
      .then((res) => {
        console.log(res.data);
        console.log(params.id);
        setMovieDetails(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="movieDetails py-5">
          <img
            className="w-100"
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`}
            alt=""
          />
          <div className="">
            <ul>
              <li className="card-header"> Title: {`${movieDetails.title}`}</li>
              <li className="card-header">
                Tagline: {`${movieDetails.tagline}`}
              </li>
              <li> Adult: {`${movieDetails.adult}`}</li>
              <li> Budget: {`${movieDetails.budget}$`}</li>
              <ul>
                Genres:
                {movieDetails.genres.map((m) => (
                  <li key={m.id}>{`   -   ${m.name}`}</li>
                ))}
              </ul>
              <li> Language: {`${movieDetails.original_language}`}</li>
              <li> Adult: {`${movieDetails.adult}`}</li>
            </ul>
            <p className=""> Overview: {`${movieDetails.overview}`}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
