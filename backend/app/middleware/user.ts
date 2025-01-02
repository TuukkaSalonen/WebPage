import { Request, Response } from 'express';

const setDefaultUser = (req: Request, res: Response, next: Function) => {
    if (!req.cookies.user) {
        res.cookie('user', JSON.stringify({ name: 'Guest' }), { httpOnly: true, secure: true });
    }
    next();
};

export default setDefaultUser;