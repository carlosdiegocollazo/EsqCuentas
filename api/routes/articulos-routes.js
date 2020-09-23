module.exports = function(app){

	const midd = require('../services/middleware.js');	
	const Cors = require('../services/cors.js');
	app.use(Cors.cors(Cors.corsOptions));

	//Devuelve JSON con colección de objetos "articulo" activos.
	app.get('/articulos/all', midd.rutasProtegidas, async function(req, res){
		let Articulo 	= require ('../services/articulos.js');
		let response 	= await Articulo.obtenerArticulos();
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Devuelve JSON con objeto "articulo" seleccionado por el valor de su campo Id.
	//si se encuentra activo.
	app.get('/articulo/:id', midd.rutasProtegidas, async function(req, res){
		let id 			= req.params.id;
		let Articulo 	= require('../services/articulos.js');
		let response 	= await Articulo.obtenerArticuloPorId(id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Devuelve JSON con objeto "articulo" seleccionado a partir del valor de su campo Id. 
	// si se encuentra activo. Incluye sus respectivos objetos topico, tipo y
	// usuario autor del artículo elegido. 
	app.get('/articulo/full/:id', midd.rutasProtegidas, async function(req, res){
		let id 			= req.params.id;
		let Articulo 	= require('../services/articulos.js');
		let response 	= await Articulo.obtenerArticuloPorIdFull(id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Devuelve JSON con colección de objetos "articulo" seleccionados a partir del Id. 
	//de su usuario autor. Incluye los respectivos objetos topico, tipo y 
	//usuario autor del artículo elegido. Se valida correspondencia entre Id. de usuario logueado
	// y autor de los articulos buscados.
	app.get('/articulos/usuario/:id', midd.rutasProtegidas, async function(req, res){
		let idUsuarioReq 	= req.params.id;
		let idUsuarioToken 	= 0;
		const token     	= req.headers.mytoken;
		jwt.verify(token, conn.llave, (err, decoded) => {
          	idUsuarioToken	= decoded.usuario.usuarioId;
        });
        let Articulo 	= require('../services/articulos.js');
		let response 	= await Articulo.obtenerArticuloPorUsuarioId(idUsuarioReq, idUsuarioToken);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Devuelve JSON con colección de objetos "articulo" seleccionados a partir de las preferenicas (topicos) 
	// del usuario especificado a partir del valor de su atributo Id. 
	//Se incluyen los respectivos objetos topico, tipo y usuario autor del artículo elegido.
	app.get('/articulos/usuario/topicos/:id', midd.rutasProtegidas, async function(req, res){
		let id 			= req.params.id;
		let Articulo 	= require('../services/articulos.js');
		let response 	= await Articulo.obtenerArticulosPorTopicosUsuarioId(id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Permite dar de alta a un nuevo registo artículo.
	app.post('/articulo/new', midd.rutasProtegidas, async function(req, res){
		let articulo = req.body;
		let Articulo = require('../services/articulos.js');
		let response = await Articulo.crearArticulo(articulo);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Permite editar los valores de los atributos del artículo seleccionado
	// a partir del valor de su campo Id.
	app.put('/articulo/edit/:id', midd.rutasProtegidas, async function(req, res){
		let articulo 	= req.body;
		let id 			= req.params.id;
		let Articulo 	= require('../services/articulos.js');
		let response 	= await Articulo.actualizarArticulo(articulo, id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Permite editar el valor del atributo "estado" del artículo seleccionado
	// a partir del valor de su campo Id, seteádolo con el valor "PUBLICADO".
	app.put('/articulo/publicar/:id', async function(req, res){
		let id 			= req.params.id;
		let Articulo 	= require('../services/articulos.js');
		let response 	= await Articulo.publicarArticulo(id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	// Buscador en tabla articulos por atributo titulo según palabras claves ingresadas en buscador.
	// Devuelve JSON con array de objetos articulos encontrados; 
	// o mensaje de error si el resultado de la búsqueda es vacío.
	app.post('/articulos/buscar', async function(req, res){
		let busqueda 			= req.body;
		let parametro1 			= busqueda.parametro1;
		let consultaStr 		= busqueda.buscar;
		let consultaArray 		= consultaStr.split(" ");
		let consultaArrayClean 	= consultaArray.filter(Boolean);
		let Articulo 			= require('../services/articulos.js');
		let response 			= await Articulo.buscarArticulos(consultaArrayClean, parametro1);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	// Buscador en tabla articulos por atributo titulo según palabras claves ingresadas en buscador.
	// Devuelve JSON con array de objetos articulos junto con su objeto usuario (autor), 
	// su objeto tipo y su objeto topico correspondientes.
	app.post('/articulos/buscar/full', async function(req, res){
		let busqueda 			= req.body;
		let parametro1 			= busqueda.parametro1;
		let consultaStr 		= busqueda.buscar;
		let consultaArray 		= consultaStr.split(" ");
		let consultaArrayClean 	= consultaArray.filter(Boolean);
		let Articulo 			= require('../services/articulos.js');
		let response 			= await Articulo.buscarArticulosFull(consultaArrayClean, parametro1);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	// Buscador en tabla articulos por atributo titulo y keywords según palabras claves ingresadas en buscador. 
	// Devuelve JSON con array de objetos articulos junto con su objeto usuario (autor), 
	// su objeto tipo y su objeto topico correspondientes.
	app.post('/articulos/buscar/fullflex', async function(req, res){
		let busqueda 			= req.body;
		let consultaStr 		= busqueda.buscar;
		let consultaArray 		= consultaStr.split(" ");
		console.log("consultaArray enviado a services de busqueda :: ", consultaArray);
		let consultaArrayClean 	= consultaArray.filter(Boolean);
		let Articulo 			= require('../services/articulos.js');
		let response 			= await Articulo.buscarArticulosFullFlex(consultaArrayClean);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	// Buscador en tabla articulos por atributo titulo y keywords según palabras claves ingresadas en buscador,
	// filtrando por valor del atributo estado igual a "Publicado". 
	// Devuelve JSON con array de objetos articulos junto con su objeto usuario (autor), 
	// su objeto tipo y su objeto topico correspondientes.
	app.post('/articulos/publicados/buscar/fullflex', async function(req, res){
		let busqueda 			= req.body;
		let consultaStr 		= busqueda.buscar;
		let consultaArray 		= consultaStr.split(" ");
		let consultaArrayClean 	= consultaArray.filter(Boolean);
		let Articulo 			= require('../services/articulos.js');
		let response 			= await Articulo.buscarArticulosPublicadosFullFlex(consultaArrayClean);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})
	
	//Permite borrar de manera lógia al artículo identificado por el valor de su campo Id.
	//(pasa a inactivo).
	app.put('/articulo/delete/:id', midd.rutasProtegidas, async function(req, res){
		let id 			= req.params.id;
		let Articulo 	= require('../services/articulos.js');
		let response 	= await Articulo.eliminarArticulo(id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})
	
}