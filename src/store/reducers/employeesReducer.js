import * as actions from '../actions/actionTypes';

const initialState = {
    error: null,
    loading: false,
    deleteEmployee: {
        error: null,
        loading: false,
    },
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case actions.ADD_EMPLOYEE_START:
            return { ...state, loading: true };

        case actions.ADD_EMPLOYEE_SUCCESS:
            return { ...state, loading: false, error: false };

        case actions.ADD_EMPLOYEE_FAIL:
            return { ...state, loading: false, error: payload };

        case actions.DELETE_EMPLOYEE_START:
            return { ...state, deleteEmployee: { ...state.deleteEmployee, loading: true } };

        case actions.DELETE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                deleteEmployee: { ...state.deleteEmployee, loading: false, error: false },
            };

        case actions.DELETE_EMPLOYEE_FAIL:
            return {
                ...state,
                deleteEmployee: { ...state.deleteEmployee, loading: false, error: payload },
            };

        default:
            return state;
    }
};
