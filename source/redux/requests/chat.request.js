import axios from 'axios';

export const getMessagesRequest = () => {
    return axios.request({
        url: 'https://chat-app-ws-redux-saga.herokuapp.com/api/chat/list',
        method: 'get'
    })
}

export const sendMessageRequest = (action) => {
    return axios.request({
        url: 'https://chat-app-ws-redux-saga.herokuapp.com/api/chat/add',
        method: 'post',
        headers: {
            "Accept": "application/json",
            "User-Agent": "Thunder Client (https://www.thunderclient.io)",
            "Content-Type": "application/json" 
        },
        data: { content: action.payload.content }
    })
}