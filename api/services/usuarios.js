let Usuario = {
	
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

	usuarioLogin: async function(usuario, password){
		let sql =  `
				SELECT * 
				FROM usuarios 
				WHERE usuarios.usuarioEmail = '${usuario}'
				&&
				usuarios.usuarioPassword =MD5('${password}')
				&&
				usuarios.usuarioActivo = 1
			`
		let response = {error: "Usuario / Contraseña incorrectos"}
		let usuarios = await conn.query(sql);
		try {
			if (usuarios.length>0) {
				let usuario 	= usuarios[0];
				const payload 	= {usuario:  usuario};
				const token 	= jwt.sign(payload, conn.llave, {expiresIn: 1800});
				response 		= {response: usuario,token: token};
			}
		} catch(e) {
			console.log(e);
			}
		return response;
	},

	obtenerUsuarios: async function(){
		let sql 		= `
							SELECT * FROM usuarios
							WHERE usuarios.usuarioActivo = 1
						`
		let response 	= {error: "No se encontraron usuarios"}
		let resultado 	= await conn.query(sql);
		if (resultado.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (resultado.length>0) {
			response 	= {response: resultado}
			}
		return response;
	},

	obtenerUsuarioPorId: async function (id){
	 let sql = `
	  			SELECT * FROM usuarios
	  			WHERE 
	  			usuarios.usuarioId = '${id}' 
	  			&& usuarios.usuarioActivo = 1
	 		`
	 let usuarios 	= []
	 let response 	= {error: `No existe el usuario con ID: ${id}`}
	 usuarios 		= await conn.query(sql)
	 if (usuarios.code) {
	 	response 	= {error: "Error en consulta SQL"};
	 }else if (usuarios.length > 0) {
	 	response 	= {response: usuarios[0]}
	 }
	 return response;
	},

	obtenerUsuarioPorIdFull: async function(id){
		let idUsuario 	= id;
		let sql 		= `
							SELECT
							usuarios.usuarioId,
							usuarios.usuarioOrg,
							usuarios.usuarioRol
							FROM usuarios
							WHERE (usuarios.usuarioId = '${id}' 
							&& usuarios.usuarioActivo = 1)
						`
		let response 	= {}
		let result 		= {}
		let resultado 	= await conn.query(sql);
		if (resultado.code) {
	 		response 	= {error: "Error en consulta SQL"};
	 	}else if (resultado.length>0) {
			let idOrg 	= resultado[0].usuarioOrg;
			let idRol 	= resultado[0].usuarioRol;
			result["usuario"] 		= await this.getRecordById('usuarios', 
			 							'usuarios.usuarioId', idUsuario);
			result["organizacion"] 	= await this.getRecordById('organizaciones', 
										'organizaciones.organizacionId', idOrg);
			result["rol"] 			= await this.getRecordById('roles', 
			 							'roles.rolId', idRol);
			response 				= {response: result}
		}else {
			response 				= {error: `No se encontró usuario con Id: ${id}`}
		}
		return response;
	},

	obtenerUsuarioPorEmail: async function (mail){
	 let sql = `
	  			SELECT usuarios.usuarioId 
	  			FROM usuarios
	  			WHERE 
	  			usuarios.usuarioEmail = '${mail}'
	 		`
	 let usuarios 	= []
	 let response 	= {error: `No existe el usuario con mail : ${mail}`}
	 usuarios 		= await conn.query(sql)
	 if (usuarios.code) {
	 	response 	= {error: "Error en consulta SQL"};
	 }else if (usuarios.length > 0) {
	 	response 	= {response: usuarios[0]}
	 }
	 return response;
	},

	ingresarUsuario: async function(usuario){
		let sql = `
					INSERT INTO usuarios
					  		(
							usuarioNick,
							usuarioNombre,
							usuarioApellido,
							usuarioEmail,
							usuarioPassword,
							usuarioKeywords,
							usuarioEmpleo,
							usuarioProfesion,
							usuarioOrg,
							usuarioPais,
							usuarioNivelEduc
							 )
		  			VALUES
		  					(
							'${usuario.usuarioNick}',
							'${usuario.usuarioNombre}',
							'${usuario.usuarioApellido}',
							'${usuario.usuarioEmail}',
							MD5('${usuario.usuarioPassword}'),
							'${usuario.usuarioKeywords}',
							'${usuario.usuarioEmpleo}',
							'${usuario.usuarioProfesion}',
							'${usuario.usuarioOrg}',
							'${usuario.usuarioPais}',
							'${usuario.usuarioNivelEduc}'
							)
				`
		let response 		= {error: "No se pudo crear el usuario"}
		let mail 			= usuario.usuarioEmail;
		let existeUsuario 	= await this.obtenerUsuarioPorEmail(mail);
		if (existeUsuario.error) {
			try {
				let resultado 	= await conn.query(sql);
				if (resultado.code) {
		 			response 	= {error: "Error en consulta SQL"};
		 		}else if (resultado.insertId) {
					response 	= {response: "Usuario creado correctamente"}
				}
			} catch(error) {
				console.log(error);
				}
		}else {
			response 			= {error: `Ya existe usuario con email : ${mail}`}
			}
		return response;
	},

	actualizarUsuario: async function(usuario, id){
		let sql 		= `
							UPDATE usuarios 
							SET 
							usuarioNick 		= '${usuario.usuarioNick}',
							usuarioNombre 		= '${usuario.usuarioNombre}',
							usuarioApellido 	= '${usuario.usuarioApellido}',
							usuarioEmail 		= '${usuario.usuarioEmail}',
							usuarioKeywords 	= '${usuario.usuarioKeywords}',
							usuarioOrg 			= '${usuario.usuarioOrg}',
							usuarioEmpleo 		= '${usuario.usuarioEmpleo}',
							usuarioProfesion 	= '${usuario.usuarioProfesion}',
							usuarioPais 		= '${usuario.usuarioPais}',
							usuarioNivelEduc 	= '${usuario.usuarioNivelEduc}',
							usuarioRol 			= '${usuario.usuarioRol}',
							usuarioPerfil 		= '${usuario.usuarioPerfil}'
							WHERE
							usuarios.usuarioId = '${id}'
						`
		let response 		= {error: "No se pudo actualizar usuario"}
		let existeUsuario 	= await this.obtenerUsuarioPorId(id);
		if (!existeUsuario.error) {
			let resultado 	= await conn.query(sql);
			if (resultado.code) {
	 			response 	= {error: "Error en consulta SQL"};
	 		}else if (resultado.affectedRows>0) {
				response 	= {response: "Usuario actualizado correctamente"}
			}
		}else{
			response 		= {error: `No existe usuario con Id: ${id}`}
			}
		return response;
	},	

	eliminarUsuario: async function(id){
		let sql 		= `
							UPDATE usuarios 
							SET 
							usuarioActivo = 0 
							WHERE
							usuarios.usuarioId = '${id}'
						`
		let response 			= {error: "No se pudo eliminar usuario"}
		let existeUsuario 		= await this.obtenerUsuarioPorId(id);
		if (!existeUsuario.error) {
			let resultado 		= await conn.query(sql);
			if (resultado.code) {
	 			response 		= {error: "Error en consulta SQL"};
	 		}else if (resultado.affectedRows>0) {
					response 	= {response: "Usuario eliminado correctamente"}
				}
		}else {
			response 			= {error: `No existe usuario con Id: ${id}`}
			}
		return response;
	},

}

module.exports = Usuario;