let monedas = {
	
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
	
	obtenermonedas: async function(){
		let sql 		= `
							SELECT * FROM monedas where activo=1
						`
		let response 	= {error: "No se encontraron monedas"}
		let resultado 	= await conn.query(sql);
		if (resultado.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (resultado.length>0) {
			response 	= {response: resultado}
		}
		return response;
	},

	obtenermonedasall: async function(){
		let sql 		= `
							SELECT * FROM monedas
						`
		let response 	= {error: "No se encontraron monedas"}
		let resultado 	= await conn.query(sql);
		if (resultado.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (resultado.length>0) {
			response 	= {response: resultado}
		}
		return response;
	},

	obtenermonedaPorId: async function(id){
		let sql 		= `
							SELECT * FROM monedas
							WHERE
							monedas.idmon = '${id}' 
							&& monedas.activo = 1
						`
		let response 	= {error: `No se encontró moneda con Id: ${id}`}
		let resultado 	= await conn.query(sql);
		if (resultado.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (resultado.length>0) {
			response 	= {response: resultado[0]}
		}
		return response;
	},

	crearmoneda: async function(moneda){
		let sql = `
					INSERT INTO monedas
					(
					moneda,
					divide,					
					activo
					)
					VALUES
					(
					"${moneda.moneda}",
					'${moneda.divide}',
					'${moneda.activo}'
					)		
				`
		let response 	= {error: "No se pudo crear moneda"}
		let resultado 	= await conn.query(sql);
		console.log(resultado);
		if (resultado.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (resultado.insertId) {
			response 	= {response: "moneda creada correctamente"}
		}
		return response;
	},

	actualizarmoneda: async function(moneda, id){
		let sql = `
					UPDATE monedas
					SET
					moneda		= '${moneda.moneda}',
					divide		= '${moneda.divide}',
					activo	 	= '${moneda.activo}'			
					WHERE
					monedas.idmon = '${id}'
				`
		let response 		= {};
		let existemoneda 	= await this.obtenermonedaPorId(id);
		if (!existemoneda.error) {
			let resultado 	= await conn.query(sql);
			if (resultado.code) {
	 			response 	= {error: "Error en consulta SQL"};
	 		}else if (resultado.affectedRows>0) {
				response 	= {response: "moneda actualizado correctamente"}
			}else{
				response 	= {error: "No se pudo actualizar el moneda"}
			}
		}else{
			response 		= {error: `No existe moneda con Id: ${id}`}
			}
		return response;
	},

	eliminarmoneda: async function(id){
		let sql 		= `
							UPDATE monedas 
							SET 
							activo = 0 
							WHERE
							monedas.idmon = '${id}'
						`
		let response 		= {};
		let existemoneda 	= await this.obtenermonedaPorId(id);
		if (!existemoneda.error) {
			let resultado 	= await conn.query(sql);
			if (resultado.code) {
	 			response 	= {error: "Error en consulta SQL"};
	 		}else if (resultado.affectedRows>0) {
				response 	= {response: "moneda eliminado correctamente"}
			}
		}else {
			response 		= {error: `No existe moneda con Id: ${id}`}
		}
		return response;
	},
}

module.exports = monedas;