import React from "react";
import { Link } from "react-router-dom";

const Accueil = () => {
  const categories = ["francais", "wolof"];

  return (
    <>
      <main className="col-md-9 col-lg-10 content" style={{ paddingTop: "70px" }}>
        {/* Section d'introduction */}
        <div className="le_tete bg-dark vh-100 d-block text-light text-center">
          <h2 className="fw-bold">BIENVENUE <br />Cher Apprenant dans Diangue Dou Weiss</h2>
          <h4>
            Nous sommes ravis de te voir parmi nous pour apprendre et grandir ensemble.<br />
            Prépare-toi à explorer de nouvelles compétences et découvrir un monde d'opportunité !
          </h4>
        </div>

        {/* Qui sommes-nous */}
        <h3 className="text-center">Qui sommes-nous ?</h3>
        <div className="row text-center">
          <div className="col-md-6"><audio controls><source src="/image/video.mp3" type="audio/mpeg" /></audio></div>
          <div className="col-md-6"><audio controls><source src="/image/video.mp3" type="audio/mpeg" /></audio></div>
        </div>

        {/* Section vidéos */}
        <h3 className="text-center mt-4">Nos vidéos</h3>
        <div className="row">
          <div className="col-md-4"><video controls className="w-100"><source src="/image/angular.mp4" type="video/mp4" /></video></div>
          <div className="col-md-4"><video controls className="w-100"><source src="/image/nodeJs.mp4" type="video/mp4" /></video></div>
          <div className="col-md-4"><video controls className="w-100"><source src="/image/php.mp4" type="video/mp4" /></video></div>
        </div>

        <h3 className="text-center mt-4">Témoignages</h3>
        <div className="row text-center">
          {[...Array(3)].map((_, i) => (
            <div className="col-md-4" key={i}>
              <div className="card">
                <img className="card-img-top" src="/image/bibocom.jpg" alt="John Doe" />
                <div className="card-body">
                  <h4 className="card-title">John Doe</h4>
                  <p className="card-text">John Doe est un architecte et ingénieur.</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section Catégories */}
        <h3 className="text-center mt-5">Catégories disponibles</h3>
        <div className="row">
          {categories.map((categorie, i) => (
            <div className="col-md-6" key={i}>
              <Link to={`/categories/${categorie.toLowerCase()}`} className="text-decoration-none">
                <div
                  className={`card text-center p-3 ${categorie === "francais" ? "bg-primary text-white" : ""}`}
                  style={{
                    backgroundColor: categorie === "wolof" ? "#D71920" : "",
                    color: categorie === "wolof" ? "#fff" : "",
                  }}
                >
                {categorie}
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Carrousel */}
        <div className="mt-3">
          <h3 className="text-center">Nos Apprenants</h3>
          <div id="demo" className="carousel slide" data-ride="carousel">
            {/* Indicators */}
            <ul className="carousel-indicators">
              {[...Array(4)].map((_, i) => (
                <li key={i} data-target="#demo" data-slide-to={i} className={i === 0 ? "active" : ""}></li>
              ))}
            </ul>
            {/* Images */}
            <div className="carousel-inner">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className={`carousel-item ${num === 1 ? "active" : ""}`}>
                  <img src={`/image/etudiant${num}.jpg`} alt={`Etudiant ${num}`} width="1100" height="500" />
                </div>
              ))}
            </div>
            {/* Contrôles */}
            <a className="carousel-control-prev" href="#demo" data-slide="prev">
              <span className="carousel-control-prev-icon"></span>
            </a>
            <a className="carousel-control-next" href="#demo" data-slide="next">
              <span className="carousel-control-next-icon"></span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default Accueil;