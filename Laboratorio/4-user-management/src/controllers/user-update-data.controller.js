import UserModel from '#Schemas/user.schema.js';

const userUpdateDataController = async (req, res) => {

    const {
        id,
        body: { name, surname },
    } = req;

    const userByIdExists = await UserModel.findById(id).exec();

    if (!userByIdExists) return res.status(401).send('Usuario no autorizado');

    userByIdExists.name = name;
    userByIdExists.surname = surname;

    await userByIdExists.save();;

    return res.send({
        status: 'OK',
        data: { user: { name, surname, email: userByIdExists.email } },
    });
};

export default userUpdateDataController;
