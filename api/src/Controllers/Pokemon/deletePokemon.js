const { Pokemon } = require('../../db');

let deletePokemon = async (id) => {
	try {
		let pokemonToDelete = await Pokemon.findOne({ where: { id: id } });

		if (!pokemonToDelete) {
			throw new Error('Pokemon not found');
		}

		await pokemonToDelete.destroy();
		return `Pokemon ${pokemonToDelete.name} successfully removed`;
	} catch (error) {
		return 'Error deleting pokemon';
	}
};

module.exports = deletePokemon;
