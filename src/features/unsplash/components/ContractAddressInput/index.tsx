import { useDispatch } from "react-redux";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { saveContractAddress } from "features/unsplash/redux/contractSlice";

const ContractAddressInput = () => {
	const dispatch = useDispatch();

	return (
		<Formik
			initialValues={{
				address: "",
			}}
			validationSchema={{
				address: Yup.string().required("Required"),
			}}
			onSubmit={(values) => {
				try {
					dispatch(saveContractAddress(values.address));
				} catch (error) {
					console.log(error);
				}
			}}
		>
			{({ values, handleChange, submitForm }) => (
				<Form>
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="address"
					>
						Contract address
					</label>
					<Field
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="address"
						type="text"
						placeholder="address"
						name="address"
						value={values.address}
						onChange={(e: Event) => {
							handleChange(e);
							setTimeout(submitForm, 0);
						}}
					/>
				</Form>
			)}
		</Formik>
	);
};

export default ContractAddressInput;
