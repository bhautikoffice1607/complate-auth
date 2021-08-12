import React from 'react';
import classNames from "classnames";


const RadioButton = ({
    value,
    error,
    touched,
    id,
    label,
    className,
    children
}) => {
    const classes = classNames(
        "input-field",
        {
            "is-success": value || (!error && touched), // handle prefilled or user-filled
            "is-error": !!error && touched
        },
        className
    );

    return (
        <div className={classes}>
            <fieldset>
                <legend>{label}</legend>
                {children}
                {error ? <div className={classNames("input-feedback")}>{error}</div> : null}
            </fieldset>
        </div>
    );
};

export default RadioButton;
