import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

 const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState({email: '', userName: ''}); // Manage login state
  const [userDetails, setUserDetails] = useState(null); // Store user details if needed

  return (
    <AuthContext.Provider value = {{
        isLoggedIn,setIsLoggedIn,userDetails,setUserDetails }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
