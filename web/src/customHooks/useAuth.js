// Hook (use-auth.js)
import React, { useState, useEffect, useContext, createContext } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import { cadastroUsuario, loginUsuario, getUsuario } from '../controllers/Usuarios';
import history from '../history';

const firebaseConfig = {
  apiKey: "AIzaSyCzxKqnfjCJRVO6LsB8JYzcVXZVhbCUsmA",
  authDomain: "defesa-civil-contagem-54fe7.firebaseapp.com",
  databaseURL: "https://defesa-civil-contagem-54fe7.firebaseio.com",
  projectId: "defesa-civil-contagem-54fe7",
  storageBucket: "",
  messagingSenderId: "985053180633",
  appId: "1:985053180633:web:4d105c6bc93f1ae8e7c4c8"
};

// Add your Firebase credentials
firebase.initializeApp({
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  appID: firebaseConfig.appId
});

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState("");

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const login = (email, password) => {
    // const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      // .signInWithPopup(googleAuthProvider)
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        setIdToken(response.credential.idToken);
        if (loginUsuario(idToken)) {
          setUser(response);
          return response;
        } else {

        }
      });
  };

  const signup = (idToken, formValues) => {
    return cadastroUsuario(idToken, formValues);
  };

  // const signup = (email, password) => {
  //   return firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(response => {
  //       setUser(response.user);
  //       return response.user;
  //     });
  // };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  const sendPasswordResetEmail = email => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };

  const confirmPasswordReset = (code, password) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    login,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset
  };
}