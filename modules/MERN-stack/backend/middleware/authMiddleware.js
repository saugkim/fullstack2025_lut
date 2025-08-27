import jwt from 'jsonwebtoken'
import { User } from '../models/userModel.js'


export const protect = async (req, res, next) => {
    let token;

    if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer') ) {

        console.log('Console : authMiddleware - header has Bearer')
        try {
            //get token from header
            token = req.headers.authorization.split(' ')[1];
            
            //verify
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //get user from the token
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch(e) {
            console.log(e);
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    
    if (!token) {
        res.status(401)
        throw new Error('not authoirzed, no token');
    }
};
