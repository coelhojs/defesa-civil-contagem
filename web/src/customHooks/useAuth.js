// Hook (use-auth.js)
import React, { useState, useEffect, useContext, createContext } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import { getUsuario } from '../controllers/Usuarios';
import history from '../history';

// const firebaseConfig = {
//   apiKey: "AIzaSyA9KI6v1zI8bfNDS8dTe2AiZDKWOwJFKdQ",
//   authDomain: "defesa-civil-contagem.firebaseapp.com",
//   databaseURL: "https://defesa-civil-contagem.firebaseio.com",
//   projectId: "defesa-civil-contagem",
//   storageBucket: "defesa-civil-contagem.appspot.com",
//   messagingSenderId: "651305936833",
//   appId: "1:651305936833:web:456a186aec8d342ddfb140"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAU87-FPUdNrSzn8jWanB93L3jRVA-xyIY",
  authDomain: "defesa-civil-contagem.firebaseapp.com",
  databaseURL: "https://defesa-civil-contagem.firebaseio.com",
  projectId: "defesa-civil-contagem",
  storageBucket: "defesa-civil-contagem.appspot.com",
  messagingSenderId: "651305936833",
  appId: "1:651305936833:web:340ba94339df158d"
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

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const login = () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(response => {
        if (getUsuario(response.user.email)) {
          console.log(`Usuario cadastrado: ${response.user.email}`);
          setUser(response.user);
          return response.user;
        } else {

        }
      });
  };

  const signup = (email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        setUser(response.user);
        return response.user;
      });
  };

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