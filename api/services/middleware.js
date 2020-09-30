let Middleware = {
  rutasProtegidas: (req, res, next)=>{
    let ruta            = req.route.path;
    //Usuarios roles: admin = 0; revisor = 1; autor = 2
    let rutasUsuarios   = [{
                
                "/usuarios/all": "Acceso Permitido",
                "/usuario/:id": "Acceso Permitido",
                "/usuario/full/:id": "Acceso Permitido",
                "/usuario/mail/find": "Acceso Permitido",
                "/usuario/new": "Acceso Permitido",
                "/usuario/edit/:id": "Acceso Permitido",
                "/usuario/delete/:id": "Acceso Permitido"
              },
              {

                "/monedas/all": "Acceso Permitido",

                "/usuarios/all": "Acceso Permitido",
                "/usuario/:id": "Acceso Permitido",
                "/usuario/full/:id": "Acceso Permitido",
                "/usuario/mail/find": "Acceso Permitido",
                "/usuario/new": "Acceso Permitido",
                "/usuario/edit/:id": "Acceso Permitido",
                "/usuario/delete/:id": "Acceso Permitido"          
              },
              {
                
                "/monedas/all": "Acceso Permitido",
                
                "/usuarios/all": "Acceso Permitido",
                "/usuario/:id": "Acceso Permitido",
                "/usuario/full/:id": "Acceso Permitido",
                "/usuario/mail/find": "Acceso Permitido",
                "/usuario/new": "Acceso Permitido",
                "/usuario/edit/:id": "Acceso Permitido",
                "/usuario/delete/:id": "Acceso Permitido"
              }
              ];
    const token          = req.headers.mytoken;
    
    if (token) {
      try {
        jwt.verify(token, conn.llave, (err, decoded) => {
                  if (err) {
                          return res.json({ error: "Token invalido"});
                  }else {
                          req.decoded     = decoded;
                          let usuarioRol  = decoded.usuario.usuarioRol;
                          if (rutasUsuarios[usuarioRol-1][ruta]) {
                                next();
                  }else{
                          return res.json({ error: "Usuario sin permisos sobre estar ruta / Token provisto correcto"});
                    }
                  }
                });
              } catch(e) {
                console.log(e);
                }
            }else {
                  res.send({error: "Token no provisto"});
            }
          }
}

module.exports = Middleware;