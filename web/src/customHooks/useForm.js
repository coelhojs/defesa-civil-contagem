//https://github.com/upmostly/custom-react-hooks-forms/blob/master/src/useForm.js
import { useState } from 'react';

export const useForm = (callback) => {

    const [values, setValues] = useState({});

    const handleSubmit = (event) => {
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
    }
};