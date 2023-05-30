const expressLib = require('express');
const router = expressLib.Router();
const towns = require('../controllers/towns');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/', require('./swagger'));
router.get('/towns', towns.getTowns);
router.get('/towns/single', towns.getSingleTown);
router.post('/towns/insert', towns.insertTown);
router.put('/towns/update/:town_id', towns.updateTown);
router.delete('/towns/delete/:town_id', towns.deleteTown);

module.exports = router;