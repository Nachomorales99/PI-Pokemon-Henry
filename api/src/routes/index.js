const { Router } = require('express');
const pokemonsRoutes = require('./Pokemon_Routes/pokemonsRoutes');
const typesRoutes = require('./Types_Routes/typesRoutes');
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', pokemonsRoutes);
router.use('/types', typesRoutes);
module.exports = router;
