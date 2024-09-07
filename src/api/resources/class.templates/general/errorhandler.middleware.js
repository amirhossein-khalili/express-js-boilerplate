import StatusCodes from 'http-status-codes';

import { CustomAPIError } from './errorstatus.template.js';

import mongoose from 'mongoose';

const errorHandlerMiddleware = (err, req, res) => {
  const customError = {
    msg: 'Something went wrong, please try again',
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (err instanceof CustomAPIError) {
    customError.msg = err.message;
    customError.statusCode = err.statusCode;
  }

  if (err instanceof mongoose.Error.ValidationError) {
    if (err.name === 'ValidationError') {
      customError.msg = Object.values(err.errors)
        .map((item) => item.message)
        .join(',');
      customError.statusCode = StatusCodes.BAD_REQUEST;
    }

    if (err.code && err.code === 11000) {
      customError.msg = `Duplicate value entered for ${Object.keys(
        err.keyValue
      )} field, please choose another value`;
      customError.statusCode = StatusCodes.BAD_REQUEST;
    }

    if (err.name === 'CastError') {
      customError.msg = `No match found with id of ${err.value}`;
      customError.statusCode = StatusCodes.NOT_FOUND;
    }
  }

  res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandlerMiddleware;
