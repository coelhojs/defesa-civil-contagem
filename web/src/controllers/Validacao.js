//import { api } from "../actions/index";
//import { FETCH_ALL_USUARIOS } from '../actions/types';

export const maxLength = max => value =>
    value && value.length > max ? `O tamanho máximo para este campo é ${max}` : undefined;
export const minLength = min => value =>
    value && value.length < min ? `O tamanho mínimo para este campo é ${min}` : undefined;

export const required = value => value ? undefined : 'Campo obrigatório';
//setar maxLength?
export const minLength8 = minLength(8);
export const maxLength15 = maxLength(15);