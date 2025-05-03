import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Styles/MesCours.css"; // Ajoutez un fichier CSS pour les styles et animations

const allCourses = {
  francais: [
    { level: "Niveau 1", title: "Cours Niveau 1 (Francais)" },
    { level: "Niveau 2", title: "Cours Niveau 2 (Francais)" },
    { level: "Niveau 3", title: "Cours Niveau 3 (Francais)" },
  ],
  wolof: [
    { level: "Niveau 1", title: "Cours Niveau 1 (Wolof)" },
    { level: "Niveau 2", title: "Cours Niveau 2 (Wolof)" },
    { level: "Niveau 3", title: "Cours Niveau 3 (Wolof)" },
  ],
};

const MesCours = () => {
  const [unlockedCourses, setUnlockedCourses] = useState([]);

  useEffect(() => {
    // Récupérer les niveaux débloqués pour chaque catégorie depuis localStorage
    const unlockedFrancais = JSON.parse(localStorage.getItem("unlockedLevels-francais")) || [];
    const unlockedWolof = JSON.parse(localStorage.getItem("unlockedLevels-wolof")) || [];

    // Filtrer les cours débloqués pour chaque catégorie
    const francaisCourses = allCourses.francais.filter((course) => unlockedFrancais.includes(course.level));
    const wolofCourses = allCourses.wolof.filter((course) => unlockedWolof.includes(course.level));

    // Combiner les cours débloqués des deux catégories
    setUnlockedCourses([...francaisCourses, ...wolofCourses]);
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary animate-title">📚 Mes cours débloqués</h2>

      {/* Affichage des niveaux débloqués */}
      <div className="row mt-4">
        {unlockedCourses.map((course, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card shadow-sm animate-card">
              <div className="card-body text-center">
                <h4 className="card-title">{course.title}</h4>
                <p className="card-text">Accédez à vos cours pour ce niveau.</p>
                <Link
                  to={`/courses/${course.title.toLowerCase().includes("francais") ? "francais" : "wolof"}/${course.level.toLowerCase().replace(" ", "-")}`}
                  className="btn btn-success btn-animate"
                >
                  Voir les cours
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MesCours;