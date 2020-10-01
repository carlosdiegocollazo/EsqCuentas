module.exports = function(app){

	const midd = require('../services/middleware.js');	
	const Cors = require('../services/cors.js');
	app.use(Cors.cors(Cors.corsOptions));

	//Devuelve JSON con colección de objetos "seguridad" activos.
	app.get('/seguridad/all', midd.rutasProtegidas, async function(req, res){
		let seguridad 	= require ('../services/seguridad.js');
		let response 	= await seguridad.obtenerseguridad();
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Devuelve JSON con objeto "seguridad" seleccionado por el valor de su campo Id.
	//si se encuentra activo.
	app.get('/seguridad/:id', midd.rutasProtegidas, async function(req, res){
		let id 			= req.params.id;
		let seguridad 	= require('../services/seguridad.js');
		let response 	= await seguridad.obtenerseguridadPorId(id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})


	//Permite dar de alta a un nuevo registo seguridad.
	app.post('/seguridad/new', midd.rutasProtegidas, async function(req, res){
		let segurida = req.body;
		let seguridad = require('../services/seguridad.js');
		let response = await seguridad.crearseguridad(seguridad);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Permite editar los valores de los atributos del artículo seleccionado
	// a partir del valor de su campo Id.
	app.put('/seguridad/edit/:id', midd.rutasProtegidas, async function(req, res){
		let segurida 	= req.body;
		let id 			= req.params.id;
		let seguridad 	= require('../services/seguridad.js');
		let response 	= await seguridad.actualizarseguridad(seguridad, id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Permite borrar de manera lógia al artículo identificado por el valor de su campo Id.
	//(pasa a inactivo).
	app.put('/seguridad/delete/:id', midd.rutasProtegidas, async function(req, res){
		let id 			= req.params.id;
		let seguridad 	= require('../services/seguridad.js');
		let response 	= await seguridad.eliminarseguridad(id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})
	
}