import { logger } from "@/config";

export type userEntityType = {
	id_user: number;
	user_name: string;
	user_surname: string;
	user_email: string;
	dni: string;
	professional_reg: string;
	phone: string;
	image_url: string;
	about_me: string;
	active: number;
	token: string;
};

export class UserEntity {
	private static location = "UserEntity";

	private id_user: number;
	private user_name: string;
	private user_surname: string;
	private user_email: string;
	private dni: string;
	private professional_reg: string;
	private phone: string;
	private image_url: string;
	private about_me: string;
	private active: number;
	private token: string;

	constructor({
		id_user,
		user_name,
		user_surname,
		user_email,
		dni,
		professional_reg,
		phone,
		image_url,
		about_me,
		active,
		token,
	}: userEntityType) {
		this.id_user = id_user;
		this.user_name = user_name;
		this.user_surname = user_surname;
		this.user_email = user_email;
		this.dni = dni;
		this.professional_reg = professional_reg;
		this.phone = phone;
		this.image_url = image_url;
		this.about_me = about_me;
		this.active = active;
		this.token = token;
	}

	public static fromObject(object: { [key: string]: any }): UserEntity {
		logger.info(`${this.location} fromObject init`);

		const {
			id_user,
			user_name,
			user_surname,
			user_email,
			dni,
			professional_reg,
			phone,
			image_url,
			about_me,
			active,
			token,
		} = object;

		return new UserEntity({
			id_user,
			user_name,
			user_surname,
			user_email,
			dni,
			professional_reg,
			phone,
			image_url,
			about_me,
			active,
			token,
		});
	}
}
