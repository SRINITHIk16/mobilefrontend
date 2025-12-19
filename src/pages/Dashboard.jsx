import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import axios from "axios";

const Dashboard = () => {
  const { user, rechargeHistory = [], getUsersWhoRecharged } = useApp();
  const navigate = useNavigate();

  // ADMIN STATES
  const [ setUsers] = useState([]);
  const rechargedUsers = getUsersWhoRecharged();
  const [planData, setPlanData] = useState({
    name: "",
    price: "",
    validity: "",
    data: "",
    calls: "",
    sms: ""
  });

  useEffect(() => {
    if (!user) navigate("/login");

    // Load users only for admin
    if (user?.role === "admin") {
      axios
        .get("http://localhost:5000/api/auth/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        .then(res => setUsers(res.data))
        .catch(() => {});
    }
  }, [user, navigate, setUsers]);

  if (!user) return null;

  /* ================= USER DASHBOARD ================= */
  if (user.role !== "admin") {
    const latestRecharge = rechargeHistory[0];

    return (
      <div className="min-h-screen bg-orange-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">
          Welcome, {user.name}
        </h1>

        {/* Current Plan */}
        <div className="card mb-6 p-4">
          <h2 className="text-lg font-semibold mb-2">
            Current Recharge Plan
          </h2>
          {latestRecharge ? (
            <p>
               {latestRecharge.plan} – ₹{latestRecharge.amount}
            </p>
          ) : (
            <p>No active recharge</p>
          )}
        </div>

        {/* Recharge History */}
        <div className="card p-4">
          <h2 className="text-lg font-semibold mb-3">
            Recharge History
          </h2>

          {rechargeHistory.length === 0 ? (
            <p>No recharges yet</p>
          ) : (
            <ul className="space-y-2">
              {rechargeHistory.map((r, i) => (
                <li key={i} className="border-b pb-2">
                   {r.number} – ₹{r.amount} ({r.plan})
                </li>
              ))}
            </ul>
          )}
        </div>
        </div>
      </div>
    );
  }

  /* ================= ADMIN DASHBOARD ================= */
  const handleChange = (e) => {
    setPlanData({ ...planData, [e.target.name]: e.target.value });
  };

  const handleAddPlan = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/plans",
        planData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert("Plan added successfully");
      setPlanData({
        name: "",
        price: "",
        validity: "",
        data: "",
        calls: "",
        sms: ""
      });

    } catch {
      alert("Failed to add plan");
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {/* USERS WHO RECHARGED */}
      {user.role === "admin" && (
  <div className="card mt-6 p-4">
    <h2 className="text-xl font-bold mb-4">Users</h2>

    {rechargedUsers.length === 0 ? (
      <p>No users have made recharges yet</p>
    ) : (
      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Email</th>
            <th className="text-left p-2">Phone</th>
            <th className="text-left p-2">Total Recharges</th>
            <th className="text-left p-2">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {rechargedUsers.map((u, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.phone}</td>
              <td className="p-2 text-center">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {u.totalRecharges}
                </span>
              </td>
              <td className="p-2 font-semibold text-green-600">₹{u.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
)}
<br></br>


      {/* ADD PLAN */}
      <div className="card p-4">
        <h2 className="text-lg font-semibold mb-3">
          Add New Recharge Plan
        </h2>

        <form onSubmit={handleAddPlan} className="grid grid-cols-2 gap-4">
          <input name="name" placeholder="Plan Name" value={planData.name} onChange={handleChange} className="input-field" />
          <input name="price" placeholder="Price" value={planData.price} onChange={handleChange} className="input-field" />
          <input name="validity" placeholder="Validity" value={planData.validity} onChange={handleChange} className="input-field" />
          <input name="data" placeholder="Data" value={planData.data} onChange={handleChange} className="input-field" />
          <input name="calls" placeholder="Calls" value={planData.calls} onChange={handleChange} className="input-field" />
          <input name="sms" placeholder="SMS" value={planData.sms} onChange={handleChange} className="input-field" />

          <button className="btn-primary col-span-2">
            Add Plan
          </button>
        </form>
      </div>
    </div>
  </div>
  );
};

export default Dashboard;
