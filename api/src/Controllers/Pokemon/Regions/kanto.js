const { PokemonApi, Type } = require('../../../db');
const axios = require('axios');

let getPokemonsOfKanto = async () => {
	let kanto = await axios.get(
		'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151',
	);

	let allPokemonOfKanto = kanto.data.results;

	for (let pokemon of allPokemonOfKanto) {
		let url = await axios.get(pokemon.url);

		let poke = await PokemonApi.create({
			id: url.data.id,
			id2: url.data.id,
			name: pokemon.name,
			image: url.data.sprites.other['official-artwork'].front_default,
			hp: url.data.stats[0].base_stat,
			attack: url.data.stats[1].base_stat,
			defense: url.data.stats[2].base_stat,
			special_attack: url.data.stats[3].base_stat,
			special_defense: url.data.stats[4].base_stat,
			speed: url.data.stats[5].base_stat,
			height: url.data.height,
			weight: url.data.weight,
			abilities: url.data.abilities.map((abl) => abl.ability.name),
			createdInDb: false,
			region: 'kanto',
		});

		let pokeTypes = await Type.findAll({
			where: { name: url.data.types.map((el) => el.type.name) },
		});

		await poke.addType(pokeTypes);
	}
};

module.exports = getPokemonsOfKanto;
