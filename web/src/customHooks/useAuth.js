// Hook (use-auth.js)
import * as firebase from "firebase/app";
import "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { cadastroUsuario } from '../controllers/Usuarios';
import history from '../history';
import { api } from "../controllers/index";

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
  //user = autenticacao Google
  const [user, setUser] = useState(null);
  //usuario = autenticacao Aplicação  
  const [usuario, setUsuario] = useState(null);
  const [idToken, setIdToken] = useState("");
  const [apiKey, setApiKey] = useState("");

  const login = () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    try {
      return firebase
        .auth()
        .signInWithPopup(googleAuthProvider)
        .then(response => {
          console.log(response)
          return loginUsuario(response.credential.idToken)
        });
    } catch (error) {
      console.error(error);
    }
  };

  const loginUsuario = async idToken => {
    api.post(`/auth/google/login`, {},
      {
        headers: {
          'authorization': `Bearer ${idToken}`
        }
      })
      .then(function (response) {
        console.log(response)
        if (response.data.mensagem == "Usuário não cadastrado") {
          history.push('/Cadastro');
        } else {
          setApiKey(response.data.api_key);
          setUsuario(response.data.usuario);
          history.push('/')
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  const loginEmailSenha = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        console.log(response)
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
        setUsuario(false);
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
        setUsuario(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    usuario,
    login,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset
  };
}