import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageCourses = () => {
  const [categories, setCategories] = useState([]); // Liste des catégories
  const [niveaux, setNiveaux] = useState([]); // Liste des niveaux
  const [courses, setCourses] = useState([]); // Liste des cours
  const [search, setSearch] = useState(""); // Recherche

  // État pour le modal d'ajout de cours
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    titre: "",
    description: "",
    video_url: 'null', // Fichier vidéo
    categorie_id: "",
    niveau_id: "",
  });

  useEffect(() => {
    fetchCategories();
    fetchNiveaux();
    fetchCourses();
  }, []);

  // Récupérer les catégories
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/categorie/liste");
      setCategories(response.data.data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des catégories :", error);
    }
  };

  // Récupérer les niveaux
  const fetchNiveaux = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/niveau/liste");
      setNiveaux(response.data.data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des niveaux :", error);
    }
  };

  // Récupérer les cours
  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/cours/liste");
      setCourses(response.data.results || []);
    } catch (error) {
      console.error("Erreur lors du chargement des cours :", error);
    }
  };

  // Ajouter un cours
  const handleAddCourse = async () => {
    const { titre, description, video_url, categorie_id, niveau_id } = newCourse;

    if (!titre || !description || !video_url || !categorie_id || !niveau_id) {
      return alert("Veuillez remplir tous les champs.");
    }

    const formData = new FormData();
    formData.append("titre", titre);
    formData.append("description", description);
    formData.append("video_url", video_url); // Ajout du fichier vidéo
    formData.append("categorie_id", categorie_id);
    formData.append("niveau_id", niveau_id);

    try {
      await axios.post("http://localhost:8000/api/cours/ajout", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Cours ajouté avec succès !");
      setNewCourse({
        titre: "",
        description: "",
        video_url: null,
        categorie_id: "",
        niveau_id: "",
      });
      setShowModal(false);
      fetchCourses(); // Met à jour la liste des cours
    } catch (error) {
      console.error("Erreur lors de l'ajout du cours :", error.response?.data || error.message);
      alert("Erreur lors de l'ajout du cours.");
    }
  };

  return (
    <div className="container-fluid mt-4">
      <h2 className="text-center">🎓 Gestion des cours</h2>

      {/* Recherche + bouton */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="🔍 Rechercher un cours..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          ➕ Ajouter un cours
        </button>
      </div>

      {/* Liste des cours */}
      <table className="table table-bordered w-100">
        <thead className="table-dark">
          <tr>
            <th>Titre</th>
            <th>Catégorie</th>
            <th>Niveau</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {courses
            .filter((course) => course.titre.toLowerCase().includes(search.toLowerCase()))
            .map((course) => (
              <tr key={course.id}>
                <td>{course.titre}</td>
                <td>{course.categorie}</td>
                <td>{course.niveau}</td>
                <td>{course.description}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modal pour ajouter un cours */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ajouter un cours</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="form-group mb-3">
                  <label htmlFor="titre" className="form-label">Titre</label>
                  <input
                    type="text"
                    id="titre"
                    className="form-control"
                    value={newCourse.titre}
                    onChange={(e) => setNewCourse({ ...newCourse, titre: e.target.value })}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    id="description"
                    className="form-control"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  ></textarea>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="video_url" className="form-label">Vidéo</label>
                  <input
                    type="file"
                    id="video_url"
                    className="form-control"
                    onChange={(e) => setNewCourse({ ...newCourse, video_file: e.target.files[0] })}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="categorie_id" className="form-label">Catégorie</label>
                  <select
                    id="categorie_id"
                    className="form-control"
                    value={newCourse.categorie_id}
                    onChange={(e) => setNewCourse({ ...newCourse, categorie_id: e.target.value })}
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map((categorie) => (
                      <option key={categorie.id} value={categorie.id}>
                        {categorie.nom}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="niveau_id" className="form-label">Niveau</label>
                  <select
                    id="niveau_id"
                    className="form-control"
                    value={newCourse.niveau_id}
                    onChange={(e) => setNewCourse({ ...newCourse, niveau_id: e.target.value })}
                  >
                    <option value="">Sélectionner un niveau</option>
                    {niveaux.map((niveau) => (
                      <option key={niveau.id} value={niveau.id}>
                        {niveau.nom}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Annuler
                </button>
                <button type="button" className="btn btn-primary" onClick={handleAddCourse}>
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;