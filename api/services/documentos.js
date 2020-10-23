let documentos = {
	
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
	
	obtenerdocumentos: async function(){
		let sql 		= `
							SELECT * FROM documentos where activo=1
						`
		let response 	= {error: "No se encontraron documentos"}
		let resultado 	= await conn.query(sql);
		if (resultado.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (resultado.length>0) {
			response 	= {response: resultado}
		}
		return response;
	},

	obtenerdocumentosall: async function(){
		let sql 		= `
							SELECT * FROM documentos  
						`
		let response 	= {error: "No se encontraron documentos"}
		let resultado 	= await conn.query(sql);
		if (resultado.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (resultado.length>0) {
			response 	= {response: resultado}
		}
		return response;
	},

	obtenerdocumentoPorId: async function(id){
		let sql 		= `
							SELECT * FROM documentos
							WHERE
							documentos.idtipdoc = '${id}' 
							&& documentos.activo = 1
						`
		let response 	= {error: `No se encontró documentos con Id: ${id}`}
		let resultado 	= await conn.query(sql);
		if (resultado.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (resultado.length>0) {
			response 	= {response: resultado[0]}
		}
		return response;
	},

	creardocumentos: async function(documentos){
		let sql = `
					INSERT INTO documentos
					(
					tipodoc,
					moneda,					
					activo
					)
					VALUES
					(
					'${documentos.tipodoc}',
					'${documentos.moneda}',
					'${documentos.activo}'
					)		
				`
		let response 	= {error: "No se pudo crear documentos"}
		let resultado 	= await conn.query(sql);
		console.log("resultado de api",resultado);
		if (resultado.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (resultado.insertId) {
			response 	= {response: "documentos creado correctamente"}
		}
		return response;
		console.log("response de la api",response)
	},

	actualizardocumentos: async function(documentos, id){
		let sql = `
					UPDATE documentos
					SET
					tipodoc		= '${documentos.tipodoc}',
					moneda		= '${documentos.moneda}',
					activo	 	= 1
					
					WHERE
					documentos.idtipdoc = '${id}'
				`
		let response 		= {};
		let existedocumento 	= await this.obtenerdocumentoPorId(id);
		if (!existedocumento.error) {
			let resultado 	= await conn.query(sql);
			if (resultado.code) {
	 			response 	= {error: "Error en consulta SQL"};
	 		}else if (resultado.affectedRows>0) {
				response 	= {response: "documentos actualizado correctamente"}
			}else{
				response 	= {error: "No se pudo actualizar el documentos"}
			}
		}else{
			response 		= {error: `No existe documentos con Id: ${id}`}
			}
		return response;
	},

	eliminardocumento: async function(id){
		let sql 		= `
							UPDATE documentos 
							SET 
							activo = 0 
							WHERE
							documentos.idtipdoc = '${id}'
						`
		let response 		= {};
		let existedocumento 	= await this.obtenerdocumentoPorId(id);
		if (!existedocumento.error) {
			let resultado 	= await conn.query(sql);
			if (resultado.code) {
	 			response 	= {error: "Error en consulta SQL"};
	 		}else if (resultado.affectedRows>0) {
				response 	= {response: "documentos eliminado correctamente"}
			}
		}else {
			response 		= {error: `No existe documentos con Id: ${id}`}
		}
		return response;
	},
}

module.exports = documentos;