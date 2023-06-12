import { ref, set } from "firebase/database";
import { db } from ".";
import { REFS } from "../utils/constants";
import { createDeviceToast } from "../utils/toasts";

export const addDevice = (userId, device) => {
  const { group, name, watts, lumens, temperature, hours } = device;
  set(ref(db, `${REFS.DEVICES}/${userId}/${name}_${group}`), {
    name,
    group,
    watts,
    lumens,
    temperature,
    hours: hours * 3600,
    initialHours: hours * 3600,
    timeOn: 0,
    state: false,
  }).then(createDeviceToast(name));
};
