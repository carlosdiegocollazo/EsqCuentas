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
                    },
                    devuelvoseguridad: {
                        idseg:"",
                        categoria:"",
                        descripcion:"",
                        activo:1
                    },
                    usuarios: {
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
                        Email: this.registro.email,
                        Password: this.registro.pwd,
                        Apellido: this.registro.apellido,
                        Nombre: this.registro.nombre,
                        telefono: this.registro.telefono,
                        direccion: this.registro.direccion,
                        ciudad: this.registro.ciudad,
                        seguridad: this.registro.seguridad,
                        fechnac: this.registro.fechnac,
                        feching: this.registro.feching,
                        observaciones: this.registro.observaciones,
                        activo: this.registro.activo,
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
                limpiar: function () {
                    this.registro = {
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
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.get(API + '/usuarios/all', headtoken).then((res) => {
                        let usuarios = res.data.response;
                        // console.log("contenido del for", usuarios)
                        this.usuarios = usuarios
                    })
                },
                obtenerseguridad: function () {
 
                    console.log("devuelvoseguridad vacio", devuelvoseguridad)                    
                    let token = localStorage.getItem("token");
                    this.seguridad = localStorage.getItem("seguridad")
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.get(API + '/seguridad/all', headtoken).then((res) => {
                        devuelvoseguridad = res.data.response;
                        console.log("contenido del for del axios devuelvo", devuelvoseguridad)
                        this.devuelvoseguridad = devuelvoseguridad
                        console.log("devuelvoseguridad", devuelvoseguridad)
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
                    const headtoken = { headers: { "mytoken": `${token}` } }

                    axios.get(API + '/usuarios/all', headtoken).then((res) => {
                        let usuarios = res.data.response;
                        //console.log("contenido del for", usuarios)
                        this.usuarios = usuarios
                    })

                    axios.get(API + '/seguridad/all', headtoken).then((res) => {
                        devuelvoseguridad = res.data.response;
                       // console.log("contenido del for devuelvo", devuelvoseguridad)
                        this.devuelvoseguridad = devuelvoseguridad
                    })

                },//fin del mounted





            }) //fin del resolve
    })
})