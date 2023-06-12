const expressLib = require('express');
const router = expressLib.Router();
const towns = require('../controllers/towns');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const validation = require('../middleware/validate');
const validationPokemon = require('../middleware/validatepokemons');
const { requiresAuth } = require('express-openid-connect');


router.use('/',requiresAuth(), require('./swagger'));
router.get('/towns', towns.getTowns);
router.get('/towns/single/:town_id', towns.getSingleTown);
router.post('/towns/insert', requiresAuth(), validation.saveTown, towns.insertTown);
router.post('/towns/insertpokemons', requiresAuth(),validationPokemon.savePokemons, towns.insertPokemons);
router.put('/towns/update/:town_id', requiresAuth(), validation.saveTown, towns.updateTown);
router.put('/towns/updatepokemons/:_id', requiresAuth(), validationPokemon.savePokemons, towns.updatePokemons);
router.delete('/towns/delete/:town_id', requiresAuth(),towns.deleteTown);
router.delete('/pokemons/delete/:_id', requiresAuth(),towns.deletePokemons);

module.exports = router;