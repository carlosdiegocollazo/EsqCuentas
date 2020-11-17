module.exports = function(app){

	const midd = require('../services/middleware.js');	
	const Cors = require('../services/cors.js');
	app.use(Cors.cors(Cors.corsOptions));

	//Devuelve JSON con colección de objetos "movimiento" activos.
	app.get('/movimientos/all', midd.rutasProtegidas, async function(req, res){
		let movimiento 	= require ('../services/movimientos.js');
		let response 	= await movimiento.obtenermovimientos();
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Devuelve JSON con objeto "movimiento" seleccionado por el valor de su campo Id.
	//si se encuentra activo.
	app.get('/movimiento/:id', midd.rutasProtegidas, async function(req, res){
		let id 			= req.params.id;
		let movimiento 	= require('../services/movimientos.js');
		let response 	= await movimiento.obtenermovimientoPorId(id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Devuelve JSON con objeto "movimiento" seleccionado a partir del valor de su campo Id. 
	// si se encuentra activo. Incluye sus respectivos objetos topico, tipo y
	// usuario autor del artículo elegido. 
	app.get('/movimiento/full/:id', midd.rutasProtegidas, async function(req, res){
		let id 			= req.params.id;
		let movimiento 	= require('../services/movimientos.js');
		let response 	= await movimiento.obtenermovimientoPorIdFull(id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Devuelve JSON con colección de objetos "movimiento" seleccionados a partir del Id. 
	//de su usuario autor. Incluye los respectivos objetos topico, tipo y 
	//usuario autor del artículo elegido. Se valida correspondencia entre Id. de usuario logueado
	// y autor de los movimientos buscados.
	app.get('/movimientos/usuario/:id', midd.rutasProtegidas, async function(req, res){
		let idUsuarioReq 	= req.params.id;
		let idUsuarioToken 	= 0;
		const token     	= req.headers.mytoken;
		jwt.verify(token, conn.llave, (err, decoded) => {
          	idUsuarioToken	= decoded.usuario.usuarioId;
        });
        let movimiento 	= require('../services/movimientos.js');
		let response 	= await movimiento.obtenermovimientoPorUsuarioId(idUsuarioReq, idUsuarioToken);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Devuelve JSON con colección de objetos "movimiento" seleccionados a partir de las preferenicas (topicos) 
	// del usuario especificado a partir del valor de su atributo Id. 
	//Se incluyen los respectivos objetos topico, tipo y usuario autor del artículo elegido.
	app.get('/movimientos/usuario/topicos/:id', midd.rutasProtegidas, async function(req, res){
		let id 			= req.params.id;
		let movimiento 	= require('../services/movimientos.js');
		let response 	= await movimiento.obtenermovimientosPorTopicosUsuarioId(id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Permite dar de alta a un nuevo registo artículo.
	app.post('/movimiento/new', midd.rutasProtegidas, async function(req, res){
		let movimiento = req.body;
		let movimientos = require('../services/movimientos.js');
		let response = await movimientos.crearmovimiento(movimiento);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Permite editar los valores de los atributos del artículo seleccionado
	// a partir del valor de su campo Id.
	app.put('/movimiento/edit/:id', midd.rutasProtegidas, async function(req, res){
		let movimiento 	= req.body;
		let id 			= req.params.id;
		let movimientos 	= require('../services/movimientos.js');
		let response 	= await movimiento.actualizarmovimiento(movimiento, id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Permite editar el valor del atributo "estado" del artículo seleccionado
	// a partir del valor de su campo Id, seteádolo con el valor "PUBLICADO".
	app.put('/movimiento/publicar/:id', async function(req, res){
		let id 			= req.params.id;
		let movimiento 	= require('../services/movimientos.js');
		let response 	= await movimiento.publicarmovimiento(id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	// Buscador en tabla movimientos por atributo titulo según palabras claves ingresadas en buscador.
	// Devuelve JSON con array de objetos movimientos encontrados; 
	// o mensaje de error si el resultado de la búsqueda es vacío.
	app.post('/movimientos/buscar', async function(req, res){
		let busqueda 			= req.body;
		let parametro1 			= busqueda.parametro1;
		let consultaStr 		= busqueda.buscar;
		let consultaArray 		= consultaStr.split(" ");
		let consultaArrayClean 	= consultaArray.filter(Boolean);
		let movimiento 			= require('../services/movimientos.js');
		let response 			= await movimiento.buscarmovimientos(consultaArrayClean, parametro1);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	// Buscador en tabla movimientos por atributo titulo según palabras claves ingresadas en buscador.
	// Devuelve JSON con array de objetos movimientos junto con su objeto usuario (autor), 
	// su objeto tipo y su objeto topico correspondientes.
	app.post('/movimientos/buscar/full', async function(req, res){
		let busqueda 			= req.body;
		let parametro1 			= busqueda.parametro1;
		let consultaStr 		= busqueda.buscar;
		let consultaArray 		= consultaStr.split(" ");
		let consultaArrayClean 	= consultaArray.filter(Boolean);
		let movimiento 			= require('../services/movimientos.js');
		let response 			= await movimiento.buscarmovimientosFull(consultaArrayClean, parametro1);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	// Buscador en tabla movimientos por atributo titulo y keywords según palabras claves ingresadas en buscador. 
	// Devuelve JSON con array de objetos movimientos junto con su objeto usuario (autor), 
	// su objeto tipo y su objeto topico correspondientes.
	app.post('/movimientos/buscar/fullflex', async function(req, res){
		let busqueda 			= req.body;
		let consultaStr 		= busqueda.buscar;
		let consultaArray 		= consultaStr.split(" ");
		//console.log("consultaArray enviado a services de busqueda :: ", consultaArray);
		let consultaArrayClean 	= consultaArray.filter(Boolean);
		let movimiento 			= require('../services/movimientos.js');
		let response 			= await movimiento.buscarmovimientosFullFlex(consultaArrayClean);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	// Buscador en tabla movimientos por atributo titulo y keywords según palabras claves ingresadas en buscador,
	// filtrando por valor del atributo estado igual a "Publicado". 
	// Devuelve JSON con array de objetos movimientos junto con su objeto usuario (autor), 
	// su objeto tipo y su objeto topico correspondientes.
	app.post('/movimientos/publicados/buscar/fullflex', async function(req, res){
		let busqueda 			= req.body;
		let consultaStr 		= busqueda.buscar;
		let consultaArray 		= consultaStr.split(" ");
		let consultaArrayClean 	= consultaArray.filter(Boolean);
		let movimiento 			= require('../services/movimientos.js');
		let response 			= await movimiento.buscarmovimientosPublicadosFullFlex(consultaArrayClean);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})
	
	//Permite borrar de manera lógia al artículo identificado por el valor de su campo Id.
	//(pasa a inactivo).
	app.put('/movimiento/delete/:id', midd.rutasProtegidas, async function(req, res){
		let id 			= req.params.id;
		let movimiento 	= require('../services/movimientos.js');
		let response 	= await movimiento.eliminarmovimiento(id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})
	
}