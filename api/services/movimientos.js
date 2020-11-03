let movimiento = {
	
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
	
	obtenermovimientos: async function(){
		let sql 		= `
							SELECT * FROM movimientos
							WHERE
							movimientos.activo = 1
						`
		let response 	= {error: "No se encontraron artículos"}
		let resultado 	= await conn.query(sql);
		if (resultado.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (resultado.length>0) {
			response 	= {response: resultado}
		}
		return response;
	},

	obtenermovimientoPorId: async function(id){
		let sql 		= `
							SELECT * FROM movimientos
							WHERE
							movimientos.idmov = '${id}' 
							&& movimientos.activo = 1
						`
		let response 	= {error: `No se encontró movimiento con Id: ${id}`}
		let resultado 	= await conn.query(sql);
		if (resultado.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (resultado.length>0) {
			response 	= {response: resultado[0]}
		}
		return response;
	},

	
	obtenermovimientoPorIdFull: async function(id){
		let idmovimiento 	= id;
		let sql 		= `
							SELECT
							movimientos.idmov,
							movimientos.nrofac,
							movimientos.fechemi,
							personas.idper
							FROM movimientos
							JOIN personas
							ON movimientos.nrocheq = personas.idper
							WHERE (movimientos.idmov = '${id}' 
							&& movimientos.activo = 1)
						`
		let response 	= {}
		let result 		= {}
		let resultado 	= await conn.query(sql);
		if (resultado.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (resultado.length>0) {
			let idUsuario 		= resultado[0].idper;
			let idTipo 			= resultado[0].nrofac;
			let idTopico 		= resultado[0].fechemi;
			result["movimiento"] 	= await this.getRecordById('movimientos', 
										'movimientos.idmov', idmovimiento);
			result["tipo"] 		= await this.getRecordById('tiposmovimientos', 
										'tiposmovimientos.tipoidmov', idTipo);
			result["topico"] 	= await this.getRecordById('topicos', 
										'topicos.topicoId', idTopico);
			result["autor"] 	= await this.getRecordById('personas', 
			 							'personas.idper', idUsuario);
			response 			= {response: result}
		}else {
			response 			= {error: "No se encontró artículo"}
		}
		return response;
	},

	obtenermovimientoPoridper: async function(idUsuarioReq, idUsuarioToken){
		let response 		= { };
		if (idUsuarioReq == idUsuarioToken) {
			let idUsuario 	= idUsuarioReq;
			let sql 		= `
								SELECT
								movimientos.idmov,
								movimientos.nrofac,
								movimientos.fechemi,
								personas.idper
								FROM movimientos
								JOIN personas
								ON movimientos.nrocheq = personas.idper
								WHERE (movimientos.nrocheq = '${idUsuario}' 
								&& movimientos.activo = 1)
							`
			let resultados 	= await conn.query(sql);
			if (resultados.code) {
	 			response 	= {error: "Error en consulta SQL"};
	 		}else {
				let arrayResult 			= [];
				let movimientoEncontrado 		= {};
				let movimientosEncontrados 	= await conn.query(sql);
				if (movimientosEncontrados.length>0) {
					for (let i = 0; i < movimientosEncontrados.length; i++) {
						movimientoEncontrado 	= movimientosEncontrados[i];
						movimientoEncontrado["movimiento"] 	= await this.getRecordById('movimientos', 
												'movimientos.idmov', movimientoEncontrado.idmov);
						movimientoEncontrado["tipo"] 		= await this.getRecordById('tiposmovimientos', 
												'tiposmovimientos.tipoidmov', movimientoEncontrado.nrofac);
						movimientoEncontrado["topico"] 	= await this.getRecordById('topicos', 
												'topicos.topicoId', movimientoEncontrado.fechemi);
						movimientoEncontrado["autor"] 	= await this.getRecordById('personas', 
					 							'personas.idper', movimientoEncontrado.idper);
						delete movimientoEncontrado["idmov"];
						delete movimientoEncontrado["nrofac"];
						delete movimientoEncontrado["fechemi"];
						delete movimientoEncontrado["idper"];
						arrayResult.push(movimientoEncontrado);
					}
					response 	= {response: arrayResult};	
				}else {
					response 	= {error: "No se encontraron movimientos de este autor"}
					}
			}
		}else{
			response 		= {error: "Usuario Infractor: FUCKOFF !!"} 
			}
		return response;
	},

	obtenermovimientosPorTopicosidper: async function(id){
		let sql 		= `
							SELECT
							preferencias.preferenciaUsuario,
							preferencias.preferenciaTopico,
							movimientos.idmov,
							movimientos.nrofac,
							movimientos.fechemi,
							movimientos.nrocheq
							FROM preferencias
							JOIN movimientos
							ON preferencias.preferenciaTopico = movimientos.fechemi
							WHERE (preferencias.preferenciaUsuario = '${id}' 
							&& movimientos.activo = 1)
						`
		let response 					= {};
		let arrayResult 				= [];
		let movimientoEncontrado 			= {};
		let Usuario 					= require('../services/personas'); 
		let existeUsuario 				= await Usuario.obtenerUsuarioPorId(id);
		if (!existeUsuario.error) {
			let movimientosEncontrados 	= await conn.query(sql);
			if (movimientosEncontrados.code) {
	 			response 				= {error: "Error en consulta SQL"};
	 		}else if (movimientosEncontrados.length>0) {
				for (let i = 0; i < movimientosEncontrados.length; i++) {
					movimientoEncontrado 				= movimientosEncontrados[i];
					movimientoEncontrado["movimiento"] 	= await this.getRecordById('movimientos', 
											'movimientos.idmov', movimientoEncontrado.idmov);
					movimientoEncontrado["tipo"] 		= await this.getRecordById('tiposmovimientos', 
											'tiposmovimientos.tipoidmov', movimientoEncontrado.nrofac);
					movimientoEncontrado["topico"] 	= await this.getRecordById('topicos', 
											'topicos.topicoId', movimientoEncontrado.fechemi);
					movimientoEncontrado["autor"] 	= await this.getRecordById('personas', 
				 							'personas.idper', movimientoEncontrado.nrocheq);
					delete movimientoEncontrado["idmov"];
					delete movimientoEncontrado["nrofac"];
					delete movimientoEncontrado["fechemi"];
					delete movimientoEncontrado["nrocheq"];
					delete movimientoEncontrado["preferenciaUsuario"];
					delete movimientoEncontrado["preferenciaTopico"];
					arrayResult.push(movimientoEncontrado);
				}
				response 	= {response: arrayResult};	
			}else {
				response 	= {error: "No se encontraron movimientos para las preferencias de este usuario"}
				}
		}else{
			response 		= {error: `No existe usuario con Id: ${id}`}
			}	
		return response;
	},

	crearmovimiento: async function(movimiento){
		let sql = `
					INSERT INTO movimientos
					(
					proveedor,
					tipdoc,					
					nrofac,
					fechemi,
					fechpagc,
					moneda,
					nrocheq,
					fechcheq,
					debe,
					haber,
					saldo,
					saldtot,
					nrorec,
					observaciones,
					activo
					)
					VALUES
					(
					'${movimiento.proveedor}',
					'${movimiento.tipdoc}',
					'${movimiento.nrofac}',
					'${movimiento.fechemi}',
					'${movimiento.fechpagc}',
					'${movimiento.moneda}',
					'${movimiento.nrocheq}',
					'${movimiento.fechcheq}',
					'${movimiento.debe}',
					'${movimiento.haber}',
					'${movimiento.saldo}',
					'${movimiento.saldtot}',
					'${movimiento.nrorec}',
					'${movimiento.observaciones}',
					1
					)		
				`
		let response 	= {error: "No se pudo crear el movimiento"}
		let resultado 	= await conn.query(sql);
		if (resultado.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (resultado.insertId) {
			response 	= {response: "movimiento creado correctamente"}
		}
		return response;
	},

	actualizarmovimiento: async function(movimiento, id){
		let sql = `
					UPDATE movimientos
					SET
					proveedor 	= '${movimiento.proveedor}',
					tipdoc		= '${movimiento.tipdoc}',
					fechemi		= '${movimiento.fechemi}',
					fechpagc		= '${movimiento.fechpagc}',
					moneda		= '${movimiento.moneda}',
					nrocheq		= '${movimiento.nrocheq}',
					fechcheq	= '${movimiento.fechcheq}',
					debe		= '${movimiento.debe}',
					haber		= '${movimiento.haber}',
					saldo		= '${movimiento.saldo}',
					saldtot		= '${movimiento.saldtot}',
					nrorec		= '${movimiento.nrorec}',
					observaciones = '${movimiento.observaciones}',
					activo 		= '${movimiento.activo}'
					
					WHERE
					movimientos.idmov = '${id}'
				`
		let response 		= {};
		let existemovimiento 	= await this.obtenermovimientoPorId(id);
		if (!existemovimiento.error) {
			let resultado 	= await conn.query(sql);
			if (resultado.code) {
	 			response 	= {error: "Error en consulta SQL"};
	 		}else if (resultado.affectedRows>0) {
				response 	= {response: "movimiento actualizado correctamente"}
			}else{
				response 	= {error: "No se pudo actualizar el movimiento"}
			}
		}else{
			response 		= {error: `No existe movimiento con Id: ${id}`}
			}
		return response;
	},

	buscarmovimientos: async function(consultaArray , parametro1){
		let sql 		= `
							SELECT *
							FROM movimientos
							WHERE
							movimientos.activo = 1
							&&
							movimientos.fechemi = '${parametro1}'
							&&
							movimientos.fechpagc like '%${consultaArray[0]}%'
							`
		for(let i=1; i<consultaArray.length; i++){
		    if(consultaArray[i]) {
			     sql += ` OR movimientos.fechpagc like '%${consultaArray[i]}%'`;
			}
		}
		let response 		= {error: "No se encontraron movimientos para esta búsqueda"}
		if (consultaArray.length>0) {
			let resultado 	= await conn.query(sql);
			if (resultado.code) {
	 			response 	= {error: "Error en consulta SQL"};
	 		}else if (resultado.length>0) {
				response 	= {response: resultado}
			}
		}
		return response;
	},

	buscarmovimientosFull: async function(consultaArray , parametro1){
		let sql 		= `
							SELECT 
							movimientos.idmov,
							movimientos.nrofac,
							movimientos.fechemi,
							movimientos.nrocheq
							FROM movimientos
							WHERE
							movimientos.activo = 1
							&&
							movimientos.fechemi = '${parametro1}'
							&&
							(movimientos.fechpagc like '%${consultaArray[0]}%'
						`
		if (consultaArray.length>1) {
			for(let i=1; i<consultaArray.length; i++){
			    if(consultaArray[i]) {
				    sql += ` OR movimientos.fechpagc like '%${consultaArray[i]}%'`;
				}
			}
			sql += ` )`;
		}else {
			sql += ` )`;
			}
		let arrayResult 				= [];
		let response 					= {};
		let movimientoEncontrado 			= {};
		if (consultaArray.length>0) {
			let movimientosEncontrados 	= await conn.query(sql);
			if (movimientosEncontrados.code) {
	 			response 	= {error: "Error en consulta SQL"};
	 		}else if (movimientosEncontrados.length>0) {
				for (let i = 0; i < movimientosEncontrados.length; i++) {
					movimientoEncontrado 				= movimientosEncontrados[i];
					movimientoEncontrado["movimiento"] 	= await this.getRecordById('movimientos', 
											'movimientos.idmov', movimientoEncontrado.idmov);
					movimientoEncontrado["tipo"] 		= await this.getRecordById('tiposmovimientos', 
											'tiposmovimientos.tipoidmov', movimientoEncontrado.nrofac);
					movimientoEncontrado["topico"] 	= await this.getRecordById('topicos', 
											'topicos.topicoId', movimientoEncontrado.fechemi);
					movimientoEncontrado["autor"] 	= await this.getRecordById('personas', 
				 							'personas.idper', movimientoEncontrado.nrocheq);
					delete movimientoEncontrado["idmov"];
					delete movimientoEncontrado["nrofac"];
					delete movimientoEncontrado["fechemi"];
					delete movimientoEncontrado["nrocheq"];
					arrayResult.push(movimientoEncontrado);
				}
				response 	= {response: arrayResult};	
			}else {
				response 	= {error: "No se encontraron movimientos para esta búsqueda"}
				}

		}else {
			response 		= {error: "No se encontraron movimientos para esta búsqueda"}
			}
		return response;
	},

	buscarmovimientosFullFlex: async function(consultaArray , parametro1){
		let sql 		= `
							SELECT 
							movimientos.idmov,
							movimientos.nrofac,
							movimientos.fechemi,
							movimientos.nrocheq
							FROM movimientos
							WHERE
							movimientos.activo = 1
							&&
							(movimientos.fechpagc like '%${consultaArray[0]}%'
							OR
							movimientos.fechcheq like '%${consultaArray[0]}%'
						`
		if (consultaArray.length>1) {
			for(let i=1; i<consultaArray.length; i++){
			    if(consultaArray[i]) {
				    sql += ` OR movimientos.fechpagc like '%${consultaArray[i]}%'`;
					sql += ` OR movimientos.fechcheq like '%${consultaArray[i]}%'`;
				}
			}
			sql += ` )`;
		}else{sql += ` )`;}
		let arrayResult 				= [];
		let response 					= { };
		let movimientoEncontrado 			= {};
		if (consultaArray.length>0) {
			let movimientosEncontrados 	= await conn.query(sql);
			if (movimientosEncontrados.code) {
	 			response 	= {error: "Error en consulta SQL"};
	 		}else if (movimientosEncontrados.length>0) {
				for (let i = 0; i < movimientosEncontrados.length; i++) {
					movimientoEncontrado 	= movimientosEncontrados[i];
					movimientoEncontrado["movimiento"] 	= await this.getRecordById('movimientos', 
											'movimientos.idmov', movimientoEncontrado.idmov);
					movimientoEncontrado["tipo"] 		= await this.getRecordById('tiposmovimientos', 
											'tiposmovimientos.tipoidmov', movimientoEncontrado.nrofac);
					movimientoEncontrado["topico"] 	= await this.getRecordById('topicos', 
											'topicos.topicoId', movimientoEncontrado.fechemi);
					movimientoEncontrado["autor"] 	= await this.getRecordById('personas', 
				 							'personas.idper', movimientoEncontrado.nrocheq);
					delete movimientoEncontrado["idmov"];
					delete movimientoEncontrado["nrofac"];
					delete movimientoEncontrado["fechemi"];
					delete movimientoEncontrado["nrocheq"];
					arrayResult.push(movimientoEncontrado);
				}
				response 	= {response: arrayResult};	
			}else {
				response 	= {error: "No se encontraron movimientos para esta búsqueda"}
				}
		}else{
			response 		= {error: "No se encontraron movimientos para esta búsqueda"}
			}
		return response;
	},

	eliminarmovimiento: async function(id){
		let sql 		= `
							UPDATE movimientos 
							SET 
							activo = 0 
							WHERE
							movimientos.idmov = '${id}'
						`
		let response 		= {};
		let existemovimiento 	= await this.obtenermovimientoPorId(id);
		if (!existemovimiento.error) {
			let resultado 	= await conn.query(sql);
			if (resultado.code) {
	 			response 	= {error: "Error en consulta SQL"};
	 		}else if (resultado.affectedRows>0) {
				response 	= {response: "Artículo eliminado correctamente"}
			}
		}else {
			response 		= {error: `No existe movimiento con Id: ${id}`}
		}
		return response;
	},
}

module.exports = movimiento;