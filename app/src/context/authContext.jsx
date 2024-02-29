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
    localStorage.getItem("access_token") ?? false
  );

  const [role, setRole] = useState(
    localStorage.getItem("role") ?? {
      isCandidate: false,
      isRepresentative: false,
    }
  );
  const { isCandidate } = role;
  const { isRepresentative } = role;

  const login = useCallback(function (token_access, token_refresh, role) {
    localStorage.setItem("access_token", token_access);
    localStorage.setItem("refresh_token", token_refresh);
    localStorage.setItem("role", role);
    setIsAuthenticated(true);
    setRole(role);
  }, []);

  const logout = useCallback(function () {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
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
