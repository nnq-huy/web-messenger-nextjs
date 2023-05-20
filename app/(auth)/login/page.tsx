'use client'
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { FormInput } from "../../components/form-components/FormInput";
import SubmitButton from "../../components/form-components/SubmitButton";
import { useAuth } from "../../context/AuthContext";
import { loginSchema } from "../../validations/login.validation";
import { toast } from "react-hot-toast";
import AuthSocialButton from "@/app/components/form-components/AuthSocialButton";
import { BsGithub, BsGoogle  } from 'react-icons/bs';
import createUserDocument from "@/app/utils/actions/createUserDocument";
import { HOME } from "@/app/utils/constant/routes.constant";


const LoginPage = () => {
	type FormData = Yup.InferType<typeof loginSchema>;

	const { logIn, logInWithGoogle } = useAuth();
	const router = useRouter();

	const methods = useForm<FormData>({ mode: "onBlur", resolver: yupResolver(loginSchema) });
	const {
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = methods;

	const onSubmit = async (data: FormData) => {
		const toastId = toast.loading("Logging in...");
		try {
			await logIn(data.email, data.password);
			toast.success("Successfully logged in!", { id: toastId });
			router.push(HOME);
		} catch (error: any) {
			toast.error(error.message, { id: toastId });
		}
	};

	const googleLogIn = async () => {
		const toastId = toast.loading("Logging in...");
		try {
			await logInWithGoogle();
			//await createUserDocument();

			toast.success("Successfully logged in!", { id: toastId });
			router.push(HOME);
		} catch (error: any) {
			toast.error(error.message, { id: toastId });
		}

	}

	return (
		<div className="bg-gray-100 dark:bg-slate-700 min-w-full min-h-screen py-1">
		<div className="sign-in-form mx-auto w-96 mt-12 shadow-lg bg-gray-200 dark:bg-gray-900 rounded-xl">
			<h2 className="py-3 px-12 mt-8 text-center text-2xl font-semibold text-indigo-800 dark:text-gray-100">Log In</h2>
			<FormProvider {...methods}>
				<form
					action=""
					className="w-80 mx-auto pb-12 px-4"
					onSubmit={handleSubmit(onSubmit)}
				>
					<FormInput
						label="Email"
						name="email"
						type="email"
						formOptions={loginSchema.fields.email}
						errors={errors.email}
					/>
					<FormInput
						label="Password"
						name="password"
						type="password"
						formOptions={loginSchema.fields.password}
						errors={errors.password}
					/>
					<SubmitButton label="login" />
					<div className="mt-2 relative flex justify-center text-sm">
              			<span className="px-2 text-gray-500 dark:text-gray-100">
                			Or continue with
              			</span>
            		</div>
					<div className="mt-6 justify-center flex gap-2">
            			<AuthSocialButton
              				icon={BsGithub}
              				onClick={() => {}}
            			/>
            			<AuthSocialButton
              				icon={BsGoogle}
              				onClick={() => googleLogIn()}
            			/>
          			</div>
				</form>
			</FormProvider>
          </div>
		  </div>
	);
};

export default LoginPage;
