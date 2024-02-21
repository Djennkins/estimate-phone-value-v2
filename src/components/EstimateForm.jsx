import { Formik, Form } from "formik";
import { dropdownTypeOptions } from "../data/typeOptions";
import FormikControl from "./FormikControl";
import { useState } from "react";
import { validationSchema } from "../data/validationSchema";
import { formInitialValues } from "../data/formInitialValues";

export default function SurveyForm() {
	const [price, setPrice] = useState("");

	const getPrice = async (values) => {
		const url = "http://localhost:8080/calculate-price";

		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			setPrice(data.price);
			return data();
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const onSubmit = async (values) => {
		console.log(JSON.stringify(values));
		getPrice(values);
	};

	return (
		<div className="flex flex-col gap-16">
			<Formik initialValues={formInitialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
				{(formik) => {
					return (
						<Form>
							<FormikControl
								control="select"
								label="Type of phone"
								name="type"
								options={dropdownTypeOptions}
							/>
							<FormikControl control="input" label="Age of phone" type="text" name="age" />
							<FormikControl
								control="input"
								label="Percentage of broken screen"
								type="text"
								name="brokenScreen"
							/>
							<FormikControl
								control="input"
								label="Condition of internal components in percent"
								type="text"
								name="internalComponents"
							/>
							<FormikControl
								control="input"
								label="Speaker pollution percentage"
								type="text"
								name="speakerPollution"
							/>
							<button className="button" type="submit" disabled={!formik.isValid}>
								Submit
							</button>
						</Form>
					);
				}}
			</Formik>
			<div className="flex justify-between text-2xl font-bold price">
				<span>Price of phone:</span>
				<span>{price}₴</span>
			</div>
		</div>
	);
}
