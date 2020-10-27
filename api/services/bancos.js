let bancos = {

	getRecordById: async function (tabla, idTabla, id) {
		let sql = `
							SELECT *
							FROM ${tabla}
							WHERE
							${idTabla} = ${id}
						`
		let response = { error: "No se encontraron registros" }
		let res = await conn.query(sql);
		if (res.code) {
			response = { error: "Error en consulta SQL" };
		} else if (res.length > 0) {
			response = res[0];
		}
		return response;
	},

	obtenerbancos: async function () {
		let sql = `
		SELECT * FROM bancos INNER JOIN monedas ON bancos.moneda = monedas.idmon where BANCOS.activo =1 order by BANCOS.idbanco asc
						`
		let response = { error: "No se encontraron bancos" }
		let resultado = await conn.query(sql);
		if (resultado.code) {
			response = { error: "Error en consulta SQL" };
		} else if (resultado.length > 0) {
			response = { response: resultado }
		}
		return response;
	},

	obtenerbancosall: async function () {
		let sql = `
		SELECT * FROM bancos INNER JOIN monedas ON bancos.moneda = monedas.idmon order by BANCOS.idbanco asc
						`
		let response = { error: "No se encontraron bancos" }
		let resultado = await conn.query(sql);
		if (resultado.code) {
			response = { error: "Error en consulta SQL" };
		} else if (resultado.length > 0) {
			response = { response: resultado }
		}
		return response;
	},

	obtenerbancosPorId: async function (id) {
		let sql = `
							SELECT * FROM bancos
							WHERE
							bancos.idbanco = '${id}' 
							&& bancos.activo = 1
						`
		let response = { error: `No se encontró bancos con Id: ${id}` }
		let resultado = await conn.query(sql);
		if (resultado.code) {
			response = { error: "Error en consulta SQL" };
		} else if (resultado.length > 0) {
			response = { response: resultado[0] }
		}
		return response;
	},

	crearbancos: async function (bancos) {
		//console.log("viene de html",this.crearbancos)
		let sql = `
					INSERT INTO bancos
					(
					banco,
					moneda,
					cuenta,
					sucursal,					
					activo
					)
					VALUES
					(
					"${bancos.banco}",
					'${bancos.moneda}',
					'${bancos.cuenta}',
					'${bancos.sucursal}',
					1
					)		
				`
		let response = { error: "No se pudo crear bancos" }
		let resultado = await conn.query(sql);
		//console.log(resultado);
		if (resultado.code) {
			response = { error: "Error en consulta SQL" };
		} else if (resultado.insertId) {
			response = { response: "bancos creada correctamente" }
		}
		return response;
	},

	actualizarbancos: async function (bancos, id) {
		let sql = `
					UPDATE bancos
					SET
					banco		= '${bancos.banco}',
					moneda		= '${bancos.moneda}',
					cuenta		= '${bancos.cuenta}',
					sucursal	= '${bancos.sucursal}',
					activo	 	= 1			
					WHERE
					bancos.idbanco = '${id}'
				`
		let response = {};
		let existebancos = await this.obtenerbancosPorId(id);
		if (!existebancos.error) {
			let resultado = await conn.query(sql);

			if (resultado.code) {
				response = { error: "Error en consulta SQL" };
			} else if (resultado.affectedRows > 0) {
				response = { response: "bancos actualizado correctamente" }
			} else {
				response = { error: "No se pudo actualizar el bancos" }
			}
		} else {
			response = { error: `No existe bancos con Id: ${id}` }
		}
		return response;
		//console.log("respose de api",response)
	},

	eliminarbancos: async function (id) {
		let sql = `
							UPDATE bancos 
							SET 
							activo = 0 
							WHERE
							bancos.idbanco = '${id}'
						`
		let response = {};
		let existebancos = await this.obtenerbancosPorId(id);
		if (!existebancos.error) {
			let resultado = await conn.query(sql);
			if (resultado.code) {
				response = { error: "Error en consulta SQL" };
			} else if (resultado.affectedRows > 0) {
				response = { response: "bancos eliminado correctamente" }
			}
		} else {
			response = { error: `No existe bancos con Id: ${id}` }
		}
		return response;
	},
}

module.exports = bancos;