import React from "react";

const coursesData = [
  { level: 0, title: "Cours Niveau 0", videos: ["angular.mp4", "nodeJs.mp4", "php.mp4"] },
  { level: 1, title: "Cours Niveau 1", videos: ["angular.mp4", "nodeJs.mp4", "php.mp4"] },
  { level: 2, title: "Cours Niveau 2", videos: ["angular.mp4", "nodeJs.mp4", "php.mp4"] },
  { level: 3, title: "Cours Niveau 3", videos: ["angular.mp4", "nodeJs.mp4", "php.mp4"] },
  { level: 4, title: "Cours Niveau 4", videos: ["angular.mp4", "nodeJs.mp4", "php.mp4"] },
  { level: 5, title: "Cours Niveau 5", videos: ["angular.mp4", "nodeJs.mp4", "php.mp4"] },
];

const Courses = () => {
  return (
    <div className="container">
      <h2 className="text-center mt-4 text-primary">Bienvenue sur la plateforme de formation</h2>
      {coursesData.map((course) => (
        <div key={course.level}>
          <h3 className="text-center mt-4 text-primary">{course.title}</h3>
          <div className="row text-center">
            {course.videos.map((video, index) => (
              <div className="col-md-4" key={index}>
                <div className="card">
                  <div className="position-relative">
                    <video className="w-100 locked">
                      <source src={`/image/${video}`} type="video/mp4" />
                    </video>
                    <i className="bi bi-lock-fill lock-overlay"></i>
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">Cours {video.split(".")[0]}</h4>
                    <p className="card-text">Prix: 1000F</p>
                    <button className="btn btn-primary">Payer avec Wave/Orange Money</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Courses;
