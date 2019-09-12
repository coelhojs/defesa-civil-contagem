import { create } from "apisauce";

export const api = create({
    //Base json-db:
    baseURL: "http://localhost:3004"
    
    //Banco de dados local TIS:
    // baseURL: "http://localhost:3001",
    // headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    //     "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    //     'Access-Control-Allow-Headers': true,
    //     'Access-Control-Allow-Origin': 'Content-Type',
    //     "Accept": "application/json",
    //     "Content-Type": "application/json",
    // }

    //Banco de dados online TIS:
    // baseURL: "134.209.243.214:3001"
    // headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    //     "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    //     'Access-Control-Allow-Headers': true,
    //     'Access-Control-Allow-Origin': 'Content-Type',
    //     "Accept": "application/json",
    //     "Content-Type": "application/json",
    // }
});

// export const signIn = userId => {
//     return {
//         type: SIGN_IN,
//         payload: userId
//     };
// };

// export const signOut = () => {
//     return {
//         type: SIGN_OUT
//     };
// };