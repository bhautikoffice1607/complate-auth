import React, { useState } from 'react';
import styled from 'styled-components';

import Table from 'react-bootstrap/Table';

import DeleteEmployee from './DeleteEmployee/DeleteEmployee';
import InputEmployee from '../InputEmployee/InputEmployee';

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  padding: 30px;
  background-color: var(--color-mainLighter);
  box-shadow: 0rem 0.5rem 3.5rem var(--shadow);
  margin-bottom: 3.5rem;
  border-radius: 0.5rem;
  font-size: 1.4rem;
  font-weight: 700;
  text-align: center;
  color: var(--color-white);
`;

const Controls = styled.div` 
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  padding: 1rem;
  justify-content: center;
`;

const editStyles = {
    color: 'var(--color-main)',
    margin: '0 .5rem',
    cursor: 'pointer',
};

const deleteStyles = {
    color: 'var(--color-errorRed)',
    margin: '0 .5rem',
    cursor: 'pointer',
};


const Employee = ({ employee }) => {
    const [isDeleting, setisDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    return (
        <Wrapper>
            <Table responsive striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>
                            #
                        </th> 
                        <th>
                            FullName
                        </th>
                        <th>
                            email
                        </th>
                        <th>
                            mobile
                        </th>
                        <th>
                            age
                        </th>
                        <th>
                            Gender
                        </th>
                        <th>
                            skill
                        </th>
                        <th>
                            address
                        </th>
                        <th>
                            reference
                        </th>
                        <th>
                            Controls
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {employee.id}
                        </td> 
                        <td>
                            {employee.firstName}{employee.lastName}
                        </td>
                        <td>
                            {employee.email}
                        </td>
                        <td>
                            {employee.mobile}
                        </td>
                        <td>
                            {employee.age}
                        </td>
                        <td>
                            {employee.radioGroup}
                        </td>
                        <td>
                            {employee.skill}
                        </td>
                        <td>
                            {employee.address}
                        </td>
                        <td>
                            {employee.reference}
                        </td> 
                        <td>
                            <Controls>
                                <i
                                    className="fas fa-edit"
                                    style={editStyles}
                                    onClick={() => setIsEditing(true)}
                                />
                                <i
                                    className="fas fa-trash-alt"
                                    style={deleteStyles}
                                    onClick={() => setisDeleting(true)}
                                />
                                <DeleteEmployee
                                    employee={employee}
                                    show={isDeleting}
                                    close={() => setisDeleting(false)}
                                />
                                <InputEmployee
                                    editEmployee={employee}
                                    opened={isEditing}
                                    close={() => setIsEditing(false)}
                                />
                            </Controls>
                        </td>

                    </tr>
                </tbody>
            </Table>



        </Wrapper>
    );
};

export default Employee;
