let Middleware = {
  rutasProtegidas: (req, res, next) => {
    let ruta = req.route.path;
    //Usuarios roles: admin = 0; 
    let rutasUsuarios = [{

      //roles admin

      //usuarios
      "/usuarios/all": "Acceso Permitido",
      "/usuarios/:id": "Acceso Permitido",
      "/usuarios/mail/find": "Acceso Permitido",
      "/usuarios/new": "Acceso Permitido",
      "/usuarios/edit/:id": "Acceso Permitido",

      //monedas
      "/monedas/all": "Acceso Permitido",
      "/monedas/:id": "Acceso Permitido",
      "/monedas/mail/find": "Acceso Permitido",
      "/monedas/new": "Acceso Permitido",
      "/monedas/edit/:id": "Acceso Permitido",
      
      //seguridad
      "/seguridad/all": "Acceso Permitido",
      "/seguridad/:id": "Acceso Permitido",
      "/seguridad/mail/find": "Acceso Permitido",
      "/seguridad/new": "Acceso Permitido",
      "/seguridad/edit/:id": "Acceso Permitido",

      //documentos
      "/documentos/all": "Acceso Permitido",
      "/documentos/:id": "Acceso Permitido",
      "/documentos/mail/find": "Acceso Permitido",
      "/documentos/new": "Acceso Permitido",
      "/documentos/edit/:id": "Acceso Permitido"

    },
    {
      //Rol 1 Administrativo

      
    },
    {
     //Rol 2 Consultante


    }
    ];
    const token = req.headers.mytoken;

    if (token) {
      try {
        jwt.verify(token, conn.llave, (err, decoded) => {
          if (err) {
            return res.json({ error: "Token invalido" });
          } else {
                req.decoded = decoded;
              let usuarioRol = decoded.usuario.seguridad;   
            if (rutasUsuarios[usuarioRol][ruta]) {
              next();
            } else {
              return res.json({ error: "Usuario sin permisos sobre estar ruta / Token provisto correcto" });
            }
          }
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      res.send({ error: "Token no provisto" });
    }
  }
}

module.exports = Middleware;