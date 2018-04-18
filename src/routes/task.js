//Rutas de tareas: API 
//Get: Devolver datos
//Post: El navegador envíar datos para almacenar
//Put: Editar/Actualizar datos
//Delete: Borrar

const router = require('express').Router();
const mongojs = require('mongojs');//Requerimos mongodb
const db = mongojs('mean-db', ['tasks']);//Nombre de la base de datos | en el caso de una nube, colocar la url donde se encuentra. Colección que utilizaremos

//API
router.get('/task', (req,res, next) => {
	db.tasks.find( (err, tasks) => { //Busca la base de datos.
		if(err) return next(err); // Envía a un manejador de errores.
		res.json(tasks); //Regresa el JSON con lo que hay en la db
	});
});

//Devuelve una única tarea | Busca por una única tarea
router.get('/task/:id', (req,res, next) => {
	db.tasks.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, task) => { //Busca por el parametro de la solicitud.
		if(err) return next(err); // Envía a un manejador de errores.
		res.json(task);
	});//API
});

//Guardar un dato
router.post('/tasks', (req, res, next) => {
	const task = req.body;
	if(!task.title || !(task.isDone + '') ) { //Valida si es correcta la petición.
		res.status(400).json({
			error: 'Datos incorrectos' 
		}); 
	}else {
		db.tasks.save(task, (err, task) => { //Guarda el dato ya validado y regresa un error o el mismo dato.
			if(err) return next(err);
			res.json(task);
		});
	}
});

//Eliminar datos
router.delete('/tasks/:id', (req, res, next) => {
	db.tasks.remove({ _id: mongojs.ObjectId(req.params.id) }, (err, task) => {
		if(err) return next(err);
		res.json(task);
 	});

});


//Actualiza datos
router.put('/tasks/:id', (req, res, next) => {
	const task = req.body //task contiene el body del request (los datos del navegador)
	const updateTask = {}; //Creamos un objeto vacío
	
	//Validamos y llenamos un objeto con los datos obtenidos del navegador
	if(task.isDone) { //Si existe esta propiedad
		updateTask.isDone = task.isDone; //Guarda el resultado de la propiedad en un objeto nuevo.
	}

	if(task.title) {
		updateTask.title = task.title;
	}

	if(!updateTask) { //Si no esta validado la información del navegador
		res.status(400).json({
			error: 'Requerimiento equivocado'
		})
	}else { //Si ya valido el objeto, guardalo.
		db.tasks.update({ _id: mongojs.ObjectId(req.params.id)}, (err, task) => {
			if(err) return next(err);
			res.json(task);
		});
	}

	
});


module.exports = router;





