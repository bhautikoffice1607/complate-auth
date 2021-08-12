import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components';

const CheckBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  margin-bottom: 20px;
  flex-direction: column;
`;
const StyledLabel = styled.label` 
  font-weight: 500;
  font-size: 14px; 
  colr: #fff;
`;

const StyledInput = styled.input` 
  margin-right: 10px;
`;

const CheckBoxError = styled.div`
  color: var(--color-errorRed); 
  transition: all 0.1s; 
  font-weight: 500;
  font-size: 1.2rem;
`;

const CheckBox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <CheckBoxWrapper>
            <StyledLabel className="checkbox-input">
                <StyledInput type="checkbox" {...field} {...props} />
                {children}
            </StyledLabel>
            {meta.touched && meta.error ? (
                <CheckBoxError className="error">{meta.error}</CheckBoxError>
            ) : null}

        </CheckBoxWrapper>
    );
};

export default CheckBox;
