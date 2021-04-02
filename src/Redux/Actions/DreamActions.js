import ActionNames from './ActionNames';
import Client from '../../infrastructure/Client';
import store from '../store';
import handleResponse from '../../infrastructure/ResponseHandler';
import CURRENT_STATE from './CurrentState';

const getState = store.getState;

const DreamActions = {
    setPage: dispatch => page =>{
        dispatch ({type: ActionNames.DreamPage, payload: page});
    },
    setIsLoaded: dispatch => isLoaded => {
        dispatch({type:ActionNames.DreamsLoaded, payload: isLoaded })
     },
    setIndex: dispatch => (index) => {
        dispatch({type:ActionNames.DreamIndex, payload: index });
        localStorage.setItem(CURRENT_STATE, JSON.stringify(getState()));
    },
    getDataAsync: dispatch => async (accountId,page,lastStateDreamId, token) => {
        const result = await handleResponse(
            await Client.get(`/gallery/Images?accountid=${accountId}&page=${page}`, token)) || []
        if (result.hasErrors) { 
            dispatch({type: ActionNames.Alert, payload: result.error });
            return;
        }
        if (result.data.length > 0 ){
            let unloadedRecords;
            if (result.data.length < 25){
                var lastDreamId = result.data[result.data.length - 1].galleryId;
                unloadedRecords = lastStateDreamId === 0 ? 
                    result.data :
                    result.data.filter(item => item.galleryId > lastStateDreamId);
                dispatch({type: ActionNames.LastDreamId, payload: lastDreamId})
                dispatch ({type: ActionNames.IsDreamPageComplete, payload: false});
            }
            else 
            {
                dispatch ({type: ActionNames.IsDreamPageComplete, payload: true})
                dispatch({type: ActionNames.LastDreamId, payload: 0})
                unloadedRecords = result.data;           
            }
            const images = unloadedRecords.map(item => ({
                itemId: item.galleryId,
                original: item.path, 
                thumbnail: item.path,
            }));
            dispatch({type: ActionNames.DreamImages, payload: images});
            localStorage.setItem(CURRENT_STATE, JSON.stringify(getState()));
        }
        else{
            dispatch ({type: ActionNames.IsDreamPageComplete, payload: true})
        }
    },
    deleteDreamImageAsync: dispatch => async (id,isDreamPageComplete, token) => {
        const result = await handleResponse(
            await Client.delete(`/Gallery/Delete/${id}`, token));
        if (result.hasErrors) { 
            dispatch({type: ActionNames.Alert, payload: result.error });
            return;
        }
        if (isDreamPageComplete){
            dispatch ({type: ActionNames.IsDreamPageComplete, payload: false})     
        }
        dispatch({type: ActionNames.Alert, payload: 'Sucessfully Deleted' });
        dispatch({type: ActionNames.DeleteDreamImage, payload: id});
        localStorage.setItem(CURRENT_STATE, JSON.stringify(getState()));
    }
};

export default DreamActions;