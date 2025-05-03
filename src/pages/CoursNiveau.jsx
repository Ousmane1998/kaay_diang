import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Styles/CoursNiveau.css"; // Ajoutez un fichier CSS pour les styles et animations

const allCourses = {
  francais: [
    { level: 0, title: "Cours Niveau 0 (Francais)", description: "Les premiers pas en lecture", videos: ["angular.mp4", "nodeJs.mp4", "php.mp4"] },
    { level: 1, title: "Cours Niveau 1 (Francais)", description: "Approfondir la compréhension", videos: ["nodeJs.mp4", "php.mp4"] },
    { level: 2, title: "Cours Niveau 2 (Francais)", description: "Lecture avancée et interprétation", videos: ["php.mp4"] },
  ],
  wolof: [
    { level: 0, title: "Cours Niveau 0 (Wolof)", description: "Les premiers pas en lecture", videos: ["angular.mp4", "php.mp4", "nodeJs.mp4"] },
    { level: 1, title: "Cours Niveau 1 (Wolof)", description: "Approfondir la compréhension", videos: ["php.mp4", "angular.mp4"] },
    { level: 2, title: "Cours Niveau 2 (Wolof)", description: "Lecture avancée et interprétation", videos: ["nodeJs.mp4"] },
  ],
};

const CoursNiveau = () => {
  const { category, id } = useParams(); // Récupère la catégorie et le niveau depuis l'URL
  const level = Number(id);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState({}); // Stocke la progression des vidéos et tests

  useEffect(() => {
    const unlockedLevels = JSON.parse(localStorage.getItem(`unlockedLevels-${category}`)) || [0]; // Seul le niveau 0 est débloqué par défaut
    const savedProgress = JSON.parse(localStorage.getItem(`progress-${category}`)) || {};
    setProgress(savedProgress);

    setCourses(
      allCourses[category]?.map((course) => ({
        ...course,
        unlocked: unlockedLevels.includes(course.level),
      })) || []
    );
  }, [category, level]);

  if (!allCourses[category]) {
    return <h2 className="text-center mt-4 text-danger">Erreur : Catégorie introuvable</h2>;
  }
  
  const course = courses.find((c) => c.level === level);
  
  if (!course) {
    return <h2 className="text-center mt-4 text-danger">Erreur : Niveau introuvable</h2>;
  }

  // Fonction pour marquer une vidéo comme terminée
  const markVideoAsCompleted = (videoIndex) => {
    const updatedProgress = { ...progress };
    if (!updatedProgress[level]) {
      updatedProgress[level] = {};
    }
    updatedProgress[level][videoIndex] = true;
    setProgress(updatedProgress);
    localStorage.setItem(`progress-${category}`, JSON.stringify(updatedProgress));

    // Débloquer la vidéo suivante si elle existe
    if (videoIndex + 1 < course.videos.length) {
      updatedProgress[level][videoIndex + 1] = false;
    } else {
      // Si toutes les vidéos du niveau sont terminées, débloquer le niveau suivant
      const unlockedLevels = JSON.parse(localStorage.getItem(`unlockedLevels-${category}`)) || [];
      if (!unlockedLevels.includes(level + 1)) {
        unlockedLevels.push(level + 1);
        localStorage.setItem(`unlockedLevels-${category}`, JSON.stringify(unlockedLevels));
      }
    }
  };

  // Fonction pour gérer le clic sur "Faire le test"
  const handleTestClick = (videoIndex) => {
    const audio = new Audio("/audio/test-sound.mp3");
    audio.play();

    // Simuler la réussite du test
    setTimeout(() => {
      alert("Test réussi !");
      markVideoAsCompleted(videoIndex);
    }, 1000);
  };

  return (
    <div className="container mt-5">
      {/* Titre et description */}
      <h2 className="text-center animate-title">{course.title}</h2>
      <p className="text-center text-muted">{course.description}</p>

      {/* Liste des vidéos */}
      <div className="row mt-4">
        {course.videos.map((video, index) => {
          const isUnlocked =
            (level === 0 && index === 0) || // La première vidéo du niveau 0 est toujours débloquée
            (progress[level]?.[index] || (index === 0 && progress[level - 1]?.[allCourses[category][level - 1]?.videos.length - 1])); // Déblocage progressif
          return (
            <div className="col-md-4 mb-4" key={index}>
              <div className={`card shadow-sm animate-card ${isUnlocked ? "" : "locked-card"}`}>
                <video
                  className="w-100 rounded"
                  controls={isUnlocked}
                  style={{ opacity: isUnlocked ? 1 : 0.5 }}
                  onEnded={() => markVideoAsCompleted(index)}
                >
                  <source src={`/image/${video}`} type="video/mp4" />
                </video>
                <div className="card-body text-center">
                  <h5 className="card-title">Cours {index + 1}</h5>
                  <p className="card-text">{isUnlocked ? "Vidéo disponible" : "🔒 Vidéo verrouillée"}</p>
                  <div className="d-flex justify-content-center align-items-center">
                    <button
                      className={`btn quiz-button me-2 ${isUnlocked ? "btn-primary" : "btn-secondary disabled"}`}
                      onClick={() => isUnlocked && handleTestClick(index)}
                    >
                      {isUnlocked ? "Faire le test" : "🔒 Test verrouillé"}
                    </button>
                    <button
                      className="btn btn-audio"
                      onClick={() => new Audio(`/audio/${category}-audio-${index + 1}.mp3`).play()}
                    >
                      🎵 Écouter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoursNiveau;