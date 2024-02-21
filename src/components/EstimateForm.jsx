import { Formik, Form } from "formik";
import * as Yup from "yup";
import { dropdownTypeOptions } from "../data/typeOptions";
import FormikControl from "./FormikControl";

export default function SurveyForm() {
	const initialValues = {
		type: "",
		age: "",
		brokenScreen: "",
		internalComponents: "",
		speakerPollution: "",
	};

	const validationSchema = Yup.object({
		type: Yup.string().required(),
		age: Yup.number()
			.required("Enter an age")
			.integer()
			.min(0, "Minimal value is 0 year")
			.when("type", {
				is: "SMARTPHONE",
				then: (schema) => schema.max(15, "Age must be less or equal than 15 for smartphone"),
			})
			.when("type", {
				is: "FLIP_PHONE",
				then: (schema) => schema.max(20, "Age must be less or equal than 20 for flip phone"),
			})
			.when("type", {
				is: "BUTTON",
				then: (schema) => schema.max(25, "Age must be less or equal than 25 for button phone"),
			}),
		brokenScreen: Yup.number()
			.integer()
			.min(0, "The minimum percentage must be 0 if the screen is not broken")
			.max(100, "The maximum percentage must be 100 if the screen is completely broken"),
		internalComponents: Yup.number()
			.integer()
			.min(0, "The minimum percentage must be 0 if the internal components are in terrible condition")
			.max(100, "The maximum percentage must be 100 if the internal components are in excellent condition"),
		speakerPollution: Yup.number()
			.integer()
			.min(0, "The minimum percentage must be 0 if the speakers are in excellent condition")
			.max(100, "The minimum percentage must be 0 if the speakers are in awful condition"),
	});

	const onSubmit = async (values) => {
		console.log("Form data", values);
	};

	return (
		<div className="flex flex-col gap-16">
			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
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
			<div className="flex justify-between text-2xl font-bold text-fuchsia-400">
				<span>Price of phone:</span>
				<span>{}₴</span>
			</div>
		</div>
	);
}
