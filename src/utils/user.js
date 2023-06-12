import { DEFAULT_NAMES } from "./constants";

export const getUserDefaultView = (title) => {
  const user = JSON.parse(localStorage.getItem(DEFAULT_NAMES.USER)) || {};
  const defaultSelections = JSON.parse(
    localStorage.getItem(DEFAULT_NAMES.SELECTIONS)
  );

  return defaultSelections && defaultSelections[user.userId]
    ? defaultSelections[user.userId][title]
    : DEFAULT_NAMES.Columns;
};

export const getUserDefaultGroup = (title) => {
  const user = JSON.parse(localStorage.getItem(DEFAULT_NAMES.USER)) || {};
  const defaultSelections = JSON.parse(
    localStorage.getItem(DEFAULT_NAMES.SELECTIONS)
  );

  return defaultSelections && defaultSelections[user.userId]
    ? defaultSelections[user.userId][title]
    : false;
};

export const getUserDefaultState = (title) => {
  const user = JSON.parse(localStorage.getItem(DEFAULT_NAMES.USER)) || {};
  const defaultSelections = JSON.parse(
    localStorage.getItem(DEFAULT_NAMES.SELECTIONS)
  );

  return defaultSelections && defaultSelections[user.userId]
    ? defaultSelections[user.userId][title]
    : DEFAULT_NAMES.BOTH;
};

export const setUserDefaulSelections = (title, value) => {
  const user = JSON.parse(localStorage.getItem(DEFAULT_NAMES.USER));
  let defaultSelections =
    JSON.parse(localStorage.getItem(DEFAULT_NAMES.SELECTIONS)) || {};
  defaultSelections[user.userId]
    ? (defaultSelections[user.userId][title] = value)
    : (defaultSelections[user.userId] = { [title]: value });
  localStorage.setItem(
    DEFAULT_NAMES.SELECTIONS,
    JSON.stringify(defaultSelections)
  );
};

export const getUsername = () => {
  const user = JSON.parse(localStorage.getItem(DEFAULT_NAMES.USER));
  return user?.username;
};
