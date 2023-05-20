'use client'
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "../../components/form-components/FormInput";
import SubmitButton from "../../components/form-components/SubmitButton";
import { useAuth } from "../../context/AuthContext";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { signupSchema } from "../../validations/signup.validation";
import { useRouter } from "next/navigation";
import { HOME } from "../../utils/constant/routes.constant";
import AuthSocialButton from "@/app/components/form-components/AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import createUserDocument from "@/app/utils/actions/createUserDocument";

const SignUpPage = () => {
	type FormData = Yup.InferType<typeof signupSchema>;

	const { signUp, logInWithGoogle } = useAuth();
	const router = useRouter();

	const methods = useForm<FormData>({ mode: "onBlur", resolver: yupResolver(signupSchema) });
	const {
		handleSubmit,
		formState: { errors, isSubmitting },
	} = methods;

	const onSubmit = async (data: FormData) => {
		const toastId = toast.loading("Signing up...");
		try {
			await signUp(data.email, data.password);
			await createUserDocument(data.userName);
			toast.success("Successfully signed up!", { id: toastId });
			router.push(HOME);
		} catch (error: any) {
			toast.error(error.message, { id: toastId });
		}
	};

	const googleSignUp = async () => {
		const toastId = toast.loading("Logging in...");
		try {
			await logInWithGoogle();
			await createUserDocument();
			toast.success("Successfully logged in!", { id: toastId });
			router.push(HOME);
		} catch (error: any) {
			toast.error(error.message, { id: toastId });
		}
	}

	return (
		<div className="bg-gray-100 dark:bg-slate-700 min-w-full min-h-screen py-1">

		<div className="sign-up-form container shadow-lg mx-auto w-96 mt-12 bg-gray-200 dark:bg-gray-900 rounded-xl">
		<h2 className="py-3 px-12 mt-8 text-center text-2xl font-semibold text-indigo-800 dark:text-gray-100">Sign Up</h2>			<FormProvider {...methods}>
				<form
					action=""
					className="w-80 mx-auto pb-12 px-4"
					onSubmit={handleSubmit(onSubmit)}
				>
					<FormInput
						label="Name"
						name="userName"
						type="userName"
						formOptions={signupSchema.fields.userName}
						errors={errors.userName}
					/>
					<FormInput
						label="Email"
						name="email"
						type="email"
						formOptions={signupSchema.fields.email}
						errors={errors.email}
					/>
					<FormInput
						label="Password"
						name="password"
						type="password"
						formOptions={signupSchema.fields.password}
						errors={errors.password}
					/>
					<FormInput
						label="Confirm Password"
						name="confirm_password"
						type="password"
						formOptions={signupSchema.fields.confirm_password}
						errors={errors.confirm_password}
					/>
					<SubmitButton label="sign up" />
					<div className="mt-2 relative flex justify-center text-sm">
              			<span className="px-2 text-gray-500">
                			Or continue with
              			</span>
            		</div>
					<div className="mt-6 flex gap-2 justify-center">
            			<AuthSocialButton
              				icon={BsGithub}
              				onClick={() => {}}
            			/>
            			<AuthSocialButton
              				icon={BsGoogle}
              				onClick={() => googleSignUp()}
            			/>
          			</div>
				</form>
			</FormProvider>
		</div>
		</div>
	);
};

export default SignUpPage;
