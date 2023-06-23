import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { toast } from "react-toastify";
import store from "../store";
import { authActions } from "../store/slices/auth";
import { loadingActions } from "../store/slices/loading";
import { DEFAULT_NAMES, LOADING_COMPONENTS } from "../utils/constants";
import { getUsername } from "../utils/user";

const putUserDataToLocalstorage = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const userData = {
    email: user.email,
    userId: user.uid,
    username: user.displayName,
  };
  localStorage.setItem(DEFAULT_NAMES.USER, JSON.stringify(userData));
};

export const createUser = (email, password, username) => {
  localStorage.setItem(DEFAULT_NAMES.USER, JSON.stringify({ username }));
  const auth = getAuth();
  store.dispatch(loadingActions.loadingOn(LOADING_COMPONENTS.AUTH));
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => updateProfile(auth.currentUser, { displayName: username }))
    .then(() => putUserDataToLocalstorage())
    .then(() => toast.success(`Welcome, ${username}!`))
    .catch(() => toast.error(`User with this email already exists`))
    .finally(() =>
      store.dispatch(loadingActions.loadingOff(LOADING_COMPONENTS.AUTH))
    );
};

export const loginUser = (email, password) => {
  const auth = getAuth();
  store.dispatch(loadingActions.loadingOn(LOADING_COMPONENTS.AUTH));
  signInWithEmailAndPassword(auth, email, password)
    .then(() => putUserDataToLocalstorage())
    .then(() => toast.success(`Welcome back, ${auth.currentUser.displayName}!`))
    .catch(() => toast.error(`Incorrect username or password`))
    .finally(() =>
      store.dispatch(loadingActions.loadingOff(LOADING_COMPONENTS.AUTH))
    );
};

export const logoutUser = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => toast.success(`Hope to see you soon, ${getUsername()}!`))
    .then(() => store.dispatch(authActions.logoutRequest()))
    .then(() => localStorage.removeItem(DEFAULT_NAMES.USER));
};

export const checkAuth = () => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    user
      ? store.dispatch(authActions.authRequest({ user }))
      : store.dispatch(authActions.logoutRequest());
  });
};
