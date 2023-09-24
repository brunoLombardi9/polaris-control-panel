import { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

const authContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  async function logIn(email, password) {
    return await signInWithEmailAndPassword(auth, email, password);
  }

  async function logOut() {
    await signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const context = {
    user,
    logIn,
    logOut,
  };

  return (
    <authContext.Provider value={context}>{children}</authContext.Provider>
  );
}

export function UserAuth() {
  return useContext(authContext);
}
