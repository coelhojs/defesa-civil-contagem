//https://github.com/upmostly/custom-react-hooks-forms/blob/master/src/useForm.js
import * as _ from 'lodash';
import { useState, useEffect } from 'react';
import { validarNomes } from '../validation/validateFormularios'
import { useAuth } from "../customHooks/useAuth";

export const useForm = (callback) => {
    const auth = useAuth();
    const formInputs = {
        nome: '',
        email: '',
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
    const [values, setValues] = useState(formInputs);
    const [errors, setErrors] = useState(formInputs);
    console.log(auth);
    useEffect(() => {
        if (auth.user) {
            setValues({ email: auth.user.email })
        }
    }, [auth.user]);
    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        callback();
    };

    const handleChange = (event) => {
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));
        switch (event.target.name) {
            case "nome":
                errors.nome = validarNomes(values.nome);

                break;
            default:
                break;
        }

        console.log(values);
        console.log(errors);
    };

    return {
        handleChange,
        handleSubmit,
        values,
        errors
    }
};