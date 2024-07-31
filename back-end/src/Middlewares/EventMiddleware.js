import { ResponseError } from "../Config/Error.js";
import { clearWhiteSpace } from "./AuthMiddleware.js";
import moment from "moment";
function validateEvent(req, res, next) {
  const { title, endDate } = req.body;

  const userId = req.user?.data?.user_id;

  if (!userId) {
    return next(new ResponseError(404, "User Id Not Found"));
  }

  if (!title || !endDate) {
    return next(
      new ResponseError(400, "Missing Required Fields: title, endDate")
    );
  }

  if (!clearWhiteSpace(title) || !clearWhiteSpace(endDate)) {
    return next(new ResponseError(400, "Input cannot contain only spaces"));
  }

  if(!validateDateFormat(endDate)){
    return next(new ResponseError(400, "Invalid Date Format"));
  }
  
  next();
}

function validateDateFormat(dateString) {
  const dateFormat = "ddd MMM DD YYYY";
  return moment(dateString, dateFormat, true).isValid();
}

export default validateEvent;
