let componentemovimientos = Vue.component('proveedor-component', function (resolve) {
    axios.get('./app/componentes/movimientos/vistamovimiento.html').then(function (view) {
        resolve({
            template: view.data,

            data: function () {
                return {
                    ventana: {
                        cheque: false,
                    },
                    registro: {
                        idmov: "",
                        proveedor: "",
                        tipdoc: "",
                        nrofac: "",
                        fechemi: "",
                        fechpag: "",
                        moneda: "",
                        nrocheq: "",
                        fechcheq: "",
                        debe: 0,
                        haber: 0,
                        saldo: 0,
                        saldtot: 0,
                        nrorec: "",
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
                    devuelvodocumento: {
                        idtipdoc: "",
                        tipodoc: "",
                        moneda: "",
                        activo: ""
                    },
                    devuelvocheque: {
                        idcheq: "",
                        nrocheq: "",
                        importe: "",
                        banco: "",
                        moneda: "",
                        fechemi: "",
                        fechpag: "",
                        fechcob: "",
                        activo: 1
                    },
                    devuelvoproveedor: {
                        idprov: "",
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
                        saldoincial: 0,
                        saldototal: 0,
                        retorno: 0,
                        fechret: "",
                        retactivo: "",
                        observaciones: "",
                        activo: 1
                    },
                    movimientos: {
                        idmov: "",
                        proveedor: "",
                        tipdoc: "",
                        nrofac: "",
                        fechemi: "",
                        fechpag: "",
                        moneda: "",
                        nrocheq: "",
                        fechcheq: "",
                        debe: 0,
                        haber: 0,
                        saldo: 0,
                        saldtot: 0,
                        nrorec: "",
                        fechret: "",
                        retactivo: "",
                        observaciones: "",
                        activo: 1
                    },

                    modificomovimiento: {
                        idmov: "",
                        proveedor: "",
                        tipdoc: "",
                        nrofac: "",
                        fechemi: "",
                        fechpag: "",
                        moneda: "",
                        nrocheq: "",
                        fechcheq: "",
                        debe: 0,
                        haber: 0,
                        saldo: 0,
                        saldtot: 0,
                        nrorec: "",
                        fechret: "",
                        retactivo: "",
                        observaciones: "",
                        activo: 1
                    },

                    bancos: {
                        idbanco: "",
                        banco: "",
                        moneda: "",
                        cuenta: "",
                        sucursal: "",
                        activo: 1
                    },


                    devuelvobanco: {},

                    codigomoneda: "",
                    codigocheque: "",
                    codigoproveedor: "",
                    codigodocumento: "",
                    codigobanco: "",
                    fecha: "",

                }


            },
            methods: {
                crearmovimientos: function () {
                    let registro = {
                        proveedor: this.devuelvoproveedor.idpro,
                        tipdoc: this.registro.tipdoc,
                        nrofac: this.registro.nrofac,
                        fechemi: this.registro.fechemi,
                        fechpag: this.registro.fechpag,
                        moneda: this.devuelvomoneda.idmon,
                        nrocheq: this.registro.nrocheq,
                        fechcheq: this.devuelvocheque.fechcheq,
                        debe: this.registro.debe,
                        haber: this.registro.haber,
                        saldo: this.registro.saldo,
                        saldtot: this.registro.saldtot,
                        nrorec: this.registro.nrorec,
                        observaciones: this.registro.observaciones,
                        activo: 1,
                    }
                    console.log("lo que guarda en usuario", registro)
                    if (this.registro.nrofac !== "" & this.registro.tipdoc !== "" & this.registro.fechpag !== "" & this.devuelvomoneda.idmon !== "" & this.registro.nrorec !== "") {
                        axios.post(API + '/movimientos/new/', registro).then((res) => {
                            let resultado = res.data;
                            if (!res.data.error) {
                                router.push({ path: '/mesa/' });
                            } else {
                                alert(res.data.error);
                            }
                        })
                    } else {
                        alert("Debe ingresar Nro de factura, tpo de documento, fecha que se pago, moneda y nro de recibo");
                    }
                },

                limpiar: function () {
                    this.registro = {
                        idmov: "",
                        proveedor: "",
                        tipdoc: "",
                        nrofac: "",
                        fechemi: "",
                        fechpag: "",
                        moneda: "",
                        nrocheq: "",
                        fechcheq: "",
                        debe: 0,
                        haber: 0,
                        saldo: 0,
                        saldtot: 0,
                        nrorec: "",
                        fechret: "",
                        retactivo: "",
                        observaciones: "",
                        activo: 1
                    }
                },

                eliiminarmovimiento: function (res, res2) {
                    let idmov = res
                    let idmov2 = res2
                    //console.log("recorro el data", idpro, idpro2)
                    let token = localStorage.getItem("token");
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    this.movimientos.splice(idmov, 1) //elimina la linea de la table y espues de la base
                    axios.put(API + '/movimientos/delete/' + idmov2, {}, headtoken).then((res) => {
                    })
                },

                actualizarmovimiento: function (res2) {
                    let movimientos = this.movimientos
                    for (let index = 0; index < movimientos.length; index++) {
                        const element = movimientos[index];
                        if (index == res2) {
                            modificomovimiento = {
                                proveedor: this.devuelvoproveedor.idpro,
                                tipdoc: element.tipdoc,
                                nrofac: element.nrofac,
                                fechemi: element.fechemi,
                                fechpag: element.fechpag,
                                moneda: this.devuelvomoneda.idmon,
                                nrocheq: this.devuelvocheque.nrocheq,
                                fechcheq: this.devuelvocheque.fechcheq,
                                debe: element.debe,
                                haber: element.haber,
                                saldo: element.saldo,
                                saldtot: element.saldtot,
                                nrorec: element.nrorec,
                                observaciones: element.observaciones,
                                activo: 1,
                            }
                        }
                    }
                    let token = localStorage.getItem("token");
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.put(API + '/movimientos/edit/' + modificomovimiento.idpro, modificomovimiento, headtoken).then((res) => {
                        axios.get(API + '/movimientos/all', headtoken).then((res) => {
                        })
                    })
                },

                obtenermoneda: function () {
                    let token = localStorage.getItem("token");
                    this.seguridad = localStorage.getItem("seguridad")
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.get(API + '/monedas/all', headtoken).then((res) => {
                        devuelvomoneda = res.data.response;
                        this.devuelvomoneda = devuelvomoneda
                    })
                },

                obtenercheque: function () {
                    let token = localStorage.getItem("token");
                    this.seguridad = localStorage.getItem("seguridad")
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.get(API + '/cheques/all', headtoken).then((res) => {
                        devuelvocheque = res.data.response;
                        this.devuelvocheque = devuelvocheque
                    })
                },

                obtenerproveedor: function () {
                    let token = localStorage.getItem("token");
                    this.seguridad = localStorage.getItem("seguridad")
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.get(API + '/proveedores/all', headtoken).then((res) => {
                        devuelvoproveedor = res.data.response;
                        this.devuelvoproveedor = devuelvoproveedor
                    })
                },

                obtenerdocumento: function () {
                    let token = localStorage.getItem("token");
                    this.seguridad = localStorage.getItem("seguridad")
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.get(API + '/documentos/all', headtoken).then((res) => {
                        devuelvodocumento = res.data.response;
                        this.devuelvodocumento = devuelvodocumento
                    })
                },
                mostrartodos: function () {
                    let token = localStorage.getItem("token");
                    this.seguridad = localStorage.getItem("seguridad")
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.get(API + '/movimientos/allall', headtoken).then((res) => {
                        let movimientos = res.data.response;

                        this.movimientos = movimientos
                    })
                },
                mostraractivos: function () {
                    let token = localStorage.getItem("token");
                    this.seguridad = localStorage.getItem("seguridad")
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.get(API + '/movimientos/all', headtoken).then((res) => {
                        let movimientos = res.data.response;

                        this.movimientos = movimientos
                    })
                },
                saldo: function () {
                    let saldoenvivo = 0;
                    debe = parseFloat(this.registro.debe)
                    haber = parseFloat(this.registro.haber)
                    saldoenvivo = debe - haber
                    this.registro.saldo = saldoenvivo
                },

                cerrarsesion: function () {
                    router.push('/mesa')
                }
            },// fin el method

            mounted: function () {
                fecha = new Date().toISOString().substr(0, 10)
                this.registro.feching = fecha
                let token = localStorage.getItem("token");
                this.seguridad = localStorage.getItem("seguridad")
                const headtoken = { headers: { "mytoken": `${token}` } }
                axios.get(API + '/movimientos/all', headtoken).then((res) => {
                    let movimientos = res.data.response;
                    this.movimientos = movimientos
                }),
                    axios.get(API + '/bancos/all', headtoken).then((res) => {
                        devuelvobanco = res.data.response;
                        this.devuelvobanco = devuelvobanco
                    })
                axios.get(API + '/proveedores/all', headtoken).then((res) => {
                    devuelvoproveedor = res.data.response;
                    this.devuelvoproveedor = devuelvoproveedor
                }),

                    axios.get(API + '/cheques/all', headtoken).then((res) => {
                        devuelvocheque = res.data.response;
                        this.devuelvocheque = devuelvocheque
                    }),


                    axios.get(API + '/documentos/all', headtoken).then((res) => {
                        devuelvodocumento = res.data.response;
                        this.devuelvodocumento = devuelvodocumento
                    })

                axios.get(API + '/monedas/all', headtoken).then((res) => {
                    devuelvomoneda = res.data.response;
                    this.devuelvomoneda = devuelvomoneda
                })
            },//fin del mounted
        }) //fin del resolve
    })
})