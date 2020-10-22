let componentedocumento = Vue.component('documentos-component', function (resolve) {
    axios.get('./app/componentes/documentos/vistadocumento.html').then(function (view) {
        resolve({
            template: view.data,
            data: function () {
                return {
                    registro: {
                        idtipdoc: "",
                        tipodoc: "",
                        moneda: "",
                        activo: 1
                    },
                    devuelvomoneda: { 
                        idmon: "",
                        moneda: "",
                        divide: "",
                        activo: 1
                    },

                    codigomoneda: "", 
                    tipodoc: [],

                }
            },
            methods: {
                creardocumento: function () {
                    let registro = {
                        tipodoc: this.registro.tipodoc,
                        moneda: this.codigomoneda.idmon,
                        activo: this.registro.activo
                    }
                    console.log("registro que viene desde el html",registro)
                    let token = localStorage.getItem("token");
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    if (this.registro.tipodoc !== "") {
                        console.log("resultado antes del axios", registro)
                        axios.post(API + '/documentos/new', registro, headtoken).then((res) => {
                            let resultado = res.data;
                            console.log("lo que resutla del axios despues",resultado)
                            alert("Tipo de documentos creado correctamente");
                            if (resultado.response) {
                                router.push({ path: '/mesa' });
                            } else {
                                alert(res.data.error);
                            }
                        })
                    } else {
                        alert("Descripcion de documentos no puede estar vacia");
                    }
                },
                eliminardocumento: function (res, res2) {
                    let idtipdoc = res
                    let idtipdoc2 = res2
                    //console.log("recooro el data", idtipdoc, idtipdoc2)

                    let token = localStorage.getItem("token");
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    this.documentos.splice(idtipdoc, 1) //elimina la linea de la table y espues de la base
                    axios.put(API + '/documentos/delete/' + idtipdoc2, {}, headtoken).then((res) => {
                        alert("documentos", idtipdoc2, " eliminada correcatmente.");
                        //    console.log("resdat delntro del xios", res.data)
                    })

                },
                actualizardocumento: function (res2) {
                    let modificodocumento = {}
                    let documentos = this.documentos

                    for (let index = 0; index < documentos.length; index++) {
                        const element = documentos[index];
                        if (element.activo == true) {
                            element.activo = 1
                        }
                        if (index == res2) {
                            modificodocumento = {
                                idtipdoc: element.idtipdoc,
                                documentos: element.documentos,
                                moneda: element.moneda,
                                activo: element.activo
                            }
                        }
                    }
                    let token = localStorage.getItem("token");
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.put(API + '/documentos/edit/' + modificodocumento.idtipdoc, modificodocumento, headtoken).then((res) => {
                        axios.get(API + '/documentos/all', headtoken).then((res) => {
                            alert("documentos", modificodocumento, documentos, " modificada correctamente");
                        })
                    })
                },
                mostrartodos: function () {
                    let token = localStorage.getItem("token");

                    this.monedas = localStorage.getItem("monedas")
                    let id = localStorage.getItem("idusuario")
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.get(API + '/documentos/allall', headtoken).then((res) => {
                        let documentos = res.data.response;
                        //   console.log("contenido del for", documentos)
                        this.documentos = documentos
                    })
                },
                mostraractivos: function () {
                    let token = localStorage.getItem("token");

                    this.monedas = localStorage.getItem("monedas")
                    let id = localStorage.getItem("idusuario")
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.get(API + '/documentos/all', headtoken).then((res) => {
                        let documentos = res.data.response;
                        // console.log("contenido del for", documentos)
                        this.documentos = documentos
                    })
                },
                obtenermoneda: function () {//cambiar para usar con monedas
                    let token = localStorage.getItem("token");
                    this.seguridad = localStorage.getItem("seguridad")
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.get(API + '/monedas/all', headtoken).then((res) => {
                        devuelvomoneda = res.data.response;
                        this.devuelvomoneda = devuelvomoneda
                        //console.log("la devoucion de lo que selecciona", obtenermonedas.codigomoneda)
                        //console.log("devuelvomoneda", devuelvomoneda)
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
                axios.get(API + '/documentos/all', headtoken).then((res) => {
                    let documentos = res.data.response;
                    //console.log("contenido del for", documentos)
                    this.documentos = documentos

                })
                axios.get(API + '/monedas/all', headtoken).then((res) => {
                    devuelvomoneda = res.data.response;
                    this.devuelvomoneda = devuelvomoneda
                    //console.log("la devoucion de lo que selecciona", this.obtenermonedas.codigomoneda)
                    //console.log("devuelvomoneda", devuelvomoneda)
                })
            },//fin del mounted
        })
    })
})