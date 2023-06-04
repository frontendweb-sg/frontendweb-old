import { useFormik } from "formik";
import Form from "../ui/Form";
import Input from "../ui/Input";
import Button from "../ui/Button";
import * as yup from "yup";
import { AppContent } from "@/utils/AppContent";
import { AppRoutes } from "@/utils/AppRoutes";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { BsKey } from "react-icons/bs";

const validation = yup.object().shape({
	email: yup.string().email().required("Email is required!"),
	password: yup.string().required(),
});

export interface loginProps {
	email: string;
	password: string;
}

const LoginForm = () => {
	const {
		isSubmitting,
		values,
		errors,
		touched,
		handleBlur,
		handleChange,
		handleSubmit,
	} = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: validation,
		onSubmit: async (values: loginProps) => {
			console.log("values", values);
			const result = await signIn("credentials", {
				email: values.email,
				password: values.password,
				redirect: false,
			});

			console.log("result", result);
		},
	});

	return (
		<Form onSubmit={handleSubmit}>
			<Input
				name="email"
				type="email"
				errors={errors}
				touched={touched}
				value={values.email}
				onBlur={handleBlur}
				onChange={handleChange}
				startIcon={<FaEnvelope />}
				placeholder="Email id"
			/>
			<Input
				name="password"
				type="password"
				errors={errors}
				touched={touched}
				value={values.password}
				onBlur={handleBlur}
				onChange={handleChange}
				startIcon={<FaKey />}
				placeholder="********"
			/>

			<div className="flex items-center justify-between mb-3">
				<Link href={AppRoutes.resetPassword}>
					<BsKey className="me-2" />
					{AppContent.forgotPassword}
				</Link>
			</div>

			<Button block size="md" type="submit">
				{AppContent.signIn}
			</Button>
		</Form>
	);
};

export default LoginForm;
