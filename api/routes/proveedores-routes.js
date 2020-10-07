module.exports = function(app){

	const midd = require('../services/middleware.js');	
	const Cors = require('../services/cors.js');
	app.use(Cors.cors(Cors.corsOptions));

	//Procedimiento para la validación de credenciales de proveedor (proveedorEmail y proveedorPassword)
	// para el ingreso al sistema. Caso de éxito devuele objeto proveedor asociado a cuenta de mail 
	// ingresada y token de sesión generado. Caso de error retorna mensaje correspondiente.
	app.post('/proveedores/login', async function(req, res){
		let proveedorLog 		= req.body;
		const proveedor 		= require('../services/proveedores.js');
		let response 		= await proveedor.proveedorLogin(proveedorLog.proveedorEmail, proveedorLog.proveedorPass);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})	

	//Devuelve JSON con la colección de objetos "proveedor" activos.
	app.get('/proveedores/all', midd.rutasProtegidas, async function(req, res){
		let proveedor 	= require ('../services/proveedores.js');
		let response 	= await proveedor.obtenerproveedores();
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

		//Devuelve JSON con la colección de objetos "proveedor" activos e inactivos
		app.get('/proveedores/allall', midd.rutasProtegidas, async function(req, res){
			let proveedor 	= require ('../services/proveedores.js');
			let response 	= await proveedor.obtenerproveedoresall();
			res.set('Content-Type', 'aplication/json');
			res.send(response);
		})

	//Devuelve JSON con objeto "proveedor" seleccionado por el valor de su campo Id.
	//si se encuentra activo.
	app.get('/proveedores/:id', midd.rutasProtegidas, async function (req, res) {
		let id 			= req.params.id;
		let proveedor 	= require('../services/proveedores');
		let response 	= await proveedor.obtenerproveedorPorId(id);
		res.set(['Content-Type', 'application/json']);
		res.send(response);
	});

	//Devuelve JSON con objeto "proveedorEmail" seleccionado por el valor de su campo Email.
	app.get('/proveedores/mail/find', midd.rutasProtegidas, async function (req, res) {
		let mail 		= req.body.proveedorEmail;
		let proveedor 	= require('../services/proveedores');
		let response 	= await proveedor.obtenerproveedorPorEmail(mail);
		res.set(['Content-Type', 'application/json']);
		res.send(response);
	});

	//Permite dar de alta a un nuevo registo proveedor.
	app.post('/proveedores/new', async function (req, res) {
		 let proveedor	= req.body;
		 let proveedor 	= require('../services/proveedores');
		 let response	= await proveedor.ingresarproveedor(proveedor);
		 res.set(['Content-Type', 'application/json']);
		 res.send(response);
	});

	//Permite editar los valores de los atributos del proveedor seleccionado
	// a partir del valor de su campo Id.
	app.put('/proveedores/edit/:id', midd.rutasProtegidas, async function(req, res){
		let id 			= req.params.id;
		let proveedor		= req.body;
		let proveedor 	= require('../services/proveedores.js');
		let response 	= await proveedor.actualizarproveedor(proveedor, id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})

	//Permite borrar de manera lógia al proveedor identificado por el valor de su campo Id.
	//(pasa a inactivo).
	app.put('/proveedor/delete/:id', midd.rutasProtegidas, async function(req, res){
		let id 			= req.params.id;
		let proveedor 	= require('../services/proveedores.js');
		let response 	= await proveedor.eliminarproveedor(id);
		res.set('Content-Type', 'aplication/json');
		res.send(response);
	})
	
}