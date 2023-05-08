const { PokemonApi, Type } = require('../../db');
const kantoRegion = require('./Regions/kanto');
const johotoRegion = require('./Regions/johto');
const hoennRegion = require('./Regions/hoenn');
const sinnohRegion = require('./Regions/sinnoh');
const tesaliaRegion = require('./Regions/tesalia');
const kalosRegion = require('./Regions/kalos');
const alolaRegion = require('./Regions/alola');
const galarRegion = require('./Regions/galar');
const paldeaRegion = require('./Regions/paldea');

let getPokemonsByApi = async () => {
	try {
		let pokeApi = await PokemonApi.findAll({
			include: {
				model: Type,
				attributes: ['name', 'debility'],
				through: {
					types: [],
				},
			},
		});

		if (!pokeApi.length) {
			let kanto = await kantoRegion();
			let johto = await johotoRegion();
			let hoenn = await hoennRegion();
			let sinnoh = await sinnohRegion();
			let tesalia = await tesaliaRegion();
			let kalos = await kalosRegion();
			let alola = await alolaRegion();
			let galar = await galarRegion();
			let paldea = await paldeaRegion();

			pokeApi = [
				...kanto,
				...johto,
				...hoenn,
				...sinnoh,
				...tesalia,
				...kalos,
				...alola,
				...galar,
				...paldea,
			];
		}

		pokeApi = pokeApi.map((pokemon) => {
			return {
				id: pokemon.id,
				id2: pokemon.id2,
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

		return pokeApi;
	} catch (error) {
		return { error: 'Error when fetching pokemos from the api' };
	}
};

module.exports = getPokemonsByApi;
