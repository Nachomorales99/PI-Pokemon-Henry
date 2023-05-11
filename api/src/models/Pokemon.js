const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

function pokemonModel(sequelize) {
	// defino el modelo
	sequelize.define(
		'Pokemon',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},

			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},

			image: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue:
					'https://res.cloudinary.com/nacho-morales/image/upload/v1679777574/Pokemon%20App/Default_img_fjt3qd.png',
			},

			hp: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			attack: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},

			defense: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},

			special_attack: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},

			special_defense: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},

			speed: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},

			height: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			weight: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			abilities: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: false,
			},
			createdInDb: {
				type: DataTypes.BOOLEAN,
				defaultValue: true,
			},
			region: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: 'database',
			},
		},
		{ timestamps: false },
	);
}

module.exports = pokemonModel;
