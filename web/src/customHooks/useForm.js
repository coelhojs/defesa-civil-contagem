//https://github.com/upmostly/custom-react-hooks-forms/blob/master/src/useForm.js
import { useEffect, useState } from "react";
import { buscaCEP, validarCEP, validarCPF, validarNome, validarNumero, validarTelefone } from "../validation/validateFormularios";
import { useAuth } from "./useAuth";

export const useForm = (callback, inputs) => {
  const auth = useAuth();

  const [values, setValues] = useState(inputs);
  const [errors, setErrors] = useState(inputs);

  const handleSubmit = event => {
    if (event) event.preventDefault();
    callback();
  };

  const handleChange = (event) => {
    event.persist();

    // let name = event.target.name;


    // if (name.includes("usuario.endereco")) {
    //   console.log(name)
    //   name = name.split(".");
    //   let name1 = name[0];
    //   let name2 = name[1];
    //   let name3 = name[2];
    //   setValues(values => ({
    //     ...values,
    //     [name1]: {
    //       [name2]: {
    //         [name3]: event.target.value
    //       }
    //     }
    //   }));
    // } else if (name.includes(".")) {
    //   console.log(name)
    //   name = name.split(".");
    //   let name1 = name[0];
    //   let name2 = name[1];
    //   setValues(values => ({
    //     ...values,
    //     [name1]: 
    //       [name2]: event.target.value
    //     }
    //   }));

    // } else {
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    // }
  };

  // const handleChange = event => {
  //   event.persist();
  //   setValues(values => ({
  //     ...values,
  //     [event.target.name]: event.target.value
  //   }));
  // if (
  //   event.target.name === "nome" &&
  //   !(/[a-zA-ZÀ-ÿ]/.test(event.target.value) || event.target.value === "")
  // )
  //   return;

  // switch (event.target.name) {
  //   case "nome":
  //     errors.nome = validarNome(values.nome);
  //     break;
  //   case "telefone":
  //     errors.telefone = validarTelefone(values.telefone);
  //     break;
  //   case "cpf":
  //     errors.cpf = validarCPF(values.cpf);
  //     break;
  //   case "numero":
  //     console.log(values)
  //     errors.numero = validarNumero(values.numero);
  //     break;
  //   case "cep":
  //     let cep = values.cep.replace(/\D/g, "");
  //     let resp = validarCEP(cep);
  //     if (resp) errors.cep = resp;
  //     else if (cep.length > 0) {
  //       buscaCEP(cep)
  //         .then(resolve => {
  //           console.log(resolve);
  //           /*setValues({...values, ["logradouro"]: resolve.endereco.logradouro});*/
  //           setValues({
  //             ...values,
  //             ["logradouro"]: resolve.endereco.logradouro,
  //             ["bairro"]: resolve.endereco.bairro,
  //             ["cidade"]: resolve.endereco.cidade,
  //             ["estado"]: resolve.endereco.estado
  //           });

  //           setErrors({ ...errors, ["cep"]: resolve.error });

  //           values.logradouro = resolve.endereco.logradouro;
  //           values.bairro = resolve.endereco.bairro;
  //           values.cidade = resolve.endereco.localidade;
  //           values.estado = resolve.endereco.uf;
  //           errors.cep = resolve.error;
  //         })
  //         .catch(reject => {
  //           setErrors({ ...errors, ["cep"]: "CEP invalido" });
  //         });
  //     }
  //     /*errors.cep = resp.error;
  //             values.logradouro = resp.endereco.logradouro;
  //             values.bairro = resp.endereco.bairro;
  //             values.cidade = resp.endereco.cidade;
  //             values.estado = resp.endereco.estado;*/
  //     //let resp = {erro, valores};
  //     //console.log(resp);
  //     //errors.cep = resp.erro;
  //     //values = resp.values;
  //     break;
  //   default:
  //     break;
  // }
  // };

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
