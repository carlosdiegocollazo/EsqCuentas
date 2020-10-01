module.exports = function(app){

	const midd = require('../services/middleware.js');	
	const Cors = require('../services/cors.js');
	app.use(Cors.cors(Cors.corsOptions));

	//Devuelve JSON con colección de objetos "documentos" activos.
	app.get('/documentos/all', midd.rutasProtegidas, async function(req, res){
		let documentos 	= require ('../services/documentos.js');
		let response 	= await documentos.obtenerdocumentos();
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Devuelve JSON con objeto "documentos" seleccionado por el valor de su campo Id.
	//si se encuentra activo.
	app.get('/documentos/:id', midd.rutasProtegidas, async function(req, res){
		let id 			= req.params.id;
		let documentos 	= require('../services/documentos.js');
		let response 	= await documentos.obtenerdocumentosPorId(id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})


	//Permite dar de alta a un nuevo registo documentos.
	app.post('/documentos/new', midd.rutasProtegidas, async function(req, res){
		let documento = req.body;
		let documentos = require('../services/documentos.js');
		let response = await documentos.creardocumentos(documentos);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Permite editar los valores de los atributos del artículo seleccionado
	// a partir del valor de su campo Id.
	app.put('/documentos/edit/:id', midd.rutasProtegidas, async function(req, res){
		let documento 	= req.body;
		let id 			= req.params.id;
		let documentos 	= require('../services/documentos.js');
		let response 	= await documentos.actualizardocumentos(documentos, id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Permite borrar de manera lógia al artículo identificado por el valor de su campo Id.
	//(pasa a inactivo).
	app.put('/documentos/delete/:id', midd.rutasProtegidas, async function(req, res){
		let id 			= req.params.id;
		let documentos 	= require('../services/documentos.js');
		let response 	= await documentos.eliminardocumentos(id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})
	
}