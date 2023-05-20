import * as Yup from "yup";
import { LOWERCASE_REGEX, NUMERIC_REGEX, UPPERCASE_REGEX } from "../utils/constant/regex.constant";


export const signupSchema = Yup.object({
	userName: Yup.string().uppercase().required("User name is required").
	min(2, "Minimum 2 character required" ),
	email: Yup.string()
		.email("Email must be a valid email address.")
		.required("Email is required."),
	password: Yup.string()
		.required("Password is required")
		.matches(LOWERCASE_REGEX, "At least one lowercase letter required.")
		.matches(UPPERCASE_REGEX, "At least one uppercase letter required.")
		.matches(NUMERIC_REGEX, "At least one number required.")
		.min(8, "Minimum 8 characters required"),

	confirm_password: Yup.string()
		.required("Re-enter your password")
		.oneOf([Yup.ref("password")], "Passwords must match."),
});
