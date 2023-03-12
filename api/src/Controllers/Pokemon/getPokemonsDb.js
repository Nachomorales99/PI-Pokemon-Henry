const { Pokemon, Type } = require('../../db');

let getPokemonsDb = async () => {
	try {
		let pokeDb = await Pokemon.findAll({
			include: {
				model: Type,
				attributes: ['name'],
				through: {
					types: [],
				},
			},
		});

		return pokeDb.map((pokemon) => {
			return {
				id: pokemon.id,
				name: pokemon.name,
				height: pokemon.height,
				weight: pokemon.weight,
				abilities: pokemon.abilities,
				order: pokemon.order,
				hp: pokemon.hp,
				attack: pokemon.attack,
				defense: pokemon.defense,
				special_attack: pokemon.special_attack,
				special_defense: pokemon.special_defense,
				speed: pokemon.speed,
				image: pokemon.image,
				types: pokemon.types.map((type) => type.name),
				createdInDb: pokemon.createdInDb,
			};
		});
	} catch (error) {
		return { error: error.message };
	}
};

module.exports = getPokemonsDb;
