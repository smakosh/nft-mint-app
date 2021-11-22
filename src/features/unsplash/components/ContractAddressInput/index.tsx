import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { AppDispatch, RootState } from "utils/store";
import { saveContractAddress } from "features/unsplash/redux/contractSlice";

const ContractAddressInput = () => {
	const contract = useSelector((state: RootState) => state.contract);
	const dispatch = useDispatch<AppDispatch>();

	return (
		<Formik
			initialValues={{
				address: contract.contract?.address
					? contract.contract.address
					: contract.address || "",
			}}
			validationSchema={Yup.object().shape({
				address: Yup.string().required("Required"),
			})}
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
							setTimeout(() => submitForm(), 100);
						}}
					/>
				</Form>
			)}
		</Formik>
	);
};

export default ContractAddressInput;
