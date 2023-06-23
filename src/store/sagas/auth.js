import { fork, put, takeEvery } from "@redux-saga/core/effects";
import { authActions } from "../slices/auth";
import { toast } from "react-toastify";
import { loadingActions } from "../slices/loading";

function* loginRequest({ payload: { user } }) {
  try {
    yield put(loadingActions.loadingOn());
    const userData = {
      username: user.displayName,
      userId: user.uid,
      email: user.email,
    };
    yield put(authActions.loginSuccess({ user: userData }));
    yield put(loadingActions.loadingOff());
  } catch (e) {
    yield put(authActions.logoutRequest());
  }
}

function* logoutRequest() {
  yield put(loadingActions.loadingOn());
  try {
    yield put(authActions.logoutSuccess());
  } catch (e) {
    toast.error("Logout failed.", e.message);
  }
  yield put(loadingActions.loadingOff());
}

function* watchAuthSagas() {
  yield takeEvery(authActions.loginRequest, loginRequest);
  yield takeEvery(authActions.logoutRequest, logoutRequest);
}

const authSagas = [fork(watchAuthSagas)];

export default authSagas;
