import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const allCourses = [
  { level: 0, title: "Cours Niveau 0", description: "Les premiers pas en lecture", videos: ["angular.mp4"] },
  { level: 1, title: "Cours Niveau 1", description: "Approfondir la compréhension", videos: ["nodeJs.mp4"] },
  { level: 2, title: "Cours Niveau 2", description: "Lecture avancée et interprétation", videos: ["php.mp4"] },
];

const CoursNiveau = () => {
  const { id } = useParams();
  const level = Number(id);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const unlockedLevels = JSON.parse(localStorage.getItem("unlockedLevels")) || [0];

    if (!unlockedLevels.includes(0)) {
      unlockedLevels.push(0);
      localStorage.setItem("unlockedLevels", JSON.stringify(unlockedLevels));
    }

    const quizScores = JSON.parse(localStorage.getItem("quizScores")) || {};
    const previousLevel = level - 1;
    const previousQuizzes = allCourses.find(c => c.level === previousLevel)?.quiz || [];

    const allPreviousTestsPassed = previousQuizzes.every(q => {
      const score = quizScores[previousLevel] || 0;
      return score === q.length;
    });

    setCourses(allCourses.map((course) => ({
      ...course,
      unlocked: unlockedLevels.includes(course.level) && (course.level === 0 || allPreviousTestsPassed),
    })));
  }, []);

  const unlockedLevels = JSON.parse(localStorage.getItem("unlockedLevels")) || [0];
  const progressPercentage = (unlockedLevels.length / allCourses.length) * 100;

  const course = courses.find((c) => c.level === level);

  if (!course) {
    return <h2 className="text-center mt-4 text-danger">Erreur : Niveau introuvable</h2>;
  }

  return (
    <div className="container text-center">
      <h2 className="mt-4"><strong>{course.title}</strong></h2>
      <p className="text-danger fs-5">{course.description}</p>

      <div className="progress mt-3" style={{ height: "40px", borderRadius: "10px" }}>
  <div 
    className="progress-bar bg-warning text-dark fw-bold" 
    role="progressbar" 
    style={{ 
      width: `${progressPercentage}%`, 
      fontSize: "10px", 
      textAlign: "center",
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center"
    }}
  >
    {Math.round(progressPercentage)}% Progression
  </div>
</div>


      {/* Vidéo verrouillée si le test précédent n'est pas validé */}
      <div className={`course-card ${course.unlocked ? "unlocked-course" : ""}`}>
        <video className="w-100" controls={course.unlocked} style={{ opacity: course.unlocked ? 1 : 0.5 }}>
          <source src={`/image/${course.videos[0]}`} type="video/mp4" />
        </video>
        {!course.unlocked && <p className="text-danger mt-2">🔒 Vous devez obtenir 5/5 au quiz précédent pour débloquer cette vidéo.</p>}
      </div>

      {/* Bouton du quiz */}
      <h3 className="mt-3"><strong>QUIZ</strong></h3>
      <button
        className={`btn quiz-button mt-3 ${course.unlocked ? "btn-danger" : "btn-secondary disabled"}`}
        onClick={() => course.unlocked && navigate(`/quiz/${level}`)}
      >
        {course.unlocked ? "Faire le test" : "🔒 Test verrouillé"}
      </button>

      {/* Audio explicatif */}
      <div className="mt-3">
        <p><strong>Écoutez l'explication :</strong></p>
        <audio controls>
          <source src="/audio/explication.mp3" type="audio/mp3" />
        </audio>
      </div>
    </div>
  );
};

export default CoursNiveau;
