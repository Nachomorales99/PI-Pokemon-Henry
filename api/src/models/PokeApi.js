const { DataTypes } = require('sequelize');

function pokemonApiModel(sequelize) {
	sequelize.define(
		'PokemonApi',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},

			id2: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},

			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
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
			abilities: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: false,
			},
			createdInDb: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			region: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{ timestamps: false },
	);
}

module.exports = pokemonApiModel;
