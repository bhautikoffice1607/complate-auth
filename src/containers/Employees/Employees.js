import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { firestoreConnect } from 'react-redux-firebase';

import Heading from '../../components/UI/Headings/Heading';
import { Container } from '../../hoc/layout/elements';
import Button from '../../components/UI/Forms/Button/Button';
import Loader from '../../components/UI/Loader/Loader';
import InputEmployee from './InputEmployee/InputEmployee';
import Employee from './Employee/Employee';

const Wrapper = styled.div`
  width: 100%;
  align-self: flex-start;
  height: 100%;
  min-height: calc(100vh - 6rem);
  background-color: var(--color-mainLight);
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 4rem;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 100%;
  flex-direction: column;
  margin-top: 2rem;
`;

const Employees = ({ employees, requested, userId }) => {
    const [isAdding, setIsAdding] = useState(false);
    let content;
    if (!employees) {
        content = (
            <Content>
                <Loader isWhite />
            </Content>
        );
    } else if (!employees[userId] || !employees[userId].employees) {
        content = (
            <Content>
                <Heading color="white" size="h2">
                    You have no employees!
                </Heading>
            </Content>
        );
    } else if (employees[userId].employees.length === 0) {
        content = (
            <Content>
                <Heading color="white" size="h2">
                    You have no employees!
                </Heading>
            </Content>
        );
    } else {
        content = (
            <Content>
                {employees[userId].employees
                    .slice(0)
                    .reverse()
                    .map(employee => (
                        <Employee key={employee.id} employee={employee} />
                    ))}
            </Content>
        );
    }

    return (
        <Wrapper>
            <Container>
                <InnerWrapper>
                    <Heading noMargin size="h1" color="white">
                        Your employees
                    </Heading>
                    <Heading bold size="h4" color="white">
                        All you have to do for now...
                    </Heading>
                    <Button color="main" contain onClick={() => setIsAdding(true)}>
                        Add Employee
                    </Button>
                    <InputEmployee opened={isAdding} close={() => setIsAdding(false)} />
                    {content}
                </InnerWrapper>
            </Container>
        </Wrapper>
    );
};

const mapStateToProps = ({ firebase, firestore }) => ({
    userId: firebase.auth.uid,
    employees: firestore.data.employees,
    requesting: firestore.status.requesting,
    requested: firestore.status.requested,
});

const mapDispatchToProps = {};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    firestoreConnect(props => [`employees/${props.userId}`])
)(Employees);
