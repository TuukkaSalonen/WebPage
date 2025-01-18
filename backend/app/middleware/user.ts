import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const env = process.env;
const secret = env.JWT_SECRET || 'secret';
const cookie = env.COOKIE_NAME || 'token';

export interface CustomRequest extends Request {
    user?: any;
}

// Set default user cookie if not already set
// export const setDefaultUser = (req: Request, res: Response, next: Function) => {
//     if (!req.cookies.user) {
//         res.cookie('user', JSON.stringify({ name: 'Guest' }), { httpOnly: true, secure: true });
//     }
//     next();
// };

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const token = req.cookies[cookie];
    if (!token) {
        req.user = { username: 'Guest', role: 'Guest' };
        return next();
    }
    jwt.verify(token, secret, (err: jwt.VerifyErrors | null, user: any) => {
        if (err) {
            req.user = { username: 'Guest', role: 'Guest' };
            return next();
        }
        req.user = user;
        next();
    });
};

export const authorizeRole = (roles: string[]) => {
    return (req: CustomRequest, res: Response, next: NextFunction): void => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({ message: 'Access denied' });
            return;
        }
        next();
    };
};