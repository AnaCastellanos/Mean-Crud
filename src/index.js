//Código del servidor
const cors = require('cors');
const express = require('express');
const app = express();
const indexRoutes = require('./routes/index'); //Importa routes
const taskRoutes = require('./routes/task');

//Settings
app.set('port', process.env.PORT || 3000); //Si hay un puerto definido en el SO usalo o usa el 3000
app.engine('html', require('ejs').renderFile ); //Renderización por pantalla con ejs. RenderFile renderiza a html.
app.set('view engine', 'ejs');//Motor de plantillas: Sirve para mostrar html desde el servidor

//Middlewares: Son funciones que se ejecutan antes de recibir la información desde el navegador.
app.use(cors()); 
app.use(express.json()); //Permite recibir json en el servidor
app.use(express.urlencoded({extended:false})); //Permite recibir datos a través de la url.

//Routes
app.use(indexRoutes); 
app.use('/api', taskRoutes); //Renombramos la ruta

app.listen(app.get('port'), () => {
	console.log('Server on port', app.get('port'));
}); //Utiliza el puerto definido antes