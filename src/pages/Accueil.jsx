import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import './accueil.css';


const Accueil = () => {
  const categories = ["francais", "wolof"];

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
       

        {/* Contenu principal */}
        <main className="col-md-9 col-lg-10 content">
          <div className="le_tete bg-dark vh-100 d-block text-light position-relative">
            <div className="position-absolute top-0 end-0 p-3">
              {/* Bouton Profil */}
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle d-flex align-items-center gap-2 btn-sm"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle fs-5"></i> Abdoulaye
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/profil">
                      Profil
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item text-danger" to="/logout">
                      Déconnexion
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <h2 className="fw-bold text-center">
              BIENVENUE <br />
              Cher Apprenant dans Diangue Dou Weiss
            </h2>
            <h4 className="text-center">
              Nous sommes ravis de te voir parmi nous pour apprendre et grandir ensemble. <br />
              Nous sommes ravis de te voir parmi nous pour apprendre et <br />
              grandir ensemble. Préparer-toi à explorer de nouvelles <br />
              compétences et à découvrir un monde d'opportunité !
            </h4>
          </div>

          <h3 className="text-center">Qui sommes-nous ?</h3>
          <div className="row text-center">
            <div className="col-md-6">
              <audio controls>
                <source src="image/video.mp3" type="audio/mpeg" />
              </audio>
            </div>
            <div className="col-md-6">
              <audio controls>
                <source src="image/video.mp3" type="audio/mpeg" />
              </audio>
            </div>
          </div>

          <h3 className="text-center mt-4">Nos vidéos</h3>
          <div className="row">
            <div className="col-md-4">
              <video controls className="w-100">
                <source src="image/angular.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="col-md-4">
              <video controls className="w-100">
                <source src="image/nodeJs.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="col-md-4">
              <video controls className="w-100">
                <source src="image/php.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          <h3 className="text-center mt-4">Témoignages</h3>
          <div className="row text-center">
            <div className="col-md-4">
              <div className="card">
                <img className="card-img-top" src="image/bibocom.jpg" alt="John Doe" />
                <div className="card-body">
                  <h4 className="card-title">Abdoulaye</h4>
                  <p className="card-text">Abdou est un architecte et ingénieur.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <img className="card-img-top" src="image/bibocom.jpg" alt="John Doe" />
                <div className="card-body">
                  <h4 className="card-title">Amy</h4>
                  <p className="card-text">Amy est un architecte et ingénieur.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <img className="card-img-top" src="image/bibocom.jpg" alt="John Doe" />
                <div className="card-body">
                  <h4 className="card-title">Rama</h4>
                  <p className="card-text">Rama est un architecte et ingénieur.</p>
                </div>
              </div>
            </div>
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
          <div className="mt-3">
            <h3 className="text-center">Nos Apprenants</h3>
            <div id="demo" className="carousel slide" data-bs-ride="carousel">
              {/* Indicators */}
              <div className="carousel-indicators">
                {[0, 1, 2, 3].map((index) => (
                  <button
                    key={index}
                    type="button"
                    data-bs-target="#demo"
                    data-bs-slide-to={index}
                    className={index === 0 ? "active" : ""}
                    aria-current={index === 0 ? "true" : undefined}
                    aria-label={`Slide ${index + 1}`}
                  ></button>
                ))}
              </div>

              {/* The slideshow */}
              <div className="carousel-inner">
                {["etudiant1.jpg", "etudiant2.jpg", "etudiant3.jpg", "etudiant4.jpg"].map((img, index) => (
                  <div key={img} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                    <img
                      src={`image/${img}`}
                      alt={`Étudiant ${index + 1}`}
                      className="d-block w-100"
                      style={{ height: "500px", objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>

              {/* Controls */}
              <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>

          {/* Formulaire */}
          <div className="row my-5">
            <h2 className="mb-4 text-center">Contactez-nous</h2>
            <div className="col-md-6">
              <form>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="nom" className="form-label">
                      Nom
                    </label>
                    <input type="text" className="form-control" id="nom" placeholder="Votre nom" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="prenom" className="form-label">
                      Prénom
                    </label>
                    <input type="text" className="form-control" id="prenom" placeholder="Votre prénom" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">
                      Adresse Email
                    </label>
                    <input type="email" className="form-control" id="email" placeholder="exemple@domaine.com" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="telephone" className="form-label">
                      Téléphone
                    </label>
                    <input type="tel" className="form-control" id="telephone" placeholder="+221 77 000 00 00" />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea className="form-control" id="message" rows="5" placeholder="Votre message ici..."></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-50">
                  Envoyer
                </button>
              </form>
            </div>
            <div className="col-md-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.8432018098133!2d-17.460177226751817!3d14.721455374110054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec173bc8180b45f%3A0x6d219f9a2aa32b0e!2sBibocom%20Digital!5e0!3m2!1sfr!2ssn!4v1744400042095!5m2!1sfr!2ssn"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation Bibocom Digital"
              ></iframe>
            </div>
          </div>

          {/* Pied de page */}
          <footer className="w-100">
            <div className="footer-top text-center p-4 text-white bg-primary">
              <h4>Besoin d'orientation gratuite ?</h4>
              <p>Clique ici pour bénéficier d'une orientation gratuite et instantanée via WhatsApp et par mail.</p>
              <button className="btn btn-light w-50">Orientation gratuite</button>
            </div>
            <div className="footer-bottom p-5 text-white">
              <div className="container">
                <div className="row">
                  <div className="col-md-4">
                    <h6>Café du Lundi!</h6>
                    <p>Information tech dans votre email</p>
                    <p>Recevez des astuces, des formations, des tutoriels envoyés directement dans votre boîte de réception chaque semaine.</p>
                  </div>
                  <div className="col-md-2">
                    <h6>LA PLATEFORME</h6>
                    <ul className="list-unstyled">
                      <li>
                        <Link to="/blog">Blog</Link>
                      </li>
                      <li>
                        <Link to="/courses">Cours</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-2">
                    <h6>AIDE</h6>
                    <ul className="list-unstyled">
                      <li>
                        <Link to="/privacy">Privacy</Link>
                      </li>
                      <li>
                        <Link to="/faq">FAQ</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-2">
                    <h6>BIBOCOM</h6>
                    <ul className="list-unstyled">
                      <li>
                        <Link to="/about">Qui sommes-nous?</Link>
                      </li>
                      <li>
                        <Link to="/community">La communauté</Link>
                      </li>
                      <li>
                        <Link to="/become-teacher">Devenir formateur</Link>
                      </li>
                      <li>
                        <Link to="/become-mentor">Devenir Mentor</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center p-3 text-white">© 2025 Bibocom.</div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Accueil;