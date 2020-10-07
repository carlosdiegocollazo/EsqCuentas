module.exports = function(app){

	const midd = require('../services/middleware.js');	
	const Cors = require('../services/cors.js');
	app.use(Cors.cors(Cors.corsOptions));

	//Devuelve JSON con colección de objetos "cotiza" activos.
	app.get('/cotizacion/all', midd.rutasProtegidas, async function(req, res){
		let cotiza 	= require ('../services/cotizacion.js');
		let response 	= await cotiza.obtenercotizacion();
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Devuelve JSON con colección de objetos "cotiza" activos.
	app.get('/cotizacion/allall', midd.rutasProtegidas, async function(req, res){
		let cotiza 	= require ('../services/cotizacion.js');
		let response 	= await cotiza.obtenercotizacionall();
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Devuelve JSON con objeto "cotiza" seleccionado por el valor de su campo Id.
	//si se encuentra activo.
	app.get('/cotizacion/:id', midd.rutasProtegidas, async function(req, res){
		let id 			= req.params.id;
		let cotiza 	= require('../services/cotizacion.js');
		let response 	= await cotiza.obtenercotizaPorId(id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})


	//Permite dar de alta a un nuevo registo cotiza.
	app.post('/cotizacion/new', midd.rutasProtegidas, async function(req, res){
		let cotiza = req.body;
		let cotizacion = require('../services/cotizacion.js');
		let response = await cotizacion.crearcotiza(cotiza);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Permite editar los valores de los atributos del artículo seleccionado
	// a partir del valor de su campo Id.
	app.put('/cotizacion/edit/:id', midd.rutasProtegidas, async function(req, res){
		let cotiza 	= req.body;
		let id 			= req.params.id;
		let cotizacion 	= require('../services/cotizacion.js');
		let response 	= await cotiza.actualizarcotiza(cotiza, id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Permite borrar de manera lógia al artículo identificado por el valor de su campo Id.
	//(pasa a inactivo).
	app.put('/cotizacion/delete/:id', midd.rutasProtegidas, async function(req, res){
		let id 			= req.params.id;
		let cotiza 	= require('../services/cotizacion.js');
		let response 	= await cotiza.eliminarcotiza(id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})
	
}