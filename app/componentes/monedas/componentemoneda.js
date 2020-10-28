let componentemoneda = Vue.component('monedas-component', function (resolve) {
    axios.get('./app/componentes/monedas/vistamonedas.html').then(function (view) {
        resolve({
            template: view.data,
            data: function () {
                return {
                    registro: {
                        idmon: "",
                        monedas: "",
                        divide: 1,
                        activo: 1
                    },
                    monedas: [],

                }
            },
            methods: {
                crearmoneda: function () {
                    let registro = {
                        monedas: this.registro.monedas,
                        divide: this.registro.divide,
                        activo: this.registro.activo
                    }
                    let token = localStorage.getItem("token");
                    const headtoken = { headers: { "mytoken": `${token}` } }

                    if (this.registro.monedas !== "") {

                        axios.post(API + '/monedas/new', registro, headtoken).then((res) => {
                            let resultado = res.data;
                            //       console.log("resultado", resultado)
                            alert("Tipo de moneda creado correctamente");
                            if (resultado.response) {
                                router.push({ path: '/monedas' });
                            } else {
                                alert(res.data.error);
                            }
                        })
                    } else {
                        alert("Descripcion de monedas no puede estar vacia");
                    }
                },
                eliminarmoneda: function (res, res2) {
                    let idmon = res
                    let idmon2 = res2
                    //console.log("recooro el data", idmon, idmon2)

                    let token = localStorage.getItem("token");
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    this.monedas.splice(idmon, 1) //elimina la linea de la table y espues de la base
                    axios.put(API + '/monedas/delete/' + idmon2, {}, headtoken).then((res) => {
                        alert("Moneda eliminada correcatmente.");
                        //    console.log("resdat delntro del xios", res.data)
                    })

                },
                actualizarmonedas: function (res2) {
                    let modificomoneda = {}
                    let monedas = this.monedas

                    for (let index = 0; index < monedas.length; index++) {
                        const element = monedas[index];
                        if (element.divide == true) {
                            element.divide = 1
                        }
                        if (element.activo == true) {
                            element.activo = 1
                        }
                        if (index == res2) {
                            modificomoneda = {
                                idmon: element.idmon,
                                moneda: element.moneda,
                                divide: element.divide,
                                activo: 1
                            }
                        }
                    }
                    let token = localStorage.getItem("token");
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.put(API + '/monedas/edit/' + modificomoneda.idmon, modificomoneda, headtoken).then((res) => {
                        axios.get(API + '/monedas/all', headtoken).then((res) => {
                            alert("Moneda",modificomoneda,moneda," modificada correctamente");
                        })
                    })
                },
                mostrartodos: function () {
                    let token = localStorage.getItem("token");

                    this.seguridad = localStorage.getItem("seguridad")
                    let id = localStorage.getItem("idusuario")
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.get(API + '/monedas/allall', headtoken).then((res) => {
                        let monedas = res.data.response;
                        //   console.log("contenido del for", monedas)
                        this.monedas = monedas
                    })
                },
                mostraractivos: function () {
                    let token = localStorage.getItem("token");

                    this.seguridad = localStorage.getItem("seguridad")
                    let id = localStorage.getItem("idusuario")
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.get(API + '/monedas/all', headtoken).then((res) => {
                        let monedas = res.data.response;
                        // console.log("contenido del for", monedas)
                        this.monedas = monedas
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
                let id = localStorage.getItem("idusuario")
                const headtoken = { headers: { "mytoken": `${token}` } }
                axios.get(API + '/monedas/all', headtoken).then((res) => {
                    let monedas = res.data.response;
                    //console.log("contenido del for", monedas)
                    this.monedas = monedas

                })
            },//fin del mounted
        })
    })
})