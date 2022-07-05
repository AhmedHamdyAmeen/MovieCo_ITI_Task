import React, { useContext } from "react";
import LanguageContext from "../../context/language";

import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLanguage } from '@fortawesome/free-solid-svg-icons'


export default function ContextLanguageSwitcher() {
  const { contextLang, setContextLang } = useContext(LanguageContext);

  const changeAppLanguage = () => {
    setContextLang(contextLang === 'ar' ? 'en' : 'ar')
  };

  return (
    <div>
      <button className="btn btn-warning" onClick={() => changeAppLanguage()}>
        <FontAwesomeIcon icon={faLanguage} />
      </button>
      <span className="text-danger ps-2 fw-bold fs-4">{contextLang}</span>
    </div>
  );
}
