import React, { useState } from "react";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: "", level: "", video: "", description: "" });

  const handleChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const handleAddCourse = () => {
    setCourses([...courses, { ...newCourse, id: courses.length + 1 }]);
    setShowModal(false);
    setNewCourse({ title: "", level: "", video: "", description: "" });
  };
  const [search, setSearch] = useState("");
  const handleEdit = (id) => {
    const selectedCourse = courses.find(course => course.id === id);
    if (selectedCourse) {
      setNewCourse(selectedCourse);
      setShowModal(true);
    }
  };
  
  const handleDelete = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };
  

  return (
    <div className="container-fluid mt-4">
      <h2 className="text-center">🎓 Gestion des cours</h2>


      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">➕ Ajouter un nouveau cours</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">📖 Titre du cours</label>
                    <input type="text" className="form-control" name="title" value={newCourse.title} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">🏅 Niveau</label>
                    <select className="form-control" name="level" value={newCourse.level} onChange={handleChange}>
                      <option>Niveau 0</option>
                      <option>Niveau 1</option>
                      <option>Niveau 2</option>
                    </select>
                  </div>
                  <div className="mb-3">
  <label className="form-label">🎬 Joindre une vidéo</label>
  <input type="file" className="form-control" accept="video/*" name="video" onChange={(e) => setNewCourse({ ...newCourse, video: e.target.files[0] })} />
</div>

                  <div className="mb-3">
                    <label className="form-label">📝 Description</label>
                    <textarea className="form-control" name="description" value={newCourse.description} onChange={handleChange}></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Annuler</button>
                <button className="btn btn-success" onClick={handleAddCourse}>✅ Ajouter</button>
              </div>
            </div>
          </div>
        </div>
      )}
  <div className="d-flex justify-content-between align-items-center mb-3">
  <input
    type="text"
    className="form-control w-50"
    placeholder="🔍 Rechercher un cours..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
  <button className="btn btn-primary" onClick={() => setShowModal(true)}>➕ Ajouter un cours</button>
</div>


      {/* Tableau des cours */}
      <table className="table table-bordered w-100">
        <thead className="table-dark">
          <tr>
            <th>Titre</th>
            <th>Niveau</th>
            <th>Vidéo</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
  {courses
    .filter(course => course.title.toLowerCase().includes(search.toLowerCase()))
    .map((course) => (
      <tr key={course.id}>
        <td>{course.title}</td>
        <td>{course.level}</td>
        <td>
          {course.video ? <a href={URL.createObjectURL(course.video)} target="_blank" rel="noopener noreferrer">📺 Voir la vidéo</a> : "Pas de vidéo"}
        </td>
        <td>{course.description}</td>
        <td>
          <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(course.id)}>
            ✏️ Modifier
          </button>
          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(course.id)}>
            🗑️ Supprimer
          </button>
        </td>
      </tr>
    ))}
</tbody>


      </table>
    </div>
  );
};

export default ManageCourses;
