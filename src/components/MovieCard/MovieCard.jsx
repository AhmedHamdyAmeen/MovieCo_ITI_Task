import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFavorite } from "../../reduxStore/actions/favorites";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function MovieCard({
  data: { title, overview, id, poster_path: Path, vote_average },
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  // console.log(id);
  // console.log(favorites);

  const addFavMovie = () => {
    dispatch(
      addFavorite({
        data: {
          title,
          overview,
          id,
          poster_path: Path,
          vote_average,
        },
      })
    );
    setIsFavorite(true);
  };

  return (
    <div className="col">
      <div className="card text-black h-100">
        <img
          className="ard-img-top"
          src={`https://image.tmdb.org/t/p/w500/${Path}`}
          alt=""
        />
        <div className="card-body position-relative d-flex flex-column">
          <h5 className="card-title movieCardTitle text-center text-capitalize my-3">
            {title}
          </h5>

          <div className="info d-flex justify-content-around">
            <p className="card-title">Rate: {vote_average}</p>
            <div className="position">
              <button className="btn" onClick={addFavMovie}>
                <FontAwesomeIcon
                  style={isFavorite ? { color: "red" } : { color: "green" }}
                  icon={faHeart}
                />
              </button>
            </div>
          </div>

          <Link
            to={`/movie-details/${id}`}
            className="btn btn-warning my-4  moveDetailBtn"
          >
            Go to details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
