import UserModel from '#Schemas/user.schema.js';
import { compare } from 'bcrypt';

const userUpdateEmailController = async (req, res) => {

    const {
        id,
        body: { email: newEmail, password },
    } = req;

    const userByIdExists = await UserModel.findById(id).exec();

    if (!userByIdExists) return res.status(401).send('Usuario no autorizado');

    const checkPassword = await compare(password, userByIdExists.password);

    if (!checkPassword) return res.status(401).send('Credenciales Incorrectas'); 

    userByIdExists.email = newEmail;

    await userByIdExists.save();

    const { _id, name, surname, email } = userByIdExists;

    return res.send({
        status: 'OK',
        data: { user: { _id, name, surname, email } },
        message: 'Email del usuario actualizado',
    });
};

export default userUpdateEmailController;
