class ApiError extends Error {
  constructor(message, errors = null) {
    super(message);
    this.name = "ApiError";
    this.errors = errors;
  }
}

const handleApiError = (error, defaultMessage) => {
  let message = defaultMessage ?? "Something went wrong. Please try again";
  let errors = null;

  if (error.response) {
    const { status, data } = error.response;
    if (status >= 500) {
      message = "Server error. Please try again";
    } else if (status >= 400 && status < 500) {
      if (status == 422 && data?.errors) {
        errors = data.errors;
      }
      message = data?.message || "Request failed. Check your input";
    }
  } else if (error.request) {
    message = "Network error. Please try again";
  }
  throw new ApiError(message, errors);
};

export default handleApiError;
