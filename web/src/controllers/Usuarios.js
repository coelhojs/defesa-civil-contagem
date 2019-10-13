// import { useHistory } from "react-router-dom";

// import { api } from "./index";
// import { useAuth } from "../customHooks/useAuth";

// export const cadastroUsuario = async (idToken, formValues) => {
//     const auth = useAuth();
    
//     try {
//         const response = await api.post(`/acesso/google/cadastro`,
//             { ...formValues },
//             {
//                 headers: {
//                     'authorization': `Bearer ${idToken}`
//                 }
//             })
//         console.log(response);
//         if (response.data === "Usuário não cadastrado") {
//             //Mandar pro form de cadastro
//             console.log("não cadastrado.")
//         }
//     } catch (error) {
//         console.error(error);
//     }
// }




// export const getUsuario = async email => {
//     let history = useHistory();
//     const response = await api.get(`/usuarios?email=${email}`);

//     if (response.data.email == email) {
//         console.log("Usuário existente. Logando")
//         history.push('/Dashboard');
//         return true;
//     } else {
//         console.log("Novo usuário. Redirecionando para o formulario")
//         history.push('/Cadastro');
//         return false;
//     }
// }