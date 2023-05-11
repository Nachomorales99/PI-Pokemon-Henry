const { Pokemon, Type } = require('../../db');

let pokemonsById = async (id) => {
	try {
		let idDb = await Pokemon.findOne({
			where: { id: id },
			include: {
				model: Type,
				attributes: ['name', 'debility'],
				through: {
					types: [],
				},
			},
		});

		if (idDb) {
			return {
				id: idDb.id,
				name: idDb.name,
				height: idDb.height,
				weight: idDb.weight,
				abilities: idDb.abilities,
				hp: idDb.hp,
				attack: idDb.attack,
				defense: idDb.defense,
				special_attack: idDb.special_attack,
				special_defense: idDb.special_defense,
				speed: idDb.speed,
				image: idDb.image,
				region: idDb.region,
				types: idDb.Types.map((type) => type.name).reverse(),
				debility: idDb.Types.reduce((acc, type) => {
					return acc.concat(
						type.debility.slice(1, type.debility.length - 1).split(','),
					);
				}, []),
				createdInDb: idDb.createdInDb,
				region: idDb.region,
			};
		}
	} catch (error) {
		console.log(error);
		return { error: 'Pokemon not found' };
	}
};

module.exports = pokemonsById;
