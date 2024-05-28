import { createContext, useContext, useEffect, useState } from 'react';
import { onUserStateChanged, signInFn, signOutFn } from '../api/firebase';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onUserStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, signInFn, signOutFn, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
