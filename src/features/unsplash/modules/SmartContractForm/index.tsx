import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { deployContract } from "features/unsplash/actions";
import { RootState } from "utils/store";

const SmartContractForm = () => {
	const user = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();

	return (
		<Formik
			initialValues={{
				name: "",
				symbol: "",
			}}
			validationSchema={Yup.object().shape({
				name: Yup.string().required("Name is required"),
				symbol: Yup.string().required("Symbol is required"),
			})}
			onSubmit={async (values, { setSubmitting }) => {
				try {
					setSubmitting(true);
					await deployContract(user, values, dispatch);
				} catch (error) {
					console.log(error);
				} finally {
					setSubmitting(false);
				}
			}}
		>
			{({ isSubmitting }) => (
				<Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="name"
						>
							Name
						</label>
						<Field
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="name"
							type="text"
							placeholder="name"
							name="name"
						/>
						<ErrorMessage
							name="name"
							component="div"
							className="text-red-500 text-sm"
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="symbol"
						>
							Symbol
						</label>
						<Field
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="symbol"
							type="text"
							placeholder="symbol"
							name="symbol"
						/>
						<ErrorMessage
							name="symbol"
							component="div"
							className="text-red-500 text-sm"
						/>
					</div>
					<div className="flex items-center justify-between">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit"
						>
							{isSubmitting ? "Deploying" : "Deploy"}
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default SmartContractForm;
