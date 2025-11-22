// generic validation middleware
// generic validator (Joi)
export function validate(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const details = error.details.map((d) => d.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: details,
      });
    }

    req.body = value; // cleaned data from Joi
    next();
  };
}
