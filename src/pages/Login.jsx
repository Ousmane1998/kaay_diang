import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/login", { email, password });
      localStorage.setItem("userToken", response.data.token); // Stocke le token
      alert("✅ Connexion réussie !");
      navigate("/"); // Redirige vers l’accueil
    } catch (error) {
      alert("❌ Erreur de connexion : " + error.response.data.message);
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h2>🔑 Connexion</h2>
      <div className="card p-4 w-50 mx-auto shadow">
        <input type="email" className="form-control my-2" placeholder="✉ Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="form-control my-2" placeholder="🔒 Mot de passe" onChange={(e) => setPassword(e.target.value)} />
        <button className="btn btn-success mt-3 w-100" onClick={handleLogin}>🚀 Se connecter</button>
        <p className="text-center mt-3">🚀 Nouveau ici ? <a href="/register" className="fw-bold text-primary">S'inscrire ici</a></p>
      </div>
    </div>
  );
};

export default Login;
