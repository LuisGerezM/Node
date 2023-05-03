import UserModel from '#Schemas/user.schema.js';
import { compare } from 'bcrypt';

const userDeleteController = async (req, res) => {

    const {
        id,
        body: { password },
    } = req;

    const userByIdExists = await UserModel.findById(id).exec();

    if (!userByIdExists) return res.status(401).send('Usuario no autorizado');

    const checkPassword = await compare(password, userByIdExists.password);

    if (!checkPassword) return res.status(401).send('Credenciales Incorrectas'); 

    await userByIdExists.delete();

    return res.send({
        status: 'OK',
        data: {},
        message: 'Usuario eliminado',
    });
};

export default userDeleteController;
