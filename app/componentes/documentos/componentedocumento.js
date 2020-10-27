let componentedocumento = Vue.component('cotizaciones-component', function (resolve) {
    axios.get('./app/componentes/cotizaciones/vistacotizacion.html').then(function (view) {
        resolve({
            template: view.data,
            data: function () {
                return {
                    registro: {
                        idcot: "",
                        tipodfehcaoc: "",
                        moneda: "",
                        activo: 1
                    },
                    devuelvomoneda: {
                        idmon: "",
                        moneda: "",
                        divide: "",
                        activo: ""
                    },
                    cotizaciones: {
                        idtipdoc: "",
                        tipodoc: "",
                        moneda: "",
                        activo: ""
                    },
                    codigomoneda: "",
                    tipodoc: [],

                }
            },
            methods: {
                crearcotizaciones: function () {
                    registro = {
                        tipodoc: this.registro.tipodoc,
                        moneda: this.codigomoneda.idmon,
                        activo: this.registro.activo
                    }
                    //  ////console.log("registro que viene desde el html", registro)
                    let token = localStorage.getItem("token");
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    if (this.registro.tipodoc !== "" & this.codigomoneda.idmon !== "") {
                        //////console.log("resultado antes del axios", registro)
                        axios.post(API + '/cotizaciones/new', registro, headtoken).then((res) => {
                            let resultado = res.data;
                            ////console.log("lo que resutla del axios despues", resultado)
                            alert("Tipo de cotizaciones creado correctamente");
                            if (resultado.response) {
                                router.push({ path: '/mesa/' });
                            } else {
                                alert(res.data.error);
                            }
                        })
                    } else {
                        alert("Descripcion de cotizaciones y Moneda no puede estar vacios");
                    }
                },
                eliminarcotizaciones: function (res, res2) {
                    let idtipdoc = res
                    let idtipdoc2 = res2
                    //////console.log("recooro el data", idtipdoc, idtipdoc2)

                    let token = localStorage.getItem("token");
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    this.cotizaciones.splice(idtipdoc, 1) //elimina la linea de la table y espues de la base
                    axios.put(API + '/cotizaciones/delete/' + idtipdoc2, {}, headtoken).then((res) => {
                        alert("Tipo de cotizacion eliminado correctamente");
                        //    ////console.log("resdat delntro del xios", res.data)
                    })

                },
                actualizarcotizaciones: function (res2) {
                    let modificocotizacion = {}
                    let cotizaciones = this.cotizaciones

                    for (let index = 0; index < cotizaciones.length; index++) {
                        const element = cotizaciones[index];
                        if (index == res2) {
                            modificocotizacion = {
                                idtipdoc: element.idtipdoc,
                                tipodoc: element.tipodoc,
                                moneda: element.moneda,
                                activo: element.activo,
                            }
                        }
                    }
                    //console.log("modificocotizacion.idtipdoc, modificocotizacion,",modificocotizacion.idtipdoc)
                    //console.log("modificocotizacion.idtipdoc, modificocotizacion,",modificocotizacion)
                    let token = localStorage.getItem("token");
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.put(API + '/cotizaciones/edit/' + modificocotizacion.idtipdoc, modificocotizacion, headtoken).then((res) => {
                        axios.get(API + '/cotizaciones/all', headtoken).then((res) => {
                            alert("Documento, modificado y activo en forma correcta.");
                        })
                    })
                },
                mostrartodos: function () {
                    let token = localStorage.getItem("token");

                    this.seguridad = localStorage.getItem("seguridad")
                    let id = localStorage.getItem("idusuario")
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.get(API + '/cotizaciones/allall', headtoken).then((res) => {
                        let cotizaciones = res.data.response;
                        //   ////console.log("contenido del for", cotizaciones)
                        this.cotizaciones = cotizaciones
                    })
                },
                mostraractivos: function () {
                    let token = localStorage.getItem("token");
                    this.seguridad = localStorage.getItem("seguridad")
                    let id = localStorage.getItem("idusuario")
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.get(API + '/cotizaciones/all', headtoken).then((res) => {
                        let cotizaciones = res.data.response;
                        // ////console.log("contenido del for", cotizaciones)
                        this.cotizaciones = cotizaciones
                    })
                },
                obtenermoneda: function () {//cambiar para usar con monedas
                    let token = localStorage.getItem("token");
                    this.seguridad = localStorage.getItem("seguridad")
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.get(API + '/monedas/all', headtoken).then((res) => {
                        devuelvomoneda = res.data.response;
                        this.devuelvomoneda = devuelvomoneda
                        //////console.log("la devoucion de lo que selecciona", obtenermonedas.codigomoneda)
                        //////console.log("devuelvomoneda", devuelvomoneda)
                    })

                },
                cerrarsesion: function () {
                    router.push('/mesa')
                }
            },// fin el method

            mounted: function () {
                //////console.log(this.$router)
                let token = localStorage.getItem("token");
                this.seguridad = localStorage.getItem("seguridad")
                const headtoken = { headers: { "mytoken": `${token}` } }
                axios.get(API + '/cotizaciones/all', headtoken).then((res) => {
                    let cotizaciones = res.data.response;
                    ////console.log("contenido del for", cotizaciones)
                    this.cotizaciones = cotizaciones

                }),
                    axios.get(API + '/monedas/all', headtoken).then((res) => {
                        devuelvomoneda = res.data.response;
                        this.devuelvomoneda = devuelvomoneda
                        //////console.log("la devoucion de lo que selecciona", obtenermonedas.codigomoneda)
                        //////console.log("devuelvomoneda", devuelvomoneda)
                    })
            },//fin del mounted
        })
    })
})