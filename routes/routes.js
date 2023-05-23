const expressLib = require('express');
const router = expressLib.Router();
const towns = require('../controllers/towns');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/', require('./swagger'));
router.get('/towns', towns.getTowns);
router.post('/towns', towns.updateTown);

module.exports = router;