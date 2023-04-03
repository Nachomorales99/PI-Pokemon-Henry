const { Pokemon, Type } = require('../../db');

let updatePokemon = async (
	id,
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
) => {
	try {
		let pokemonToUpdate = await Pokemon.findOne({ where: { id: id } });

		if (!pokemonToUpdate) throw new Error('Pokemon not found');

		await pokemonToUpdate.update({
			name: name,
			image: image
				? image
				: 'https://res.cloudinary.com/nacho-morales/image/upload/v1679777574/Pokemon%20App/Default_img_fjt3qd.png',
			hp: hp,
			attack: attack,
			defense: defense,
			speed: speed,
			height: height,
			weight: weight,
			special_attack: special_attack,
			special_defense: special_defense,
		});

		if (types) {
			await pokemonToUpdate.setTypes([]);
			let postTypes = await Type.findAll({ where: { name: types } });
			await pokemonToUpdate.addType(postTypes);
		}

		return 'Successfully updated pokemon';
	} catch (error) {
		return 'Error updating pokemon';
	}
};

module.exports = updatePokemon;
