import ActionNames from './ActionNames';
import Client from '../../infrastructure/Client';
import handleResponse from '../../infrastructure/ResponseHandler';
import store from '../store';
import CURRENT_STATE from './CurrentState';

const getState = store.getState;

const CreditActions = {
    getDataAsync:  (dispatch) => async (id,token) => {
        const result = await handleResponse(
            await Client.get(`/credits/${id}`, token)) || {credits: 0};
        if (result.hasErrors) { 
            dispatch({type: ActionNames.Alert, payload: result.error });
            return;
        }
        dispatch({type: ActionNames.Credits, payload: result.data});
        localStorage.setItem(CURRENT_STATE,JSON.stringify(getState()));
    },
    setCreditLoadedDate:  (dispatch) => async (date) => {
        dispatch({type: ActionNames.CreditsLoadedDate, payload: date });
        localStorage.setItem(CURRENT_STATE,JSON.stringify(getState()));
    }
};

export default CreditActions;