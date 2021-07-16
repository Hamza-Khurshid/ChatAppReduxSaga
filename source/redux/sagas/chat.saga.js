import { call, put, take, takeLatest } from 'redux-saga/effects'
import { GET_MESSAGES, SEND_MESSAGE } from "../state/chatAction";
import { getMessagesRequest, sendMessageRequest } from '../requests/chat.request';

function* fetchMessages() {
   try {
      const response = yield call(getMessagesRequest);
      yield put({type: "MESSAGE_FETCH_SUCCEEDED", payload: response.data.messages});
   } catch (e) {
      yield put({type: "MESSAGE_FETCH_FAILED", message: e.message});
   }
}

function* sendMessage(action) {
    try {
       yield call(sendMessageRequest, action);
       if(action.payload.successCallback) {
        action.payload.successCallback();
       }
       yield put({type: "MESSAGE_SEND_SUCCEEDED"});
       yield call(fetchMessages);
    } catch (e) {
       yield put({type: "MESSAGE_SEND_FAILED", message: e.message});
    }
 }

function* mySaga() {
  yield takeLatest(GET_MESSAGES, fetchMessages);
  yield takeLatest(SEND_MESSAGE, sendMessage);
}

export default mySaga;