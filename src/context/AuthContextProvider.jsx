import { useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);  
  const [loading, setLoading] = useState(true); 

  const handleGetUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/auth/me",
        { withCredentials: true }
      );

      setUser(res.data?.data || null);
    } catch (error) {
      setUser(null); // important
      console.log(error.message);
    } finally {
      setLoading(false); // ✅ FIXED
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;