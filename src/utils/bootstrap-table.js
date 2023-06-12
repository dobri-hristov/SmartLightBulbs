import store from "../store";
import { DEFAULT_NAMES } from "./constants";

export const defaultSettings = {
  noDataIndication: "No data to display.",
  bootstrap4: true,
  bordered: false,
  hover: true,
};

export const getDefaultColumn = (title) => {
  const userId = store.getState().auth.user.userId;
  const defaultSelectedColumn =
    JSON.parse(localStorage.getItem(DEFAULT_NAMES.SELECTIONS)) || {};
  return defaultSelectedColumn && defaultSelectedColumn[userId]
    ? defaultSelectedColumn[userId][title]
    : [];
};
export const setDefaultColumn = (title, column) => {
  const userId = store.getState().auth.user.userId;
  let defaultSelectedColumn =
    JSON.parse(localStorage.getItem(DEFAULT_NAMES.SELECTIONS)) || {};
  defaultSelectedColumn[userId]
    ? (defaultSelectedColumn[userId][title] = column)
    : (defaultSelectedColumn[userId] = { [title]: column });
  localStorage.setItem(
    DEFAULT_NAMES.SELECTIONS,
    JSON.stringify(defaultSelectedColumn)
  );
};
