let componenteusuario = Vue.component('usuario-component', function (resolve) {
    axios.get('./app/componentes/usuarios/vistausuario.html').then(function (view) {
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
                        usuarioseguridad: this.registro.seguridad,
                        usuariofechnac: this.registro.fechnac,
                        usuariofeching: this.registro.feching,
                        usuarioobservaciones: this.registro.observaciones,
                        usuarioNivelEduc: this.registro.activo,
                    }
                    if (this.registro.nombre !== "" & this.registro.apellido !== "" & this.registro.email !== "" & this.registro.seguridad !== "") {
                        if (this.registro.pwd !== "" & this.registro.pwd == this.registro.rpwd) {
                                    axios.post(API + 'usuarios/new', registro).then((res) => {
                                       let resultado = res.data;
                                        if (!res.data.error) {
                                            router.push({ path: '/mesa' });
                                        } else {
                                            alert(res.data.error);
                                        }
                                    })
                                } else {
                                    alert("Los passwords no coinciden o estan vacios");
                                }
                            } else {
                                alert("Debe ingresar Nombre, Apellido, Seguridad y E-mail");
                            }
                        },   
                        limpiar:function () {
                            this.registro={
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
                        },

                eliminarusuario: function (res, res2) {
                    let idusu = res
                    let idusu2 = res2
                    //console.log("recooro el data", idusu, idusu2)

                    let token = localStorage.getItem("token");
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    this.usuarios.splice(idusu, 1) //elimina la linea de la table y espues de la base
                    axios.put(API + '/usuarios/delete/' + idusu2, {}, headtoken).then((res) => {

                        //    console.log("resdat delntro del xios", res.data)
                    })
                },
            
                actualizarusuario: function (res2) {
                    let modificousuario = {}
                    let usuarios = this.usuarios

                    for (let index = 0; index < usuarios.length; index++) {
                        const element = usuarios[index];
                        if (element.divide == true) {
                            element.divide = 1
                        }
                        if (element.activo == true) {
                            element.activo = 1
                        }
                        if (index == res2) {
                            modificousuario = {
                                idusu: element.idusu,
                                usuario: element.usuario,
                                divide: element.divide,
                                activo: element.activo
                            }
                        }
                    }
                    let token = localStorage.getItem("token");
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.put(API + '/usuarios/edit/' + modificousuario.idusu, modificousuario, headtoken).then((res) => {
                        axios.get(API + '/usuarios/all', headtoken).then((res) => {

                        })
                    })
                },
                mostrartodos: function () {
                    let token = localStorage.getItem("token");

                    this.seguridad = localStorage.getItem("seguridad")
                    let id = localStorage.getItem("idusuario")
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.get(API + '/usuarios/allall', headtoken).then((res) => {
                        let usuarios = res.data.response;
                        //   console.log("contenido del for", usuarios)
                        this.usuarios = usuarios
                    })
                },
                mostraractivos: function () {
                    let token = localStorage.getItem("token");

                    this.seguridad = localStorage.getItem("seguridad")
                    let id = localStorage.getItem("idusuario")
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.get(API + '/usuarios/all', headtoken).then((res) => {
                        let usuarios = res.data.response;
                        // console.log("contenido del for", usuarios)
                        this.usuarios = usuarios
                    })
                },
                cerrarsesion: function () {
                    router.push('/mesa')
                }
            },// fin el method

            mounted: function () {
                //console.log(this.$router)
                let token = localStorage.getItem("token");

                this.seguridad = localStorage.getItem("seguridad")
                let id = localStorage.getItem("idusuario")
                const headtoken = { headers: { "mytoken": `${token}` } }
                axios.get(API + '/usuarios/all', headtoken).then((res) => {
                    let usuarios = res.data.response;
                    //console.log("contenido del for", usuarios)
                    this.usuarios = usuarios

                })
            },//fin del mounted





        }) //fin del resolve
    })
})