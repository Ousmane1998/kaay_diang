import React from "react";
import './contact.css';

const Contact = () => {
  return (
    <>
     {/* Section Héro */}
      <section className="hero-section col-md-9 col-lg-10 text-center bg-primary text-white py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Contactez Bibocom Digitale</h1>
          <p className="lead">Votre partenaire en solutions digitales innovantes</p>
        </div>
      </section>

      {/* Formulaire de contact */}
      <div className="container py-5">
        <div className="row">
          {/* Formulaire */}
          <div className="col-md-6">
            <h3 className="mb-4">Formulaire de contact</h3>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Nom complet</label>
                <input type="text" className="form-control" id="name" required />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" required />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Téléphone</label>
                <input type="tel" className="form-control" id="phone" />
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea className="form-control" id="message" rows="5" required></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-50">Envoyer</button>
            </form>
          </div>

          {/* Infos de contact */}
          <div className="col-md-6 mt-5 mt-md-0">
            <h4>Nos coordonnées</h4>
            <p><strong>Adresse :</strong> Terminus, 100 mètres des deux voies, Dakar</p>
            <p><strong>Téléphone :</strong> (+221) 76 316 21 64</p>
            <p><strong>Email :</strong>   <a href="mailto:contact@bibocom.com"> contact@bibocom.com</a></p>

            <h5 className="mt-4">Suivez-nous :</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-primary"><i className="bi bi-facebook"></i> Facebook</a></li>
              <li><a href="#" className="text-info"><i className="bi bi-twitter"></i> Twitter</a></li>
              <li><a href="#" className="text-danger"><i className="bi bi-instagram"></i> Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>

               <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.8432018098133!2d-17.460177226751817!3d14.721455374110054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec173bc8180b45f%3A0x6d219f9a2aa32b0e!2sBibocom%20Digital!5e0!3m2!1sfr!2ssn!4v1744400042095!5m2!1sfr!2ssn"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bibocom Digital Location"
                ></iframe>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4 mt-5">
        <div className="container d-flex align-item-center">
          <img src="/image/bibocom1.png" alt="Bibocom Logo" style={{ width: "150px", marginBottom: "1rem" }} />
          <p className="mb-0">&copy; 2025 Bibocom Digitale. Tous droits réservés.</p>
        </div>
      </footer>
    </>
  );
};

export default Contact;
