import { Router } from 'express';
import userJWTDTO from '#Dto/user-jwt.dto.js';
import userLoginDTO from '#Dto/user-login.dto.js';
import userRegisterDTO from '#Dto/user-register.dto.js';
import userDeleteDTO from '#Dto/user-delete.dto.js';
import userUpdateDataDTO from '#Dto/user-update-data.dto.js';
import userUpdateEmailDTO from '#Dto/user-update-email.dto.js';
import userUpdatePasswordDTO from '#Dto/user-update-password.dto.js';
import userLoginController from '#Controllers/user-login.controller.js';
import userRegisterController from '#Controllers/user-register.controller.js';
import userProfileController from '#Controllers/user-profile.controller.js';
import userUpdateDataController from '#Controllers/user-update-data.controller.js';
import userUpdateEmailController from '#Controllers/user-update-email.controller.js';
import userUpdatePasswordController from '#Controllers/user-update-password.controller.js';
import userDeleteController from '#Controllers/user-delete.controller.js';

const userRouter = Router();

userRouter.get('/profile', userJWTDTO, userProfileController);

userRouter.post('/register', userRegisterDTO, userRegisterController); 

userRouter.post('/login', userLoginDTO, userLoginController);

userRouter.patch(
    '/update-data',
    userJWTDTO,
    userUpdateDataDTO,
    userUpdateDataController
);

userRouter.patch(
    '/update-email',
    userJWTDTO,
    userUpdateEmailDTO,
    userUpdateEmailController
);

userRouter.patch(
    '/update-password',
    userJWTDTO,
    userUpdatePasswordDTO,
    userUpdatePasswordController
);

userRouter.delete('/delete', userJWTDTO, userDeleteDTO, userDeleteController);

export default userRouter;
