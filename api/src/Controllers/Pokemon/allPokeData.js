const getPokemonsByApi = require('./getPokemonsByApi');
const getPokemonsDb = require('./getPokemonsDb');

let allPokeData = async () => {
	try {
		let pokeApi = await getPokemonsByApi(`https://pokeapi.co/api/v2/pokemon`);
		let pokeDb = await getPokemonsDb();

		let allPokes = pokeDb ? [...pokeApi, ...pokeDb] : pokeApi;

		return allPokes;
	} catch (error) {
		return { error: 'Error in allPokeData' };
	}
};

module.exports = allPokeData;
