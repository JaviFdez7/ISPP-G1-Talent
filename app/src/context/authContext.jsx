import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
  useContext,
  useEffect,
} from "react";
import axios from "axios";
import PropTypes from "prop-types";
export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const apiURL = import.meta.env.VITE_BACKEND_URL
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("access_token"))
  );

  const getInitialRole = () => {
    const roleFromStorage = localStorage.getItem("role");
    if (!roleFromStorage) {
      return { isCandidate: false, isRepresentative: false };
    }
    try {
      return JSON.parse(roleFromStorage);
    } catch (error) {
      console.error("Error parsing role from localStorage", error);
      return { isCandidate: false, isRepresentative: false };
    }
  };

  const [role, setRole] = useState(getInitialRole);
  const { isCandidate, isRepresentative } = role;

  const [subscription, setSubscription] = useState(null);

  const fetchSubscription = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const userId = localStorage.getItem("userId");
      const config = {
        headers: { Authorization: `${token}` },
      }
      const response = await axios.get(apiURL + '/subscriptions/' + userId, config)
      setSubscription(response.data.data.subtype); // Establece la suscripción en el contexto
    } catch (error) {
      console.error(error); // Muestra el error
      throw error; // Lanza el error
    }
  }, [apiURL]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubscription();
    }
  }, [isAuthenticated, fetchSubscription]);

  const login = useCallback(function (token, userType, userId) {
    const role = {
      isCandidate: userType === "Candidate",
      isRepresentative: userType === "Representative",
    };

    localStorage.setItem("access_token", token);
    localStorage.setItem("role", JSON.stringify(role));
    localStorage.setItem("userId", userId);
    setIsAuthenticated(true);
    setRole(role);
    fetchSubscription();
  }, [fetchSubscription]);

  const logout = useCallback(function () {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    setRole({ isCandidate: false, isRepresentative: false });
    setSubscription(null); // Establece subscription a null
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
      isCandidate,
      isRepresentative,
      subscription
    }),
    [isAuthenticated, login, logout, isCandidate, isRepresentative, subscription]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuthContext() {
  return useContext(AuthContext);
}