import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../../services/api";
import Cookies from "js-cookie";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("accessToken") || "");
  const [_id, setId] = useState(localStorage.getItem("id") || "");
  const [loading, setLoading] = useState(false); // State to manage loading spinner
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const loginAction = async (data) => {
    try {
      const response = await fetch(
        `${Api}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            
          },
          body: JSON.stringify(data),
        }
      );
      const res = await response.json();
      if (res) {
        navigate("/");
        console.log(res.data.user._id);
        console.log(res.data.token);
        setId(res.data.user._id);
        setToken(res.data.token);
        localStorage.setItem("accessToken", res.data.token);
        localStorage.setItem("id", res.data.user._id);
        Cookies.set("id", res.data.user._id);
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
