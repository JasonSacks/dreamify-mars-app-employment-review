import ActionNames from './ActionNames.js';
import Client from '../../infrastructure/Client';
import {defaultAccount} from '../defaultState';
import store from '../store';
import handleResponse from '../../infrastructure/ResponseHandler';
import CURRENT_STATE from './CurrentState';

const getState = store.getState;
const AccountActions = {
    updateAccount: (dispatch) => async (account, token) => {
        const result = await handleResponse(
            await Client.put(`/Account/Update`, token, account))
            || {data: defaultAccount}; 
       if (result.hasErrors) { 
            dispatch({type: ActionNames.Alert, payload: result.error });
            return;
        }
        dispatch({type: ActionNames.Account, payload: result.data});
        dispatch({type: ActionNames.Alert, payload: "Account updated successfully"});
        localStorage.setItem(CURRENT_STATE,JSON.stringify(getState()));
    },
    getAccount: (dispatch) => async (id,token) => {
        const result = await handleResponse(await Client.get(`/Account/${id}`, token))
             || {data: defaultAccount};

        if (result.hasErrors) { 
            dispatch({type: ActionNames.Alert, payload: result.error });
            return;
        }
        dispatch({type: ActionNames.Account, payload: result.data});
        localStorage.setItem(CURRENT_STATE,JSON.stringify(getState()));
    },
    setValue : (dispatch) => (value) => {
        dispatch({type: ActionNames.Account, payload: value})
    },
    setIsLoaded : (dispatch) => (isLoaded) => {
        dispatch({type: ActionNames.AccountLoaded, payload: isLoaded})
    }
};

export default AccountActions;