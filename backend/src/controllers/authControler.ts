import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const login = async (req: Request, res: Response ) => {
    try {
        console.log(req.body);
        
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ message: 'Usuario no encontrado' });
            return
            
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: 'Contraseña incorrecta' });
            return 
            
        }
        const payload = {user: {id: user.id, email: user.email}};
        const token = jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn: '1h'});

        res.status(200).json({ token});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al loguear el usuario' });

    }
};