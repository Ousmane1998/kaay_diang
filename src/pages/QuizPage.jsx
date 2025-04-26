import { useParams } from "react-router-dom";
import quizzes from "../data/quizzes.json";
import { useState, useEffect } from "react";

const QuizPage = () => {
  const { id } = useParams();
  const level = Number(id);
  const [quizData, setQuizData] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [pastScores, setPastScores] = useState([]);

  useEffect(() => {
    const niveauChoisi = quizzes.find(q => q.niveau === `Niveau ${level}`);
    const cours = niveauChoisi?.cours[0];
    setQuizData(cours?.quiz || []);

    const storedScores = JSON.parse(localStorage.getItem("pastScores")) || [];
    setPastScores(storedScores);
  }, [level]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let totalScore = 0;
    quizData.forEach((q, index) => {
      if (selectedAnswers[`q${index}`] === q.reponse) {
        totalScore++;
      }
    });

    const quizScores = JSON.parse(localStorage.getItem("quizScores")) || {};
    quizScores[level] = totalScore;
    localStorage.setItem("quizScores", JSON.stringify(quizScores));

    if (totalScore === quizData.length) {
      const unlockedLevels = JSON.parse(localStorage.getItem("unlockedLevels")) || [];
      if (!unlockedLevels.includes(level + 1)) {
        unlockedLevels.push(level + 1);
        localStorage.setItem("unlockedLevels", JSON.stringify(unlockedLevels));
      }
    }

    const newScores = [...pastScores, { level, score: totalScore }];
    localStorage.setItem("pastScores", JSON.stringify(newScores));
    setPastScores(newScores);
    setScore(totalScore);
  };

  return (
    <div className="container text-center">
      <h2>📚 Quiz du Niveau {level}</h2>

      <form onSubmit={handleSubmit}>
        {quizData.map((q, index) => (
          <div key={index} className="quiz-question">
            <audio controls>
              <source src={q.audio} type="audio/mpeg" />
            </audio>
            <h4>{q.question}</h4>
            {q.options.map((option, i) => (
              <div key={i}>
                <input
                  type="radio"
                  name={`q${index}`}
                  value={option}
                  onChange={(e) => setSelectedAnswers({ ...selectedAnswers, [`q${index}`]: option })}
                />
                {option}
              </div>
            ))}
          </div>
        ))}
        <button type="submit" className="btn btn-primary mt-3">✅ Valider</button>
      </form>

      {score !== null && (
        <div className="mt-4">
          <h4 className="alert alert-info text-center">🏆 Score : {score} / {quizData.length}</h4>
          <h4 className={score === quizData.length ? "text-success" : "text-danger"}>
            {score === quizData.length ? "🎉 Bravo, niveau débloqué !" : "❌ Vous devez obtenir 5/5."}
          </h4>

          {/* Historique des scores */}
          <h4>🏆 Historique des scores</h4>
          <ul className="list-group">
            {pastScores.map((entry, index) => (
              <li key={index} className="list-group-item">
                Niveau {entry.level} - Score: {entry.score} / {quizData.length}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
