import React, { useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, lastName: "Diop", firstName: "Alioune", phone: "+221 77 123 45 67", region: "Dakar" },
    { id: 2, lastName: "Ba", firstName: "Amina", phone: "+221 76 987 65 43", region: "Thiès" }
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ lastName: "", firstName: "", phone: "", region: "" });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = () => {
    if (newUser.firstName && newUser.lastName && newUser.phone && newUser.region) {
      setUsers([...users, { ...newUser, id: users.length + 1 }]);
      setShowModal(false);
      setNewUser({ lastName: "", firstName: "", phone: "", region: "" });
    }
  };

  const handleEdit = (id) => {
    const selectedUser = users.find(user => user.id === id);
    if (selectedUser) {
      setNewUser(selectedUser);
      setShowModal(true);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      setUsers(users.filter(user => user.id !== id));
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
        <button className="btn btn-success" onClick={() => setShowModal(true)}>➕ Ajouter un utilisateur</button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">👤 Ajouter / Modifier un utilisateur</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Nom</label>
                    <input type="text" className="form-control" name="lastName" value={newUser.lastName} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Prénom</label>
                    <input type="text" className="form-control" name="firstName" value={newUser.firstName} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Téléphone</label>
                    <input type="text" className="form-control" name="phone" value={newUser.phone} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Région</label>
                    <input type="text" className="form-control" name="region" value={newUser.region} onChange={handleChange} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Annuler</button>
                <button className="btn btn-success" onClick={handleAddUser}>✅ Ajouter / Modifier</button>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.filter(user => user.firstName.toLowerCase().includes(search.toLowerCase())).map((user) => (
              <tr key={user.id}>
                <td>{user.lastName}</td>
                <td>{user.firstName}</td>
                <td>{user.phone}</td>
                <td>{user.region}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(user.id)}>✏️ Modifier</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>🗑️ Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
