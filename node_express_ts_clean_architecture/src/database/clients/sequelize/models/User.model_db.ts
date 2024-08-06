type userModelDBType = {
	DataTypes: { [key: string]: any };
	db: { [key: string]: any };
};

export const userModelDB = ({
	DataTypes,
	db,
}: userModelDBType): { [key: string]: any } =>
	db.define(
		"User",
		{
			id_user: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			user_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			user_surname: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			user_email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			token: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			dni: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			professional_reg: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			phone: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			image_url: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			about_me: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			created: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			modified: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			active: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			DataTypes,
			tableName: "user",
			schema: "public",
			timestamps: false,
			indexes: [
				{
					name: "user_pkey",
					unique: true,
					fields: [{ name: "id_user" }],
				},
			],
		}
	);
