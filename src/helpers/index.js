require("dotenv").config();

export const successResponse = (req, res, data, code = 200) =>
  res.send({
    code,
    data,
    success: true,
  });

export const errorResponse = (
  req,
  res,
  errorMessage = "Something went wrong",
  code = 500,
  error = {}
) =>
  res.status(500).json({
    code,
    errorMessage,
    error,
    data: null,
    success: false,
  });

export const isIdValid = (id) => {
  id = parseInt(id);
  if (!(id !== "NaN" && id > 0 && id < Number.MAX_SAFE_INTEGER))
    throw new Error("Invalid id supplied.");
  return;
};
export const filterJOIValidation = () => {
  const regex = /["]+/g;
  return message.replace(regex, "");
};
