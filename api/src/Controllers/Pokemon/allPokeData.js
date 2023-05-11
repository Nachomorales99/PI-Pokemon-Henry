const { Pokemon, Type } = require('../../db');
const getPokemonsByApi = require('./getPokemonsByApi');

let allPokeData = async () => {
	try {
		let allPokes = await Pokemon.findAll({
			include: {
				model: Type,
				attributes: ['name', 'debility'],
				through: {
					types: [],
				},
			},
		});

		if (!allPokes.length) {
			allPokes = await getPokemonsByApi();
		}

		allPokes = allPokes.map((pokemon) => {
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
				region: pokemon.region,
				types: pokemon.Types.map((type) => type.name).reverse(),
				debility: pokemon.Types.reduce((acc, type) => {
					return acc.concat(
						type.debility.slice(1, type.debility.length - 1).split(','),
					);
				}, []),
				createdInDb: pokemon.createdInDb,
			};
		});

		return allPokes;
	} catch (error) {
		return { error: 'Error in allPokeData' };
	}
};

module.exports = allPokeData;
