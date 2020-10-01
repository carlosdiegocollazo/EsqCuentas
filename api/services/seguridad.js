let seguridad = {
	
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
	
	obtenerseguridad: async function(){
		let sql 		= `
							SELECT * FROM seguridad
						`
		let response 	= {error: "No se encontraron seguridad"}
		let resultado 	= await conn.query(sql);
		if (resultado.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (resultado.length>0) {
			response 	= {response: resultado}
		}
		return response;
	},

	obtenerseguridadPorId: async function(id){
		let sql 		= `
							SELECT * FROM seguridad
							WHERE
							seguridad.idseg = '${id}' 
							&& seguridad.activo = 1
						`
		let response 	= {error: `No se encontró seguridad con Id: ${id}`}
		let resultado 	= await conn.query(sql);
		if (resultado.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (resultado.length>0) {
			response 	= {response: resultado[0]}
		}
		return response;
	},

	crearseguridad: async function(seguridad){
		let sql = `
					INSERT INTO seguridad
					(
					categoria,
					descripcion,					
					activo
					)
					VALUES
					(
					${seguridad.categoria},
					'${seguridad.descripcion}',
					${seguridad.activo}
					)		
				`
		let response 	= {error: "No se pudo crear seguridad"}
		let resultado 	= await conn.query(sql);
		console.log(resultado);
		if (resultado.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (resultado.insertId) {
			response 	= {response: "seguridad creada correctamente"}
		}
		return response;
	},

	actualizarseguridad: async function(seguridad, id){
		let sql = `
					UPDATE seguridad
					SET
					seguridad		= '${seguridad.seguridad}',
					descripcion		= '${seguridad.descripcion}',
					activo	 	= '${seguridad.activo}'
					
					WHERE
					seguridad.idseg = '${id}'
				`
		let response 		= {};
		let existeseguridad 	= await this.obtenerseguridadPorId(id);
		if (!existeseguridad.error) {
			let resultado 	= await conn.query(sql);
			if (resultado.code) {
	 			response 	= {error: "Error en consulta SQL"};
	 		}else if (resultado.affectedRows>0) {
				response 	= {response: "seguridad actualizado correctamente"}
			}else{
				response 	= {error: "No se pudo actualizar el seguridad"}
			}
		}else{
			response 		= {error: `No existe seguridad con Id: ${id}`}
			}
		return response;
	},

	eliminarseguridad: async function(id){
		let sql 		= `
							UPDATE seguridad 
							SET 
							activo = 0 
							WHERE
							seguridad.idseg = '${id}'
						`
		let response 		= {};
		let existeseguridad 	= await this.obtenerseguridadPorId(id);
		if (!existeseguridad.error) {
			let resultado 	= await conn.query(sql);
			if (resultado.code) {
	 			response 	= {error: "Error en consulta SQL"};
	 		}else if (resultado.affectedRows>0) {
				response 	= {response: "seguridad eliminado correctamente"}
			}
		}else {
			response 		= {error: `No existe seguridad con Id: ${id}`}
		}
		return response;
	},
}

module.exports = seguridad;