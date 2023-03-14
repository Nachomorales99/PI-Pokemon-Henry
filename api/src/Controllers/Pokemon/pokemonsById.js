const { Pokemon, Type } = require('../../db');
const axios = require('axios');

let pokemonsById = async (id) => {
	try {
		let idDb = await Pokemon.findOne({
			where: { id: id },
			include: {
				model: Type,
				attributes: ['name', 'debility'],
				through: {
					types: [],
				},
			},
		});

		if (idDb) return idDb;

		let idApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

		if (idApi.data) {
			let pokemon = idApi.data;
			let pokeId = {
				name: pokemon.name,
				id: id,
				height: pokemon.height,
				weight: pokemon.weight,
				abilities: pokemon.abilities[0].ability.name,
				hp: pokemon.stats[0].base_stat,
				attack: pokemon.stats[1].base_stat,
				defense: pokemon.stats[2].base_stat,
				special_attack: pokemon.stats[3].base_stat,
				special_defense: pokemon.stats[4].base_stat,
				speed: pokemon.stats[5].base_stat,
				types: pokemon.types.map((el) => el.type.name),
				image: pokemon.sprites.other['official-artwork'].front_default,
			};

			return pokeId;
		}
	} catch (error) {
		return { error: 'Pokemon not found' };
	}
};

module.exports = pokemonsById;
