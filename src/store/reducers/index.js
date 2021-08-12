import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import authReducer from './authReducer';
import todosReducer from './todosReducer';
import employeesReducer from './employeesReducer';

export default combineReducers({
    auth: authReducer,
    employees:employeesReducer,
    todos: todosReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
});
