import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useApp } from "../context/AppContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();
  const { login } = useApp(); // ✅ use context login

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.email) errs.email = "Email is required";
    if (!formData.password) errs.password = "Password is required";
    return errs;
  };

  // 🔑 UPDATED LOGIC (AS YOU REQUESTED)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError("");

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      const user = await login(formData.email, formData.password);

      // 🚀 Redirect based on role from DB
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/recharge-plans");
      }

    } catch (err) {
      setServerError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-bg-primary via-purple-50 to-accent/20 overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-hero-pattern opacity-40"></div>
      <div className="absolute inset-0 bg-mobile-pattern opacity-20"></div>
      <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-secondary/10"></div>
      <div className="relative z-10">
      <div className="card w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {serverError && (
          <p className="text-danger text-center mb-4">{serverError}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
            />
            {errors.email && (
              <p className="text-danger text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label>Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className="input-field"
              />
              <button
                type="button"
                className="absolute right-3 top-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-danger text-sm">{errors.password}</p>
            )}
          </div>

          <button className="btn-primary w-full">Login</button>
        </form>

        <p className="text-center mt-4">
          Don’t have an account?
          <Link to="/signup" className="text-primary ml-1">
            Sign up
          </Link>
        </p>
      </div>
      </div>
    </div>
  );
};

export default Login;
