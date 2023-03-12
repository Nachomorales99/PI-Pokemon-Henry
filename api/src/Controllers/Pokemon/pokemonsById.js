const { Pokemon, Type } = require('../../db');

let pokemonsById = async (id) => {
	try {
		return await Pokemon.findByPk(id, {
			include: {
				model: Type,
			},
		});
	} catch (error) {
		return { error: error.message };
	}
};

module.exports = pokemonsById;
