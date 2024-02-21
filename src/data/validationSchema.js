import * as Yup from "yup";

export const validationSchema = Yup.object({
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
		.required()
		.integer()
		.min(0, "The minimum percentage must be 0 if the screen is not broken")
		.max(100, "The maximum percentage must be 100 if the screen is completely broken"),
	internalComponents: Yup.number()
		.required()
		.integer()
		.min(0, "The minimum percentage must be 0 if the internal components are in terrible condition")
		.max(100, "The maximum percentage must be 100 if the internal components are in excellent condition"),
	speakerPollution: Yup.number()
		.required()
		.integer()
		.min(0, "The minimum percentage must be 0 if the speakers are in excellent condition")
		.max(100, "The minimum percentage must be 0 if the speakers are in awful condition"),
});
