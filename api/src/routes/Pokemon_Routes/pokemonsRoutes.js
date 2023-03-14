const { Router } = require('express');
const router = Router();

const allPokeData = require('../../Controllers/Pokemon/allPokeData');
const pokemonsByName = require('../../Controllers/Pokemon/pokemonsByName');
const pokemonsById = require('../../Controllers/Pokemon/pokemonsById');
const createPokemon = require('../../Controllers/Pokemon/createPokemon');

//allPokemons and getpokemonByName

router.get('/', async (req, res) => {
	let { name } = req.query;

	try {
		if (name) {
			let pokeName = await pokemonsByName(name.toLowerCase());

			if (pokeName.error) {
				throw new Error(pokeName.error);
			} else {
				res.status(200).json(pokeName);
			}
		} else {
			let allPokemons = await allPokeData();

			if (allPokemons.error) {
				throw new Error(allPokemons.error);
			} else {
				res.status(200).json(allPokemons);
			}
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

//pokemons by id

router.get('/:id', async (req, res) => {
	let { id } = req.params;

	try {
		let pokeId = await pokemonsById(Number(id));

		if (pokeId.error) throw new Error(pokeId.error);

		res.status(200).json(pokeId);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

//create pokemon

router.post('/', async (req, res) => {
	let {
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
	} = req.body;

	try {
		if (
			!name ||
			!id ||
			!hp ||
			!attack ||
			!defense ||
			!speed ||
			!height ||
			!weight ||
			!types ||
			!special_attack ||
			!special_defense ||
			!abilities
		) {
			throw new Error('Missing parameters');
		}

		let newPokemon = await createPokemon(
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
		);

		if (newPokemon.error) throw new Error(newPokemon.error);
		else res.status(200).send(newPokemon);
	} catch (error) {
		res.status(400).json({ erorr: error.message });
	}
});

module.exports = router;

// {"name": "NachoMon",
// 		"id": 1011,
// 		"attack":20,
// 		"hp":20,
// 		"defense":20,
// 		"speed":20,
// 		"height":20,
// 		"weight":20,
// 		"types":["fire", "water"],
// 		"special_attack":20,
// 		"special_defense":20,
// 		"abilities":["puño de acero"],
// 		"image": "https://phantom-marca.unidadeditorial.es/dc79468057f14692f59da4112e3019db/resize/990/f/webp/assets/multimedia/imagenes/2022/06/01/16540932703790.png"
// 	}
