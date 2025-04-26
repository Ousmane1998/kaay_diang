import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Accueil from "./pages/Accueil";

import 'bootstrap/dist/css/bootstrap.min.css';
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Courses from "./pages/Courses";
import CoursePage from "./pages/CoursePage";
import MesCours from "./pages/MesCours";
import CoursNiveau from "./pages/CoursNiveau";
import QuizPage from "./pages/QuizPage";
import Admin from "./Admin/Admin";
import Dashboard from "./Admin/Dashboard";
import Users from "./Admin/Users";
import ManageCourses from "./Admin/ManageCourses";
import Payments from "./Admin/Payments";
import Settings from "./Admin/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";



function App() {
  return (
    <Router>
    <div className="container-fluid min-vh-100" style={{ marginLeft: "220px", paddingBottom: "60px" }}>

        <Header />
        
      <div className="container-fluid d-flex">
        <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/niveau/:id" element={<CoursePage />} />
            <Route path="/mes-cours" element={<MesCours />} />
            <Route path="/courses/details/:id" element={<CoursNiveau />} />
            <Route path="/quiz/:id" element={<QuizPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
                    <Route path="/admin" element={<Admin />}>
                    k  <Route path="dashboard" element={<Dashboard />} />
                      <Route path="users" element={<Users />} />
                      <Route path="manageCourses" element={<ManageCourses />} />
                      <Route path="payments" element={<Payments />} />
                      <Route path="settings" element={<Settings />} />
                    </Route>
        </Routes>
      </div>
        <Footer />
    </div>
    </Router>
  );
}

export default App;
