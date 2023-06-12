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
import { DEFAULT_NAMES } from "../utils/constants";
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
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => updateProfile(auth.currentUser, { displayName: username }))
    .then(() => putUserDataToLocalstorage())
    .then(() => toast.success(`Welcome, ${username}!`))
    .catch(() => toast.error(`User with this email already exists`));
};

export const loginUser = (email, password) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then(() => putUserDataToLocalstorage())
    .then(() => toast.success(`Welcome back, ${auth.currentUser.displayName}!`))
    .catch(() => toast.error(`Incorrect username or password`));
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
