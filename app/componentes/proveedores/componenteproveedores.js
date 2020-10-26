let componenteproveedores = Vue.component('proveedor-component', function (resolve) {
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
                        nombre: "",
                        apellido: "",
                        feching: "",
                        telefono: "",
                        direccion: "",
                        ciudad: "",
                        moneda: "",
                        saldoincial: "",
                        saldototal: "",
                        retorno: "",
                        fechret: "",
                        retactivo: "",
                        observaciones: "",
                        activo: 1
                    },
                    devuelvomoneda: {
                        idmon: "",
                        moneda: "",
                        divide: "",
                        activo: 1
                    },
                    proveedores: {
                        rutced: "",
                        razon: "",
                        fantasia: "",
                        email: "",
                        nombre: "",
                        apellido: "",
                        feching: "",
                        telefono: "",
                        direccion: "",
                        ciudad: "",
                        moneda: "",
                        saldoincial: "",
                        saldototal: "",
                        retorno: "",
                        fechret: "",
                        retactivo: "",
                        observaciones: "",
                        activo: 1
                    },

                    modificoproveedor: {
                        rutced: "",
                        razon: "",
                        fantasia: "",
                        email: "",
                        nombre: "",
                        apellido: "",
                        feching: "",
                        telefono: "",
                        direccion: "",
                        ciudad: "",
                        moneda: "",
                        saldoincial: "",
                        saldototal: "",
                        retorno: "",
                        fechret: "",
                        retactivo: "",
                        observaciones: "",
                        activo: 1
                    },
                    codigomoneda: "",
                }
            },
            methods: {
                registUser: function () {
                    let registro = {
                        rutced: this.registro.rutced,
                        razon: this.registro.razon,
                        fantasia: this.registro.fantasia,
                        email: this.registro.email,
                        nombre: this.registro.nombre,
                        apellido: this.registro.apellido,
                        feching: this.registro.feching,
                        telefono: this.registro.telefono,
                        direccion: this.registro.direccion,
                        ciudad: this.registro.ciudad,
                        moneda: this.devuelvomoneda.idmon,
                        saldoinicial: this.registro.saldoinicial,
                        saldototal: this.registro.saldototal,
                        retorno: this.registro.retorno,
                        fechret: this.registro.fechret,
                        retactivo: this.registro.retactivo,
                        observaciones: this.registro.observaciones,
                        activo: 1,
                    }
                    console.log("lo que guarda en usuario", registro)
                    if (this.registro.rutced !== "" & this.registro.razon !== "" & this.registro.apellido !== "" & this.registro.nombre !== "" & this.devuelvomoneda.idmon !== "") {
                        axios.post(API + '/proveedores/new/', registro).then((res) => {
                            let resultado = res.data;
                            if (!res.data.error) {
                                router.push({ path: '/mesa/' });
                            } else {
                                alert(res.data.error);
                            }
                        })
                    } else {
                        alert("Debe ingresar nombre, apellido, Moneda y E-mail");
                    }
                },

                limpiar: function () {
                    this.registro = {
                        rutced: "",
                        razon: "",
                        fantasia: "",
                        email: "",
                        nombre: "",
                        apellido: "",
                        feching: "",
                        telefono: "",
                        direccion: "",
                        ciudad: "",
                        moneda: "",
                        saldoincial: "",
                        saldototal: "",
                        retorno: "",
                        fechret: "",
                        retactivo: "",
                        observaciones: "",
                        activo: 1
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
                                rutced: element.rutced,
                                razon: element.razon,
                                fantasia: element.fantasia,
                                email: element.email,
                                nombre: element.nombre,
                                apellido: element.apellido,
                                feching: element.feching,
                                telefono: element.telefono,
                                direccion: element.direccion,
                                ciudad: element.ciudad,
                                moneda: this.devuelvomoneda.idmon,
                                saldoinicial: element.saldoinicial,
                                saldototal: element.saldototal,
                                retorno: element.retorno,
                                fechret: element.fechret,
                                retactivo: element.retactivo,
                                observaciones: element.observaciones,
                                activo: 1,
                            }
                        }
                    }
                    let token = localStorage.getItem("token");
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    console.log("antes del axios", modificoproveedor, modificoproveedor.idpro, modificoproveedor.email)
                    axios.put(API + '/proveedores/edit/' + modificoproveedor.idpro, modificoproveedor, headtoken).then((res) => {
                        console.log("dentro del put", res)
                        axios.get(API + '/proveedores/all', headtoken).then((res) => {
                            console.log("dentro del get", res)
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

                axios.get(API + '/monedas/all', headtoken).then((res) => {
                    devuelvomoneda = res.data.response;
                    this.devuelvomoneda = devuelvomoneda
                    //////console.log("la devoucion de lo que selecciona", obtenermonedas.codigomoneda)
                    //////console.log("devuelvomoneda", devuelvomoneda)
                })

            },//fin del mounted
        }) //fin del resolve
    })
})