
import { SALT } from '#Constants/salt.js';
import UserModel from '#Schemas/user.schema.js';
import { hash } from 'bcrypt';

const userRegisterController = async (req, res) => {
    const { _id, name, surname, email, password } = req.body;

    const userByIdExists = await UserModel.findById(_id).exec();
    if (userByIdExists)
        return res.status(409).send('Ya existe un usuario con este id'); 

    const userByEmailExists = await UserModel.findOne({ email }).exec();
    if (userByEmailExists)
        return res.status(409).send('Ya existe un usuario con este email'); 

    const hashedPassword = await hash(password, SALT); 
    const user = new UserModel({
        _id,
        name,
        surname,
        email,
        password: hashedPassword,
    });

    await user.save();

    return res.status(201).send('Usuario registrado');
};

export default userRegisterController;
