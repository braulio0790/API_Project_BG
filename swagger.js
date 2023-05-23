const swaggerAutogen = require('swagger-autogen')();
//const swaggerUi = require('swagger-ui');

const doc = {
  info: {
    title: 'Pokemon API Project BG',
    description: 'An API that will provide information of the first generation of pokemon in gameboy',
  },
  host: 'pokemon-api-tztm.onrender.com',
  schemes: ['https'],
};
//This file contains what is going to be shown in certain parts of the UI swagger testing page
const outputFile = './swagger.json';
//This file is requesting the main js file to show the general routes. probably is used by the swagger libray too.
const endpointsFiles = ['./routes/routes.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);