const { Pokemon, Type } = require('../../db');

let createPokemon = async (
	name,
	id,
	image,
	hp,
	attack,
	defense,
	speed,
	height,
	weight,
	types,
	special_attack,
	special_defense,
	abilities,
) => {
	try {
		let findedPoke = await Pokemon.findOne({ where: { name: name } });
		if (findedPoke) {
			throw new Error('The name is used');
		}

		let newPokemon = await Pokemon.create({
			id: id,
			name: name,
			hp: hp,
			attack: attack,
			defense: defense,
			height: height,
			weight: weight,
			special_attack: special_attack,
			special_defense: special_defense,
			speed: speed,
			image: image ? image : 'https://images3.alphacoders.com/677/677583.png',
			abilities: abilities,
		});

		let postTypes = await Type.findAll({ where: { name: types } });
		await newPokemon.addType(postTypes);

		return 'Successfully created pokemon';
	} catch (error) {
		return 'Error creating pokemon';
	}
};

module.exports = createPokemon;
