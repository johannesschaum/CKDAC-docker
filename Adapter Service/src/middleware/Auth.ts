import { Request, Response } from "express";
import { NextFunction } from "connect";
import jwt from 'jsonwebtoken';
import * as Config from '../config/Config'
import { ErrorResponse } from "../utils/responses/ApiResponse";
import { logger } from "../Service";

declare global {
    namespace Express {
        interface Request {
            userId: string
            claims: string[]
        }
    }
}

export async function getAuthDetails(req: Request, res: Response, next: NextFunction) {
    try {
        let authDetailsToken = req.headers["auth-details"] as string;
        let authDetails = jwt.verify(authDetailsToken, Config.ACCESS_TOKEN_PUB, { algorithms: ['RS512'] }) as {userId: string, claims: string[], userType: string};
        if (authDetails.userType == "user" && authDetails.userId) {
            req.userId = authDetails.userId;
        }
        if(authDetails.claims != undefined && Array.isArray(authDetails.claims)) {
            req.claims = authDetails.claims;
        }
        return next();
    } catch (err) {
        logger.error(`Error when authenticating user`, err);
        let response = new ErrorResponse(400);
        return res.status(response.Code).json(response);
    }
}