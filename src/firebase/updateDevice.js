import { ref, update } from "firebase/database";
import { db } from ".";
import { REFS } from "../utils/constants";
import { changeStateToast } from "../utils/toasts";
import { setNewHours } from "../utils/time";

export const updateDevice = (userId, device) => {
  const {
    group,
    name,
    watts,
    lumens,
    temperature,
    hours,
    state,
    timeOn,
    timeOnPeriods,
  } = device;
  const period = { start: timeOn, stop: state === true && new Date() };
  state === true && timeOnPeriods && timeOnPeriods.push({ ...period });
  const postData = {
    group,
    name,
    watts,
    lumens,
    temperature,
    hours: state !== false ? setNewHours(hours, timeOn) : hours,
    state: !state,
    timeOn: state === false ? new Date() : 0,
    timeOnPeriods: timeOnPeriods || (state && [{ ...period }]),
  };
  update(ref(db, `${REFS.DEVICES}/${userId}/${name}_${group}`), {
    ...postData,
  }).then(() => changeStateToast(name, !state));
};
