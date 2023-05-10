const { Pokemon, PokemonApi, Type } = require('../../db');
const axios = require('axios');

let pokemonsById = async (id, source) => {
	try {
		if (source === 'db') {
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
					id2: idDb.id2,
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
					region: idDb.region,
					types: idDb.Types.map((type) => type.name).reverse(),
					debility: idDb.Types.reduce((acc, type) => {
						return acc.concat(
							type.debility.slice(1, type.debility.length - 1).split(','),
						);
					}, []),
					createdInDb: idDb.createdInDb,
				};
			}
		} else {
			let idApi = await PokemonApi.findOne({
				where: { id: id },
				include: {
					model: Type,
					attributes: ['name', 'debility'],
					through: {
						types: [],
					},
				},
			});

			if (idApi) {
				return {
					name: idApi.name,
					id: idApi.id,
					id2: idApi.id,
					height: idApi.height,
					weight: idApi.weight,
					abilities: idApi.abilities,
					hp: idApi.hp,
					attack: idApi.attack,
					defense: idApi.defense,
					special_attack: idApi.special_attack,
					special_defense: idApi.special_defense,
					speed: idApi.speed,
					types: idApi.Types.map((type) => type.name).reverse(),
					image: idApi.image,
					region: idApi.region,
					debility: idApi.Types.reduce((acc, type) => {
						return acc.concat(
							type.debility.slice(1, type.debility.length - 1).split(','),
						);
					}, []),
					createdInDb: false,
				};
			}
		}
	} catch (error) {
		console.log(error);
		return { error: 'Pokemon not found' };
	}
};

module.exports = pokemonsById;
