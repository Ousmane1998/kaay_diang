import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    prenom: "",
    nom: "",
    telephone: "",
    region: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    const payload = {
      prenom: user.prenom,
      nom: user.nom,
      telephone: user.telephone,
      region: user.region,
      password: user.password,
    };

    console.log("Données envoyées :", payload); // Log des données envoyées

    try {
      const response = await axios.post("http://localhost:8000/api/register", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("✅ Inscription réussie !");
      navigate("/login"); // Redirige vers la page de connexion
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error.response?.data || error.message);
      alert("❌ Erreur : " + (error.response?.data?.message || "Erreur inconnue"));
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h2>📝 Inscription</h2>
      <div className="card p-4 w-50 mx-auto shadow">
        <form onSubmit={handleRegister}>
          <input
            type="text"
            className="form-control my-2"
            placeholder="👤 Nom"
            name="nom"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="form-control my-2"
            placeholder="👤 Prénom"
            name="prenom"
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            className="form-control my-2"
            placeholder="📞 Téléphone"
            name="telephone"
            onChange={handleChange}
            required
          />
          <select
            className="form-control my-2"
            name="region"
            onChange={handleChange}
          >
            <option value="">🌍 Sélectionner une région (optionnel)</option>
            <option value="Dakar">Dakar</option>
            <option value="Thiès">Thiès</option>
            <option value="Saint-Louis">Saint-Louis</option>
          </select>
          <input
            type="password"
            className="form-control my-2"
            placeholder="🔒 Mot de passe"
            name="password"
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
          <button
            type="submit"
            className="btn btn-primary mt-3 w-100"
          >
            🚀 S'inscrire
          </button>
        </form>
        <p className="text-center mt-3">
          🔑 Déjà un compte ?{" "}
          <a href="/login" className="fw-bold text-primary">
            Se connecter ici
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;