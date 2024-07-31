import { ResponseError } from "../Config/Error.js";
// Middleware untuk validasi register
function validateRegister(req, res, next) {
  const { email, password, rePassword } = req.body;

  if (!email || !password || !rePassword) {
    return next(
      new ResponseError(
        400,
        "Missing Required Fields: email, password, rePassword"
      )
    );
  }

  if (
    !clearWhiteSpace(email) ||
    !clearWhiteSpace(password) ||
    !clearWhiteSpace(rePassword)
  ) {
    return next(new ResponseError(404, "input cannot contain only spaces"));
  }

  if(!validateEmail(email)){
    return next(new ResponseError(400, "Invalid Syntax Email"));
  }

  if(!validatePassword(password) || !validatePassword(rePassword)){
    return next(new ResponseError(400, "Invalid password format. Password must contain at least one uppercase letter, one number, and one special character and be at least 8 characters long."));
  }

  if(!samePassword){
    return next(new ResponseError(400, "Password must be the same"));
  }

  next();
}

function validateEmail (email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password){
    const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{:;.,<>?]).{8,}$/;
    return passwordRegex.test(password);
}

function samePassword (password, rePassword){
    return password === rePassword;
}

function validateLogin(req, res, next) {
  const {email, password, verification_code} = req.body;

  if(!email || !password || !verification_code){
    return next(new ResponseError(400, "Missing Required Field email, password or verification code"));
  }

  if(!clearWhiteSpace(email) || !clearWhiteSpace(password) || !clearWhiteSpace(verification_code)){
    return next(new ResponseError(400, "input cannot contain only spaces"));
  }

  if(!validateEmail(email)){
    return next(new ResponseError(400, "Invalid Syntax Email"));
  }

  if(!validatePassword(password)){
    return next(new ResponseError(400, "Invalid password format. Password must contain at least one uppercase letter, one number, and one special character and be at least 8 characters long."));
  }

  next();
}

function clearWhiteSpace(data) {
  return data.trim() !== "";
}

export { validateRegister, validateLogin, clearWhiteSpace, validateEmail };
