const { Pokemon, Type } = require('../../db');

let getPokemonsDb = async () => {
	try {
		let pokeDb = await Pokemon.findAll({
			include: {
				model: Type,
				attributes: ['name', 'debility'],
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
				hp: pokemon.hp,
				attack: pokemon.attack,
				defense: pokemon.defense,
				special_attack: pokemon.special_attack,
				special_defense: pokemon.special_defense,
				speed: pokemon.speed,
				image: pokemon.image,
				types: pokemon.Types.map((type) => type.name),
				debility: pokemon.Types.reduce((acc, type) => {
					return acc.concat(
						type.debility.slice(1, type.debility.length - 1).split(','),
					);
				}, []),
				createdInDb: pokemon.createdInDb,
			};
		});
	} catch (error) {
		return { error: 'No pokemons availables on data base' };
	}
};

module.exports = getPokemonsDb;
