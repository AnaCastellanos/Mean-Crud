//Rutas de tareas: CRUD

const router = require('express').Router();

router.get('/task', (req,res, next) => {
	res.send('API here');
});

module.exports = router;