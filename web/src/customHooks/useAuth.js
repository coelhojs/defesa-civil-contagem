// Hook (use-auth.js)
import { api } from "./api";
import * as firebase from "firebase/app";
import "firebase/auth";
import * as React from 'react';
import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";

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

const useFirebaseContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <useFirebaseContext.Provider value={auth}>{children}</useFirebaseContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(useFirebaseContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  let history = useHistory();

  //user = autenticacao Google
  const [user, setUser] = useLocalStorage('user', null);
  //usuario = autenticacao Aplicação  
  const [usuario, setUsuario] = useLocalStorage('usuario', null);
  //idToken = token de auth do google
  const [idToken, setIdToken] = useLocalStorage('idToken', null);
  //apiKey = chave gerada pelo servidor
  const [apiKey, setApiKey] = useLocalStorage('apiKey', null);

  const [showWarning, setShowWarning] = useState(false);

  const loginUsuario = async () => {
    try {
      return login()
        .then(token => {
          setIdToken(token);
          api.post(`/auth/google/login2`, {},
            {
              headers: {
                'authorization': `Bearer ${token}`
              }
            })
            .then(function (response) {
              if (response.data && response.data.mensagem === "Usuário não cadastrado" || response.status != 200) {
                history.push('/defesa-civil-contagem/');
                signout();
                toggleShowWarning();
              } else if (response.data && response.data.api_key) {
                setApiKey(response.data.api_key);
                setUsuario(response.data.usuario);
                history.push('/defesa-civil-contagem/Mapa')
              }
            })
        })
    } catch (err) {
      console.error(`Houve um problema na autenticação: ${err}`)
    }
  }

  const login = async () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

    return firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(response => {
        console.log(response);
        setUser(response.user)
        return response.credential.idToken;
      });
  };

  // const loginEmailSenha = (email, password) => {
  //   return firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .then(response => {
  //       //console.log(response)
  //       setIdToken(response.credential.idToken);
  //       if (loginUsuario()) {
  //         setUser(response);
  //         return response;
  //       } else {

  //       }
  //     }).catch(error => {

  //     });
  // };

  const signup = (formValues) => {
    return cadastroUsuario(formValues);
  };

  const cadastroUsuario = async (formValues) => {
    try {
      const response = await api.post(`/auth/google/cadastro`,
        { ...formValues },
        {
          headers: {
            'authorization': `Bearer ${idToken}`
          }
        })
      console.log(response);
      if (response.data === "Usuário não cadastrado") {
        //Mandar pro form de cadastro
        console.log("não cadastrado.")
      }
    } catch (error) {
      console.error(error);
    }
  }

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setIdToken(null);
        setApiKey(null);
        setUsuario(null);
        setUser(null);
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

  const toggleShowWarning = () => {
    setShowWarning(!showWarning);
  }

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
    idToken,
    apiKey,
    login,
    loginUsuario,
    showWarning,
    signup,
    signout,
    sendPasswordResetEmail,
    toggleShowWarning,
    confirmPasswordReset
  };
}