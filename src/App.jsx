import { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Suspense } from "react";
import LanguageContext from "./context/language";

import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Favorites from "./pages/Favorites";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";

import Loader from "./components/Loader/Loader";

import "./App.css";

function App() {
  const [contextLang, setContextLang] = useState("en");

  let lang = contextLang;

  return (
    <div className="App">
      <Router>
        <LanguageContext.Provider value={{ contextLang, setContextLang }}>
          <div
            dir={lang === "ar" ? "rtl" : "ltr"}
            className={`${lang === "ar" ? "text-right" : "text-left"}`}
          >
            <Navbar />
            <div className="container">
              <Suspense fallback={<Loader />}>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/movie/:page?/:lang?" exact component={Movies} />
                  <Route
                    path="/search/:key?/:page?/:lang?"
                    component={Search}
                  />
                  <Route path="/favorites" component={Favorites} />
                  <Route path="/movie-details/:id/" component={MovieDetails} />
                  <Route path="*" component={NotFound} />
                </Switch>
              </Suspense>
            </div>
          </div>
        </LanguageContext.Provider>
      </Router>
    </div>
  );
}

export default App;
