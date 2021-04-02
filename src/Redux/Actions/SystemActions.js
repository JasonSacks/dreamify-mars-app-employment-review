import ActionNames from './ActionNames.js';
import Client from '../../infrastructure/Client';
import store from '../store';
import handleResponse from '../../infrastructure/ResponseHandler';
import CURRENT_STATE from './CurrentState';
import defaultState from '../defaultState';

const getState = store.getState;

const SystemActions = {
    logInAsync: (dispatch) => async (googleData) => {
        const result  = await handleResponse(await Client.post(
            `/Google/Authenticate`, 
            '', 
            {tokenId: googleData.tokenId}));
       
        if (result.hasErrors) { 
            dispatch({type: ActionNames.Alert, payload: result.error });
            return;
        }
        dispatch({type: ActionNames.Account, payload: result.data.account});
        dispatch({type: ActionNames.AccountLoaded, payload: true})
        dispatch({type: ActionNames.Token, payload: result.data.token});
        localStorage.setItem(CURRENT_STATE, JSON.stringify(getState()));
    },
    logOut: (dispatch) => () => {
        dispatch({type: ActionNames.LogOut, payload: defaultState });
        localStorage.setItem(CURRENT_STATE,JSON.stringify(defaultState));
        return;
    },
    setAlert: (dispatch) => async (alert) => {
        dispatch({type: ActionNames.Alert, payload: alert});
        localStorage.setItem(CURRENT_STATE,JSON.stringify(getState()));
    },
    displayOverlay: (dispatch) => async (text) => {
        if (text && text.length > 0){
            dispatch({type: ActionNames.WorkingText, payload: text});
        }
        dispatch({type: ActionNames.IsWorking, payload: true});
        localStorage.setItem(CURRENT_STATE, JSON.stringify(getState()));
    },
    hideOverlay: (dispatch) => async (text) => {
        dispatch({type: ActionNames.IsWorking, payload: false});
        localStorage.setItem(CURRENT_STATE, JSON.stringify(getState()));
    }
};

export default SystemActions