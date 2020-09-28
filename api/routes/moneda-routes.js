module.exports = function(app){

	const midd = require('../services/middleware.js');	
	const Cors = require('../services/cors.js');
	app.use(Cors.cors(Cors.corsOptions));

	//Devuelve JSON con colección de objetos "moneda" activos.
	app.get('/monedas/all', midd.rutasProtegidas, async function(req, res){
		let moneda 	= require ('../services/monedas.js');
		let response 	= await moneda.obtenermonedas();
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Devuelve JSON con objeto "moneda" seleccionado por el valor de su campo Id.
	//si se encuentra activo.
	app.get('/monedas/:id', midd.rutasProtegidas, async function(req, res){
		let id 			= req.params.id;
		let moneda 	= require('../services/monedas.js');
		let response 	= await moneda.obtenermonedaPorId(id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})


	//Permite dar de alta a un nuevo registo moneda.
	app.post('/monedas/new', midd.rutasProtegidas, async function(req, res){
		let moneda = req.body;
		let monedas = require('../services/monedas.js');
		let response = await moneda.crearmoneda(moneda);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Permite editar los valores de los atributos del artículo seleccionado
	// a partir del valor de su campo Id.
	app.put('/monedas/edit/:id', midd.rutasProtegidas, async function(req, res){
		let moneda 	= req.body;
		let id 			= req.params.id;
		let monedas 	= require('../services/monedas.js');
		let response 	= await moneda.actualizarmoneda(moneda, id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Permite borrar de manera lógia al artículo identificado por el valor de su campo Id.
	//(pasa a inactivo).
	app.put('/monedas/delete/:id', midd.rutasProtegidas, async function(req, res){
		let id 			= req.params.id;
		let moneda 	= require('../services/monedas.js');
		let response 	= await moneda.eliminarmoneda(id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})
	
}