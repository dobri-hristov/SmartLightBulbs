import { ref, set } from "firebase/database";
import { db } from ".";
import { REFS } from "../utils/constants";
import { createDeviceToast } from "../utils/toasts";

export const addDevice = (userId, device) => {
  const { group, name, watts, lumens, temperature, hours } = device;
  set(ref(db, `${REFS.DEVICES}/${userId}/${name.trim()}_${group.trim()}`), {
    name: name.trim(),
    group: group.trim(),
    watts,
    lumens,
    temperature,
    hours: hours * 3600,
    initialHours: hours * 3600,
    timeOn: 0,
    state: false,
    addDate: new Date().getTime(),
  }).then(createDeviceToast(name));
};
