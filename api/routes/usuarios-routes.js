module.exports = function(app){

	const midd = require('../services/middleware.js');	
	const Cors = require('../services/cors.js');
	app.use(Cors.cors(Cors.corsOptions));

	//Procedimiento para la validación de credenciales de usuario (usuarioEmail y usuarioPassword)
	// para el ingreso al sistema. Caso de éxito devuele objeto usuario asociado a cuenta de mail 
	// ingresada y token de sesión generado. Caso de error retorna mensaje correspondiente.
	app.post('/usuarios/login', async function(req, res){
		let usuarioLog 		= req.body;
		const Usuario 		= require('../services/usuarios.js');
		let response 		= await Usuario.usuarioLogin(usuarioLog.usuarioEmail, usuarioLog.usuarioPass);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})	

	//Devuelve JSON con la colección de objetos "usuario" activos.
	app.get('/usuarios/all', midd.rutasProtegidas, async function(req, res){
		let Usuario 	= require ('../services/usuarios.js');
		let response 	= await Usuario.obtenerUsuarios();
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

		//Devuelve JSON con la colección de objetos "usuario" activos e inactivos
		app.get('/usuarios/allall', midd.rutasProtegidas, async function(req, res){
			let Usuario 	= require ('../services/usuarios.js');
			let response 	= await Usuario.obtenerUsuariosall();
			res.set('Content-Type', 'aplication/json');
			res.send(response);
		})

	//Devuelve JSON con objeto "usuario" seleccionado por el valor de su campo Id.
	//si se encuentra activo.
	app.get('/usuarios/:id', midd.rutasProtegidas, async function (req, res) {
		let id 			= req.params.id;
		let Usuario 	= require('../services/usuarios');
		let response 	= await Usuario.obtenerUsuarioPorId(id);
		res.set(['Content-Type', 'application/json']);
		res.send(response);
	});

	//Devuelve JSON con objeto "usuarioEmail" seleccionado por el valor de su campo Email.
	app.get('/usuarios/mail/find', midd.rutasProtegidas, async function (req, res) {
		let mail 		= req.body.usuarioEmail;
		let Usuario 	= require('../services/usuarios');
		let response 	= await Usuario.obtenerUsuarioPorEmail(mail);
		res.set(['Content-Type', 'application/json']);
		res.send(response);
	});

	//Permite dar de alta a un nuevo registo usuario.
	app.post('/usuarios/new', async function (req, res) {
		 let usuario	= req.body;
		 let Usuario 	= require('../services/usuarios');
		 let response	= await Usuario.ingresarUsuario(usuario);
		 res.set(['Content-Type', 'application/json']);
		 res.send(response);
	});

	//Permite editar los valores de los atributos del usuario seleccionado
	// a partir del valor de su campo Id.
	app.put('/usuarios/edit/:id', midd.rutasProtegidas, async function(req, res){
		let id 			= req.params.id;
		let usuario		= req.body;
		let Usuario 	= require('../services/usuarios.js');
		let response 	= await Usuario.actualizarUsuario(usuario, id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Permite borrar de manera lógia al usuario identificado por el valor de su campo Id.
	//(pasa a inactivo).
	app.put('/usuarios/delete/:id', midd.rutasProtegidas, async function(req, res){
		let id 			= req.params.id;
		let Usuario 	= require('../services/usuarios.js');
		let response 	= await Usuario.eliminarUsuario(id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})
	
}