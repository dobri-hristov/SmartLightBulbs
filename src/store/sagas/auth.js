import { fork, put, takeEvery } from "@redux-saga/core/effects";
import { authActions } from "../slices/auth";
import { toast } from "react-toastify";

function* loginRequest({ payload: { user } }) {
  try {
    const userData = {
      username: user.displayName,
      userId: user.uid,
      email: user.email,
    };
    yield put(authActions.loginSuccess({ user: userData }));
  } catch (e) {
    yield put(authActions.logoutRequest());
  }
}

function* logoutRequest() {
  try {
    yield put(authActions.logoutSuccess());
  } catch (e) {
    toast.error("Logout failed.", e.message);
  }
}

function* watchAuthSagas() {
  yield takeEvery(authActions.loginRequest, loginRequest);
  yield takeEvery(authActions.logoutRequest, logoutRequest);
}

const authSagas = [fork(watchAuthSagas)];

export default authSagas;
