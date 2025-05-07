import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Table, Toast, ToastContainer } from 'react-bootstrap';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    prenom: '',
    nom: '',
    telephone: '',
    region: '',
    password: ''
  });
  const [selectedUser, setSelectedUser] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/user/list");
      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Erreur récupération utilisateurs :", error);
      setUsers([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/register", form);
      setForm({ prenom: '', nom: '', telephone: '', region: '', password: '' });
      setShowModal(false);
      setToastMessage("✅ Utilisateur ajouté avec succès !");
      setShowToast(true);
      fetchUsers();
    } catch (error) {
      console.error("Erreur ajout utilisateur :", error);
      setToastMessage("❌ Une erreur est survenue lors de l'ajout.");
      setShowToast(true);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setForm({
      prenom: user.prenom,
      nom: user.nom,
      telephone: user.telephone,
      region: user.region,
      password: '' // Ne pas pré-remplir le mot de passe
    });
    setShowEditModal(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/utilisateur/update/${selectedUser.id}`, form);
      setToastMessage("✅ Utilisateur mis à jour avec succès !");
      setShowToast(true);
      setShowEditModal(false);
      fetchUsers();
    } catch (error) {
      console.error("Erreur mise à jour utilisateur :", error);
      setToastMessage("❌ Une erreur est survenue lors de la mise à jour.");
      setShowToast(true);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/utilisateur/delete/${id}`);
      setToastMessage("✅ Utilisateur supprimé avec succès !");
      setShowToast(true);
      fetchUsers();
    } catch (error) {
      console.error("Erreur suppression utilisateur :", error);
      setToastMessage("❌ Une erreur est survenue lors de la suppression.");
      setShowToast(true);
    }
  };

  const handleShowDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/utilisateur/details/${id}`);
      setSelectedUser(response.data.user);
      setShowDetailModal(true);
    } catch (error) {
      console.error("Erreur récupération détails utilisateur :", error);
      setToastMessage("❌ Une erreur est survenue lors de la récupération des détails.");
      setShowToast(true);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-5">
      {/* Titre avec animation */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="d-flex justify-content-between align-items-center mb-3"
      >
        <h3 className="text-primary">👥 Liste des utilisateurs</h3>
        <Button variant="primary" onClick={() => setShowModal(true)}>➕ Ajouter</Button>
      </motion.div>

      {/* Tableau des utilisateurs */}
      {users.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Téléphone</th>
              <th>Région</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u.id}>
                <td>{i + 1}</td>
                <td>{u.prenom}</td>
                <td>{u.nom}</td>
                <td>{u.telephone}</td>
                <td>{u.region}</td>
                <td>
                  <Button variant="info" size="sm" onClick={() => handleShowDetails(u.id)}>
                    🔍 Détails
                  </Button>{" "}
                  <Button variant="warning" size="sm" onClick={() => handleEditUser(u)}>
                    ✏️ Modifier
                  </Button>{" "}
                  <Button variant="danger" size="sm" onClick={() => handleDeleteUser(u.id)}>
                    🗑️ Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-center text-muted">Aucun utilisateur trouvé.</p>
      )}

      {/* Modal d'ajout */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <input
              name="prenom"
              value={form.prenom}
              onChange={handleChange}
              className="form-control mb-2"
              placeholder="Prénom"
              required
            />
            <input
              name="nom"
              value={form.nom}
              onChange={handleChange}
              className="form-control mb-2"
              placeholder="Nom"
              required
            />
            <input
              name="telephone"
              value={form.telephone}
              onChange={handleChange}
              className="form-control mb-2"
              placeholder="Téléphone"
              required
            />
            <select
              name="region"
              value={form.region}
              onChange={handleChange}
              className="form-control mb-2"
              required
            >
              <option value="">Sélectionnez une région</option>
              <option value="Dakar">Dakar</option>
              <option value="Thiès">Thiès</option>
              <option value="Kaolack">Kaolack</option>
              <option value="Ziguinchor">Ziguinchor</option>
              <option value="Saint-Louis">Saint-Louis</option>
            </select>
            <input
              name="password"
              type="password"
              maxLength={4}
              value={form.password}
              onChange={handleChange}
              className="form-control mb-2"
              placeholder="Mot de passe (4 chiffres)"
              required
            />
            <Button type="submit" variant="success" className="w-100">
              ✅ Enregistrer
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Modal modifier utilisateur */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modifier un utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateUser}>
            <input
              name="prenom"
              value={form.prenom}
              onChange={handleChange}
              className="form-control mb-2"
              placeholder="Prénom"
              required
            />
            <input
              name="nom"
              value={form.nom}
              onChange={handleChange}
              className="form-control mb-2"
              placeholder="Nom"
              required
            />
            <input
              name="telephone"
              value={form.telephone}
              onChange={handleChange}
              className="form-control mb-2"
              placeholder="Téléphone"
              required
            />
            <select
              name="region"
              value={form.region}
              onChange={handleChange}
              className="form-control mb-2"
              required
            >
              <option value="">Sélectionnez une région</option>
              <option value="Dakar">Dakar</option>
              <option value="Thiès">Thiès</option>
              <option value="Kaolack">Kaolack</option>
              <option value="Ziguinchor">Ziguinchor</option>
              <option value="Saint-Louis">Saint-Louis</option>
            </select>
            <input
              name="password"
              type="password"
              maxLength={4}
              value={form.password}
              onChange={handleChange}
              className="form-control mb-2"
              placeholder="Mot de passe (4 chiffres)"
            />
            <Button type="submit" variant="success" className="w-100">
              ✅ Mettre à jour
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Modal détails utilisateur */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Détails de l'utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <p><strong>Prénom :</strong> {selectedUser.prenom}</p>
              <p><strong>Nom :</strong> {selectedUser.nom}</p>
              <p><strong>Téléphone :</strong> {selectedUser.telephone}</p>
              <p><strong>Région :</strong> {selectedUser.region}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* Toast de notification */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg="light">
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default Users;