import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/CoursePage.css";

const CoursePage = () => {
  const { niveau, category } = useParams(); // Ex: niveau = "niveau 1", category = "math"
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/cours/liste-niveau-categorie/${niveau}/${category}`
        );
        setCourses(response.data.results || []); // résultat depuis l'API
        setLoading(false);
        console.log("Paramètres envoyés :", niveau, category);
      } catch (err) {
        console.error("Erreur lors de la récupération des cours :", err.response ? err.response.data : err.message);
        setError("Erreur de chargement des cours. Veuillez réessayer.");
        setLoading(false);
      }
    };

    fetchCourses();
  }, [niveau, category]);

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem(`progress-${category}`)) || {};
    setProgress(savedProgress);
  }, [category]);

  const isVideoUnlocked = (videoIndex) => {
    if (niveau === "niveau 1" && videoIndex === 0) return true;

    const currentLevelProgress = progress[niveau] || {};
    const previousLevel = `niveau ${parseInt(niveau.split(" ")[1]) - 1}`;
    const previousLevelProgress = progress[previousLevel] || {};

    const previousVideoCompleted = currentLevelProgress[videoIndex - 1];
    const previousLevelCompleted =
      Object.keys(previousLevelProgress).length === courses.length;

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

    setTimeout(() => {
      alert(`Test pour la vidéo ${videoIndex + 1} réussi !`);
      markVideoAsCompleted(videoIndex);
    }, 1000);
  };

  if (loading) return <h2 className="text-center mt-4 text-primary">Chargement des cours...</h2>;
  if (error) return <h2 className="text-center mt-4 text-danger">{error}</h2>;
  if (!courses || courses.length === 0)
    return <h2 className="text-center mt-4 text-danger">Aucun cours trouvé pour ce niveau et cette catégorie.</h2>;

  return (
    <div className="container mt-5">
      <div className="course-header text-center mb-5 p-4 rounded shadow-sm">
        <h1 className="course-title animate-title">Cours pour {category} - {niveau}</h1>
        <p className="text-muted">Découvrez les vidéos disponibles pour ce niveau.</p>
      </div>

      <div className="row text-center">
        {courses.map((course, index) => {
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
                    <source src={course.video_url} type="video/mp4" />
                  </video>
                </div>
                <div className="card-body">
                  <h4 className="card-title">{course.titre}</h4>
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
