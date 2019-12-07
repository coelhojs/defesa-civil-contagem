import { useState } from "react";

export const useForm = (callback, inputs) => {

  const [values, setValues] = useState(inputs);
  const [errors, setErrors] = useState(inputs);

  const handleSubmit = event => {
    if (event) event.preventDefault();
    callback();
  };

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };
  return {
    handleChange,
    handleSubmit,
    values,
    errors
  };
};
