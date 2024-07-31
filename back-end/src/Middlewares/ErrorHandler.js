import { ResponseError } from "../Config/Error.js";
const errorHandler = (err, req, res, next) => {
    if(!err){
        next();
        return;
    }
    if(err instanceof ResponseError){
        res.status(err.status).json({
            errors: err.message,
        }).end();
    }else{
        res.status(500).json({
            errors: 'Internal Server Error',
        }).end();
    }
};
export{
    errorHandler
}