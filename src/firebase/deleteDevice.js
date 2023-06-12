import { db } from ".";
import { ref, remove } from "firebase/database";
import { REFS } from "../utils/constants";
import { deleteDeviceToast } from "../utils/toasts";

const deleteDevice = (userId, deviceName) => {
  const refDevice = ref(db, `${REFS.DEVICES}/${userId}/${deviceName}`);
  remove(refDevice).then(deleteDeviceToast(deviceName));
};

export default deleteDevice;
