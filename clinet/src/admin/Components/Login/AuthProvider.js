import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken") || "");
  const navigate = useNavigate();
  
  const loginAction = async (data) => {
    try {
      const response = await fetch(
        "http://dog.addictaco.com/api/v2/auth/authenticate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "fab6c94fc0044b53bf5e886a8fef1325",
          },
          body: JSON.stringify(data),
        }
      );
      const res = await response.json();
      if (res) {
        setUser(res.refreshToken);
        setToken(res.accessToken);
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        navigate("/Dashboard");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };


  const auth = useAuth();
  const logOut = async (data) => {
    try {
      const response = await fetch(
        "http://dog.addictaco.com/api/v2/auth/logout",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + auth.token,
            "Content-Type": "application/json",
            "x-api-key": "fab6c94fc0044b53bf5e886a8fef1325",
          },
        }
      );
      if (response) {
        setUser(null);
        setToken("");
        localStorage.clear();
        navigate("/");
        return;
      }
      throw new Error(response.message);
    } catch (err) {
      console.error(err);
    }
  };

  // const logOut = () => {
    
  //   setUser(null);
  //   setToken("");
  //   localStorage.clear();
  //   navigate("/");
  // };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
