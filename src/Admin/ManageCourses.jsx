import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [niveaux, setNiveaux] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [course, setCourse] = useState({
    titre: "",
    description: "",
    categorie_id: "",
    niveau_id: "",
    video_url: null,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [coursesRes, catRes, nivRes] = await Promise.all([
        axios.get("http://localhost:8000/api/cours/liste"),
        axios.get("http://localhost:8000/api/categorie/liste"),
        axios.get("http://localhost:8000/api/niveau/liste"),
      ]);

      setCourses(coursesRes.data.data || []);
      setCategories(catRes.data.data || []);
      setNiveaux(nivRes.data.data || []);
    } catch (error) {
      console.error("Erreur de chargement:", error);
      alert("❌ Erreur lors du chargement des données.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setCourse((prev) => ({ ...prev, video_url: e.target.files[0] }));
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titre", course.titre);
    formData.append("description", course.description);
    formData.append("categorie_id", course.categorie_id);
    formData.append("niveau_id", course.niveau_id);
    formData.append("video_url", course.video_url);

    try {
      const response = await axios.post("http://localhost:8000/api/cours/ajout", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Cours ajouté avec succès !");
      setCourses([...courses, response.data.data]);
      setShowModal(false);
      setCourse({ titre: "", description: "", categorie_id: "", niveau_id: "", video_url: null });
    } catch (error) {
      console.error("Erreur ajout cours:", error);
      alert("❌ Erreur : " + (error.response?.data?.message || "Erreur inconnue"));
    }
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setCourse({
      titre: course.titre,
      description: course.description,
      categorie_id: course.categorie_id,
      niveau_id: course.niveau_id,
      video_url: null, // Ne pas pré-remplir le fichier
    });
    setShowEditModal(true);
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titre", course.titre);
    formData.append("description", course.description);
    formData.append("categorie_id", course.categorie_id);
    formData.append("niveau_id", course.niveau_id);
    if (course.video_url) {
      formData.append("video_url", course.video_url);
    }

    try {
      await axios.put(`http://localhost:8000/api/cours/update/${selectedCourse.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Cours mis à jour avec succès !");
      fetchData(); // Recharger les données
      setShowEditModal(false);
    } catch (error) {
      console.error("Erreur mise à jour cours:", error);
      alert("❌ Erreur : " + (error.response?.data?.message || "Erreur inconnue"));
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce cours ?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/cours/delete/${id}`);
      alert("✅ Cours supprimé avec succès !");
      setCourses(courses.filter((course) => course.id !== id));
    } catch (error) {
      console.error("Erreur suppression cours:", error);
      alert("❌ Erreur : " + (error.response?.data?.message || "Erreur inconnue"));
    }
  };

  const handleShowDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/cours/details/${id}`);
      setSelectedCourse(response.data.data);
      setShowDetailModal(true);
    } catch (error) {
      console.error("Erreur récupération détails cours:", error);
      alert("❌ Erreur : " + (error.response?.data?.message || "Erreur inconnue"));
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-4">
        <h2>📚 Liste des Cours</h2>
        <Button onClick={() => setShowModal(true)}>➕ Ajouter un cours</Button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Titre</th>
            <th>Description</th>
            <th>Catégorie</th>
            <th>Niveau</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((c, i) => (
              <tr key={c.id}>
                <td>{i + 1}</td>
                <td>{c.titre}</td>
                <td>{c.description}</td>
                <td>{c.categorie?.nom || c.categorie_nom}</td>
                <td>{c.niveau?.nom || c.niveau_nom}</td>
                <td>
                  <Button variant="info" size="sm" onClick={() => handleShowDetails(c.id)}>
                    🔍 Détails
                  </Button>{" "}
                  <Button variant="warning" size="sm" onClick={() => handleEditCourse(c)}>
                    ✏️ Modifier
                  </Button>{" "}
                  <Button variant="danger" size="sm" onClick={() => handleDeleteCourse(c.id)}>
                    🗑️ Supprimer
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="6" className="text-center">Aucun cours trouvé</td></tr>
          )}
        </tbody>
      </table>

      {/* Modal ajout cours */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton><Modal.Title>Ajouter un Cours</Modal.Title></Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAddCourse}>
            <input name="titre" className="form-control my-2" placeholder="Titre" onChange={handleChange} value={course.titre} required />
            <textarea name="description" className="form-control my-2" placeholder="Description" onChange={handleChange} value={course.description} required />
            <select name="categorie_id" className="form-control my-2" value={course.categorie_id} onChange={handleChange} required>
              <option value="">Choisir une catégorie</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.nom}</option>
              ))}
            </select>
            <select name="niveau_id" className="form-control my-2" value={course.niveau_id} onChange={handleChange} required>
              <option value="">Choisir un niveau</option>
              {niveaux.map((niv) => (
                <option key={niv.id} value={niv.id}>{niv.nom}</option>
              ))}
            </select>
            <input type="file" name="video_url" className="form-control my-2" onChange={handleFileChange} accept="video/*" required />
            <Button type="submit" className="w-100" variant="success">Ajouter</Button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Modal modifier cours */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modifier un Cours</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateCourse}>
            <input
              name="titre"
              value={course.titre}
              onChange={handleChange}
              className="form-control my-2"
              placeholder="Titre"
              required
            />
            <textarea
              name="description"
              value={course.description}
              onChange={handleChange}
              className="form-control my-2"
              placeholder="Description"
              required
            />
            <select
              name="categorie_id"
              value={course.categorie_id}
              onChange={handleChange}
              className="form-control my-2"
              required
            >
              <option value="">Choisir une catégorie</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.nom}</option>
              ))}
            </select>
            <select
              name="niveau_id"
              value={course.niveau_id}
              onChange={handleChange}
              className="form-control my-2"
              required
            >
              <option value="">Choisir un niveau</option>
              {niveaux.map((niv) => (
                <option key={niv.id} value={niv.id}>{niv.nom}</option>
              ))}
            </select>
            <input
              type="file"
              name="video_url"
              className="form-control my-2"
              onChange={handleFileChange}
              accept="video/*"
            />
            <Button type="submit" className="w-100" variant="success">Mettre à jour</Button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Modal détails cours */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Détails du Cours</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCourse && (
            <div>
              <h4>{selectedCourse.titre}</h4>
              <p><strong>Description :</strong> {selectedCourse.description}</p>
              <p><strong>Catégorie :</strong> {selectedCourse.categorie?.nom || selectedCourse.categorie_nom}</p>
              <p><strong>Niveau :</strong> {selectedCourse.niveau?.nom || selectedCourse.niveau_nom}</p>
              <p><strong>Vidéo :</strong></p>
              <video controls className="w-100">
                <source src={selectedCourse.video_url} type="video/mp4" />
              </video>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageCourses;