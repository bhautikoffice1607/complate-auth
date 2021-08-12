import * as actions from './actionTypes';

// Add a employee
export const addEmployee = data => async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    dispatch({ type: actions.ADD_EMPLOYEE_START });
    try {
        const res = await firestore
            .collection('employees')
            .doc(userId)
            .get();
        const newEmployee = {
            id: new Date().valueOf(),
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            mobile: data.mobile,
            age: data.age,
            skill: data.skill,
            address: data.address,
            reference: data.reference,
            acceptedTerms: data.acceptedTerms,
            radioGroup: data.radioGroup,
            startDate: data.startDate, 

        };
        if (!res.data()) {
            console.log('got here');
            firestore
                .collection('employees')
                .doc(userId)
                .set({
                    employees: [newEmployee],
                });
        } else {
            firestore
                .collection('employees')
                .doc(userId)
                .update({
                    employees: [...res.data().employees, newEmployee],
                });
        }
        dispatch({ type: actions.ADD_EMPLOYEE_SUCCESS });
        return true;
    } catch (err) {
        dispatch({ type: actions.ADD_EMPLOYEE_FAIL, payload: err.message });
    }
};

// Delete employee
export const deleteEmployee = id => async (
    dispatch,
    getState,
    { getFirestore }
) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    dispatch({ type: actions.DELETE_EMPLOYEE_START });
    try {
        const res = await firestore
            .collection('employees')
            .doc(userId)
            .get();
        const previousEmployees = res.data().employees;
        const newEmployees = previousEmployees.filter(employee => employee.id !== id);
        await firestore
            .collection('employees')
            .doc(userId)
            .update({
                employees: newEmployees,
            });
        dispatch({ type: actions.DELETE_EMPLOYEE_SUCCESS });
    } catch (err) {
        dispatch({ type: actions.DELETE_EMPLOYEE_FAIL, payload: err.message });
    }
};

// edit employee
export const editEmployee = (id, data) => async (
    dispatch,
    getState,
    { getFirestore }
) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    dispatch({ type: actions.ADD_EMPLOYEE_START });
    try {
        const res = await firestore
            .collection('employees')
            .doc(userId)
            .get();
        const employees = res.data().employees;
        const index = employees.findIndex(employee => employee.id === id);
        employees[index].firstName = data.firstName;
        employees[index].lastName = data.lastName;
        employees[index].email = data.email;
        employees[index].mobile = data.mobile;
        employees[index].age = data.age;
        employees[index].skill = data.skill;
        employees[index].address = data.address;
        employees[index].reference = data.reference;
        employees[index].acceptedTerms = data.acceptedTerms;
        employees[index].radioGroup = data.radioGroup;
        employees[index].startDate = data.startDate;


        await firestore
            .collection('employees')
            .doc(userId)
            .update({
                employees,
            });
        dispatch({ type: actions.ADD_EMPLOYEE_SUCCESS });
        return true;
    } catch (err) {
        dispatch({ type: actions.ADD_EMPLOYEE_FAIL, payload: err.message });
    }
};
