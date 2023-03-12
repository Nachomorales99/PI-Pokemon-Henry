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
				allowNull: false,
			},

			pk: {
				type: DataTypes.UUID,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},

			order: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},

			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},

			image: {
				type: DataTypes.STRING,
				allowNull: false,
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

			types: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			createdInDb: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
		},
		{ timestamps: false },
	);
}

module.exports = pokemonModel;
