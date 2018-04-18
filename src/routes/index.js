//Manejo de rutas

const router = require('express').Router();

router.get('/', (req,res, next) => {
	res.end('Hola Mundo');
});

module.exports = router;