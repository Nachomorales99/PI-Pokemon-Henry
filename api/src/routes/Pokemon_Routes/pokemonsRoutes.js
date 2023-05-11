const { Router } = require('express');
const router = Router();

const allPokeData = require('../../Controllers/Pokemon/allPokeData');
const pokemonsByName = require('../../Controllers/Pokemon/pokemonsByName');
const pokemonsById = require('../../Controllers/Pokemon/pokemonsById');
const createPokemon = require('../../Controllers/Pokemon/createPokemon');
const deletePokemon = require('../../Controllers/Pokemon/deletePokemon');
const updatePokemon = require('../../Controllers/Pokemon/updatePokemon');

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
		let pokeId = await pokemonsById(id);

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

//delete pokemon
router.delete('/delete/:id', async (req, res) => {
	let { id } = req.params;

	try {
		let pokemonToDelete = await deletePokemon(id);

		if (pokemonToDelete.error) throw new Error(pokemonToDelete.error);

		res.status(200).json(pokemonToDelete);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

//update pokemon
router.put('/update', async (req, res) => {
	let {
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
	} = req.body;
	try {
		let pokemonUpdate = await updatePokemon(
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
		);

		if (pokemonUpdate.error) throw new Error(pokemonUpdate.error);

		res.status(200).json(pokemonUpdate);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
