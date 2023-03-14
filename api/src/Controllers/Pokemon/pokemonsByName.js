const { Pokemon, Type, Op } = require('../../db');
const axios = require('axios');

let pokemonsByName = async (name) => {
	try {
		let nameDb = await Pokemon.findOne({
			where: {
				name: { [Op.iLike]: `%${name}%` },
			},
			include: {
				model: Type,
				attributes: ['name', 'debility'],
				through: { types: [] },
			},
		});

		if (nameDb) return nameDb;

		let nameApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

		if (nameApi.data) {
			let pokemon = nameApi.data;
			let pokeName = {
				name: name,
				id: pokemon.id,
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

			return pokeName;
		}
	} catch (error) {
		return { error: 'Pokemon not found' };
	}
};

module.exports = pokemonsByName;
