module.exports = function(app){

	const midd = require('../services/middleware.js');	
	const Cors = require('../services/cors.js');
	app.use(Cors.cors(Cors.corsOptions));

	//Devuelve JSON con colección de objetos "cheques" activos.
	app.get('/cheques/all', midd.rutasProtegidas, async function(req, res){
		let cheques 	= require ('../services/cheques.js');
		let response 	= await cheques.obtenercheques();
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Devuelve JSON con colección de objetos "cheques" activos.
	app.get('/cheques/allall', midd.rutasProtegidas, async function(req, res){
		let cheques 	= require ('../services/cheques.js');
		let response 	= await cheques.obtenerchequesall();
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Devuelve JSON con objeto "cheques" seleccionado por el valor de su campo Id.
	//si se encuentra activo.
	app.get('/cheques/:id', midd.rutasProtegidas, async function(req, res){
		let id 			= req.params.id;
		let cheques 	= require('../services/cheques.js');
		let response 	= await cheques.obtenerchequesPorId(id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})


	//Permite dar de alta a un nuevo registo cheques.
	app.post('/cheques/new', midd.rutasProtegidas, async function(req, res){
		let cheque = req.body;
		let cheques = require('../services/cheques.js');
		let response = await cheques.crearcheque(cheque);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Permite editar los valores de los atributos del artículo seleccionado
	// a partir del valor de su campo Id.
	app.put('/cheques/edit/:id', midd.rutasProtegidas, async function(req, res){
		let cheque 	= req.body;
		let id 			= req.params.id;
		let cheques 	= require('../services/cheques.js');
		let response 	= await cheques.actualizarcheque(cheque, id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Permite borrar de manera lógia al artículo identificado por el valor de su campo Id.
	//(pasa a inactivo).
	app.put('/cheques/delete/:id', midd.rutasProtegidas, async function(req, res){
		let id 			= req.params.id;
		let cheques 	= require('../services/cheques.js');
		let response 	= await cheques.eliminarcheques(id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})
	
}