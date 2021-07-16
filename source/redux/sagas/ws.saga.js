import { call, put, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga';

const wsUrl = "https://chat-app-ws-redux-saga.herokuapp.com/client";

function initWebsocket() {
    return eventChannel(emitter => {
        var ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            console.log('opening...');
            ws.send('connection');
        };

        ws.onerror = (error) => {
            console.log('WebSocket error ' + JSON.stringify(error));
            console.dir(error);
        };

        ws.onmessage = (e) => {
            let msg = null;

            try {
                msg = JSON.parse(e.data);
            } catch (e) {
                console.error(`Error parsing : ${e.data}`);
            };

            if (msg) {
                const { payload: book } = msg;
                const channel = msg.channel;

                switch (channel) {
                    case 'ADD_BOOK':
                        return emitter({ type: ADD_BOOK, book });

                    case 'REMOVE_BOOK':
                        return emitter({ type: REMOVE_BOOK, book });

                    default:
                        return emitter({ type: REMOVE_BOOK, book });
                    // nothing to do
                }
            }
        }

        // unsubscribe function
        return () => {
            console.log('Socket off');
        }
    })
}

export default function* wsSagas() {
    const channel = yield call(initWebsocket);

    while (true) {
        const action = yield take(channel);
        yield put(action);
    }
}