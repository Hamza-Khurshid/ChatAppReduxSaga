export const SEND_MESSAGE = "SEND_MESSAGE";
export const GET_MESSAGES = "GET_MESSAGES";

export const sendMessage = (payload) => ({
    type: SEND_MESSAGE,
    payload
})

export const getMessages = () => ({
    type: GET_MESSAGES
})