import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Update localStorage whenever userDetails changes
  useEffect(() => {
    if (userDetails) {
      localStorage.setItem('user', JSON.stringify(userDetails));
      localStorage.setItem('authToken', userDetails.token); // Store token too
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
    }
  }, [userDetails]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userDetails, setUserDetails }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
