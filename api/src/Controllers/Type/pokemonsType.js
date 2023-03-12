const { Type } = require('../../db');
const axios = require('axios');

let pokemonsType = async () => {
	try {
		let getTypes = await axios.get('https://pokeapi.co/api/v2/type');

		let allTypes = getTypes.data.results;

		for (let type of allTypes) {
			let url = await axios.get(type.url);

			delete type.url;

			if (url.data.damage_relations.double_damage_from.length !== 0) {
				type.debility = url.data.damage_relations.double_damage_from.map(
					(el) => el.name,
				);
			}
		}

		await Type.bulkCreate(allTypes);

		return allTypes;
	} catch (error) {
		return { error: error.message };
	}
};

module.exports = pokemonsType;
