import UserModel from '#Schemas/user.schema.js';
import { compare } from 'bcrypt';
import { SignJWT } from 'jose';

const userLoginController = async (req, res) => {
    const { email, password } = req.body;

    const userByEmailExists = await UserModel.findOne({ email }).exec();

    if (!userByEmailExists)
        return res.status(401).send('Credenciales Incorrectas');
    const checkPassword = await compare(password, userByEmailExists.password);

    if (!checkPassword) return res.status(401).send('Credenciales Incorrectas'); 
    const jwtContructor = new SignJWT({ id: userByEmailExists._id });

    const encoder = new TextEncoder();
    
    const jwt = await jwtContructor
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

    const { _id, name, surname, email: emailToResponse } = userByEmailExists;

    return res.send({
        status: 'OK',
        data: { user: { _id, name, surname, email: emailToResponse }, jwt },
    });
};

export default userLoginController;
