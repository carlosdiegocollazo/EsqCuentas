let componenteusuario = Vue.component('usuario-component', function (resolve) {
    axios.get('./app/componentes/usuarios/vistausuarios.html').then(function (view) {
        resolve({
            template: view.data,
            data: function () {
                return {
                    registro: {
                        email: "",
                        pwd: "",
                        rpwd: "",
                        apellido: "",
                        nombre: "",
                        telefono: "",
                        direccion: "",
                        ciudad: "",
                        seguridad: "",
                        fechnac: "",
                        feching: "",
                        observaciones: "",
                        activo: ""
                    }

                }
            },
            methods: {
                registUser: function () {
                    let registro = {
                        usuarioEmail: this.registro.email,
                        usuarioPassword: this.registro.pwd,
                        usuarioApellido: this.registro.apellido,
                        usuarioNombre: this.registro.nombre,
                        usuariotelefono: this.registro.telefono,
                        usuariodireccion: this.registro.direccion,
                        usuariociudad: this.registro.ciudad,
                        usuariociudad: "Selecione",
                        usuarioseguridad: "Seleccione",
                        usuarioOrg: 1,
                        usuarioPais: "Uruguay",
                        usuarioNivelEduc: this.registro.activo,
                    }
                    if (this.registro.nombre !== "" & this.registro.apellido !== "" & this.registro.email !== "") {
                        if (this.registro.pwd !== "" & this.registro.pwd == this.registro.rpwd) {
                        } else {
                            alert("Los passwords no coinciden o estan vacios");
                        }
                    } else {
                        alert("Debe ingresar Nombre, Apellido y e-mail");
                    }
                },

            }
        })
    })
})