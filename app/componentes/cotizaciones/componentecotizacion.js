let componentecotizacion = Vue.component('cotizaciones-component', function (resolve) {
    axios.get('./app/componentes/cotizaciones/vistacotizacion.html').then(function (view) {
        resolve({
            template: view.data,
            data: function () {
                return {
                    registro: {
                        idcot: "",
                        fechcot: "",
                        moneda: "",
                        cotizacion: "",
                        deldia: 1,
                        activo: 1
                    },
                    devuelvomoneda: {
                        idmon: "",
                        moneda: "",
                        divide: "",
                        activo: "",
                    },
                    cotizaciones: {
                        idcot: "",
                        fechcot: "",
                        moneda: "",
                        cotizacion: "",
                        deldia: 1,
                        activo: 1
                    },
                    codigomoneda: "",
                    limpiar:"",
                    codigocotizacion:"",
                    fecha:"",


                }
            },
            methods: {
                crearcotizaciones: function () {
                    registro = {
                        fechcot: this.registro.fechcot,
                        moneda: this.codigomoneda.idmon,
                        cotizacion: this.registro.cotizacion,
                        deldia: this.registro.deldia,
                        activo: this.registro.activo
                    }
                    let token = localStorage.getItem("token");
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    if (this.registro.tipodoc !== "" & this.codigomoneda.idmon !== "") {
                        axios.post(API + '/cotizacion/new', registro, headtoken).then((res) => {
                            let resultado = res.data;
                            axios.get(API + '/cotizacion/all', headtoken).then((res) => {
                                let cotizaciones = res.data.response;
                                this.cotizaciones = cotizaciones })
                                axios.get(API + '/cotizacion/all', headtoken).then((res) => {
                                    let cotizaciones = res.data.response;
                                    this.cotizaciones = cotizaciones
                                }),
                            alert("Tipo de cotizaciones creado correctamente");
                            if (resultado.response) {
                                router.push({ path: '/cotizacion' });
                            } else {
                                alert(res.data.error);
                            }
                        })
                    } else {
                        alert("Descripcion de cotizaciones y Moneda no puede estar vacios");
                    }
                },
                eliminarcotizacion: function (res, res2) {
                    let idcot = res
                    let idcot2 = res2
                    let token = localStorage.getItem("token");
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    this.cotizaciones.splice(idcot, 1) //elimina la linea de la table y espues de la base
                    axios.put(API + '/cotizacion/delete/' + idcot2, {}, headtoken).then((res) => {
                        alert("Cotizacion eliminada correcatmente.");

                    })

                },

                mostrartodos: function () {
                    let token = localStorage.getItem("token");

                    this.seguridad = localStorage.getItem("seguridad")
                    let id = localStorage.getItem("idusuario")
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.get(API + '/cotizacion/allall', headtoken).then((res) => {
                        let cotizaciones = res.data.response;

                        this.cotizaciones = cotizaciones
                    })
                },
                mostraractivos: function () {
                    let token = localStorage.getItem("token");
                    this.seguridad = localStorage.getItem("seguridad")
                    let id = localStorage.getItem("idusuario")
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.get(API + '/cotizacion/all', headtoken).then((res) => {
                        let cotizaciones = res.data.response;

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

                    })

                },
                limpiar: function () {
                    this.registro = {
                        idcot: "",
                        fechcot: "",
                        moneda: "",
                        cotizacion: "",
                        deldia: 0,
                        activo: 1
                    }
                },
                cerrarsesion: function () {
                    router.push('/mesa')
                }
            },// fin el method

            mounted: function () {

                fecha=new Date().toISOString().substr(0,10)
                this.registro.fechcot=fecha
                


                let token = localStorage.getItem("token");
                this.seguridad = localStorage.getItem("seguridad")
                const headtoken = { headers: { "mytoken": `${token}` } }
                axios.get(API + '/cotizacion/all', headtoken).then((res) => {
                    let cotizaciones = res.data.response;
                    this.cotizaciones = cotizaciones
                }),
                    axios.get(API + '/monedas/all', headtoken).then((res) => {
                        devuelvomoneda = res.data.response;
                        this.devuelvomoneda = devuelvomoneda
                    })
            },//fin del mounted
        })
    })
})