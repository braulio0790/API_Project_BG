const expressLib = require('express');
const router = expressLib.Router();
const towns = require('../controllers/towns');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const validation = require('../middleware/validate');
const validationPokemon = require('../middleware/validatepokemons');

router.use('/', require('./swagger'));
router.get('/towns', towns.getTowns);
router.get('/towns/single/:town_id', towns.getSingleTown);
router.post('/towns/insert',validation.saveTown, towns.insertTown);
router.post('/towns/insertpokemons',validationPokemon.savePokemons, towns.insertPokemons);
router.put('/towns/update/:town_id', validation.saveTown, towns.updateTown);
router.put('/towns/updatepokemons/:_id', validationPokemon.savePokemons, towns.updatePokemons);
router.delete('/towns/delete/:town_id', towns.deleteTown);
router.delete('/towns/delete/:area_id', towns.deletePokemons);

module.exports = router;