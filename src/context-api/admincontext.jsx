import { createContext, useContext, useState } from "react";

// Create Context
const AdminContext = createContext();

// Create Provider
export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  // Toggle Admin Mode
  const toggleAdminMode = () => {
    setIsAdmin((prev) => !prev);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, toggleAdminMode }}>
      {children}
    </AdminContext.Provider>
  );
};

// Custom Hook for using Admin Context
export const useAdmin = () => {
  return useContext(AdminContext);
};