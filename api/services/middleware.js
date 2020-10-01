let Middleware = {
  rutasProtegidas: (req, res, next) => {
    let ruta = req.route.path;
    //Usuarios roles: admin = 0; 
    let rutasUsuarios = [{
      "/usuarios/all": "Acceso Permitido",
      "/usuarios/:id": "Acceso Permitido",
      "/usuarios/mail/find": "Acceso Permitido",
      "/usuarios/new": "Acceso Permitido",
      "/usuarios/edit/:id": "Acceso Permitido",

      "/monedas/all": "Acceso Permitido",
      "/monedas/:id": "Acceso Permitido",
      "/monedas/mail/find": "Acceso Permitido",
      "/monedas/new": "Acceso Permitido",
      "/monedas/edit/:id": "Acceso Permitido"
      
    },
    {
      "/usuarios/all": "Acceso Permitido",
      "/usuario/:id": "Acceso Permitido",
      "/usuario/full/:id": "Acceso Permitido",
      "/usuario/mail/find": "Acceso Permitido",
      "/usuario/validar/revision/:usuarioId/:articuloId": "Acceso Permitido",
      "/usuario/new": "Acceso Permitido",
      "/usuario/edit/:id": "Acceso Permitido",
      "/usuario/delete/:id": "Acceso Permitido",
      "/articulos/all": "Acceso Permitido",
      "/articulo/:id": "Acceso Permitido",
      "/articulo/new": "Acceso Permitido",
      "/articulo/edit/:id": "Acceso Permitido",
      "/articulo/publicar/:id": "Acceso Permitido",
      "/articulo/revisar/:id": "Acceso Permitido",
      "/articulo/cancelar/:id": "Acceso Permitido",
      "/articulo/delete/:id": "Acceso Permitido",
      "/articulos/usuario/:id": "Acceso Permitido",
      "/articulos/usuario/topicos/:id": "Acceso Permitido",
      "/recomendaciones/all": "Acceso Permitido",
      "/recomendacion/:id": "Acceso Permitido",
      "/recomendacion/full/:id": "Acceso Permitido",
      "/recomendaciones/articulo/:id": "Acceso Permitido",
      "/recomendaciones/articulo/usuario/:articuloId/:usuarioId": "Acceso Permitido",
      "/recomendacion/new": "Acceso Permitido",
      "/recomendacion/edit/:id": "Acceso Permitido",
      "/recomendacion/delete/:id": "Acceso Permitido",
      "/devoluciones/all": "Acceso Permitido",
      "/devolucion/:id": "Acceso Permitido",
      "/devolucion/full/:id": "Acceso Permitido",
      "/devoluciones/articulo/full/:id": "Acceso Permitido",
      "/devoluciones/cantidad/articulo/:id": "Acceso Permitido",
      "/devolucion/new": "Acceso Permitido",
      "/devolucion/edit/:id": "Acceso Permitido",
      "/devolucion/delete/:id": "Acceso Permitido",
      "/preferencias/all": "Acceso Permitido",
      "/preferencia/:id": "Acceso Permitido",
      "/preferencia/full/:id": "Acceso Permitido",
      "/preferencias/usuario/full/:id": "Acceso Permitido",
      "/preferencias/usuario/articulo/:idUsuario/:idArticulo": "Acceso Permitido",
      "/preferencia/new": "Acceso Permitido",
      "/preferencia/edit/:id": "Acceso Permitido",
      "/preferencia/delete/:id": "Acceso Permitido",
      "/topicos/all": "Acceso Permitido",
      "/topico/:id": "Acceso Permitido",
      "/topico/new": "Acceso Permitido"
    },
    {
      "/usuarios/all": "Acceso Permitido",
      "/usuario/:id": "Acceso Permitido",
      "/usuario/full/:id": "Acceso Permitido",
      "/usuario/mail/find": "Acceso Permitido",
      "/usuario/validar/revision/:usuarioId/:articuloId": "Acceso Permitido",
      "/usuario/new": "Acceso Permitido",
      "/usuario/edit/:id": "Acceso Permitido",
      "/usuario/delete/:id": "Acceso Permitido",
      "/articulos/all": "Acceso Permitido",
      "/articulo/:id": "Acceso Permitido",
      "/articulo/new": "Acceso Permitido",
      "/articulo/edit/:id": "Acceso Permitido",
      "/articulo/publicar/:id": "Acceso Permitido",
      "/articulo/revisar/:id": "Acceso Permitido",
      "/articulo/cancelar/:id": "Acceso Permitido",
      "/articulo/delete/:id": "Acceso Permitido",
      "/articulos/usuario/:id": "Acceso Permitido",
      "/articulos/usuario/topicos/:id": "Acceso Permitido",
      "/recomendaciones/all": "Acceso Permitido",
      "/recomendacion/:id": "Acceso Permitido",
      "/recomendacion/full/:id": "Acceso Permitido",
      "/recomendaciones/articulo/:id": "Acceso Permitido",
      "/recomendaciones/articulo/usuario/:articuloId/:usuarioId": "Acceso Permitido",
      "/recomendacion/new": "Acceso Permitido",
      "/recomendacion/edit/:id": "Acceso Permitido",
      "/recomendacion/delete/:id": "Acceso Permitido",
      "/devoluciones/all": "Acceso Permitido",
      "/devolucion/:id": "Acceso Permitido",
      "/devolucion/full/:id": "Acceso Permitido",
      "/devoluciones/articulo/full/:id": "Acceso Permitido",
      "/devoluciones/cantidad/articulo/:id": "Acceso Permitido",
      "/devolucion/new": "Acceso Permitido",
      "/devolucion/edit/:id": "Acceso Permitido",
      "/devolucion/delete/:id": "Acceso Permitido",
      "/preferencias/all": "Acceso Permitido",
      "/preferencia/:id": "Acceso Permitido",
      "/preferencia/full/:id": "Acceso Permitido",
      "/preferencias/usuario/full/:id": "Acceso Permitido",
      "/preferencias/usuario/articulo/:idUsuario/:idArticulo": "Acceso Permitido",
      "/preferencia/new": "Acceso Permitido",
      "/preferencia/edit/:id": "Acceso Permitido",
      "/preferencia/delete/:id": "Acceso Permitido",
      "/topicos/all": "Acceso Permitido",
      "/topico/:id": "Acceso Permitido",
      "/topico/new": "Acceso Permitido"
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