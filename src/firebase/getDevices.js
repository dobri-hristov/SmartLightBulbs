import { dbRef } from ".";
import { child, get } from "firebase/database";
import { REFS } from "../utils/constants";

export const getAllDevicesOnce = (userId) => {
  return get(child(dbRef, `${REFS.DEVICES}/${userId}`)).then((snapshot) => {
    return snapshot.exists() && snapshot.val();
  });
};
