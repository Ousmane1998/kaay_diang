import React from "react";

const TopBar = ({ search, setSearch, handleLogout }) => {
  return (
    <div className="container d-flex justify-content-between align-items-center p-3 bg-white shadow"
    style={{ position: "fixed", top: "0", left: "50%", transform: "translateX(-50%)", zIndex: "1000" }}
>   
      {/* Barre de recherche avec icône */}
      <div className="d-flex align-items-center bg-light rounded p-2" style={{ width: "50%" }}>
        <i className="bi bi-search text-muted mx-2"></i>
        <input
          type="text"
          className="form-control border-0 bg-transparent"
          placeholder="🔍 Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Menu Profil */}
      <div className="dropdown">
        <button className="btn btn-light dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown">
          <img src="/image/avatar.jpg" alt="Profil" className="rounded-circle me-2" width="40" height="40" />
          <span className="fw-bold">Ousmane</span>
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          <li><a className="dropdown-item" href="/profile">👤 Voir Profil</a></li>
          <li><a className="dropdown-item text-danger" href="#" onClick={handleLogout}>🚪 Déconnexion</a></li>
        </ul>
      </div>

    </div>
  );
};

export default TopBar;
