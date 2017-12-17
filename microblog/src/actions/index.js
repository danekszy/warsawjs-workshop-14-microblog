import {
  FETCHING_DATA,
  FETCHING_COMMENTS,
  FETCHING_COMMENTS_SUCCESS,
  SIGN_IN,
  SIGN_OUT,
  IS_SIGNED_IN,
  SEND_DATA,
  EXPAND_YELL,
  APPLAUDE
} from "../constants";

export function fetchData(payload) {
  return {
    type: FETCHING_DATA,
    payload
  };
}

export function fetchCommentsSuccess(data) {
  return {
    type: FETCHING_COMMENTS_SUCCESS,
    data
  };
}

export function sendData(payload) {
  return {
    type: SEND_DATA,
    payload
  };
}

export function applaude(payload) {
  return {
    type: APPLAUDE,
    payload
  };
}

export function expandYell(yellId) {
  return {
    type: EXPAND_YELL,
    yellId
  };
}

export function onSignIn() {
  return {
    type: SIGN_IN,
    meta: {
      thunk: true
    }
  }
}

export function onSignOut() {
  return {
    type: SIGN_OUT
  }
}

export function isSignedIn() {
  return {
    type: IS_SIGNED_IN,
  }
}
