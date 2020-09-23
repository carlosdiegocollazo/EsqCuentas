let Articulo = {
	
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
	
	obtenerArticulos: async function(){
		let sql 		= `
							SELECT * FROM articulos
							WHERE
							articulos.articuloActivo = 1
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

	obtenerArticuloPorId: async function(id){
		let sql 		= `
							SELECT * FROM articulos
							WHERE
							articulos.articuloId = '${id}' 
							&& articulos.articuloActivo = 1
						`
		let response 	= {error: `No se encontró articulo con Id: ${id}`}
		let resultado 	= await conn.query(sql);
		if (resultado.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (resultado.length>0) {
			response 	= {response: resultado[0]}
		}
		return response;
	},

	obtenerArticuloPorIdFull: async function(id){
		let idArticulo 	= id;
		let sql 		= `
							SELECT
							articulos.articuloId,
							articulos.articuloTipo,
							articulos.articuloTopico,
							usuarios.usuarioId
							FROM articulos
							JOIN usuarios
							ON articulos.articuloAutor = usuarios.usuarioId
							WHERE (articulos.articuloId = '${id}' 
							&& articulos.articuloActivo = 1)
						`
		let response 	= {}
		let result 		= {}
		let resultado 	= await conn.query(sql);
		if (resultado.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (resultado.length>0) {
			let idUsuario 		= resultado[0].usuarioId;
			let idTipo 			= resultado[0].articuloTipo;
			let idTopico 		= resultado[0].articuloTopico;
			result["articulo"] 	= await this.getRecordById('articulos', 
										'articulos.articuloId', idArticulo);
			result["tipo"] 		= await this.getRecordById('tiposarticulos', 
										'tiposarticulos.tipoArticuloId', idTipo);
			result["topico"] 	= await this.getRecordById('topicos', 
										'topicos.topicoId', idTopico);
			result["autor"] 	= await this.getRecordById('usuarios', 
			 							'usuarios.usuarioId', idUsuario);
			response 			= {response: result}
		}else {
			response 			= {error: "No se encontró artículo"}
		}
		return response;
	},

	obtenerArticuloPorUsuarioId: async function(idUsuarioReq, idUsuarioToken){
		let response 		= { };
		if (idUsuarioReq == idUsuarioToken) {
			let idUsuario 	= idUsuarioReq;
			let sql 		= `
								SELECT
								articulos.articuloId,
								articulos.articuloTipo,
								articulos.articuloTopico,
								usuarios.usuarioId
								FROM articulos
								JOIN usuarios
								ON articulos.articuloAutor = usuarios.usuarioId
								WHERE (articulos.articuloAutor = '${idUsuario}' 
								&& articulos.articuloActivo = 1)
							`
			let resultados 	= await conn.query(sql);
			if (resultados.code) {
	 			response 	= {error: "Error en consulta SQL"};
	 		}else {
				let arrayResult 			= [];
				let articuloEncontrado 		= {};
				let articulosEncontrados 	= await conn.query(sql);
				if (articulosEncontrados.length>0) {
					for (let i = 0; i < articulosEncontrados.length; i++) {
						articuloEncontrado 	= articulosEncontrados[i];
						articuloEncontrado["articulo"] 	= await this.getRecordById('articulos', 
												'articulos.articuloId', articuloEncontrado.articuloId);
						articuloEncontrado["tipo"] 		= await this.getRecordById('tiposarticulos', 
												'tiposarticulos.tipoArticuloId', articuloEncontrado.articuloTipo);
						articuloEncontrado["topico"] 	= await this.getRecordById('topicos', 
												'topicos.topicoId', articuloEncontrado.articuloTopico);
						articuloEncontrado["autor"] 	= await this.getRecordById('usuarios', 
					 							'usuarios.usuarioId', articuloEncontrado.usuarioId);
						delete articuloEncontrado["articuloId"];
						delete articuloEncontrado["articuloTipo"];
						delete articuloEncontrado["articuloTopico"];
						delete articuloEncontrado["usuarioId"];
						arrayResult.push(articuloEncontrado);
					}
					response 	= {response: arrayResult};	
				}else {
					response 	= {error: "No se encontraron articulos de este autor"}
					}
			}
		}else{
			response 		= {error: "Usuario Infractor: FUCKOFF !!"} 
			}
		return response;
	},

	obtenerArticulosPorTopicosUsuarioId: async function(id){
		let sql 		= `
							SELECT
							preferencias.preferenciaUsuario,
							preferencias.preferenciaTopico,
							articulos.articuloId,
							articulos.articuloTipo,
							articulos.articuloTopico,
							articulos.articuloAutor
							FROM preferencias
							JOIN articulos
							ON preferencias.preferenciaTopico = articulos.articuloTopico
							WHERE (preferencias.preferenciaUsuario = '${id}' 
							&& articulos.articuloActivo = 1)
						`
		let response 					= {};
		let arrayResult 				= [];
		let articuloEncontrado 			= {};
		let Usuario 					= require('../services/usuarios'); 
		let existeUsuario 				= await Usuario.obtenerUsuarioPorId(id);
		if (!existeUsuario.error) {
			let articulosEncontrados 	= await conn.query(sql);
			if (articulosEncontrados.code) {
	 			response 				= {error: "Error en consulta SQL"};
	 		}else if (articulosEncontrados.length>0) {
				for (let i = 0; i < articulosEncontrados.length; i++) {
					articuloEncontrado 				= articulosEncontrados[i];
					articuloEncontrado["articulo"] 	= await this.getRecordById('articulos', 
											'articulos.articuloId', articuloEncontrado.articuloId);
					articuloEncontrado["tipo"] 		= await this.getRecordById('tiposarticulos', 
											'tiposarticulos.tipoArticuloId', articuloEncontrado.articuloTipo);
					articuloEncontrado["topico"] 	= await this.getRecordById('topicos', 
											'topicos.topicoId', articuloEncontrado.articuloTopico);
					articuloEncontrado["autor"] 	= await this.getRecordById('usuarios', 
				 							'usuarios.usuarioId', articuloEncontrado.articuloAutor);
					delete articuloEncontrado["articuloId"];
					delete articuloEncontrado["articuloTipo"];
					delete articuloEncontrado["articuloTopico"];
					delete articuloEncontrado["articuloAutor"];
					delete articuloEncontrado["preferenciaUsuario"];
					delete articuloEncontrado["preferenciaTopico"];
					arrayResult.push(articuloEncontrado);
				}
				response 	= {response: arrayResult};	
			}else {
				response 	= {error: "No se encontraron articulos para las preferencias de este usuario"}
				}
		}else{
			response 		= {error: `No existe usuario con Id: ${id}`}
			}	
		return response;
	},

	crearArticulo: async function(articulo){
		let sql = `
					INSERT INTO articulos
					(
					articuloFecha,
					articuloEstado,					
					articuloTipo,
					articuloTopico,
					articuloTitulo,
					articuloResumen,
					articuloKeywords,
					articuloAutor,
					articuloArchivo,
					articuloPuntaje
					)
					VALUES
					(
					NOW(),
					'${articulo.articuloEstado}',
					'${articulo.articuloTipo}',
					'${articulo.articuloTopico}',
					'${articulo.articuloTitulo}',
					'${articulo.articuloResumen}',
					'${articulo.articuloKeywords}',
					'${articulo.articuloAutor}',
					'${articulo.articuloArchivo}',
					'${articulo.articuloPuntaje}'
					)		
				`
		let response 	= {error: "No se pudo crear el articulo"}
		let resultado 	= await conn.query(sql);
		if (resultado.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (resultado.insertId) {
			response 	= {response: "Articulo creado correctamente"}
		}
		return response;
	},

	actualizarArticulo: async function(articulo, id){
		let sql = `
					UPDATE articulos
					SET
					articuloFecha 		= NOW(),
					articuloTopico		= '${articulo.articuloTopico}',
					articuloTitulo		= '${articulo.articuloTitulo}',
					articuloResumen		= '${articulo.articuloResumen}',
					articuloKeywords	= '${articulo.articuloKeywords}',
					articuloAutor		= '${articulo.articuloAutor}',
					articuloArchivo		= '${articulo.articuloArchivo}',
					articuloPuntaje 	= '${articulo.articuloPuntaje}'
					
					WHERE
					articulos.articuloId = '${id}'
				`
		let response 		= {};
		let existeArticulo 	= await this.obtenerArticuloPorId(id);
		if (!existeArticulo.error) {
			let resultado 	= await conn.query(sql);
			if (resultado.code) {
	 			response 	= {error: "Error en consulta SQL"};
	 		}else if (resultado.affectedRows>0) {
				response 	= {response: "Articulo actualizado correctamente"}
			}else{
				response 	= {error: "No se pudo actualizar el articulo"}
			}
		}else{
			response 		= {error: `No existe articulo con Id: ${id}`}
			}
		return response;
	},

	publicarArticulo: async function(id){
		let sql 		= `
							UPDATE articulos 
							SET 
							articuloEstado = "Publicado" 
							WHERE
							articulos.articuloId = '${id}'
						`
		let response 		= {};
		let existeArticulo 	= await this.obtenerArticuloPorId(id);
		if (!existeArticulo.error) {
			let resultado 	= await conn.query(sql);
			if (resultado.code) {
	 			response 	= {error: "Error en consulta SQL"};
	 		}else if (resultado.affectedRows>0) {
				response 	= {response: "Artículo publicado correctamente"}
			}
		}else{
			response 		= {error: `No existe articulo con Id: ${id}`}
			}
		return response;
	},

	buscarArticulos: async function(consultaArray , parametro1){
		let sql 		= `
							SELECT *
							FROM articulos
							WHERE
							articulos.articuloActivo = 1
							&&
							articulos.articuloTopico = '${parametro1}'
							&&
							articulos.articuloTitulo like '%${consultaArray[0]}%'
							`
		for(let i=1; i<consultaArray.length; i++){
		    if(consultaArray[i]) {
			     sql += ` OR articulos.articuloTitulo like '%${consultaArray[i]}%'`;
			}
		}
		let response 		= {error: "No se encontraron articulos para esta búsqueda"}
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

	buscarArticulosFull: async function(consultaArray , parametro1){
		let sql 		= `
							SELECT 
							articulos.articuloId,
							articulos.articuloTipo,
							articulos.articuloTopico,
							articulos.articuloAutor
							FROM articulos
							WHERE
							articulos.articuloActivo = 1
							&&
							articulos.articuloTopico = '${parametro1}'
							&&
							(articulos.articuloTitulo like '%${consultaArray[0]}%'
						`
		if (consultaArray.length>1) {
			for(let i=1; i<consultaArray.length; i++){
			    if(consultaArray[i]) {
				    sql += ` OR articulos.articuloTitulo like '%${consultaArray[i]}%'`;
				}
			}
			sql += ` )`;
		}else {
			sql += ` )`;
			}
		let arrayResult 				= [];
		let response 					= {};
		let articuloEncontrado 			= {};
		if (consultaArray.length>0) {
			let articulosEncontrados 	= await conn.query(sql);
			if (articulosEncontrados.code) {
	 			response 	= {error: "Error en consulta SQL"};
	 		}else if (articulosEncontrados.length>0) {
				for (let i = 0; i < articulosEncontrados.length; i++) {
					articuloEncontrado 				= articulosEncontrados[i];
					articuloEncontrado["articulo"] 	= await this.getRecordById('articulos', 
											'articulos.articuloId', articuloEncontrado.articuloId);
					articuloEncontrado["tipo"] 		= await this.getRecordById('tiposarticulos', 
											'tiposarticulos.tipoArticuloId', articuloEncontrado.articuloTipo);
					articuloEncontrado["topico"] 	= await this.getRecordById('topicos', 
											'topicos.topicoId', articuloEncontrado.articuloTopico);
					articuloEncontrado["autor"] 	= await this.getRecordById('usuarios', 
				 							'usuarios.usuarioId', articuloEncontrado.articuloAutor);
					delete articuloEncontrado["articuloId"];
					delete articuloEncontrado["articuloTipo"];
					delete articuloEncontrado["articuloTopico"];
					delete articuloEncontrado["articuloAutor"];
					arrayResult.push(articuloEncontrado);
				}
				response 	= {response: arrayResult};	
			}else {
				response 	= {error: "No se encontraron articulos para esta búsqueda"}
				}

		}else {
			response 		= {error: "No se encontraron articulos para esta búsqueda"}
			}
		return response;
	},

	buscarArticulosFullFlex: async function(consultaArray , parametro1){
		let sql 		= `
							SELECT 
							articulos.articuloId,
							articulos.articuloTipo,
							articulos.articuloTopico,
							articulos.articuloAutor
							FROM articulos
							WHERE
							articulos.articuloActivo = 1
							&&
							(articulos.articuloTitulo like '%${consultaArray[0]}%'
							OR
							articulos.articuloKeywords like '%${consultaArray[0]}%'
						`
		if (consultaArray.length>1) {
			for(let i=1; i<consultaArray.length; i++){
			    if(consultaArray[i]) {
				    sql += ` OR articulos.articuloTitulo like '%${consultaArray[i]}%'`;
					sql += ` OR articulos.articuloKeywords like '%${consultaArray[i]}%'`;
				}
			}
			sql += ` )`;
		}else{sql += ` )`;}
		let arrayResult 				= [];
		let response 					= { };
		let articuloEncontrado 			= {};
		if (consultaArray.length>0) {
			let articulosEncontrados 	= await conn.query(sql);
			if (articulosEncontrados.code) {
	 			response 	= {error: "Error en consulta SQL"};
	 		}else if (articulosEncontrados.length>0) {
				for (let i = 0; i < articulosEncontrados.length; i++) {
					articuloEncontrado 	= articulosEncontrados[i];
					articuloEncontrado["articulo"] 	= await this.getRecordById('articulos', 
											'articulos.articuloId', articuloEncontrado.articuloId);
					articuloEncontrado["tipo"] 		= await this.getRecordById('tiposarticulos', 
											'tiposarticulos.tipoArticuloId', articuloEncontrado.articuloTipo);
					articuloEncontrado["topico"] 	= await this.getRecordById('topicos', 
											'topicos.topicoId', articuloEncontrado.articuloTopico);
					articuloEncontrado["autor"] 	= await this.getRecordById('usuarios', 
				 							'usuarios.usuarioId', articuloEncontrado.articuloAutor);
					delete articuloEncontrado["articuloId"];
					delete articuloEncontrado["articuloTipo"];
					delete articuloEncontrado["articuloTopico"];
					delete articuloEncontrado["articuloAutor"];
					arrayResult.push(articuloEncontrado);
				}
				response 	= {response: arrayResult};	
			}else {
				response 	= {error: "No se encontraron articulos para esta búsqueda"}
				}
		}else{
			response 		= {error: "No se encontraron articulos para esta búsqueda"}
			}
		return response;
	},

	buscarArticulosPublicadosFullFlex: async function(consultaArray , parametro1){
		let sql 		= `
							SELECT 
							articulos.articuloId,
							articulos.articuloTipo,
							articulos.articuloTopico,
							articulos.articuloAutor
							FROM articulos
							WHERE
							articulos.articuloActivo = 1
							&&
							articulos.articuloEstado = 'Publicado'
							&&
							(articulos.articuloTitulo like '%${consultaArray[0]}%'
							OR
							articulos.articuloKeywords like '%${consultaArray[0]}%'
						`
		if (consultaArray.length>1) {
			for(let i=1; i<consultaArray.length; i++){
			    if(consultaArray[i]) {
				    sql += ` OR articulos.articuloTitulo like '%${consultaArray[i]}%'`;
					sql += ` OR articulos.articuloKeywords like '%${consultaArray[i]}%'`;
				}
			}
			sql += ` )`;
		}else{sql += ` )`;}
		let arrayResult 				= [];
		let response 					= { };
		let articuloEncontrado 			= {};
		if (consultaArray.length>0) {
			let articulosEncontrados 	= await conn.query(sql);
			if (articulosEncontrados.code) {
	 			response 	= {error: "Error en consulta SQL"};
	 		}else if (articulosEncontrados.length>0) {
				for (let i = 0; i < articulosEncontrados.length; i++) {
					articuloEncontrado 	= articulosEncontrados[i];
					articuloEncontrado["articulo"] 	= await this.getRecordById('articulos', 
											'articulos.articuloId', articuloEncontrado.articuloId);
					articuloEncontrado["tipo"] 		= await this.getRecordById('tiposarticulos', 
											'tiposarticulos.tipoArticuloId', articuloEncontrado.articuloTipo);
					articuloEncontrado["topico"] 	= await this.getRecordById('topicos', 
											'topicos.topicoId', articuloEncontrado.articuloTopico);
					articuloEncontrado["autor"] 	= await this.getRecordById('usuarios', 
				 							'usuarios.usuarioId', articuloEncontrado.articuloAutor);
					delete articuloEncontrado["articuloId"];
					delete articuloEncontrado["articuloTipo"];
					delete articuloEncontrado["articuloTopico"];
					delete articuloEncontrado["articuloAutor"];
					arrayResult.push(articuloEncontrado);
				}
				response 	= {response: arrayResult};	
			}else {
				response 	= {error: "No se encontraron articulos para esta búsqueda"}
				}
		}else{
			response 		= {error: "No se encontraron articulos para esta búsqueda"}
			}
		return response;
	},

	eliminarArticulo: async function(id){
		let sql 		= `
							UPDATE articulos 
							SET 
							articuloActivo = 0 
							WHERE
							articulos.articuloId = '${id}'
						`
		let response 		= {};
		let existeArticulo 	= await this.obtenerArticuloPorId(id);
		if (!existeArticulo.error) {
			let resultado 	= await conn.query(sql);
			if (resultado.code) {
	 			response 	= {error: "Error en consulta SQL"};
	 		}else if (resultado.affectedRows>0) {
				response 	= {response: "Artículo eliminado correctamente"}
			}
		}else {
			response 		= {error: `No existe articulo con Id: ${id}`}
		}
		return response;
	},
}

module.exports = Articulo;