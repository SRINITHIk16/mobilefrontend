import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [plans, setPlans] = useState([]);
  const [rechargeHistory, setRechargeHistory] = useState([]);

  // Restore user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Login
  const login = async (email, password) => {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });

    setUser(res.data.user);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", res.data.token);

    return res.data.user;
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  // Load plans
  useEffect(() => {
    axios.get("http://localhost:5000/api/plans")
      .then(res => setPlans(res.data));
  }, []);

  // Add recharge (LOCAL)
  const addRecharge = (recharge) => {
    const rechargeWithUser = {
      ...recharge,
      id: Date.now(),
      userName: user?.name || 'Guest User',
      userEmail: user?.email || 'guest@example.com',
      date: new Date().toISOString().split('T')[0],
      status: 'Success'
    };
    setRechargeHistory(prev => [rechargeWithUser, ...prev]);
  };

  // Get users who have recharged
  const getUsersWhoRecharged = () => {
    const uniqueUsers = {};
    rechargeHistory.forEach(recharge => {
      if (!uniqueUsers[recharge.userEmail]) {
        uniqueUsers[recharge.userEmail] = {
          name: recharge.userName,
          email: recharge.userEmail,
          phone: recharge.number,
          totalRecharges: 0,
          totalAmount: 0,
          lastRecharge: recharge.date,
          status: 'active'
        };
      }
      uniqueUsers[recharge.userEmail].totalRecharges++;
      uniqueUsers[recharge.userEmail].totalAmount += recharge.amount;
      if (recharge.date > uniqueUsers[recharge.userEmail].lastRecharge) {
        uniqueUsers[recharge.userEmail].lastRecharge = recharge.date;
      }
    });
    return Object.values(uniqueUsers);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        plans,
        rechargeHistory,
        addRecharge,
        getUsersWhoRecharged
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
