import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const userStats = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
    datasets: [
      {
        label: "Nouveaux utilisateurs",
        data: [12, 19, 7, 15, 10, 20],
        backgroundColor: "#007bff",
      },
    ],
  };

  const courseStats = {
    labels: ["Cours Niveau 0", "Cours Niveau 1", "Cours Niveau 2"],
    datasets: [
      {
        data: [30, 20, 50],
        backgroundColor: ["#28a745", "#ffc107", "#dc3545"],
      },
    ],
  };

  return (
    <div className="container-fluid mt-4">
      <h2 className="text-center">📊 Tableau de bord Admin</h2>
      
      {/* Statistiques clés */}
      <div className="row text-center mt-4">
        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <h3>👤 120 Utilisateurs</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <h3>🎓 15 Cours créés</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <h3>💰 50 Transactions</h3>
          </div>
        </div>
      </div>

      {/* Graphiques */}
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h4 className="text-center">📈 Évolution des utilisateurs</h4>
            <Bar data={userStats} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h4 className="text-center">🎓 Répartition des cours</h4>
            <Doughnut data={courseStats} />
          </div>
        </div>
      </div>

      {/* Activités récentes */}
      <div className="mt-4">
        <h4 className="text-center">📅 Activités récentes</h4>
        <ul className="list-group">
          <li className="list-group-item">Alioune a acheté le cours "Niveau 1"</li>
          <li className="list-group-item">Amina s'est inscrite aujourd'hui</li>
          <li className="list-group-item">Fatou a complété le quiz "Lecture avancée"</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
