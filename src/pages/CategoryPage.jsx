import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../Styles/CategoryPage.css"; // Ajoutez un fichier CSS pour les styles personnalisés

const CategoryPage = () => {
  const { category } = useParams();
  const niveaux = ["Niveau 1", "Niveau 2", "Niveau 3", "Niveau 4", "Niveau 5", "Niveau 6"];
  const [unlockedLevels, setUnlockedLevels] = useState([]);

  // Charger les niveaux débloqués depuis localStorage au chargement de la page
  useEffect(() => {
    const savedUnlockedLevels = JSON.parse(localStorage.getItem(`unlockedLevels-${category}`)) || [];
    setUnlockedLevels(savedUnlockedLevels);
  }, [category]);

  // Fonction pour débloquer un niveau
  const unlockLevel = (niveau) => {
    const updatedLevels = [...unlockedLevels, niveau];
    setUnlockedLevels(updatedLevels);
    localStorage.setItem(`unlockedLevels-${category}`, JSON.stringify(updatedLevels)); // Sauvegarder dans localStorage
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center category-title">
        Catégorie : {category.charAt(0).toUpperCase() + category.slice(1)}
      </h2>
      <div className="row mt-4">
        {/* Vidéo de présentation */}
        <div className="col-md-6">
          <h4 className="presentation-title">Vidéo de présentation</h4>
          <video controls className="w-100 rounded shadow">
            <source src={`/videos/${category}-presentation.mp4`} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
        </div>

        {/* Liste des niveaux */}
        <div className="col-md-6">
          <h4 className="levels-title">Niveaux disponibles</h4>
          <ul className="list-group">
            {niveaux.map((niveau, i) => {
              const isUnlocked = unlockedLevels.includes(niveau); // Vérifie si le niveau est débloqué
              return (
                <li
                  key={i}
                  className={`list-group-item d-flex justify-content-between align-items-center ${
                    isUnlocked ? "unlocked" : "locked"
                  }`}
                >
                  <span>
                    {niveau}{" "}
                    {!isUnlocked && <i className="bi bi-lock-fill text-danger ms-2"></i>}
                  </span>
                  {isUnlocked ? (
                    <Link
                      to={`/courses/${category}/${niveau.toLowerCase().replace(" ", "-")}`}
                      className="btn btn-success btn-sm"
                    >
                      Accéder
                    </Link>
                  ) : (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => unlockLevel(niveau)}
                    >
                      Débloquer
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;