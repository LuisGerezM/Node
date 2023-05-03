import { Type } from '@sinclair/typebox';

const idDTOSchema = Type.String({
    format: 'uuid',
    errorMessage: {
        type: 'El tipo de _id no es válido, debe ser un string',
        format: 'El formato de _id no es válido, debe ser un uuid4',
    },
});

const nameDTOSchema = Type.String({
    minLength: 2,
    maxLength: 20,
    errorMessage: {
        minLength: 'El nombre debe tener como minimo 2 caracteres',
        maxLength: 'El nombre debe tener como maximo 20 caracteres',
        type: 'El tipo de nombre no es válido, debe ser un string',
        format: 'El formato de nombre no es válido, debe ser un uuid4',
    },
});

const surnameDTOSchema = Type.String({
    minLength: 4,
    maxLength: 50,
    errorMessage: {
        minLength: 'El apellido debe tener como minimo 4 caracteres',
        maxLength: 'El apellido debe tener como maximo 50 caracteres',
        type: 'El tipo de apellido no es válido, debe ser un string',
        format: 'El formato de apellido no es válido, debe ser un uuid4',
    },
});

const emailDTOSchema = Type.String({
    format: 'email',
    errorMessage: {
        type: 'El tipo de email no es válido, debe ser un string',
        format: 'El formato de email no es válido, debe cumplir el rfc5322',
    },
});

const passwordDTOSchema = Type.String({
    format: 'password',
    minLength: 10,
    maxLength: 25,
    errorMessage: {
        type: 'El tipo de la contraseña no es válido, debe ser un string',
        format: 'El formato de la contraseña no es válido, debe contener al menos una minúscula, mayúscula y un número',
        minLength: 'La contraseña debe tener como minimo 10 caracteres',
        maxLength: 'La contraseña debe tener como maximo 25 caracteres',
    },
});

export {
    idDTOSchema,
    nameDTOSchema,
    surnameDTOSchema,
    emailDTOSchema,
    passwordDTOSchema,
};
