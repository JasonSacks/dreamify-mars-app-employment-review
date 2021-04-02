import SystemActions from '../Redux/Actions/SystemActions'

export const getError = (error) =>{ 
    return {
        error: error || 
        'There was a problem processing your request.', 
        hasErrors: true};
};

const handleReponse = async (res) => {
    switch (res.status){
        case 401: 
            await SystemActions.logOut();
            return null;
        case 404:
            try {
                return await res.json();
            }
            catch(error){
                return getError('Data not found.');  
            };
        case 500: 
            return getError();
        default: 
            try {
                return await res.json();
            }
            catch(error){
                return getError();  
            };
    }
}

export default handleReponse;