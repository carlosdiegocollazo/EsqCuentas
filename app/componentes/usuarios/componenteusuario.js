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
                        apellidos: "",
                        nombres: "",
                        telefono: "",
                        direccion: "",
                        ciudad: "",
                        seguridad: "",
                        fechnac: "",
                        feching: "",
                        observaciones: "",
                        activo: 1
                    },
                    devuelvoseguridad: {
                        idseg: "",
                        categoria: "",
                        descripcion: "",
                        activo: 1
                    },
                    usuarios: {
                        email: "",
                        pwd: "",
                        rpwd: "",
                        apellidos: "",
                        nombres: "",
                        telefono: "",
                        direccion: "",
                        ciudad: "",
                        seguridad: "",
                        fechnac: "",
                        feching: "",
                        observaciones: "",
                        activo: ""
                    },

                    modificousuario: {
                        email: "",
                        pwd: "",
                        rpwd: "",
                        apellidos: "",
                        nombres: "",
                        telefono: "",
                        direccion: "",
                        ciudad: "",
                        seguridad: "",
                        fechnac: "",
                        feching: "",
                        observaciones: "",
                        activo: ""
                    },

                    codigoseguridad: ""
                }

            },
            methods: {
                registUser: function () {
                    let registro = {
                        email: this.registro.email,
                        password: this.registro.pwd,
                        apellidos: this.registro.apellidos,
                        nombres: this.registro.nombres,
                        telefono: this.registro.telefono,
                        direccion: this.registro.direccion,
                        ciudad: this.registro.ciudad,
                        seguridad: this.codigoseguridad.idseg,
                        fechnac: this.registro.fechnac,
                        feching: this.registro.feching,
                        observaciones: this.registro.observaciones,
                        activo: 1,
                    }
                    //console.log("lo que guarda en usuario", registro)
                    if (this.registro.nombres !== "" & this.registro.apellidos !== "" & this.registro.email !== "" & this.codigoseguridad.categoria !== "") {
                        if (this.registro.pwd !== "" & this.registro.pwd == this.registro.rpwd) {
                            if (this.registro.activo == true) {
                                this.registro.activo = 1
                            }
                            axios.post(API + '/usuarios/new/', registro).then((res) => {
                                let resultado = res.data;
                                if (!res.data.error) {
                                    router.push({ path: '/mesa/' });
                                } else {
                                    alert(res.data.error);
                                }
                            })
                        } else {
                            alert("Los passwords no coinciden o estan vacios");
                        }
                    } else {
                        alert("Debe ingresar nombres, apellidos, Seguridad y E-mail");
                    }
                },
                limpiar: function () {
                    this.registro = {
                        email: "",
                        pwd: "",
                        rpwd: "",
                        apellidos: "",
                        nombres: "",
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
                    ////console.log("recorro el data", idusu, idusu2)
                    let token = localStorage.getItem("token");
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    this.usuarios.splice(idusu, 1) //elimina la linea de la table y espues de la base
                    axios.put(API + '/usuarios/delete/' + idusu2, {}, headtoken).then((res) => {

                        //    //console.log("resdat delntro del xios", res.data)
                    })
                },

                actualizarusuario: function (res2) {
                    let usuarios = this.usuarios
                    //console.log("esto devuelve de ususarios", usuarios)
                    for (let index = 0; index < usuarios.length; index++) {
                        const element = usuarios[index];
                        //console.log("contenido de element email", element.email)
                        if (element.activo == true) {
                            element.activo = 1
                        }
                        if (index == res2) {
                            ////console.log("contenido de element email dentro del if", element,index,res2)
                            modificousuario = {
                                idusu: element.idusu,
                                email: element.email,
                                apellidos: element.apellidos,
                                nombres: element.nombres,
                                telefono: element.telefono,
                                direccion: element.direccion,
                                ciudad: element.ciudad,
                                seguridad: this.codigoseguridad,
                                fechnac: element.fechnac,
                                feching: element.feching,
                                observaciones: element.observaciones,
                                activo: 1
                            }
                        }
                    }
                    let token = localStorage.getItem("token");
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    //console.log("antes del axios", modificousuario, modificousuario.idusu, modificousuario.email)
                    axios.put(API + '/usuarios/edit/' + modificousuario.idusu, modificousuario, headtoken).then((res) => {
                            //console.log("dentro del put",res)
                        axios.get(API + '/usuarios/all', headtoken).then((res) => {
                            //console.log("dentro del get",res)
                        })
                    })
                },
                mostrartodos: function () {
                    let token = localStorage.getItem("token");

                    this.seguridad = localStorage.getItem("seguridad")

                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.get(API + '/usuarios/allall', headtoken).then((res) => {
                        let usuarios = res.data.response;
                        //   //console.log("contenido del for", usuarios)
                        this.usuarios = usuarios
                    })
                },
                mostraractivos: function () {
                    let token = localStorage.getItem("token");
                    this.seguridad = localStorage.getItem("seguridad")
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.get(API + '/usuarios/all', headtoken).then((res) => {
                        let usuarios = res.data.response;
                        // //console.log("contenido del for", usuarios)
                        this.usuarios = usuarios
                    })
                },
                obtenerseguridad: function () {
                    let token = localStorage.getItem("token");
                    this.seguridad = localStorage.getItem("seguridad")
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.get(API + '/seguridad/all', headtoken).then((res) => {
                        devuelvoseguridad = res.data.response;
                        this.devuelvoseguridad = devuelvoseguridad
                        //console.log("devuelvoseguridad", devuelvoseguridad)
                        //console.log("la devoucion de lo que selecciona", this.obtenerseguridad.codigoseguridad)
                    })

                },
                cerrarsesion: function () {
                    router.push('/mesa')
                }
            },// fin el method

            mounted: function () {
                ////console.log(this.$router)
                let token = localStorage.getItem("token");
                this.seguridad = localStorage.getItem("seguridad")
                const headtoken = { headers: { "mytoken": `${token}` } }

                axios.get(API + '/usuarios/all', headtoken).then((res) => {
                    let usuarios = res.data.response;
                    ////console.log("contenido del for", usuarios)
                    this.usuarios = usuarios
                })

                axios.get(API + '/seguridad/all', headtoken).then((res) => {
                    devuelvoseguridad = res.data.response;
                    // //console.log("contenido del for devuelvo", devuelvoseguridad)
                    this.devuelvoseguridad = devuelvoseguridad
                })

            },//fin del mounted





        }) //fin del resolve
    })
})