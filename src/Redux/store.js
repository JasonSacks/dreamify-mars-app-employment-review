import rootReducer from './rootReducer'
import defaultState from '../Redux/defaultState';
import { createStore } from '@reduxjs/toolkit';
import CURRENT_STATE from './Actions/CurrentState';

const currentState = JSON.parse(localStorage.getItem(CURRENT_STATE));
const store = createStore(rootReducer, currentState || defaultState);
export default store;
