const { Router } = require('express');
const router = Router();
const pokemonsTypes = require('../../Controllers/Type/pokemonsType');

router.get('/', async (req, res) => {
	try {
		let allTypes = await pokemonsTypes();
		if (allTypes.error) throw new Error(allTypes.error);

		res.status(200).json(allTypes);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
