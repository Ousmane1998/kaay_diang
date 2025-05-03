import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    region: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (user.password !== user.confirmPassword) {
      alert("❌ Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/register", user);
      alert("✅ Inscription réussie !");
      navigate("/login"); // Redirige vers connexion
    } catch (error) {
      alert("❌ Erreur : " + error.response.data.message);
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h2>📝 Inscription</h2>
      <div className="card p-4 w-50 mx-auto shadow">
        <input type="text" className="form-control my-2" placeholder="👤 Nom" name="nom" onChange={handleChange} />
        <input type="text" className="form-control my-2" placeholder="👤 Prénom" name="prenom" onChange={handleChange} />
        <input type="tel" className="form-control my-2" placeholder="📞 Téléphone" name="phone" onChange={handleChange} />
        <select className="form-control my-2" name="region" onChange={handleChange}>
          <option value="">🌍 Sélectionner une région (optionnel)</option>
          <option value="Dakar">Dakar</option>
          <option value="Thiès">Thiès</option>
          <option value="Saint-Louis">Saint-Louis</option>
        </select>
        <input type="password" className="form-control my-2" placeholder="🔒 Mot de passe" name="password" onChange={handleChange} />
        <input type="password" className="form-control my-2" placeholder="🔑 Confirmer le mot de passe" name="confirmPassword" onChange={handleChange} />
        <button className="btn btn-primary mt-3 w-100" onClick={handleRegister}>🚀 S'inscrire</button>
        <p className="text-center mt-3">🔑 Déjà un compte ? <a href="/login" className="fw-bold text-primary">Se connecter ici</a></p>
      </div>
    </div>
  );
};

export default Register;
