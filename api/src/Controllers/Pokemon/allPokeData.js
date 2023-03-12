const getPokemonsByApi = require('./getPokemonsByApi');
const getPokemonsDb = require('./getPokemonsDb');

let allPokeData = async () => {
	try {
		let pokeApi = await getPokemonsByApi(`https://pokeapi.co/api/v2/pokemon`);
		let pokeDb = await getPokemonsDb();

		let allPokes = [...pokeApi, ...pokeDb];

		return allPokes;
	} catch (error) {
		return { error: error.message };
	}
};

module.exports = allPokeData;
