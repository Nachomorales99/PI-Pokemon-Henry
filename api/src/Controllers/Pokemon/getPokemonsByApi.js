const { Pokemon, Type } = require('../../db');
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
		let pokeApi = await Pokemon.findAll({
			include: {
				model: Type,
				attributes: ['name', 'debility'],
				through: {
					types: [],
				},
			},
		});

		if (!pokeApi.length) {
			Promise.all([
				kantoRegion(),
				johotoRegion(),
				hoennRegion(),
				sinnohRegion(),
				tesaliaRegion(),
				kalosRegion(),
				alolaRegion(),
				galarRegion(),
				paldeaRegion(),
			]);
		}

		pokeApi = await Pokemon.findAll({
			include: {
				model: Type,
				attributes: ['name', 'debility'],
				through: {
					types: [],
				},
			},
		});

		return pokeApi;
	} catch (error) {
		return { error: 'Error when fetching pokemos from the api' };
	}
};

module.exports = getPokemonsByApi;
