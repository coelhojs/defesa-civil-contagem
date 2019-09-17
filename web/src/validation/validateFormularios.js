import { api } from "../controllers/index";
//import { FETCH_ALL_USUARIOS } from '../actions/types';

export const maxLength = max => value =>
    value && value.length > max ? `O tamanho máximo para este campo é ${max}` : undefined;
export const minLength = min => value =>
    value && value.length < min ? `O tamanho mínimo para este campo é ${min}` : undefined;

export const required = value => value ? undefined : 'Campo obrigatório';
//setar maxLength?
export const minLength8 = minLength(8);
export const maxLength15 = maxLength(15);
export const cnpj = value => {
    if (value && value.length === 18) {
        return undefined;
    }
    else {
        return "O CNPJ deve ter 14 dígitos ";
    }
}
export const cpf = value => value && value.length === 14 ? undefined : "O CPF deve ter 11 dígitos ";
export const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
export const letters = value => value && !isNaN(Number(value)) ? 'Must be a number' : undefined;
export const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined;
export const minValue18 = minValue(18);

// export const unique = value => async dispatch => {
//     console.log("valor da requisição: " + value);
//     const response = await api.get(`/Cabeleireiros?cnpj=${value}`);
//     console.log(response);
//     dispatch({ type: FETCH_ALL_USUARIOS, payload: response.data.dados.erro });
//     if (response.data.dados.erro) {
//         return undefined;
//     } else {
//         return "Este CNPJ já está cadastrado";
//     }
// }


export const unique = value => {
    if (value && value.length >= 18) {
        console.log(value);
        return checkOnServer(value);
    }
}

export const checkOnServer = value => api.get(`/Cabeleireiros?cnpj=${value}`).then(response => response.erro) ? undefined : `Este CNPJ já está cadastrado`;

// export const unique = value => api.get(`/Cabeleireiros?cnpj=${value}`).then(response => response.data.dados).then(console.log);

// export async const unique = value => async dispatch => {
//     console.log("12");
//     const response = await api.get('/Usuarios', { value });
//     console.log(response);
//     dispatch({ type: FETCH_ALL_USUARIOS, payload: response.mensagem });
// }

export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Endereço de e-mail inválido' : undefined;
export const tooYoung = value => {
    let idade;
    if (value) {
        value = value.split("-");
        if (value[0]) {
            idade = 2019 - value[0];
        }
    }

    if (value && idade < 18) {
        return 'Para ser usuário, você precisa ter mais de 18 anos';
    } else {
        return undefined;
    }
}
export const tooOld = value =>
    value && value > 65 ? 'You might be too old for this' : undefined;
export const aol = value =>
    value && /.+@aol\.com/.test(value) ?
        'Really? You still use AOL for your email?' : undefined;