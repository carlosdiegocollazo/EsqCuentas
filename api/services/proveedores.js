let proveedor = {
	
	getRecordByid: async function (tabla, idTabla, id){
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

	obtenerproveedores: async function(){
		let sql 		= `
		SELECT * FROM proveedores INNER JOIN monedas ON proveedores.moneda = monedas.idmon where proveedores.activo =1 order by proveedores.idpro asc
						`
		let response 	= {error: "No se encontraron proveedores"}
		let resultado 	= await conn.query(sql);
		if (resultado.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (resultado.length>0) {
			response 	= {response: resultado}
			}
		return response;
	},

	obtenerproveedoresall: async function(){
		let sql 		= `
		SELECT * FROM proveedores INNER JOIN monedas ON proveedores.moneda = monedas.idmon order by proveedores.idpro asc
						`
		let response 	= {error: "No se encontraron proveedores"}
		let resultado 	= await conn.query(sql);
		if (resultado.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (resultado.length>0) {
			response 	= {response: resultado}
			}
		return response;
	},

	obtenerproveedorPorid: async function (id){
	 let sql = `
	  			SELECT * FROM proveedores
	  			WHERE 
	  			proveedores.idpro = '${id}' 
	  			&& proveedores.activo = 1
	 		`
	 let proveedores 	= []
	 let response 	= {error: `No existe el proveedor con ID: ${id}`}
	 proveedores 		= await conn.query(sql)
	 if (proveedores.code) {
	 	response 	= {error: "Error en consulta SQL"};
	 }else if (proveedores.length > 0) {
	 	response 	= {response: proveedores[0]}
	 }
	 return response;
	},

	obtenerproveedorPorEmail: async function (mail){
	 let sql = `
	  			SELECT proveedores.idpro 
	  			FROM proveedores
	  			WHERE 
	  			proveedores.email = '${mail}'
	 		`
	 let proveedores 	= []
	 let response 	= {error: `No existe el proveedor con mail : ${mail}`}
	 proveedores 		= await conn.query(sql)
	 if (proveedores.code) {
	 	response 	= {error: "Error en consulta SQL"};
	 }else if (proveedores.length > 0) {
	 	response 	= {response: proveedores[0]}
	 }
	 return response;
	},

	crearproveedor: async function(proveedor){
		let sql = `
					INSERT INTO proveedores
					  		(
							rutced,
							razon,
							fantasia,
							email,
							nombre,
							apellido,
							feching,
							telefono,
							direccion,
							ciudad,
							moneda,
							saldoinicial,
							saldototal,
							retorno,
							fechret,
							retactivo,
							observaciones,
							activo
							 )
		  			VALUES
		  					(
							'${proveedor.rutced}',
							'${proveedor.razon}',
							'${proveedor.fantasia}',
							'${proveedor.email}',
							'${proveedor.nombre}',
							'${proveedor.apellido}',
							'${proveedor.feching}',
							'${proveedor.telefono}',
							'${proveedor.direccion}',
							'${proveedor.ciudad}',
							'${proveedor.moneda}',
							'${proveedor.saldoinicial}',
							'${proveedor.saldototal}',
							'${proveedor.retorno}',
							'${proveedor.fechret}',
							'${proveedor.retactivo}',
							'${proveedor.observaciones}',
							1
							)
				`
		let response 		= {error: "No se pudo crear el proveedor"}
		let mail 			= proveedor.email;
		let existeproveedor 	= await this.obtenerproveedorPorEmail(mail);
		if (existeproveedor.error) {
			try {
				let resultado 	= await conn.query(sql);
				if (resultado.code) {
		 			response 	= {error: "Error en consulta SQL"};
		 		}else if (resultado.insertid) {
					response 	= {response: "proveedor creado correctamente"}
				}
			} catch(error) {
				console.log(error);
				}
		}else {
			response 			= {error: `Ya existe proveedor con email : ${mail}`}
			}
		return response;
	},

	actualizarproveedor: async function(proveedor, id){
		let sql 		= `
							UPDATE proveedores 
							SET 
								rutced			= '${proveedor.rutced}',
								razon			= '${proveedor.razon}',
								fantasia		= '${proveedor.fantasia}',
								nombre			= '${proveedor.nombre}',
								apellido		= '${proveedor.apellido}',
								feching		= '${proveedor.feching}',
								telefono	 	= '${proveedor.telefono}',
								direccion	 	= '${proveedor.direccion}',
								ciudad 			= '${proveedor.ciudad}',
								moneda 			= '${proveedor.moneda}',
								saldoinicial 	= '${proveedor.sadoinicial}',
								saldototal		= '${proveedor.saldototal}',
								retorno			= '${proveedor.retorno}',
								fechret			= '${proveedor.fechret}',
								retactivo 		= '${proveedor.retactivo}',
								observaciones 	= '${proveedor.observaciones}',
								1
							
							WHERE
							proveedores.idpro = '${id}'
						`
		let response 		= {error: "No se pudo actualizar proveedor"}
		let existeproveedor 	= await this.obtenerproveedorPorid(id);
		if (!existeproveedor.error) {
			let resultado 	= await conn.query(sql);
			if (resultado.code) {
	 			response 	= {error: "Error en consulta SQL"};
	 		}else if (resultado.affectedRows>0) {
				response 	= {response: "proveedor actualizado correctamente"}
			}
		}else{
			response 		= {error: `No existe proveedor con id: ${id}`}
			}
		return response;
	},	

	eliminarproveedor: async function(id){
		let sql 		= `
							UPDATE proveedores 
							SET 
							activo = 0 
							WHERE
							proveedores.idpro = '${id}'
						`
		let response 			= {error: "No se pudo eliminar proveedor"}
		let existeproveedor 		= await this.obtenerproveedorPorid(id);
		if (!existeproveedor.error) {
			let resultado 		= await conn.query(sql);
			if (resultado.code) {
	 			response 		= {error: "Error en consulta SQL"};
	 		}else if (resultado.affectedRows>0) {
					response 	= {response: "proveedor eliminado correctamente"}
				}
		}else {
			response 			= {error: `No existe proveedor con id: ${id}`}
			}
		return response;
	},

}

module.exports = proveedor;