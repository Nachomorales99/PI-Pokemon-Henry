const { Pokemon, Type } = require('../../db');

let createPokemon = async (
	id2,
	name,
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
	console.log(types);
	try {
		let findedPoke = await Pokemon.findOne({ where: { name: name } });
		if (findedPoke) {
			throw new Error('The name is used');
		}

		let newPokemon = await Pokemon.create({
			id2: id2,
			name: name,
			hp: hp,
			attack: attack,
			defense: defense,
			height: height,
			weight: weight,
			special_attack: special_attack,
			special_defense: special_defense,
			speed: speed,
			image: image
				? image
				: 'https://res.cloudinary.com/nacho-morales/image/upload/v1679777574/Pokemon%20App/Default_img_fjt3qd.png',
			abilities: abilities,
			region: 'database',
		});

		let postTypes = await Type.findAll({ where: { name: types } });
		await newPokemon.addType(postTypes);

		return 'Successfully created pokemon';
	} catch (error) {
		console.log(error);
		throw new Error('Error creating pokemon');
	}
};

module.exports = createPokemon;
