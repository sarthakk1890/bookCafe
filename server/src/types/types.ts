import { NextFunction, Request, Response } from "express";

export interface NewUserRequestBody {
    _id: string;
    name: string;
    email: string;
    photo: string;
}

export interface IUser{
    _id: string;
    name: string;
    email: string;
    photo: string;
    role: "user" | "admin";
    createdAt: Date;
    updatedAt: Date;
}


export interface NewProductRequestBody {
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
}


export type ControllerType = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;