import * as yup from "yup";

export const registerSchema = yup.object({
    username : yup.string().required("Username is required").min(5,"Username must be at least 5 characters long"),
    email : yup.string().required("Email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,"Email is invalid"),
    password : yup.string().required("Password is required").min(8,"Password must be at least 8 characters long"),

})

export const LoginSchema = yup.object({
    identifier : yup.string().required("Email  is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,"Email is invalid"),
    password : yup.string().required("Password is required"),
})