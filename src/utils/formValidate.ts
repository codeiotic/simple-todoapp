import Joi from "joi";

interface Props {
  email: string;
  password: string;
}

/**
 * Validates the form for you using Joi.
 * @param {string} email The email of the user.
 * @param {string} password The password of the user.
 */
const validateForm = async ({ email, password }: Props) => {
  let value = {};
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.base": `email should be a type of 'text'.`,
        "string.empty": `email cannot be an empty field.`,
        "string.min": `email should have a minimum length of {#limit}.`,
        "any.required": `email is a required field.`,
      }),
    password: Joi.string().alphanum().min(5).max(30).required().messages({
      "string.base": `Password should be a type of 'text'.`,
      "string.empty": `Password cannot be an empty field.`,
      "string.min": `Password should have a minimum length of {#limit} characters.`,
      "any.required": `Password is a required field.`,
    }),
  });
  try {
    value = await schema.validateAsync({ email, password });
  } catch (err) {
    return { err };
  }
  return { value };
};

export default validateForm;
