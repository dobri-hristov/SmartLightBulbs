import * as yup from "yup";

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required.")
    .min(4, "Username must be at least 4 characters long.")
    .max(20, "Username must be max 20 characters long."),
  email: yup
    .string()
    .required("E-mail is required.")
    .matches(
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Enter a valid e-mail address."
    ),
  password: yup
    .string()
    .required("Password is required.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/,
      "Password must be between 6 and 20 alphabet characters and include: at least one Latin letter, uppercase Latin letter and number."
    ),
  passwordConfirmation: yup
    .string()
    .required("Repeate password.")
    .oneOf([yup.ref("password"), null], "Passwords must match."),
});

export const addDeviceSchema = yup.object().shape({
  name: yup
    .string()
    .required("Device name is required.")
    .min(3, "Device name must be at least 3 characters long.")
    .max(20, "Device name must be max 20 characters long."),
  group: yup
    .string()
    .required("Device group is required. Enter or choose one")
    .min(3, "Device group must be at least 3 characters long.")
    .max(20, "Device group must be max 20 characters long."),
  hours: yup.string().required("Hors is required"),
  watts: yup
    .number()
    .required("Device watts is required.")
    .min(1, "Must be more than 1 watt")
    .max(40, "Must be less than 40 watts"),
  lumens: yup
    .number()
    .required("Device lumens is required.")
    .min(100, "Must be more than 100 lumens")
    .max(1600, "Must be less than 1600 lumens"),
});
