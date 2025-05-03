import React, { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ nom: "", prenom: "", telephone: "", region: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users/liste');
      setUsers(response.data.results);
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs :', error);
    }
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = async () => {
    if (newUser.prenom && newUser.nom && newUser.telephone && newUser.region) {
      try {
        await axios.post('http://localhost:8000/users/ajouter', newUser);
        setShowModal(false);
        setNewUser({ nome: "", prenom: "", telephone: "", region: "" });
        fetchUsers();
      } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
      }
    }
  };

  return (
    <div className="container-fluid mt-4">
      <h2 className="text-center">👤 Gestion des utilisateurs</h2>

      {/* Barre de recherche et bouton Ajouter */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="🔍 Rechercher un utilisateur..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="btn btn-success"
          onClick={() => setShowModal(true)}
        >
          ➕ Ajouter un utilisateur
        </button>
      </div>

      {/* Modal d'ajout */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">➕ Ajouter un utilisateur</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Nom</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nom"
                      value={newUser.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Prénom</label>
                    <input
                      type="text"
                      className="form-control"
                      name="prenom"
                      value={newUser.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Téléphone</label>
                    <input
                      type="text"
                      className="form-control"
                      name="telephone"
                      value={newUser.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Région</label>
                    <input
                      type="text"
                      className="form-control"
                      name="region"
                      value={newUser.region}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Annuler
                </button>
                <button className="btn btn-success" onClick={handleAddUser}>
                  ✅ Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tableau des utilisateurs */}
      <div className="table-responsive">
        <table className="table table-bordered w-100">
          <thead className="table-dark">
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Téléphone</th>
              <th>Région</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter(user =>
                user.prenom.toLowerCase().includes(search.toLowerCase()) ||
                user.nom.toLowerCase().includes(search.toLowerCase()) ||
                user.telephone.includes(search) ||
                user.region.toLowerCase().includes(search.toLowerCase())
              )
              .map((user) => (
                <tr key={user.id}>
                  <td>{user.nom}</td>
                  <td>{user.prenom}</td>
                  <td>{user.telephone}</td>
                  <td>{user.region}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
