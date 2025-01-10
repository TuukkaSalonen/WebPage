import { Request, Response } from 'express';

// Set default user cookie if not already set
const setDefaultUser = (req: Request, res: Response, next: Function) => {
    if (!req.cookies.user) {
        res.cookie('user', JSON.stringify({ name: 'Guest' }), { httpOnly: true, secure: true });
    }
    next();
};

export default setDefaultUser;