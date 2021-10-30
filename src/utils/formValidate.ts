import Joi from "joi";

interface Props {
  email: string;
  password: string;
}

/**
 * Validates the form for you using Joi.
 */
const validateForm = async ({ email, password }: Props) => {
  let value = {};
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().alphanum().min(5).max(30).required(),
  });
  try {
    value = await schema.validateAsync({ email, password });
  } catch (err) {
    return { err };
  }
  return { value };
};

export default validateForm;
