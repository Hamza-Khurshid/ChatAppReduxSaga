import {
    GET_MESSAGES,
    SEND_MESSAGE
} from "./chatAction";

const initState = {
    messages: [],
    loading: false,
    sendLoading: false,
}

export default (state=initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "MESSAGE_FETCH_SUCCEEDED":
            return {
                ...state,
                loading: false,
                messages: payload,
            };

        case "MESSAGE_FETCH_FAILED":
            return {
                ...state,
                loading: false,
            };
            
        case GET_MESSAGES:
            return {
                ...state,
                loading: true
            };
            
        case SEND_MESSAGE:
            return {
                ...state,
                sendLoading: true,
            };

        case "MESSAGE_SEND_SUCCEEDED":
        case "MESSAGE_SEND_FAILED":
            return {
                ...state,
                sendLoading: false
            }
    
        default:
            return state;
    }
}