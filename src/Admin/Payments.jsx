import React, { useState } from "react";

const Payments = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, name: "Alioune Diop", amount: "15€", status: "Validé", date: "2025-04-18" },
    { id: 2, name: "Amina Ba", amount: "30€", status: "En attente", date: "2025-04-17" },
  ]);
  const [search, setSearch] = useState("");

  return (
    <div className="container-fluid mt-4">
      <h2 className="text-center">💰 Gestion des paiements</h2>

      {/* Barre de recherche */}
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="🔍 Rechercher une transaction..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Tableau des transactions */}
      <div className="table-responsive">
        <table className="table table-bordered w-100">
          <thead className="table-dark">
            <tr>
              <th>Nom</th>
              <th>Montant</th>
              <th>Statut</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.filter(tx => tx.name.toLowerCase().includes(search.toLowerCase())).map((tx) => (
              <tr key={tx.id} className={tx.status === "Validé" ? "table-success" : "table-warning"}>
                <td>{tx.name}</td>
                <td>{tx.amount}</td>
                <td>{tx.status}</td>
                <td>{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
