// context/AuthContextProvider.jsx
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ useCallback to prevent re-creation
  const getUser = useCallback(async () => {
    try {
      const res = await API.get("/auth/me");
      setUser(res.data?.data || null);
    } catch (err) {
      setUser(null);
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshUser = async () => {
    setLoading(true);
    await getUser();
  };

  const logout = async () => {
    try {
      await API.post("/auth/logout");
      setUser(null);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        if (isMounted) {
          setUser(res.data?.data || null);
        }
      } catch (err) {
        if (isMounted) {
          setUser(null);
        }
        console.log(err.response?.data || err.message);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, refreshUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;