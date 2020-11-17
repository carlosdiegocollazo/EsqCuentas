module.exports = function(app){

	const midd = require('../services/middleware.js');	
	const Cors = require('../services/cors.js');
	app.use(Cors.cors(Cors.corsOptions));

	
	//Devuelve JSON con colección de objetos "bancos" activos.
	app.get('/bancos/all', midd.rutasProtegidas, async function(req, res){
		let bancos 	= require ('../services/bancos.js');
		let response 	= await bancos.obtenerbancos();
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Devuelve JSON con colección de objetos "bancos" activos.
	app.get('/bancos/allall', midd.rutasProtegidas, async function(req, res){
		let bancos 	= require ('../services/bancos.js');
		let response 	= await bancos.obtenerbancosall();
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Devuelve JSON con objeto "bancos" seleccionado por el valor de su campo Id.
	//si se encuentra activo.
	app.get('/bancos/:id', midd.rutasProtegidas, async function(req, res){
		let id 			= req.params.id;
		let bancos 	= require('../services/bancos.js');
		let response 	= await bancos.obtenerbancosPorId(id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})


	//Permite dar de alta a un nuevo registo bancos.
	app.post('/bancos/new', midd.rutasProtegidas, async function(req, res){
		let banco = req.body;
		let bancos = require('../services/bancos.js');
		let response = await bancos.crearbancos(banco);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Permite editar los valores de los atributos del artículo seleccionado
	// a partir del valor de su campo Id.
	app.put('/bancos/edit/:id', midd.rutasProtegidas, async function(req, res){
		let banco 	= req.body;
		//console.log("docuemtno dentro del routes",banco)
		let id 			= req.params.id;
		//console.log("parametro de id que llega",id)
		let bancos 	= require('../services/bancos.js');
		let response 	= await bancos.actualizarbancos(banco, id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Permite borrar de manera lógia al artículo identificado por el valor de su campo Id.
	//(pasa a inactivo).
	app.put('/bancos/delete/:id', midd.rutasProtegidas, async function(req, res){
		let id 			= req.params.id;
		let bancos 	= require('../services/bancos.js');
		let response 	= await bancos.eliminarbancos(id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})
	
}