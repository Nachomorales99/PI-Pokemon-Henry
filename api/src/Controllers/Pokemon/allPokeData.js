const getPokemonsByApi = require('./getPokemonsByApi');
const getPokemonsDb = require('./getPokemonsDb');

let allPokeData = async () => {
	try {
		let pokeApi = await getPokemonsByApi();
		let pokeDb = await getPokemonsDb();

		let allPokes = pokeDb.length ? [...pokeApi, ...pokeDb] : pokeApi;

		return allPokes;
	} catch (error) {
		return { error: 'Error in allPokeData' };
	}
};

module.exports = allPokeData;
