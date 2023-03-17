const axios = require('axios');
const { Type } = require('../../db');

let getPokemonsByApi = async (url = `https://pokeapi.co/api/v2/pokemon`) => {
	try {
		let resultApi = await axios.get(url);

		let nextApi = await axios.get(resultApi.data.next);

		let allPokemons = [...resultApi.data.results, ...nextApi.data.results];

		for (let pokemon of allPokemons) {
			let url = await axios.get(pokemon.url); //we access the url with the data of each pokemon
			delete pokemon.url;

			pokemon.id = url.data.id;
			pokemon.height = url.data.height;
			pokemon.weight = url.data.weight;
			pokemon.abilities = url.data.abilities.map((abl) => abl.ability.name);
			pokemon.hp = url.data.stats[0].base_stat;
			pokemon.attack = url.data.stats[1].base_stat;
			pokemon.defense = url.data.stats[2].base_stat;
			pokemon.special_attack = url.data.stats[3].base_stat;
			pokemon.special_defense = url.data.stats[4].base_stat;
			pokemon.speed = url.data.stats[5].base_stat;
			pokemon.types = url.data.types.map((el) => el.type.name);
			pokemon.image = url.data.sprites.other['official-artwork'].front_default;
			pokemon.debility = await Promise.all(
				url.data.types.map(async (el) => {
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
			);
			pokemon.createdInDb = false;
		}

		return allPokemons;
	} catch (error) {
		return { error: 'Error when fetching pokemos from the api' };
	}
};

module.exports = getPokemonsByApi;
