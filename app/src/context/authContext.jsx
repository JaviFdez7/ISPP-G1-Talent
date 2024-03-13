import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
  useContext,
} from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {

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
  }, []);

  const logout = useCallback(function () {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    setRole({ isCandidate: false, isRepresentative: false });
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
      isCandidate,
      isRepresentative,
    }),
    [isAuthenticated, login, logout, isCandidate, isRepresentative]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuthContext() {
  return useContext(AuthContext);
}
