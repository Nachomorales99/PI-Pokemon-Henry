const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

function typeModel(sequelize) {
	// defino el modelo
	sequelize.define(
		'Type',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},

			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},

			debility: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: 'No posee debilidades',
			},
		},
		{ timestamps: false },
	);
}

module.exports = typeModel;
