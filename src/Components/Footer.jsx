import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5 container-fluid ">
      <div className="container">
        <div className="row">
          {/* Logo & Description */}
          <div className="col-md-3">
            <img src="/image/logo.png" alt="Logo" className="img-fluid mb-2" />
            <p>Bibocom</p>
            <p>Bakeli, école de formation professionnelle créée par Volkeno, a formé plus de 6000 étudiants et professionnels aux métiers des nouvelles technologies et du numérique.</p>
          </div>

          {/* Liens rapides */}
          <div className="col-md-3">
            <h5>Liens rapides</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Accueil</a></li>
              <li><a href="#" className="text-white">Nos entraîneurs</a></li>
              <li><a href="#" className="text-white">Événements</a></li>
              <li><a href="#" className="text-white">Blog</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3">
            <h5>Contact</h5>
            <p>Adresse : Villa Hlm Grand Yoff n°241</p>
            <p>Téléphone : +221 78 546 15 51</p>
            <p>Courriel : contact@bibocom.tech</p>
          </div>

          {/* Newsletter */}
          <div className="col-md-2">
            <h5>S’abonner à la Newsletter</h5>
            <input type="email" placeholder="Entrez votre email" className="form-control mb-2" />
            <button className="btn btn-primary w-100">S'inscrire</button>
          </div>
        </div>
         {/* Copyright */}
      <div className="text-center p-3 text-white ">
        © 2025 Bibocom.
      </div>
      </div>

     
    </footer>
  );
};

export default Footer;
