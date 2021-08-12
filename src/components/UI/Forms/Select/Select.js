import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components';


const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  margin-bottom: 20px;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  width: 100%;
  color: var(--color-white);
  font-weight: 500;
  font-size: 14px;
  border: none;
`;

const StyledSelect = styled.select`
  padding: 12px 15px;
  width: 100%;
  background-color: var(--color-mainLight);
  color: var(--color-white);
  font-weight: 500;
  font-size: 14px;
  border-radius: 25px;
  border: none;

  &::placeholder {
    color: var(--color-white);
  }
`;
const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: var(--red-600);
  width: 400px;
  margin-top: 0.25rem;
  &:before {
    content: "❌ ";
    font-size: 10px;
  }
  @media (prefers-color-scheme: dark) {
    color: var(--red-300);
  }
`;


const Select = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <SelectWrapper>
            <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
            <StyledSelect {...field} {...props} />
            {meta.touched && meta.error ? (
                <StyledErrorMessage className="error">{meta.error}</StyledErrorMessage>
            ) : null}
        </SelectWrapper>
    );
};

export default Select;
