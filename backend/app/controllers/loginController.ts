//import { validateLoginRequest } from '../utils/validator';
//import { getUser } from '../../db/queries/user';

//TODO: Implement login controller
// export const login = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { username, password } = req.body;
//         if (validateLoginRequest(username, password)) {
//             const user = await getUser(username, password);
//             if (user) {
//                 res.cookie('user', JSON.stringify(user), { httpOnly: true, secure: true });
//                 res.status(200).json({ status: 200, message: 'Login successful', user });
//             } else {
//                 res.status(401).json({ status: 401, message: 'Invalid credentials' });
//             }
//         } else {
//             res.status(400).json({ status: 400, message: 'Bad request' });
//         }
//     } catch (error) {
//         res.status(500).json({ status: 500, message: 'Internal server error' });
//     }
// };