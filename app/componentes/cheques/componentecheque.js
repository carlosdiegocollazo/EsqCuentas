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
                        banco: "",
                        moneda: "",
                        fechemi: "",
                        fechpag: "",
                        fechcob: "",
                        activo: 1
                    },
                    codigomoneda: "",
                    codigobanco: "",
                    limpiar:"",
                }
            },
            methods: {
                crearcheques: function () {
                    registro = {
                        nrocheq: this.registro.nrocheq,
                        importe: this.registro.importe,
                        banco: this.codigobanco.idbanco,
                        moneda: this.codigobanco.idmon,
                        fechemi: this.registro.fechemi,
                        fechpag: this.registro.fechpag,
                        fechcob: this.registro.fechcob,
                        activo: 1
                    }
                    //console.log("registro que guarda",registro)
                    let token = localStorage.getItem("token");
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    if (this.registro.fechcob !== "" & this.registro.fechpag !== "") {
                            this.registro.importe=""
                            this.registro.fechcob=""
                            this.registro.fechpag=""
                        alert("El Cheque no puede ser para cobrar y pagar")}
                    if (this.registro.nrocheq !== "" & this.registro.fechemi !== "" & this.registro.importe !== "" & this.codigobanco.idbanco !== "") {
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
                        alert("Debe ingresar obligatoriamente: Número de cheque, Importe , Banco y Fecha Emision");
                    }
                },
                eliminarcheques: function (res, res2) {
                    let idcheq = res
                    let idcheq2 = res2
                    // //console.log("res y res2",res,res2)
                    let token = localStorage.getItem("token");
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    this.cheques.splice(idcheq, 1)
                    axios.put(API + '/cheques/delete/' + idcheq2, {}, headtoken).then((res) => {
                        alert("Cheque eliminado correctamente");

                    })

                },
                actualizarcheques: function (res) {
                    let modificocheque = {}
                    let cheques = this.cheques
                    //console.log("cheuqes que trae del html", cheques)
                    //console.log("res del cheques a modificar", res)
                    for (let index = 0; index < cheques.length; index++) {
                        const element = cheques[index];
                        if (index == res) {
                            modificocheque = {
                                idcheq: element.idcheq,
                                nrocheq: element.nrocheq,
                                importe: element.importe,
                                banco: element.idbanco,
                                moneda: element.moneda,
                                fechemi: element.fechemi,
                                fechpag: element.fechpag,
                                fechcob: element.fechcob,
                                activo: 1,
                            }
                        }
                    }
                    //console.log("lo que se manda a modificar", modificocheque)
                    let token = localStorage.getItem("token");
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.put(API + '/cheques/edit/' + modificocheque.idcheq, modificocheque, headtoken).then((res) => {
                        axios.get(API + '/cheques/all', headtoken).then((res) => {
                            alert("Cheque, modificado forma correcta.");
                            let cheques = res.data.response;
                            this.cheques = cheques
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
                
                limpiar: function () {
                /*this.registro = {
                        idcheq: "",
                        nrocheq: "",
                        importe: "",
                        banco: "",
                        moneda: "",
                        fechemi: "",
                        fechpag: "",
                        fechcob: "",
                        activo: 1
                    }*/
                    router.push('/cheques/')
                },
                cerrarsesion: function () {
                    router.push('/mesa/')
                }
            },// fin el method

            mounted: function () {
                let token = localStorage.getItem("token");
                this.seguridad = localStorage.getItem("seguridad")
                const headtoken = { headers: { "mytoken": `${token}` } }
                axios.get(API + '/cheques/all', headtoken).then((res) => {
                    let cheques = res.data.response;
                    this.cheques = cheques
                    //console.log("cheques con que se arma la tabla", this.cheques)
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