import { useParams } from "react-router-dom";
import { useState } from "react";

const coursesData = [
  { level: 0, title: "Cours Niveau 0", videos: ["angular.mp4", "nodeJs.mp4", "php.mp4"] },
  { level: 1, title: "Cours Niveau 1", videos: ["angular.mp4", "nodeJs.mp4", "php.mp4"] },
  { level: 2, title: "Cours Niveau 2", videos: ["angular.mp4", "nodeJs.mp4", "php.mp4"] },
  { level: 3, title: "Cours Niveau 3", videos: ["angular.mp4", "nodeJs.mp4", "php.mp4"] },
  { level: 4, title: "Cours Niveau 4", videos: ["angular.mp4", "nodeJs.mp4", "php.mp4"] },
  { level: 5, title: "Cours Niveau 5", videos: ["angular.mp4", "nodeJs.mp4", "php.mp4"] },
];

const CoursePage = () => {
  const { id } = useParams();
  const level = Number(id);
  const course = coursesData.find((c) => c.level === level);
  const [unlockedVideos, setUnlockedVideos] = useState({});

  if (!course) {
    return <h2 className="text-center mt-4 text-danger">Erreur : Niveau introuvable</h2>;
  }

  // Fonction pour débloquer une vidéo après paiement
  const unlockVideo = (video) => {
    setUnlockedVideos((prevState) => ({
      ...prevState,
      [video]: true,
    }));
  };

  return (
    <div className="container">
      <h2 className="text-center mt-4">{course.title}</h2>
      <div className="row text-center">
        {course.videos.map((video, index) => (
          <div className="col-md-4" key={index}>
            <div className="card">
              <div className="position-relative">
                <video className={`w-100 ${unlockedVideos[video] ? "" : "locked"}`}>
                  <source src={`/image/${video}`} type="video/mp4" />
                </video>
                {!unlockedVideos[video] && <i className="bi bi-lock-fill lock-overlay"></i>}
              </div>
              <div className="card-body">
                <h4 className="card-title">Cours {video.split(".")[0]}</h4>
                <p className="card-text">Prix: 1000F</p>
                {!unlockedVideos[video] && (
                  <button className="btn btn-primary" onClick={() => unlockVideo(video)}>
                    Payer avec Wave/Orange Money
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursePage;
