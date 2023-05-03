import { SALT } from '#Constants/salt.js';
import UserModel from '#Schemas/user.schema.js';
import { compare, hash } from 'bcrypt';

const userUpdatePasswordController = async (req, res) => {
    const {
        id,
        body: { oldPassword, newPassword },
    } = req;

    const userByIdExists = await UserModel.findById(id).exec();

    if (!userByIdExists) return res.status(401).send('Usuario no autorizado');

    const checkPassword = await compare(oldPassword, userByIdExists.password);

    if (!checkPassword) return res.status(401).send('Credenciales Incorrectas'); 

    const hashedPassword = await hash(newPassword, SALT);

    userByIdExists.password = hashedPassword;

    await userByIdExists.save();

    return res.send({
        status: 'OK',
        data: {},
        message: 'Contraseña del usuario actualizada',
    });
};

export default userUpdatePasswordController;
