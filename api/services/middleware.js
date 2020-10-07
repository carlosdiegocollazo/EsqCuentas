let Middleware = {
  rutasProtegidas: (req, res, next) => {
    let ruta = req.route.path;
    //Usuarios roles: admin = 0; 
    let rutasUsuarios = [{

      //roles admin

      //usuarios
      "/usuarios/all":          "Acceso Permitido",
      "/usuarios/allall":       "Acceso Permitido",
      "/usuarios/:id":          "Acceso Permitido",
      "/usuarios/new":          "Acceso Permitido",
      "/usuarios/edit/:id":     "Acceso Permitido",
      "/usuarios/delete/:id":   "Acceso Permitido",

      //proveedores
      "/proveedores/all":          "Acceso Permitido",
      "/proveedores/allall":       "Acceso Permitido",
      "/proveedores/:id":          "Acceso Permitido",
      "/proveedores/new":          "Acceso Permitido",
      "/proveedores/edit/:id":     "Acceso Permitido",
      "/proveedores/delete/:id":   "Acceso Permitido",

      //monedas
      "/monedas/all":           "Acceso Permitido",
      "/monedas/allall":        "Acceso Permitido",
      "/monedas/:id":           "Acceso Permitido",
      "/monedas/new":           "Acceso Permitido",
      "/monedas/edit/:id":      "Acceso Permitido",
      "/monedas/delete/:id":    "Acceso Permitido",

      
      //seguridad
      "/seguridad/all":         "Acceso Permitido",
      "/seguridad/allall":      "Acceso Permitido",
      "/seguridad/:id":         "Acceso Permitido",
      "/seguridad/new":         "Acceso Permitido",
      "/seguridad/edit/:id":    "Acceso Permitido",
      "/seguridad/delete/:id":  "Acceso Permitido",

      //documentos
      "/documentos/all":        "Acceso Permitido",
      "/documentos/allall":     "Acceso Permitido",
      "/documentos/:id":        "Acceso Permitido",
      "/documentos/new":        "Acceso Permitido",
      "/documentos/edit/:id":   "Acceso Permitido",
      "/documentos/delete/:id": "Acceso Permitido",

      //cotizaciones
      "/cotizaciones/all":          "Acceso Permitido",
      "/cotizaciones/allall":       "Acceso Permitido",
      "/cotizaciones/:id":          "Acceso Permitido",
      "/cotizaciones/new":          "Acceso Permitido",
      "/cotizaciones/edit/:id":     "Acceso Permitido",
      "/cotizaciones/delete/:id":   "Acceso Permitido",

      //cheques
      "/cheques/all":           "Acceso Permitido",
      "/cheques/allall":        "Acceso Permitido",
      "/cheques/:id":           "Acceso Permitido",
      "/cheques/new":           "Acceso Permitido",
      "/cheques/edit/:id":      "Acceso Permitido",
      "/cheques/delete/:id":    "Acceso Permitido"

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