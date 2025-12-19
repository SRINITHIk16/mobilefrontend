import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import RechargePlans from "./pages/RechargePlans";
import Admin from "./pages/Admin";

export const API_URI = import.meta.env.VITE_API_URI;
/* 🔒 User Protected */
const UserRoute = ({ children }) => {
  const { user } = useApp();
  return user ? children : <Navigate to="/login" />;
};

/* 🔒 Admin Protected */
const AdminRoute = ({ children }) => {
  const { user } = useApp();
  return user && user.role === "admin"
    ? children
    : <Navigate to="/login" />;
};

function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar />

        <Routes>
          {/* 🌍 PUBLIC */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/recharge-plans" element={<RechargePlans />} />

          {/* 🔐 USER */}
          <Route
            path="/dashboard"
            element={
              <UserRoute>
                <Dashboard />
              </UserRoute>
            }
          />

          {/* 🔐 ADMIN */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
        </Routes>

        <Footer />
      </Router>
    </AppProvider>
  );
}

export default App;
