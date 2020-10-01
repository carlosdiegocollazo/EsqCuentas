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
		let response 	= {error: `No se encontró documento con Id: ${id}`}
		let resultado 	= await conn.query(sql);
		if (resultado.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (resultado.length>0) {
			response 	= {response: resultado[0]}
		}
		return response;
	},

	creardocumento: async function(documento){
		let sql = `
					INSERT INTO documentos
					(
					tipodoc,
					moneda,					
					activo
					)
					VALUES
					(
					'${documento.tipodoc}',
					'${documento.moneda}',
					'${documento.activo}'
					)		
				`
		let response 	= {error: "No se pudo crear documento"}
		let resultado 	= await conn.query(sql);
		console.log(resultado);
		if (resultado.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (resultado.insertId) {
			response 	= {response: "documento creada correctamente"}
		}
		return response;
	},

	actualizardocumento: async function(documento, id){
		let sql = `
					UPDATE documentos
					SET
					tipodoc		= '${documento.tipodoc}',
					moneda		= '${documento.moneda}',
					activo	 	= '${documento.activo}'
					
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
				response 	= {response: "documento actualizado correctamente"}
			}else{
				response 	= {error: "No se pudo actualizar el documento"}
			}
		}else{
			response 		= {error: `No existe documento con Id: ${id}`}
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
				response 	= {response: "documento eliminado correctamente"}
			}
		}else {
			response 		= {error: `No existe documento con Id: ${id}`}
		}
		return response;
	},
}

module.exports = documentos;