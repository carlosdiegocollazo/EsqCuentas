let componenteproveedor = Vue.component('proveedor-component', function (resolve) {
    axios.get('./app/componentes/proveedores/vistaproveedores.html').then(function (view) {
        resolve({
            template: view.data,
            data: function () {
                return {
                    registro: {
                        rutced: "",
                        razon: "",
                        fantasia: "",
                        email: "",
                        nombres: "",
                        apellidos: "",
                        feching: "",
                        telefono: "",
                        direccion: "",
                        ciudad: "",
                        moneda: "",
                        seguridad: "",
                        saldoincial: "",
                        saldototal: "",
                        retorno: "",
                        fechret:"",
                        retactivo:"",
                        observaciones: "",
                        activo: 1
                    },
                    devuelvoseguridad: {
                        idseg: "",
                        categoria: "",
                        descripcion: "",
                        activo: 1
                    },
                    proveedores: {
                        email: "",
                        moneda: "",
                        saldoincial: "",
                        apellidos: "",
                        nombres: "",
                        telefono: "",
                        direccion: "",
                        ciudad: "",
                        seguridad: "",
                        saldototal: "",
                        feching: "",
                        observaciones: "",
                        activo: ""
                    },

                    modificoproveedor: {
                        email: "",
                        moneda: "",
                        saldoincial: "",
                        apellidos: "",
                        nombres: "",
                        telefono: "",
                        direccion: "",
                        ciudad: "",
                        seguridad: "",
                        saldototal: "",
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
                        password: this.registro.moneda,
                        apellidos: this.registro.apellidos,
                        nombres: this.registro.nombres,
                        telefono: this.registro.telefono,
                        direccion: this.registro.direccion,
                        ciudad: this.registro.ciudad,
                        seguridad: this.codigoseguridad.categoria,
                        saldototal: this.registro.saldototal,
                        feching: this.registro.feching,
                        observaciones: this.registro.observaciones,
                        activo: 1,
                    }
                    console.log("lo que guarda en proveedor", registro)
                    if (this.registro.nombres !== "" & this.registro.apellidos !== "" & this.registro.email !== "" & this.codigoseguridad.categoria !== "") {
                        if (this.registro.moneda !== "" & this.registro.moneda == this.registro.saldoincial) {
                            if (this.registro.activo == true) {
                                this.registro.activo = 1
                            }
                            axios.post(API + '/proveedores/new/', registro).then((res) => {
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
                        moneda: "",
                        saldoincial: "",
                        apellidos: "",
                        nombres: "",
                        telefono: "",
                        direccion: "",
                        ciudad: "",
                        seguridad: "",
                        saldototal: "",
                        feching: "",
                        observaciones: "",
                        activo: ""
                    }
                },

                eliminarproveedor: function (res, res2) {
                    let idpro = res
                    let idpro2 = res2
                    //console.log("recorro el data", idpro, idpro2)
                    let token = localStorage.getItem("token");
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    this.proveedores.splice(idpro, 1) //elimina la linea de la table y espues de la base
                    axios.put(API + '/proveedores/delete/' + idpro2, {}, headtoken).then((res) => {

                        //    console.log("resdat delntro del xios", res.data)
                    })
                },

                actualizarproveedor: function (res2) {
                    let proveedores = this.proveedores
                    console.log("esto devuelve de ususarios", proveedores)
                    for (let index = 0; index < proveedores.length; index++) {
                        const element = proveedores[index];
                        console.log("contenido de element email", element.email)
                        if (element.activo == true) {
                            element.activo = 1
                        }
                        if (index == res2) {
                            //console.log("contenido de element email dentro del if", element,index,res2)
                            modificoproveedor = {
                                idpro: element.idpro,
                                email: element.email,
                                apellidos: element.apellidos,
                                nombres: element.nombres,
                                telefono: element.telefono,
                                direccion: element.direccion,
                                ciudad: element.ciudad,
                                seguridad: this.codigoseguridad,
                                saldototal: element.saldototal,
                                feching: element.feching,
                                observaciones: element.observaciones,
                            }
                        }
                    }
                    let token = localStorage.getItem("token");
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    console.log("antes del axios", modificoproveedor, modificoproveedor.idpro, modificoproveedor.email)
                    axios.put(API + '/proveedores/edit/' + modificoproveedor.idpro, modificoproveedor, headtoken).then((res) => {
                            console.log("dentro del put",res)
                        axios.get(API + '/proveedores/all', headtoken).then((res) => {
                            console.log("dentro del get",res)
                        })
                    })
                },
                mostrartodos: function () {
                    let token = localStorage.getItem("token");

                    this.seguridad = localStorage.getItem("seguridad")

                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.get(API + '/proveedores/allall', headtoken).then((res) => {
                        let proveedores = res.data.response;
                        //   console.log("contenido del for", proveedores)
                        this.proveedores = proveedores
                    })
                },
                mostraractivos: function () {
                    let token = localStorage.getItem("token");
                    this.seguridad = localStorage.getItem("seguridad")
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.get(API + '/proveedores/all', headtoken).then((res) => {
                        let proveedores = res.data.response;
                        // console.log("contenido del for", proveedores)
                        this.proveedores = proveedores
                    })
                },
                obtenerseguridad: function () {
                    let token = localStorage.getItem("token");
                    this.seguridad = localStorage.getItem("seguridad")
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.get(API + '/seguridad/all', headtoken).then((res) => {
                        devuelvoseguridad = res.data.response;
                        this.devuelvoseguridad = devuelvoseguridad
                        console.log("devuelvoseguridad", devuelvoseguridad)
                        console.log("la devoucion de lo que selecciona", this.obtenerseguridad.codigoseguridad)
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

                axios.get(API + '/proveedores/all', headtoken).then((res) => {
                    let proveedores = res.data.response;
                    //console.log("contenido del for", proveedores)
                    this.proveedores = proveedores
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