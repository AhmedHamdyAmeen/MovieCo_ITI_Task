import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import ContextLanguageSwitcher from "./../LangSwitcher/LangSwitcher";
import LanguageContext from "./../../context/language";

function NavbarComponent() {
  const [searchKey, setSearchKey] = useState("");
  const [favCount, setFavCount] = useState(0);
  const favorites = useSelector((state) => state.fav.favorites);

  const { contextLang, setContextLang } = useContext(LanguageContext);

  useEffect(() => {
    countFavorite();
  }, [favorites]);

  const handleChange = (event) => {
    setSearchKey(event.target.value);
  };
  console.log(searchKey);

  const countFavorite = () => {
    // console.log(favorites);
    let count = favorites.length;
    setFavCount(count);
    console.log("favorites items", count);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light text-light bg-transparent">
      <div className="container-fluid">
        <a
          className="navbar-brand text-warning fw-bolder me-5 fst-italic fs-3"
          href="#home"
        >
          {contextLang === "en" ? "MovieCo" : "افلامكوا"}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav navTabs me-auto mb-2 mb-lg-0">
            <li className="nav-item text-warning">
              <Link
                style={{
                  color: "#ffc107",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
                to={`/movie/1`}
              >
                {contextLang === "en" ? "Movies" : "الأفلام"}
              </Link>
            </li>
            <li className="nav-item text-warning">
              <Link
                style={{
                  color: "#ffc107",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
                to="/favorites"
              >
                {contextLang === "en" ? "favorite" : "المفضلة"}
                <span>( {favCount} )</span>
              </Link>
            </li>
            <li className="nav-item text-warning">
              <ContextLanguageSwitcher />
            </li>
          </ul>
          <form className="d-flex">
            <input
              autoComplete="off"
              className="form-control me-2"
              type="search"
              id="search"
              placeholder="Search"
              aria-label="Search"
              value={searchKey.key}
              onChange={handleChange}
            />
            <button className="btn btn-outline-success" type="submit">
              <Link to={`/search/${searchKey}/1/${contextLang}`}>Search</Link>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default NavbarComponent;
