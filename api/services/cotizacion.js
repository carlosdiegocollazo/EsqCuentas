let cotizacion = {
	
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
	
	obtenercotizacion: async function(){
		let sql 		= `
							SELECT * FROM cotizacion where activo=1	
						`
		let response 	= {error: "No se encontraron cotizaciones"}
		let resultado 	= await conn.query(sql);
		if (resultado.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (resultado.length>0) {
			response 	= {response: resultado}
		}
		return response;
	},

	obtenercotizacionall: async function(){
		let sql 		= `
							SELECT * FROM cotizacion
						`
		let response 	= {error: "No se encontraron cotizaciones"}
		let resultado 	= await conn.query(sql);
		if (resultado.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (resultado.length>0) {
			response 	= {response: resultado}
		}
		return response;
	},

	obtenercotizaPorId: async function(id){
		let sql 		= `
							SELECT * FROM cotizacion
							WHERE
							cotizacion.idcot = '${id}'
							&& cotizacion.activo = 1
						`
		let response 	= {error: `No se encontró cotizacion con Id: ${id}`}
		let resultado 	= await conn.query(sql);
		if (resultado.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (resultado.length>0) {
			response 	= {response: resultado[0]}
		}
		return response;
	},
	

	crearcotiza: async function(cotiza){
		let sql = `
					INSERT INTO cotizacion
					(
					fechcot,
					moneda,
					cotizacion,
					deldia,					
					activo
					)
					VALUES
					(
					'${cotiza.fechcot}',
					'${cotiza.moneda}',
					'${cotiza.cotizacion}',
					'${cotiza.deldia}',
					1
					)		
				`
		let response 	= {error: "No se pudo crear cotizacion"}
		let resultado 	= await conn.query(sql);
		console.log(resultado);
		if (resultado.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (resultado.insertId) {
			response 	= {response: "cotizacion creada correctamente"}
		}
		return response;
	},

	

	eliminarcotiza: async function(id){
		let sql 		= `
							UPDATE cotizacion 
							SET 
							activo = 0 
							WHERE
							cotizacion.idcot = '${id}'
						`
		let response 		= {};
		let existecotiza 	= await this.obtenercotizaPorId(id);
		if (!existecotiza.error) {
			let resultado 	= await conn.query(sql);
			if (resultado.code) {
	 			response 	= {error: "Error en consulta SQL"};
	 		}else if (resultado.affectedRows>0) {
				response 	= {response: "cotiza eliminado correctamente"}
			}
		}else {
			response 		= {error: `No existe cotizacion con Id: ${id}`}
		}
		return response;
	},
}

module.exports = cotizacion;