class ErrorHandlerTemplate {
  constructor() {
    this.handleErrors = this.handleErrors.bind(this);
  }

  // Centralized error handling middleware
  handleErrors(err, req, res) {
    const statusCode = err.statusCode || 500;
    const errorResponse = {
      status: 'error',
      message: err.message || 'Internal Server Error',
      details: err.details || null,
    };

    // Include stack trace in development mode
    // if (process.env.NODE_ENV === 'development') {
    //   errorResponse.stack = err.stack;
    // }

    res.status(statusCode).json(errorResponse);
  }

  // Create a custom error with statusCode, message, and optional details
  createError(statusCode, message, details = null) {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.details = details;
    return error;
  }

  // Automatically wrap controller methods in try-catch for error handling
  catchAsync(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next); // Pass any caught error to next() to handle
    };
  }
}

export default ErrorHandlerTemplate();
