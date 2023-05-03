import UserModel from '#Schemas/user.schema.js';

const userProfileController = async (req, res) => {

    const { id } = req;

    const userByIdExists = await UserModel.findById(id).exec();

    if (!userByIdExists) return res.status(401).send('Usuario no autorizado');

    const { _id, name, surname, email } = userByIdExists;

    return res.send({
        status: 'OK',
        data: { user: { _id, name, surname, email } },
    });
};

export default userProfileController;
