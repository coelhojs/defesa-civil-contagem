//https://github.com/upmostly/custom-react-hooks-forms/blob/master/src/useForm.js
import * as _ from "lodash";
import React from "react";
import { useState, useEffect } from "react";
import {
  validarNome,
  validarTelefone,
  validarCPF,
  validarCEP,
  validarNumero,
  buscaCEP
} from "../validation/validateFormularios";
import { useAuth } from "./useAuth";

export const useForm = (callback, inputs) => {
  const auth = useAuth();

  const [idToken, setIdToken] = useState("");
  const [values, setValues] = useState(inputs);
  const [errors, setErrors] = useState(inputs);

  useEffect(() => {
    if (auth.user) {
      setValues({
        ...values,
        ["email"]: auth.user.email
      });
      // setValues(values => values.email = auth.user.email)
    }
  }, [auth.user]);

  const handleSubmit = event => {
    auth.signup(idToken, values);
    if (event) event.preventDefault();
    callback();
  };

  const handleChange = event => {
    event.persist();
    if (
      event.target.name == "nome" &&
      !(/[a-zA-ZÀ-ÿ]/.test(event.target.value) || event.target.value == "")
    )
      return;
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));

    switch (event.target.name) {
      case "nome":
        errors.nome = validarNome(values.nome);
        break;
      case "telefone":
        errors.telefone = validarTelefone(values.telefone);
        break;
      case "cpf":
        errors.cpf = validarCPF(values.cpf);
        break;
      case "numero":
        errors.numero = validarNumero(values.numero);
        break;
      case "cep":
        let resp = validarCEP(values.cep);
        if (resp) errors.cep = resp;
        else {
          buscaCEP(values.cep.replace(/\D/g, ""))
            .then(resolve => {
              console.log(resolve);
              values.logradouro = resolve.endereco.logradouro;
              values.bairro = resolve.endereco.bairro;
              values.cidade = resolve.endereco.localidade;
              values.estado = resolve.endereco.uf;
              errors.cep = resolve.error;
            })
            .catch(reject => {
              errors.cep = "CEP invalido";
            });
        }
        /*errors.cep = resp.error;
                values.logradouro = resp.endereco.logradouro;
                values.bairro = resp.endereco.bairro;
                values.cidade = resp.endereco.cidade;
                values.estado = resp.endereco.estado;*/
        //let resp = {erro, valores};
        //console.log(resp);
        //errors.cep = resp.erro;
        //values = resp.values;
        break;
      default:
        break;
    }
  };

  const validaNome = inpur => {
    //event.persist();
    errors.nome = validarNome(inpur);
  };

  /*const handleChange = (event) => {
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
    };*/

  return {
    handleChange,
    handleSubmit,
    values,
    errors
  };
};
