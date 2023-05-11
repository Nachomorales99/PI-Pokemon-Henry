const { Pokemon, Type, Op } = require('../../db');

let pokemonsByName = async (name) => {
	try {
		let nameDb = await Pokemon.findOne({
			where: {
				name: { [Op.iLike]: `%${name}%` },
			},
			include: {
				model: Type,
				attributes: ['name', 'debility'],
				through: { types: [] },
			},
		});

		if (nameDb) {
			return {
				id: nameDb.id,
				name: nameDb.name,
				height: nameDb.height,
				weight: nameDb.weight,
				abilities: nameDb.abilities,
				hp: nameDb.hp,
				attack: nameDb.attack,
				defense: nameDb.defense,
				special_attack: nameDb.special_attack,
				special_defense: nameDb.special_defense,
				speed: nameDb.speed,
				image: nameDb.image,
				types: nameDb.Types.map((type) => type.name),
				debility: nameDb.Types.reduce((acc, type) => {
					return acc.concat(
						type.debility.slice(1, type.debility.length - 1).split(','),
					);
				}, []),
				createdInDb: nameDb.createdInDb,
				region: nameDb.region,
			};
		}
	} catch (error) {
		return { error: 'Pokemon not found' };
	}
};

module.exports = pokemonsByName;
