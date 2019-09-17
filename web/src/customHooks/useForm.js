//https://github.com/upmostly/custom-react-hooks-forms/blob/master/src/useForm.js
import * as _ from 'lodash';
import { useState } from 'react';

const formInputs = {
    nome: '',
    email: 'hai',
    cpf: '',
    userType: '',
    telefone: '',
    dataNasc: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: ''
}

export const useForm = (callback) => {

    const [values, setValues] = useState(formInputs);
    const [errors, setErrors] = useState(formInputs);

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        callback();
    };

    const handleChange = (event) => {
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));
        console.log(values);
        switch (event.target.name) {
            case "nome":
                errors.nome = "Campo erro"
                break;

            default:
                break;
        }
        console.log(errors);
    };

    return {
        handleChange,
        handleSubmit,
        values,
        errors
    }
};