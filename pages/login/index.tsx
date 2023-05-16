import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { FormInput } from "../../components/form-components/FormInput";
import SubmitButton from "../../components/form-components/SubmitButton";
import { useAuth } from "../../context/AuthContext";
import { DASHBOARD } from "../../utils/constant/routes.constant";
import { loginSchema } from "../../validations/login.validation";
import { toast } from "react-hot-toast";
import AuthSocialButton from "@/components/form-components/AuthSocialButton";
import { BsGithub, BsGoogle  } from 'react-icons/bs';


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
			router.push(DASHBOARD);
		} catch (error: any) {
			toast.error(error.message, { id: toastId });
		}
	};

	const googleLogIn = async () => {
		const toastId = toast.loading("Logging in...");
		try {
			await logInWithGoogle();
			toast.success("Successfully logged in!", { id: toastId });
			router.push(DASHBOARD);
		} catch (error: any) {
			toast.error(error.message, { id: toastId });
		}

	  } 


	return (
		<div className="sign-in-form container mx-auto w-96 mt-12 shadow-lg">
			<h2 className="px-12 mt-8 text-center text-2xl font-semibold text-blue-900">Log In</h2>
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
					<SubmitButton />
					<div className="mt-2 relative flex justify-center text-sm">
              			<span className="px-2 text-gray-500">
                			Or continue with
              			</span>
            		</div>
					<div className="mt-6 flex gap-2">
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
	);
};

export default LoginPage;
