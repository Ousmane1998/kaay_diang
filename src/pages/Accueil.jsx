import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Accueil = () => {
  const categories = ["francais", "wolof"];

  return (
    <>
      <main className="col-md-9 col-lg-10 content" style={{ paddingTop: "70px" }}>
        {/* Section d'introduction */}
        <motion.div
          className="le_tete bg-dark vh-100 d-block text-light text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="fw-bold">
            BIENVENUE <br />
            Cher Apprenant dans Diangue Dou Weiss
          </h2>
          <h4>
            Nous sommes ravis de te voir parmi nous pour apprendre et grandir ensemble.
            <br />
            Prépare-toi à explorer de nouvelles compétences et découvrir un monde d'opportunité !
          </h4>
        </motion.div>
        <motion.h3
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Qui sommes-nous ?
        </motion.h3>
        <div className="row text-center">
          <motion.div
            className="col-md-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            <audio controls>
              <source src="/image/video.mp3" type="audio/mpeg" />
            </audio>
          </motion.div>
          <motion.div
            className="col-md-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            <audio controls>
              <source src="/image/video.mp3" type="audio/mpeg" />
            </audio>
          </motion.div>
        </div>

        {/* Section vidéos */}
        <motion.h3
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Nos vidéos
        </motion.h3>
        <div className="row">
          {["angular.mp4", "nodeJs.mp4", "php.mp4"].map((video, index) => (
            <motion.div
              className="col-md-4"
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + index * 0.2, duration: 0.8 }}
            >
              <video controls className="w-100">
                <source src={`/image/${video}`} type="video/mp4" />
              </video>
            </motion.div>
          ))}
        </div>

        {/* Témoignages */}
        <motion.h3
          className="text-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Témoignages
        </motion.h3>
        <div className="row text-center">
          {[...Array(3)].map((_, i) => (
            <motion.div
              className="col-md-4"
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 + i * 0.2, duration: 0.8 }}
            >
              <div className="card">
                <img className="card-img-top" src="/image/bibocom.jpg" alt="John Doe" />
                <div className="card-body">
                  <h4 className="card-title">John Doe</h4>
                  <p className="card-text">John Doe est un architecte et ingénieur.</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Catégories */}
        <motion.h3
          className="text-center mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          Catégories disponibles
        </motion.h3>
        <div className="row">
          {categories.map((categorie, i) => (
            <motion.div
              className="col-md-6"
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.2 + i * 0.2, duration: 0.8 }}
            >
              <Link to={`/categories/${categorie.toLowerCase()}`} className="text-decoration-none">
                <div
                  className={`card text-center p-3 ${
                    categorie === "francais" ? "bg-primary text-white" : ""
                  }`}
                  style={{
                    backgroundColor: categorie === "wolof" ? "#D71920" : "",
                    color: categorie === "wolof" ? "#fff" : "",
                  }}
                >
                  {categorie}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Carrousel */}
        <motion.div
          className="mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
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
        </motion.div>
      </main>
    </>
  );
};

export default Accueil;