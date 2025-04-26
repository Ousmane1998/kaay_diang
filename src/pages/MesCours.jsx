import { Link } from "react-router-dom";

const allCourses = [
  { level: 0, title: "Cours Niveau 0" },
  { level: 1, title: "Cours Niveau 1" },
  { level: 2, title: "Cours Niveau 2" },
];

const MesCours = () => {
  const unlockedCourses = [0, 1]; // Simule les niveaux débloqués
  const filteredCourses = allCourses.filter((course) => unlockedCourses.includes(course.level));

  return (
    <div className="container">
      <h2 className="text-center mt-4 text-primary">📚 Mes cours débloqués</h2>
      
      {/* Affichage des niveaux débloqués */}
      <div className="row text-center">
        {filteredCourses.map((course) => (
          <div className="col-md-4" key={course.level}>
            <Link to={`/courses/details/${course.level}`} className="btn btn-success w-100 mb-3">
              {course.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MesCours;
