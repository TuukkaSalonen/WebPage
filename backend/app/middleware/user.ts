import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const env = process.env;
const secret = env.JWT_SECRET || 'secret';
const cookie = env.COOKIE_NAME || 'token';

export interface CustomRequest extends Request {
	user?: any;
}

// Verify token and set user object in request
export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
	const token = req.cookies[cookie];
	if (!token) {
		req.user = { id: null, role: 'Guest' };
		next();
		return;
	}
	jwt.verify(token, secret, (err: jwt.VerifyErrors | null, user: any) => {
		if (err) {
			req.user = { id: null, role: 'Guest' };
			next();
			return;
		}
		req.user = user;
		next();
	});
};

// Authorize role for protected routes (admin, user, guest)
export const authorizeRole = (roles: string[]) => {
	return (req: CustomRequest, res: Response, next: NextFunction): void => {
		if (!req.user || !roles.includes(req.user.role)) {
			res.status(403).json({ message: 'Access denied' });
			return;
		}
		next();
	};
};