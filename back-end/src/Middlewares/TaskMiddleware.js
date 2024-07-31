import { ResponseError } from "../Config/Error.js";
import { clearWhiteSpace } from "./AuthMiddleware.js";
import { TaskStatus } from '@prisma/client';

function validateTask(req, res, next) {
  const { title, description, status, deadline } = req.body;

  if (!title || !description || !status || !deadline) {
    return next(
      new ResponseError(
        400,
        "Missing Required Fields: title, description, status, deadline"
      )
    );
  }

  if (
    !clearWhiteSpace(title) ||
    !clearWhiteSpace(description) ||
    !clearWhiteSpace(status) ||
    !clearWhiteSpace(deadline)
  ) {
    return next(new ResponseError(400, "Input Cannot contains only spaces"));
  }

  const taskStatus = Object.values(TaskStatus);

  if(!taskStatus.includes(status)){
    return next(new ResponseError(400, `Invalid Task Status. Valid statuses are: ${taskStatus.join(', ')}`));
  }

  next();
}

export {
    validateTask
}