import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

import Button from '../../../components/UI/Forms/Button/Button';
import Heading from '../../../components/UI/Headings/Heading';
import Modal from '../../../components/UI/Modal/Modal';
import Input from '../../../components/UI/Forms/Input/Input';
import Select from '../../../components/UI/Forms/Select/Select';
import Checkbox from '../../../components/UI/Forms/CheckBox/CheckBox';
import Message from '../../../components/UI/Message/Message';
import { StyledForm } from '../../../hoc/layout/elements';
import classNames from "classnames"; 

import * as actions from '../../../store/actions';

const InputFeedback = ({ error }) =>
    error ? <div className={classNames("input-feedback")}>{error}</div> : null;

const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 2rem;
  justify-content: space-around;
`;

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 0rem;
  width: 100%;
  padding: 0 3rem;
`;


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/



// Radio input
const RadioButton = ({
    field: { name, value, onChange, onBlur },
    id,
    label,
    className,
    ...props
}) => {
    return (
        <div>
            <input
                name={name}
                id={id}
                type="radio"
                value={id} // could be something else for output?
                checked={id === value}
                onChange={onChange}
                onBlur={onBlur}
                className={classNames("radio-button")}
                {...props}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};

// Radio group
const RadioButtonGroup = ({
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
                {touched && <InputFeedback error={error} />}
            </fieldset>
        </div>
    );
};

const EmployeeSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('The employee is firstName.')
        .min(2, 'Too short.')
        .max(50, 'Too Long!'),

    lastName: Yup.string()
        .required('The employee is lastName.')
        .min(2, 'Too short.')
        .max(50, 'Too Long!'),

    email: Yup.string()
        .email('Invalid email')
        .required('The employee is email.'),

    mobile: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required('The employee is mobile.'),
    age: Yup.number()
        .integer()
        .default(0)
        .min(20, 'Too short.')
        .max(45, 'Too short.')
        .required('The employee is age.'),

    skill: Yup.string()
        .oneOf(
            ['designer', 'development', 'product', 'other'],
            'Invalid skill Type'
        )
        .required('Required'),
    acceptedTerms: Yup.boolean()
        .required('Required')
        .oneOf([true], 'You must accept the terms and conditions.'),

    address: Yup.string()
        .required('The employee is address.')
        .min(2, 'Too short.')
        .max(50, 'Too Long!'),

    reference: Yup.string()
        .required('employee reference name.')
        .min(2, 'Too short.')
        .max(50, 'Too Long!'),
    radioGroup: Yup.string()
        .required("A radio option is required"),

});

const InputEmployee = ({
    editEmployee,
    close,
    opened,
    addEmployee,
    loading,
    error,
    editEmployeeAction,
}) => {
    const loadingText = editEmployee ? 'Editing...' : 'Adding...';

    return (
        <>
            <Modal opened={opened} close={close}>
                <Heading noMargin size="h1" color="white">
                    {editEmployee ? 'Edit your employee' : 'Add your new employee'}
                </Heading>
                <Heading bold size="h4" color="white">
                    {editEmployee
                        ? 'Edit your employee and tap edit'
                        : 'Type your employee and press add'}
                </Heading>
                <Formik
                    initialValues={{
                        firstName: editEmployee ? editEmployee.firstName : '',
                        lastName: editEmployee ? editEmployee.lastName : '',
                        email: editEmployee ? editEmployee.email : '',
                        mobile: editEmployee ? editEmployee.mobile : '',
                        age: editEmployee ? editEmployee.age : '',
                        skill: editEmployee ? editEmployee.skill : '',
                        address: editEmployee ? editEmployee.address : '',
                        reference: editEmployee ? editEmployee.reference : '',
                        acceptedTerms: editEmployee ? editEmployee.acceptedTerms : false,
                        radioGroup: editEmployee ? editEmployee.radioGroup : '', 
                    }}
                    validationSchema={EmployeeSchema}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        // send our todo
                        const res = editEmployee
                            ? await editEmployeeAction(editEmployee.id, values)
                            : await addEmployee(values);
                        if (res) {
                            close();
                        }
                        setSubmitting(false);
                        resetForm();
                    }}
                >
                    {({ isSubmitting, isValid, resetForm, }) => (
                        <StyledForm>
                            <Field
                                type="text"
                                name="firstName"
                                placeholder="your firstName..."
                                component={Input}
                            />
                            <Field
                                type="text"
                                name="lastName"
                                placeholder="your lastName..."
                                component={Input}
                            />
                            <Field
                                type="email"
                                name="email"
                                placeholder="your mail..."
                                component={Input}
                            />
                            <Field
                                name="mobile"
                                type="text"
                                placeholder="your mobile..."
                                component={Input}
                            />
                            <Field
                                name="age"
                                type="number"
                                placeholder="your age..."
                                component={Input}
                            />
                            <Field
                                name="address"
                                type="text"
                                placeholder="your address..."
                                component={Input}
                            />
                            <Field
                                name="reference"
                                type="text"
                                placeholder="your reference..."
                                component={Input}
                            /> 
                            <Select
                                component={Select}
                                name="skill"
                            >
                                <option value="">Select a job type</option>
                                <option value="designer">Designer</option>
                                <option value="development">Developer</option>
                                <option value="product">Product Manager</option>
                                <option value="other">Other</option>
                            </Select>

                            <RadioButtonGroup
                                id="radioGroup"
                                label="One of these please"
                            >
                                <Field
                                    component={RadioButton}
                                    name="radioGroup"
                                    id="male"
                                    label="male"
                                />
                                <Field
                                    component={RadioButton}
                                    name="radioGroup"
                                    id="female"
                                    label="female"
                                />
                            </RadioButtonGroup>

                            <Checkbox component={Checkbox} name="acceptedTerms">
                                I accept the terms and conditions
                            </Checkbox>

                            <ButtonsWrapper>
                                <Button
                                    contain
                                    color="main"
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                    loading={loading ? loadingText : null}
                                >
                                    {editEmployee ? 'Edit employee' : 'Add employee'}
                                </Button>
                                <Button
                                    type="button"
                                    color="main"
                                    contain
                                    onClick={() => {
                                        close();
                                        resetForm();
                                    }}
                                >
                                    Cancel
                                </Button>
                            </ButtonsWrapper>
                            <MessageWrapper>
                                <Message error show={error}>
                                    {error}
                                </Message>
                            </MessageWrapper>
                        </StyledForm>
                    )}
                </Formik>
            </Modal>
        </>
    );
};

const mapStateToProps = ({ employees }) => ({
    loading: employees.loading,
    error: employees.error,
});

const mapDispatchToProps = {
    addEmployee: actions.addEmployee,
    editEmployeeAction: actions.editEmployee,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InputEmployee);
