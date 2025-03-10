import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import Login from "./Screen/Client/Login";
import Register from "./Screen/Client/Register";
import Forgot from "./Screen/Client/Forgot";
import Home from "./Screen/Home";
import VerifyScreen from "./Screen/Client/Verify";
import Otp from "./Screen/Client/Otp";
import ResetPassword from "./Screen/Client/ResetPassword";
import NotFound from "./Screen/Error/NotFound";

import UserProfile from "./Screen/Client/UserProfile";

import Cart from "./Screen/Client/cart/cart";
import Checkout from "./Screen/Client/cart/checkout";
import ReturnQR from "./Screen/Client/cart/ReturnQR";

import ProductManagerScreen from "./Screen/ProductManager/ProductManagerScreen";
import SaleScreen from "./Screen/Sale/SaleScreen";

import AdminLayout from "./Screen/Admin/AdminLayout";
import AdminDashboard from "./Screen/Admin/AdminDashboard";
import UserManagement from "./Screen/Admin/UserManagement";
import SaleManagement from "./Screen/Admin/SaleManagement";

import FeedbackManagement from "./Screen/Admin/FeedbackManagement";


const App = () => {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/verify" element={<VerifyScreen />} />
        <Route path="/otp/:email" element={<Otp />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        <Route path="/userProfile" element={<UserProfile />} />

        <Route path="/cart">
          <Route index element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="returnQR" element={<ReturnQR />} />
        </Route>

        <Route path="/productManager" element={<ProductManagerScreen />} />
        <Route
          path="/admin/*"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="manage-user" element={<UserManagement />} />
          <Route path="manage-sale" element={<SaleManagement />} />
          <Route path="manage-feedback" element={<FeedbackManagement />} />
        </Route>
        <Route path="/sale" element={<SaleScreen />} />


        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router >
  );
};

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

const AdminProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);

  if (!user || user.role !== "admin") {
    return <NotFound />;
  }

  return children;
};

AdminProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
