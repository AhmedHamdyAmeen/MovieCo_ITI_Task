import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import MovieCard from "../components/MovieCard/MovieCard";

function Favorites() {
  const [isFavFound, setIsFavFound] = useState(false);
  const favorites = useSelector((state) => state.fav.favorites);
  console.log("favorites: ", favorites);
  // console.log("favorites id", favorites.data.id);

  useEffect(() => {
    favorites ? setIsFavFound(true) : setIsFavFound(false);
  }, [favorites]);

  return (
    <div className="container py-5">
      {isFavFound ? (
        <div className="row py-5 row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {favorites.map((movie) => (
            <MovieCard data={movie.data} key={movie.data.id} />
          ))}
        </div>
      ) : (
        <div className="fs-1 text-center ">Favorites is Empty 😥🤷‍♀️</div>
      )}
    </div>
  );
}

export default Favorites;
