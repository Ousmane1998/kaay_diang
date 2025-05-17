import React, { useState } from "react";
import { Link } from "react-router-dom";
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("userToken") !== null);

  const handleLogin = () => {
    localStorage.setItem("userToken", "fakeToken123"); // Simule la connexion
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Supprime la session
    setIsLoggedIn(false);
  };
  return (
    <div className=" text-center bg-primary text-white p-3 vh-100 position-fixed top-0 start-0" style={{ width: "220px" }}>

      <img src="/image/bibocom1.png" alt="Bibocom Digital" className="img-fluid mb-3" />
      <ul className="list-unstyled">
        <li className="mb-3"><Link to="/" className="text-white text-decoration-none" ><i className="bi bi-house"></i>  Accueil</Link></li>
        <li className="mb-3"><Link to="/mes-cours" className="text-white text-decoration-none"><i className="bi bi-postcard"></i> Mes cours</Link></li>
        <li className="mb-3"><Link to="/actualite" className="text-white text-decoration-none"><i className="bi bi-person"></i> Actualité</Link></li>
        <li className="mb-3"><Link to="/contact" className="text-white text-decoration-none"><i className="bi bi-telephone"></i> Contact</Link></li>
      </ul>
      

      {/* Connexion / Déconnexion */}
      {isLoggedIn ? (
  <button className="btn btn-danger" onClick={handleLogout}>🚪 Déconnexion</button>
) : (
  <a href="/login" className="btn btn-success" style={{ backgroundColor: "#0048A0", borderColor: "#0048A0" }}>
  🔑 Se connecter
</a>
)}

    
    </div>
  );
};

export default Header;
