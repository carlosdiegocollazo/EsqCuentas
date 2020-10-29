let cheques = {

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

	obtenercheques: async function () {
		let sql = `
		SELECT * from cheques inner JOIN monedas ON monedas.idmon = cheques.moneda inner JOIN bancos ON bancos.idbanco = cheques.banco where cheques.activo=1 order by cheques.fechemi DESC
						`
		let response = { error: "No se encontraron cheques" }
		let resultado = await conn.query(sql);
		if (resultado.code) {
			response = { error: "Error en consulta SQL" };
		} else if (resultado.length > 0) {
			response = { response: resultado }
		}
		return response;
	},

	obtenerchequesall: async function () {
		let sql = `
		SELECT * from cheques INNER JOIN monedas ON cheques.moneda = monedas.idmon JOIN bancos ON cheques.banco = bancos.idbanco order by cheques.fechemi DESC 		
						`
		let response = { error: "No se encontraron cheques" }
		let resultado = await conn.query(sql);
		if (resultado.code) {
			response = { error: "Error en consulta SQL" };
		} else if (resultado.length > 0) {
			response = { response: resultado }
		}
		return response;
	},

	obtenerchequePorId: async function (id) {
		let sql = `
							SELECT * FROM cheques
							WHERE
							cheques.idcheq = '${id}'
							&& cheques.activo = 1
						`
		let response = { error: `No se encontró cheque con Id: ${id}` }
		let resultado = await conn.query(sql);
		if (resultado.code) {
			response = { error: "Error en consulta SQL" };
		} else if (resultado.length > 0) {
			response = { response: resultado[0] }
		}
		return response;
	},

	crearcheque: async function (cheque) {
		let sql = `
					INSERT INTO cheques
					(
					nrocheq,
					importe,
					banco,
					moneda,
					fechemi,
					fechpag,					
					fechcob,
					activo
					)
					VALUES
					(
					'${cheque.nrocheq}',
					'${cheque.importe}',
					'${cheque.banco}',
					'${cheque.moneda}',
					'${cheque.fechemi}',
					'${cheque.fechpag}',
					'${cheque.fechcob}',
					1
					)		
				`
		let response = { error: "No se pudo crear cheque" }
		let resultado = await conn.query(sql);
		console.log(resultado);
		if (resultado.code) {
			response = { error: "Error en consulta SQL" };
		} else if (resultado.insertId) {
			response = { response: "cheque creada correctamente" }
		}
		return response;
	},

	actualizarcheques: async function (cheque, id) {
		let sql = `
					UPDATE cheques
					SET
					nrocheq			='${cheque.nrocheq}',
					importe			='${cheque.importe}',
					banco			='${cheque.banco}',
					moneda			='${cheque.moneda}',
					fechemi			='${cheque.fechemi}',
					fechpag			='${cheque.fechpag}',
					fechcob			='${cheque.fechcob}',
					activo			=1
					WHERE
					cheques.idcheq = '${id}'
				`
		let response = {};
		let existecheque = await this.obtenerchequePorId(id);
		if (!existecheque.error) {
			let resultado = await conn.query(sql);
			if (resultado.code) {
				response = { error: "Error en consulta SQL" };
			} else if (resultado.affectedRows > 0) {
				response = { response: "cheque actualizado correctamente" }
			} else {
				response = { error: "No se pudo actualizar el cheque" }
			}
		} else {
			response = { error: `No existe cheque con Id: ${id}` }
		}
		return response;
	},

	eliminarcheque: async function (id) {
		let sql = `
							UPDATE cheques 
							SET 
							activo = 0 
							WHERE
							cheques.idcheq = '${id}'
						`
		let response = {};
		let existecheque = await this.obtenerchequePorId(id);
		if (!existecheque.error) {
			let resultado = await conn.query(sql);
			if (resultado.code) {
				response = { error: "Error en consulta SQL" };
			} else if (resultado.affectedRows > 0) {
				response = { response: "cheque eliminado correctamente" }
			}
		} else {
			response = { error: `No existe cheque con Id: ${id}` }
		}
		return response;
	},
}

module.exports = cheques;