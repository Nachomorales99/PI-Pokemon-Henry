const { Type } = require('../../db');
const axios = require('axios');

let pokemonsType = async () => {
	try {
		let types = await Type.findAll({ attributes: ['id', 'name', 'debility'] });

		if (!types.length) {
			let getTypes = await axios.get('https://pokeapi.co/api/v2/type');

			types = getTypes.data.results;

			for (let type of types) {
				let url = await axios.get(type.url);

				delete type.url;

				type.id = url.data.id;

				if (url.data.damage_relations.double_damage_from.length !== 0) {
					type.debility = url.data.damage_relations.double_damage_from.map(
						(el) => el.name,
					);
				}
			}

			await Type.bulkCreate(types);
		}

		return types;
	} catch (error) {
		return { error: 'No types available on Data Base' };
	}
};

module.exports = pokemonsType;
