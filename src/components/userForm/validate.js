import * as yup from "yup";

export const signupSchema = yup.object().shape({
    name: yup.string()
        .required("required"),
    email: yup.string()
        .email("invalid email")
        .required("required"),
    password: yup.string()
        .min(6, "Password must be atleast 6 characters")
        .required("required"),
    confirmPassword: yup.string()
        .oneOf([yup.ref("password"), null], "Password must match")
        .required("required")
});

export const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required")
});