let Preferencia = {
	
	getRecordById: async function (tabla, idTabla, id){
		let sql 		= `
							SELECT *
							FROM ${tabla}
							WHERE
							${idTabla} = ${id}
						`
		let response 	= {error: "No se encontraron registros"}
		let res 		= await conn.query(sql);
		if (res.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (res.length>0) {
			response 	= res[0];
			}
		return response; 
	},

	obtenerPreferencias: async function(){
		let sql 		= `
							SELECT * 
							FROM preferencias
							WHERE preferencias.preferenciaActiva = 1							
						`
		let response 	= {error: "No se encontraron preferencias"}
		let resultado 	= await conn.query(sql);
		if (resultado.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (resultado.length>0) {
			response 	= {response: resultado}
		}
		return response;
	},

	obtenerPreferenciaPorId: async function (id){
	 let sql = `
	  			SELECT * 
	  			FROM preferencias
	  			WHERE 
	  			(preferencias.preferenciaId = '${id}' 
	  			&& preferencias.preferenciaActiva = 1)
	 		`
	 let preferencias 		= []
	 let response 			= {error: `No existe preferencia con Id: ${id}`}
	 preferencias 			= await conn.query(sql);
	 if (preferencias.code) {
	 	response 			= {error: "Error en consulta SQL"};
	 }else if(preferencias.length > 0){
		response 			= {response: preferencias[0]}
	 }
	 return response;
	},

	obtenerPreferenciaPorIdFull: async function(id){
		
		let idPreferencia 		= id;
		let sql 				= `
									SELECT
									preferencias.preferenciaId,
									preferencias.preferenciaUsuario,
									preferencias.preferenciaTopico
									FROM preferencias
									WHERE (preferencias.preferenciaId = '${id}' 
									&& preferencias.preferenciaActiva = 1)
								`
		let response 			= {}
		let result 				= {}
		let resultado 			= await conn.query(sql);
		if (resultado.code) {
	 		response 			= {error: "Error en consulta SQL"};
	 	}else if (resultado.length>0) {
			let idUsuario 				= resultado[0].preferenciaUsuario;
			let idTopico 				= resultado[0].preferenciaTopico;		
			result["preferencia"] 	= await this.getRecordById('preferencias', 
										'preferencias.preferenciaId', idPreferencia);
			result["topico"] 			= await this.getRecordById('topicos', 
										'topicos.topicoId', idTopico);
			result["usuario"] 		= await this.getRecordById('usuarios', 
			 							'usuarios.usuarioId', idUsuario);
			response = {response: result}
		}else {
			response 					= {error: `No se encontró preferencia con Id: ${id}`}
		}
		return response;
	},

	obtenerPreferenciasPorUsuarioIdFull: async function(id){
		
		let idUsuario	 		= id;
		let sql 				= `
									SELECT
									preferencias.preferenciaId,
									preferencias.preferenciaUsuario,
									preferencias.preferenciaTopico
									FROM preferencias
									WHERE (preferencias.preferenciaUsuario = '${id}' 
									&& preferencias.preferenciaActiva = 1)
								`
		let response 					= {};
		let arrayResult 				= [];
		let preferenciaEncontrada 		= {};
		let preferenciasEncontradas 	= await conn.query(sql);
		if (preferenciasEncontradas.code) {
	 		response 					= {error: "Error en consulta SQL"};
	 	}else{
	 		if (preferenciasEncontradas.length>0) { 
				for (let i = 0; i < preferenciasEncontradas.length; i++) {
			 		preferenciaEncontrada 					= preferenciasEncontradas[i];
			 		preferenciaEncontrada["preferencia"] 	= await this.getRecordById('preferencias', 
												'preferencias.preferenciaId', preferenciaEncontrada.preferenciaId);
					preferenciaEncontrada["topico"] 		= await this.getRecordById('topicos', 
												'topicos.topicoId', preferenciaEncontrada.preferenciaTopico);
					preferenciaEncontrada["usuario"] 		= await this.getRecordById('usuarios', 
					 							'usuarios.usuarioId', preferenciaEncontrada.preferenciaUsuario);
					delete preferenciaEncontrada["preferenciaId"];
					delete preferenciaEncontrada["preferenciaUsuario"];
					delete preferenciaEncontrada["preferenciaTopico"];
					arrayResult.push(preferenciaEncontrada);
				}
				response 		= {response: arrayResult};
			}else {
					response 	= {error: `No se encontraron preferencias para el usuario con Id: ${id}`}
					}
		}
		return response;
	},

	validarPreferenciasUsuario: async function(idUsuario, idArticulo){
		let articuloId 		= idArticulo;
		let usuarioId 		= idUsuario;
		let Articulo 		= require('../services/articulos.js');
		let articulo 		= await Articulo.obtenerArticuloPorId(idArticulo);
		let response 		= {}
		if (articulo.error) {
	 		response 		= {error: articulo.error};
	 	}else {
			let idTopico 	= articulo.response.articuloTopico;
			let sql 		= `
					  			SELECT COUNT(preferenciaId) 
					  			AS TopicosMatches 
					  			FROM preferencias
					  			WHERE
					  			preferencias.preferenciaUsuario = '${idUsuario}' 
					  			&& preferencias.preferenciaTopico = '${idTopico}'
					 		`
		 	let resultado 	= await conn.query(sql);
			if (resultado.code) {
		 		response 	= {error: "Error en consulta SQL"};
		 	}else if (resultado[0].TopicosMatches > 0) {
				response 	= {response: `Este articulo se encuentra dentro de las preferencias del usuario`}
			}else{
				response = {error: `El articulo no está entro de las preferencias del usuario`}
				}
		}
		return response;
	},

	ingresarPreferencia: async function(preferencia){
		let sql = `
					INSERT INTO preferencias
					  		(
							preferenciaUsuario,
							preferenciaTopico
							 )
		  			VALUES
		  					(
							'${preferencia.preferenciaUsuario}',
							'${preferencia.preferenciaTopico}'
							)
				`
		let response 	= {error: "No se pudo ingresar preferencia"}
		let resultado 	= await conn.query(sql);
		if (resultado.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (resultado.insertId) {
			response 	= {response: "Preferencia ingresada correctamente"}
		}
		return response;
	},

	actualizarPreferencia: async function(preferencia, id){
		let sql 		= `
							UPDATE preferencias 
							SET 
							preferenciaUsuario = '${preferencia.preferenciaUsuario}',
							preferenciaTopico  = '${preferencia.preferenciaTopico}'
							WHERE
							preferencias.preferenciaId = '${id}'
						`
		let response 			= {};
		let existePreferencia 	= await this.obtenerPreferenciaPorId(id);
		if (!existePreferencia.error) {
			let resultado 		= await conn.query(sql);
			if (resultado.code) {
	 			response 		= {error: "Error en consulta SQL"};
	 		}else if (resultado.affectedRows>0) {
				response 		= {response: "Preferencia actualizada correctamente"}
			}else{
				response 		= {error: "No se pudo actualizar la preferencia"}
			}
		}else{
			response 			= {error: `No existe preferencia con Id: ${id}`}
		}
		return response;
	},	

	eliminarPreferencia: async function(id){
		let sql 		= `
							UPDATE preferencias 
							SET 
							preferenciaActiva = 0 
							WHERE
							preferencias.preferenciaId = '${id}'
						`
		let response 			= {};
		let existePreferencia 	= await this.obtenerPreferenciaPorId(id);
		if (!existePreferencia.error) {
			let resultado 		= await conn.query(sql);
			if (resultado.code) {
	 			response 		= {error: "Error en consulta SQL"};
	 		}else if (resultado.affectedRows>0) {
				response 		= {response: "Preferencia eliminada correctamente"}
			}else{
				response 		= {error: "No se pudo eliminar preferencia"}
			}
		}else {
			response 			= {error: `No existe preferencia con Id: ${id}`}
		}
		return response;
	},

}

module.exports = Preferencia;