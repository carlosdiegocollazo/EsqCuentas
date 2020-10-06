//REQUERIR EXPRESS Y BODY-PARESER
const express 		= require('express');
const app 			= express();
const bodyParser 	= require('body-parser');
app.use(bodyParser.json());

//REQUERIR EXPRESS ROUTES EN ARCHIVO EXTERNO
require('./routes/usuarios-routes.js')(app);
require('./routes/movimientos-routes.js')(app);
require('./routes/moneda-routes.js')(app);
require('./routes/seguridad-routes.js')(app);
require('./routes/documentos-routes.js')(app);
require('./routes/cheques-routes.js')(app);
require('./routes/cotizacion-routes.js')(app);


//DECLARAR COMO GLOBAL LA CONEXIÓN A DATA BASE
global.conn 		= require('./config/conn.js');

//REQUERIR CORS
global.Cors 		= require('./services/cors.js');
app.use(Cors.cors(Cors.corsOptions));

//REQUERIR EL USO DE JWT Y SETEO DE CLAVE BASE PARA ENCRIPTACIÓN
jwt 				= require('jsonwebtoken');
app.set('llave', conn.llave);

let env;
try {
	env = require('./env');
} catch(e){
	env = {
		port: 3000
	}
}


//LEVANTAR LA API
app.listen(env.port,function(){
	console.log(`EsQProvee en puerto ${env.port}`);
})	