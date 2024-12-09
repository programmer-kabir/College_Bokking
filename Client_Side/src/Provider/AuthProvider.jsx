import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import axios from "axios";
import app from "../Firebase/Firebase.config";
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(); // Move googleProvider inside the component function

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");
  //   Observe User
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      console.log(currentUser);
      setLoading(false);
    });
    return () => {
      return unsubscribe;
    };
  }, []);
  // Create New user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // exiting user sing in
  const singIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // User LogOUt
  const logOut = () => {
    return signOut(auth);
  };

  // User name and photo
  const updateUserProfile = (name, photo = null) => {
    const profileData = {
      displayName: name,
    };

    if (photo !== null) {
      profileData.photoURL = photo;
    }

    return updateProfile(auth.currentUser, profileData);
  };
  // Google
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Value pass
  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    singIn,
    logOut,
    updateUserProfile,
    signInWithGoogle,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
