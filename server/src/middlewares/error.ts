import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/utility-class.js";
import { ControllerType } from "../types/types.js";

export const errorMiddleware = (
    err: ErrorHandler,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    err.message ||= "Internal Server Error";
    err.statusCode ||= 500;
    
    if (err.name === "CastError") err.message = "Invalid ID";

    // Log the error to the console
    console.log(err);

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};


//it is an arrow function returning an arrow function
export const TryCatch = (func: ControllerType) => (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req, res, next)).catch(next);
};
