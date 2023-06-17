import { toast } from "react-toastify";

const defaultData = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const changeStateToast = (name, state) => {
  return toast(
    <span>
      <strong>{name} </strong>is turned
      <strong className={`text-${state ? "success" : "danger"}`}>
        {state ? " ON" : " OFF"}
      </strong>
    </span>,
    { ...defaultData }
  );
};

export const deleteDeviceToast = (name) => {
  return toast.success(
    <span>
      Device <strong>{name}</strong> was successfully
      <strong> Deleted</strong>
    </span>,
    { ...defaultData }
  );
};
export const createDeviceToast = (name) => {
  return toast.success(
    <span>
      Device <strong>{name}</strong> was successfully
      <strong> Created</strong>
    </span>,
    {
      ...defaultData,
    }
  );
};

export const createExistingDeviceToast = (name, group) => {
  return toast.error(
    <span>
      Device <strong>{name}</strong> alredy exist in group
      <strong> {group}</strong>. Change name or group
    </span>,
    { ...defaultData }
  );
};
