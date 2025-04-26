import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="d-flex flex-column p-3 bg-light vh-100" style={{ width: "220px", position: "fixed", left: "0" }}>
      <h4 className="text-center mb-4">⚙️ Admin</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/admin/dashboard">📊 Tableau de bord</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/users">👤 Gestion des utilisateurs</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/manageCourses">🎓 Gestion des cours</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/payments">💰 Paiements & Transactions</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/settings">⚙️ Paramètres</Link>
        </li>
        <li className="nav-item">
          <button className="btn btn-danger w-100 mt-3" onClick={() => { localStorage.removeItem("adminToken"); window.location.href = "/login"; }}>
            🚪 Déconnexion
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
