import {
  FETCHING_DATA,
  FETCHING_COMMENTS,
  SEND_DATA,
  APPLAUDE
} from "../constants";
import io from "socket.io-client";
import { eventChannel } from "redux-saga";
import { fork, take, call, put, cancel } from "redux-saga/effects";
import { fetchData } from "../actions/";

function connect() {
  const socket = io("https://yell-server-side.herokuapp.com");
  return new Promise(resolve => {
    socket.on("connect", () => {
      resolve(socket);
    });
  });
}

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on("yellAll", data => {
      emit(fetchData(data.reverse()));
    });
    return () => {};
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* applaude(socket) {
  while (true) {
    const { payload } = yield take(APPLAUDE);
    socket.emit("yellLike", payload);
  }
}

function* sendData(socket) {
  while (true) {
    const { payload } = yield take(SEND_DATA);
    socket.emit("yellSend", payload);
  }
}

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(sendData, socket);
  yield fork(applaude, socket);
}

function* baseSaga() {
  const socket = yield call(connect);
  const task = yield fork(handleIO, socket);
  // yield takeEvery(FETCHING_DATA, fetchData)
}

export default baseSaga;
