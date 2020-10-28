let componentecheque = Vue.component('cheques-component', function (resolve) {
    axios.get('./app/componentes/cheques/vistacheque.html').then(function (view) {
        resolve({
            template: view.data,
            data: function () {
                return {
                    registro: {
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
                    devuelvomoneda: {
                        idmon: "",
                        moneda: "",
                        divide: "",
                        activo: ""
                    },
                    devuelvobanco: {
                        idbanco: "",
                        banco: "",
                        moneda: "",
                        cuenta: "",
                        sucursal: "",
                        activo: 1
                    },
                    cheques: {
                        idcheq: "",
                        nrocheq: "",
                        importe: "",
                        moneda: "",
                        fechemi: "",
                        fechpag: "",
                        fechcob: "",
                        activo: 1
                    },
                    codigomoneda: "",
                    codigobanco: "",
                }
            },
            methods: {
                crearcheques: function () {
                    registro = {
                        nrocheq: this.registro.nrocheq,
                        nrocheq: this.registro.importe,
                        banco: this.codigobanco.idbanco,
                        moneda: this.codigomoneda.idmon,
                        fechemi: this.registro.fechemi,
                        fechpag: this.registro.fechpag,
                        fechcob: this.registro.fechcob,
                        activo: 1
                    }
                    //console.log("regsitro uqe viene del thml", this.registro)
                    let token = localStorage.getItem("token");
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    if (this.registro.nrocheq !== "" & this.registro.fechemi !== "" & this.codigomoneda.idmon !== "" & this.codigobanco.idbanco !== "") {
                        axios.post(API + '/cheques/new', registro, headtoken).then((res) => {
                            axios.get(API + '/cheques/all', headtoken).then((res) => {
                                let cheques = res.data.response;
                                this.cheques = cheques
                            })
                            let resultado = res.data;
                            alert("cheque creado correctamente");
                            if (resultado.response) {
                                router.push({ path: '/mesa/' });
                            } else {
                                alert(res.data.error);
                            }
                        })
                    } else {
                        alert("Número de cheque, Fecha Emision, Moneda y Banco no pueden estar vacios");
                    }
                },
                eliminarcheques: function (res, res2) {
                    let idcheq = res
                    let idcheq2 = res2
                    let token = localStorage.getItem("token");
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    this.cheques.splice(idcheq, 1)
                    axios.put(API + '/cheques/delete/' + idcheq2, {}, headtoken).then((res) => {
                        alert("Tipo de cheque eliminado correctamente");

                    })

                },
                actualizarcheques: function (res2) {
                    let modificocheque = {}
                    let cheques = this.cheques

                    for (let index = 0; index < cheques.length; index++) {
                        const element = cheques[index];
                        if (index == res2) {
                            modificocheque = {
                                nrocheq: element.nrocheq,
                                nrocheq: element.importe,
                                banco: element.banco,
                                moneda: element.moneda,
                                fechemi: element.fechemi,
                                fechpag: element.fechpag,
                                fechcob: element.fechcob,
                                activo: 1
                            }
                        }
                    }

                    let token = localStorage.getItem("token");
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.put(API + '/cheques/edit/' + modificocheque.idcheq, modificocheque, headtoken).then((res) => {
                        axios.get(API + '/cheques/all', headtoken).then((res) => {
                            alert("cheque, modificado y activo en forma correcta.");
                        })
                    })
                },
                mostrartodos: function () {
                    let token = localStorage.getItem("token");

                    this.seguridad = localStorage.getItem("seguridad")
                    let id = localStorage.getItem("idusuario")
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.get(API + '/cheques/allall', headtoken).then((res) => {
                        let cheques = res.data.response;
                        this.cheques = cheques
                    })
                },
                mostraractivos: function () {
                    let token = localStorage.getItem("token");
                    this.seguridad = localStorage.getItem("seguridad")
                    let id = localStorage.getItem("idusuario")
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.get(API + '/cheques/all', headtoken).then((res) => {
                        let cheques = res.data.response;
                        this.cheques = cheques
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
                obtenerbanco: function () {
                    let token = localStorage.getItem("token");
                    this.seguridad = localStorage.getItem("seguridad")
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.get(API + '/bancos/all', headtoken).then((res) => {
                        devuelvobanco = res.data.response;
                        this.devuelvobanco = devuelvobanco
                    })
                },
                cerrarsesion: function () {
                    router.push('/mesa')
                }
            },// fin el method

            mounted: function () {
                let token = localStorage.getItem("token");
                this.seguridad = localStorage.getItem("seguridad")
                const headtoken = { headers: { "mytoken": `${token}` } }
                axios.get(API + '/cheques/all', headtoken).then((res) => {
                    let cheques = res.data.response;
                    this.cheques = cheques
                }),
                    axios.get(API + '/monedas/all', headtoken).then((res) => {
                        devuelvomoneda = res.data.response;
                        this.devuelvomoneda = devuelvomoneda

                    }),
                    axios.get(API + '/bancos/all', headtoken).then((res) => {
                        devuelvobanco = res.data.response;
                        this.devuelvobanco = devuelvobanco
                    })
            },//fin del mounted
        })
    })
})