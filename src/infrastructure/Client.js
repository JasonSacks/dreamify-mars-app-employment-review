import {getError} from '../infrastructure/ResponseHandler';

const serverUrl = process.env.REACT_APP_BASE_URL;

const Client = {
    get : async (url, token) => {
       try {
            return await fetch(
                serverUrl.concat(url), 
                withJsonOptions(token, Method.Get));
        }
        catch(error){
            return getError(error);
        }
    },
    put : async (url, token, body) => {
        try {
            return await fetch(
                serverUrl.concat(url), 
                withJsonOptions(token, Method.Put, JSON.stringify(body)));
        }
        catch(error){
            return getError(error);
        }
    },
    post : async (url, token, body) => {
        try {
            return await fetch(
                serverUrl.concat(url), 
                withJsonOptions(token, Method.Post, JSON.stringify(body)));
        }
        catch(error){
            return getError(error);
        }
    },
    delete : async (url, token) => {
        try {
            return await fetch(
                serverUrl.concat(url), 
                withJsonOptions(token, Method.Delete));
        }
        catch(error){
            return getError(error);
        }
    }
}

const Method = {
    Get: 'GET',
    Put: 'PUT',
    Post: 'POST',
    Delete:'DELETE'
}

function withJsonOptions(token, method, body) {
    const AuthStr = 'Bearer '.concat(token);
    const headers = token && token.length > 0 ? 
            { 'Content-Type': 'application/json', 'Authorization': AuthStr }: 
            { 'Content-Type': 'application/json' };
    
    return ({
        method: method,
        headers: headers,
        body: body
    });
}

export default Client;