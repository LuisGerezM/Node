import { useAuthStore, useForm } from '@/hooks';
import { useEffect } from 'react';

import './LoginPage.css';

import { userFeedbackMsg } from '@/helpers/userFeedbackMsg';

const loginFormFields = {
	loginEmail: '',
	loginPassword: '',
};

const registerFormFields = {
	registerName: '',
	registerEmail: '',
	registerPassword: '',
	registerRepeatPassword: '',
};

export const LoginPage = () => {
	const { errorMessage, startLogin, startRegister } = useAuthStore();

	const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);
	const {
		registerName,
		registerEmail,
		registerPassword,
		registerRepeatPassword,
		onInputChange: onRegisterInputChange,
	} = useForm(registerFormFields);

	useEffect(() => {
		if (errorMessage !== undefined) {
			userFeedbackMsg({
				title: 'Error en la autenticación',
				subTitle: errorMessage,
				icon: 'error',
			});
		}
	}, [errorMessage]);

	const loginSubmit = event => {
		event.preventDefault();
		startLogin({ email: loginEmail, password: loginPassword });
	};

	const registerSubmit = event => {
		event.preventDefault();

		if (registerPassword !== registerRepeatPassword) {
			userFeedbackMsg({
				title: 'Error en el registro',
				subTitle: 'Constraseñas no son iguales',
				icon: 'error',
			});
			return;
		}

		startRegister({ name: registerName, email: registerEmail, password: registerPassword });
	};

	return (
		<div className='container login-container'>
			<div className='row'>
				<div className='col-md-6 login-form-1'>
					<h3>Ingreso</h3>
					<form onSubmit={loginSubmit}>
						<div className='form-group mb-2'>
							<input
								type='text'
								className='form-control'
								placeholder='Correo'
								name='loginEmail'
								value={loginEmail}
								onChange={onLoginInputChange}
							/>
						</div>
						<div className='form-group mb-3'>
							<input
								type='password'
								className='form-control'
								placeholder='Contraseña'
								name='loginPassword'
								value={loginPassword}
								onChange={onLoginInputChange}
							/>
						</div>
						<div className='form-group mb-2 d-flex justify-content-center'>
							<input type='submit' className='btnSubmit' value='Login' />
						</div>
					</form>
				</div>

				<div className='col-md-6 login-form-2'>
					<h3>Registro</h3>
					<form onSubmit={registerSubmit}>
						<div className='form-group mb-2'>
							<input
								type='text'
								className='form-control'
								placeholder='Nombre'
								name='registerName'
								value={registerName}
								onChange={onRegisterInputChange}
							/>
						</div>
						<div className='form-group mb-2'>
							<input
								type='email'
								className='form-control'
								placeholder='Correo'
								name='registerEmail'
								value={registerEmail}
								onChange={onRegisterInputChange}
							/>
						</div>
						<div className='form-group mb-2'>
							<input
								type='password'
								className='form-control'
								placeholder='Contraseña'
								name='registerPassword'
								value={registerPassword}
								onChange={onRegisterInputChange}
							/>
						</div>

						<div className='form-group mb-3'>
							<input
								type='password'
								className='form-control'
								placeholder='Repita la contraseña'
								name='registerRepeatPassword'
								value={registerRepeatPassword}
								onChange={onRegisterInputChange}
							/>
						</div>

						<div className='form-group mb-2 d-flex justify-content-center'>
							<input type='submit' className='btnSubmit' value='Crear cuenta' />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
