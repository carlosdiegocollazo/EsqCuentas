let componentemovimientos = Vue.component('proveedor-component', function (resolve) {
    axios.get('./app/componentes/movimientos/vistamovimiento.html').then(function (view) {
        resolve({
            template: view.data,
            data: function () {
                return {
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
                        debe: "",
                        haber: "",
                        saldo: "",
                        saldtot: "",
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
                        banco: "",
                        moneda: "",
                        fechemi: "",
                        fechpag: "",
                        fechcob: "",
                        activo: 1
                    },
                    devuelvoproveedor: {
                        idprov:"",
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
                        debe: "",
                        haber: "",
                        saldo: "",
                        saldtot: "",
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
                        debe: "",
                        haber: "",
                        saldo: "",
                        saldtot: "",
                        nrorec: "",
                        fechret: "",
                        retactivo: "",
                        observaciones: "",
                        activo: 1
                    },
                    codigomoneda: "",
                    codigocheque: "",
                    codigoproveedor: "",
                    codigodocumento: "",
                    fecha:"",
                }
            },
            methods: {
                registUser: function () {
                    let registro = {
                        proveedor: this.devuelvoproveedor.idpro,
                        tipdoc: this.registro.tipdoc,
                        nrofac: this.registro.nrofac,
                        fechemi: this.registro.fechemi,
                        fechpag: this.registro.fechpag,
                        moneda: this.devuelvomoneda.idmon,
                        nrocheq: this.devuelvocheque.nrocheq,
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
                        debe: "",
                        haber: "",
                        saldo: "",
                        saldtot: "",
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

                cerrarsesion: function () {
                    router.push('/mesa')
                }
            },// fin el method

            mounted: function () {
                fecha=new Date().toISOString().substr(0,10)
                this.registro.feching=fecha
                console.log("today",fecha)


                let token = localStorage.getItem("token");
                this.seguridad = localStorage.getItem("seguridad")
                const headtoken = { headers: { "mytoken": `${token}` } }
                axios.get(API + '/movimientos/all', headtoken).then((res) => {
                    let movimientos = res.data.response;
                    this.movimientos = movimientos
                }),
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