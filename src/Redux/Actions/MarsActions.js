import ActionNames from './ActionNames';
import Client from '../../infrastructure/Client';
import store from '../store';
import handleResponse from '../../infrastructure/ResponseHandler';
import CURRENT_STATE from './CurrentState'

const getState = store.getState;
const dispatchImagesIfExist = (dispatch, images) => {
    if (images.length > 0){
        dispatch ({type: ActionNames.MarsImages, payload: images});
        localStorage.setItem(CURRENT_STATE, JSON.stringify(getState()));
        return true;              
    };
    return false;
};
const dispatchIsComplete = (dispatch, isComplete) => {
    dispatch ({type: ActionNames.MarsComplete, payload: isComplete});
    localStorage.setItem(CURRENT_STATE, JSON.stringify(getState()));
}
const MarsActions = {
    setEarthDate: dispatch => earthDate => { 
        dispatchIsComplete(dispatch,false);
        dispatch ({type: ActionNames.ClearMarsImages});
        dispatch ({type: ActionNames.EarthDate, payload: earthDate});
        dispatch({type:ActionNames.MarsIndex, payload: 0 })
        dispatch ({type: ActionNames.MarsPage, payload: 1});
        localStorage.setItem(CURRENT_STATE, JSON.stringify(getState()));
    },
    setPage: dispatch => page =>{ 
        dispatch ({type: ActionNames.MarsPage, payload: page});
    },
    setIndex: dispatch => index => {
       dispatch({type:ActionNames.MarsIndex, payload: index })
        localStorage.setItem(CURRENT_STATE, JSON.stringify(getState()));
    },
    setIsLoaded: dispatch => isLoaded => {
        dispatch({type:ActionNames.MarsLoaded, payload: isLoaded })
    },
    getDataAsync: dispatch => async (earthDate, page, isComplete, token) => {
        if (!isComplete){
            const images = await getMarsImages(dispatch, earthDate, page, token) || [];
            if (images.hasErrors) return;
            if (!dispatchImagesIfExist(dispatch, images)){
                    dispatchIsComplete(dispatch, true);
            } 
        }
    },
    dreamifyImageAsync: dispatch => async (body, token) => {
        const result = await handleResponse(
            await Client.post(`/DeepDream/TransformImage`,token, body));
        const now = new Date();
        if (result.hasErrors ){
            if (result.error.includes('credit')){
                dispatch({type: ActionNames.Alert, payload: result.error });
                return result;
            }
            dispatch({type: ActionNames.Alert, payload: result.error });;
            return result;
        }
        dispatch({type: ActionNames.DreamsLoaded, payload: false});
        dispatch({type: ActionNames.CreditsLoadedDate, payload: now.toISOString()});
        localStorage.setItem(CURRENT_STATE, JSON.stringify(getState()));
        return result;
    }
};

async function getMarsImages (dispatch, earthDate, page, token){
    const result = await handleResponse(
        await Client.get(
        `/NasaMarsRover/Photos?rover=3&earthDate=${earthDate.toISOString()}&page=${page}`, 
        token)) || [];
    if (result.hasErrors){
        dispatch({type: ActionNames.Alert, payload: result.error });
        return;
    }
    
    if ( result.data.length > 0){
        
        return result.data.map((item) => ({
            original: item.path, 
            thumbnail: item.path
        }))
    }
    else  
        return result.data; 
 }

export default MarsActions;