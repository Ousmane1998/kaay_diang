import AdminSidebar from "../Components/AdminSidebar";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";


const Admin = () => {
  return (
    <div className="col-md-9 col-lg-10 content ">
      <AdminSidebar />
      <div className="col-md-9 col-lg-10 content " style={{ marginLeft: "220px" }}>
        <Outlet /> {/* Affiche le contenu des pages admin */}
      </div>
      
    </div>
  );
};

export default Admin;
