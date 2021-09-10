import React from 'react';

function FieldError(props) {

    return (
        <label className="error right">
            {props.children}
        </label>
    );
}
export default FieldError;