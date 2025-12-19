import { Link, useNavigate } from "react-router-dom";
import { Smartphone, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useApp } from "../context/AppContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Smartphone className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold">RechargeHub</span>
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          <Link to="/">Home</Link>
          <Link to="/recharge-plans">Plans</Link>

          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              {user.role === "admin" && <Link to="/admin">Admin</Link>}
              <button onClick={handleLogout} className="flex items-center gap-1">
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup" className="btn-primary">Signup</Link>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
