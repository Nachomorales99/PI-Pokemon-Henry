const axios = require('axios');
const { Pokemon } = require('../../db');

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
			pokemon.abilities = url.data.abilities[0].ability.name;
			pokemon.order = url.data.order;
			pokemon.hp = url.data.stats[0].base_stat;
			pokemon.attack = url.data.stats[1].base_stat;
			pokemon.defense = url.data.stats[2].base_stat;
			pokemon.special_attack = url.data.stats[3].base_stat;
			pokemon.special_defense = url.data.stats[4].base_stat;
			pokemon.speed = url.data.stats[5].base_stat;
			pokemon.types = url.data.types.map((el) => el.type.name);

			pokemon.image = url.data.sprites.other['official-artwork'].front_default;
		}

		await Pokemon.bulkCreate(allPokemons);

		return allPokemons;
	} catch (error) {
		return { error: error.message };
	}
};

module.exports = getPokemonsByApi;
