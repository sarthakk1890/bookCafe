import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../utils/utility-class.js';
import { User } from '../models/user.js';
import { TryCatch } from './error.js';
import { IUser } from '../types/types.js';

interface RequestWithUser extends Request {
    user?: IUser;
}

export const isLoggedIn = TryCatch(async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const { id } = req.query;
    
    const user: IUser = await User.findById(id) as IUser;

    if (!user) {
        return next(new ErrorHandler("Not Logged In", 401));
    }

    req.user = user;

    next();
})