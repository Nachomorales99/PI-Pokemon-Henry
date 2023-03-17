const { Pokemon, Type } = require('../../db');
const axios = require('axios');

let pokemonsById = async (id) => {
	try {
		if (typeof id !== 'number') {
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

			if (idDb) {
				return {
					id: idDb.id,
					name: idDb.name,
					height: idDb.height,
					weight: idDb.weight,
					abilities: idDb.abilities,
					hp: idDb.hp,
					attack: idDb.attack,
					defense: idDb.defense,
					special_attack: idDb.special_attack,
					special_defense: idDb.special_defense,
					speed: idDb.speed,
					image: idDb.image,
					types: idDb.Types.map((type) => type.name),
					debility: idDb.Types.reduce((acc, type) => {
						return acc.concat(
							type.debility.slice(1, type.debility.length - 1).split(','),
						);
					}, []),
					createdInDb: idDb.createdInDb,
				};
			}
		} else {
			let idApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

			if (idApi.data) {
				let pokemon = idApi.data;
				let pokeId = {
					name: pokemon.name,
					id: id,
					height: pokemon.height,
					weight: pokemon.weight,
					abilities: pokemon.abilities.map((abl) => abl.ability.name),
					hp: pokemon.stats[0].base_stat,
					attack: pokemon.stats[1].base_stat,
					defense: pokemon.stats[2].base_stat,
					special_attack: pokemon.stats[3].base_stat,
					special_defense: pokemon.stats[4].base_stat,
					speed: pokemon.stats[5].base_stat,
					types: pokemon.types.map((el) => el.type.name),
					image: pokemon.sprites.other['official-artwork'].front_default,

					debility: await Promise.all(
						pokemon.types.map(async (el) => {
							let r = await axios.get(el.type.url);

							delete el.type.url;
							delete el.type.name;

							if (r.data.damage_relations.double_damage_from.length !== 0) {
								return r.data.damage_relations.double_damage_from.map(
									(el) => el.name,
								);
							} else {
								return ['No posee debilidades'];
							}
						}),
					).then((allArrays) =>
						allArrays
							.flatMap((array) => array)
							.reduce(
								(acc, value) => (acc.includes(value) ? acc : [...acc, value]),
								[],
							),
					),
					createdInDb: false,
				};

				return pokeId;
			}
		}
	} catch (error) {
		return { error: 'Pokemon not found' };
	}
};

module.exports = pokemonsById;
