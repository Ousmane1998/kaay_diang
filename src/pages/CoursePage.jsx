import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Styles/CoursePage.css"; // Ajoutez un fichier CSS pour les animations et styles personnalisés

const coursesData = {
  francais: [
    { level: "niveau-1", title: "Cours Niveau 1 (Francais)", videos: ["angular.mp4", "nodeJs.mp4", "php.mp4"] },
    { level: "niveau-2", title: "Cours Niveau 2 (Francais)", videos: ["angular.mp4", "nodeJs.mp4", "php.mp4"] },
    { level: "niveau-3", title: "Cours Niveau 3 (Francais)", videos: ["angular.mp4", "nodeJs.mp4", "php.mp4"] },
  ],
  wolof: [
    { level: "niveau-1", title: "Cours Niveau 1 (Wolof)", videos: ["angular.mp4", "nodeJs.mp4", "php.mp4"] },
    { level: "niveau-2", title: "Cours Niveau 2 (Wolof)", videos: ["angular.mp4", "nodeJs.mp4", "php.mp4"] },
    { level: "niveau-3", title: "Cours Niveau 3 (Wolof)", videos: ["angular.mp4", "nodeJs.mp4", "php.mp4"] },
  ],
};

const CoursePage = () => {
  const { niveau, category } = useParams(); // Récupère le niveau et la catégorie depuis l'URL
  const course = coursesData[category]?.find((c) => c.level === niveau); // Recherche le cours correspondant au niveau et à la catégorie
  const [progress, setProgress] = useState({}); // Stocke la progression des vidéos

  useEffect(() => {
    // Charger la progression depuis localStorage
    const savedProgress = JSON.parse(localStorage.getItem(`progress-${category}`)) || {};
    setProgress(savedProgress);
  }, [category]);

  const isVideoUnlocked = (videoIndex) => {
    if (niveau === "niveau-1" && videoIndex === 0) return true; // La première vidéo du niveau 1 est toujours débloquée

    const currentLevelProgress = progress[niveau] || {};
    const previousLevel = `niveau-${parseInt(niveau.split("-")[1]) - 1}`;
    const previousLevelProgress = progress[previousLevel] || {};

    // Vérifie si la vidéo précédente est terminée ou si le niveau précédent est complété
    const previousVideoCompleted = currentLevelProgress[videoIndex - 1];
    const previousLevelCompleted =
      Object.keys(previousLevelProgress).length === coursesData[category]?.find((c) => c.level === previousLevel)?.videos.length;

    return previousVideoCompleted || (videoIndex === 0 && previousLevelCompleted);
  };

  const markVideoAsCompleted = (videoIndex) => {
    const updatedProgress = { ...progress };
    if (!updatedProgress[niveau]) updatedProgress[niveau] = {};
    updatedProgress[niveau][videoIndex] = true;
    setProgress(updatedProgress);
    localStorage.setItem(`progress-${category}`, JSON.stringify(updatedProgress));
  };

  const handleTestClick = (videoIndex) => {
    const audio = new Audio("/audio/test-sound.mp3");
    audio.play();

    // Simuler la réussite du test
    setTimeout(() => {
      alert(`Test pour la vidéo ${videoIndex + 1} réussi !`);
      markVideoAsCompleted(videoIndex);
    }, 1000);
  };

  if (!course) {
    return <h2 className="text-center mt-4 text-danger">Erreur : Niveau ou catégorie introuvable</h2>;
  }

  return (
    <div className="container mt-5">
      {/* Titre du cours */}
      <div className="course-header text-center mb-5 p-4 rounded shadow-sm">
        <h1 className="course-title animate-title">{course.title}</h1>
        <p className="text-muted">Découvrez les vidéos disponibles pour ce niveau.</p>
      </div>

      {/* Liste des vidéos */}
      <div className="row text-center">
        {course.videos.map((video, index) => {
          const isUnlocked = isVideoUnlocked(index);
          return (
            <div className="col-md-4 mb-4" key={index}>
              <div className={`card shadow-sm animate-card ${isUnlocked ? "" : "locked-card"}`}>
                <div className="position-relative">
                  <video
                    className="w-100 rounded"
                    controls={isUnlocked}
                    style={{ opacity: isUnlocked ? 1 : 0.5 }}
                    onEnded={() => markVideoAsCompleted(index)}
                  >
                    <source src={`/image/${video}`} type="video/mp4" />
                  </video>
                </div>
                <div className="card-body">
                  <h4 className="card-title">{video.split(".")[0]}</h4>
                  <p className="card-text">{isUnlocked ? "Vidéo disponible" : "🔒 Vidéo verrouillée"}</p>
                  <button
                    className={`btn quiz-button ${isUnlocked ? "btn-primary" : "btn-secondary disabled"}`}
                    onClick={() => isUnlocked && handleTestClick(index)}
                  >
                    {isUnlocked ? "Faire le test" : "🔒 Test verrouillé"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoursePage;