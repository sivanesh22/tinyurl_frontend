import React from 'react';
import { ErrorMessage } from 'formik';
import { Form } from 'react-bootstrap';
import FieldError from './FieldError';

function InputText(props) {

    const { className,
        label = '',
        handleChange,
        type = 'text',
        name, value = '',
        placeholder = '',
        showLabel = true
    } = props;
    return (
        <Form.Group className={className}>
            {showLabel ? <Form.Label>{label}</Form.Label> : null}
            <Form.Control onChange={handleChange} type={type} name={name} value={value} placeholder={placeholder} />
            <ErrorMessage name={name} component={FieldError} />
        </Form.Group>


    );
}

export default InputText;
