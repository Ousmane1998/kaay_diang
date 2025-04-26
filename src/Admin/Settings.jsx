import React, { useState } from "react";

const Settings = () => {
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="container-fluid mt-4">
      <h2 className="text-center">⚙️ Paramètres</h2>

      {/* Choix du thème */}
      <div className="card p-3 shadow-sm mt-3">
        <h4>🎨 Choisir un thème</h4>
        <select className="form-control" value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="light">🌞 Mode Clair</option>
          <option value="dark">🌙 Mode Sombre</option>
        </select>
      </div>

      {/* Notifications */}
      <div className="card p-3 shadow-sm mt-3">
        <h4>🔔 Notifications</h4>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />
          <label className="form-check-label">Activer les notifications</label>
        </div>
      </div>

      {/* Gestion des accès */}
      <div className="card p-3 shadow-sm mt-3">
        <h4>🛠 Gestion des rôles</h4>
        <p>L’admin peut modifier les permissions des utilisateurs ici.</p>
      </div>
    </div>
  );
};

export default Settings;
