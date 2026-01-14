import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PropertyDetail from "./pages/PropertyDetail";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminEnquiries from "./pages/AdminEnquiries";
import AdminProperties from "./pages/AdminProperties";
import Footer from "./components/Footer";
import SellerDashboard from "./pages/SellerDashboard";
import AddProperty from "./pages/AddProperty";
import MyEnquiries from "./pages/MyEnquiries";
import EditProperty from "./pages/EditProperty";
import CreateAdmin from "./pages/CreateAdmin";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import About from "./pages/About";
import VerifyEmail from "./pages/VerifyEmail";
import AdminUsers from "./pages/AdminUsers";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />

        {/* Admin */}
        <Route path="/admin/enquiries" element={<AdminEnquiries />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/properties" element={<AdminProperties />} />
        <Route path="/admin/create-admin" element={<CreateAdmin />} />
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        <Route path="/seller/add-property" element={<AddProperty />} />
        <Route path="/my-enquiries" element={<MyEnquiries />} />
        <Route path="/seller/edit-property/:id" element={<EditProperty />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <Footer />
    </>
  );
}
