const validator = require('../helpers/validate');

const savePokemons = (req, res, next) => {
  const validationRule = {
    area_id: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  savePokemons
};
