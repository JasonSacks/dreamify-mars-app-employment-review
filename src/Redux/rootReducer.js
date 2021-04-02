import defaultState from './defaultState';
import ActionNames from './Actions/ActionNames';

export default function rootReducer(state, action) {
    state = state || defaultState;
    switch (action.type) {
        case ActionNames.Token: return {
            ...state,
            account : {...state.account},
            dreamImages: [...state.dreamImages],
            marsImages: [...state.marsImages],
            token : action.payload 
        }
        case ActionNames.MarsImages: return {
            ...state,
            account : {...state.account},
            dreamImages: [...state.dreamImages],
            marsImages: [...state.marsImages, ...action.payload],
        }
        case ActionNames.DreamifyImage: {
            return {
                ...state,
                account : {...state.account},
                dreamImages: [...state.dreamImages,...action.payload],
                marsImages: [...state.marsImages],
            }
        }
        case ActionNames.MarsLoaded: {
            return {
                ...state,
                account : {...state.account},
                dreamImages: [...state.dreamImages],
                marsImages: [...state.marsImages],
                marsLoaded: action.payload
            }
        }
        case ActionNames.ClearMarsImages: {
            return {
                ...state,
                account : {...state.account},
                dreamImages: [...state.dreamImages],
                marsImages: [],
            }
        }
        case ActionNames.EarthDate: {
            return {
                ...state,
                account : {...state.account},
                dreamImages: [...state.dreamImages],
                marsImages: [...state.marsImages],
                earthDate: action.payload
            }
        }
        case ActionNames.MarsIndex: {
            return {
            ...state,
            account : {...state.account},
            dreamImages: [...state.dreamImages],
            marsImages: [...state.marsImages],
            marsIndex: action.payload
        }
        }
        case ActionNames.MarsPage: {
            return {
                ...state,
                account : {...state.account},
                dreamImages: [...state.dreamImages],
                marsImages: [...state.marsImages],
                marsPage: action.payload
            }        }
        case ActionNames.MarsComplete: {
           return {
                ...state,
                account : {...state.account},
                dreamImages: [...state.dreamImages],
                marsImages: [...state.marsImages],
                isMarsComplete: action.payload
            }
        }
        case ActionNames.DreamIndex: {
            return {
                ...state,
                account : {...state.account},
                dreamImages: [...state.dreamImages],
                marsImages: [...state.marsImages],
                dreamIndex : action.payload
            }
        }
        case ActionNames.DreamPage: {
            return {
                ...state,
                account : {...state.account},
                dreamImages: [...state.dreamImages],
                marsImages: [...state.marsImages],
                dreamPage : action.payload
            }
        }
        case ActionNames.DreamImages: {
            return {
                ...state,
                account : {...state.account},
                dreamImages: [...state.dreamImages, ...action.payload],
                marsImages: [...state.marsImages]
            }
        }
        case ActionNames.DeleteDreamImage: {
            return {
                ...state,
                account : {...state.account},
                dreamImages: state.dreamImages.filter(image => image.itemId !== action.payload),
                marsImages: [...state.marsImages]
            }
        }case ActionNames.LogOut: {
            return {...action.payload};
        }
        case ActionNames.LastDreamId: {
            return {
                ...state,
                account : {...state.account},
                dreamImages: [...state.dreamImages],
                marsImages: [...state.marsImages],
                lastDreamId: action.payload
            }
        }
        case ActionNames.DreamsLoaded: {
            return {
                ...state,
                account : {...state.account},
                dreamImages: [...state.dreamImages],
                marsImages: [...state.marsImages],
                dreamsLoaded: action.payload
            }
        }
        case ActionNames.IsDreamPageComplete: {
            return {
                ...state,
                account : {...state.account},
                dreamImages: [...state.dreamImages],
                marsImages: [...state.marsImages],
                isDreamPageComplete: action.payload

            }
        }
        case ActionNames.Account: {
            return {
                ...state,
                account : action.payload,
                dreamImages: [...state.dreamImages],
                marsImages: [...state.marsImages]
            }
        }
        case ActionNames.AccountLoaded: {
            return {
                ...state,
                account : {...state.account},
                dreamImages: [...state.dreamImages],
                marsImages: [...state.marsImages],
                accountLoaded: action.payload

            }
        }
        case ActionNames.Credits: {
            return {
                ...state,
                account : {...state.account},
                dreamImages: [...state.dreamImages],
                marsImages: [...state.marsImages],
                credits: action.payload
            }
        }
        case ActionNames.CreditsLoadedDate: {
            return {
                ...state,
                account : {...state.account},
                dreamImages: [...state.dreamImages],
                marsImages: [...state.marsImages],
                creditsLoadedDate: action.payload
            }
        }
        case ActionNames.IsWorking: {
            return {
                ...state,
                account : {...state.account},
                dreamImages: [...state.dreamImages],
                marsImages: [...state.marsImages],
                isWorking: action.payload

            }
        }
        case ActionNames.WorkingText: {
            return {
                ...state,
                account : {...state.account},
                dreamImages: [...state.dreamImages],
                marsImages: [...state.marsImages],
                workingText: action.payload
            }
        }
        case ActionNames.Alert: {
            return {
                ...state,
                account : {...state.account},
                dreamImages: [...state.dreamImages],
                marsImages: [...state.marsImages],
                alert: action.payload
            }
        }
        default:
            return state;
    }
};
