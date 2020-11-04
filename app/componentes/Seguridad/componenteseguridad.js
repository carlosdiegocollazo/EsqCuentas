let componenteseguridad= Vue.component('seguridad-component', function (resolve) {
    axios.get('./app/componentes/seguridad/vistaseguridad.html').then(function (view) {
        resolve({
            template: view.data,
            data: function () {
                return {
                    registro: {
                        idseg: "",
                        categoria: "",
                        descripcion: "",
                        activo: 1
                    },
                    seguridad: [],

                }
            },
            methods: {
                crearseguridad: function () {
                    let registro = {
                        categoria: this.registro.categoria,
                        descripcion: this.registro.descripcion,
                        activo: this.registro.activo
                    }

                    //  console.log("registro afuera del if", registro)

                    let token = localStorage.getItem("token");
                    const headtoken = { headers: { "mytoken": `${token}` } }

                    if (registro.activo == true) {
                        registro.activo = 1
                    }
                    //   console.log("registro afuera del if aNTES DEL axios", registro, headtoken)
                    if (this.registro.categoria !== 00 & this.registro.categoria !== 0 & this.registro.descripcion !== "") {
                        //    console.log("registro dentro el if", registro)
                        axios.post(API + '/seguridad/new', registro, headtoken).then((res) => {
                            let resultado = res.data;
                            //   console.log("resultado", resultado)
                            alert("Seguridad creada correctamente");
                            if (resultado.response) {
                                router.push({ path: '/mesa' });
                            } else {
                                alert(res.data.error);
                            }
                        })
                    } else {
                        alert("Categoria y Descripcion de seguridad no puede estar vacia");
                    }
                },
                eliminarseguridad: function (res, res2) {
                    let idseg = res
                    let idseg2 = res2
                    //console.log("recooro el data", idseg, idseg2)

                    let token = localStorage.getItem("token");
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    this.seguridad.splice(idseg, 1) //elimina la linea de la table y espues de la base
                    axios.put(API + '/seguridad/delete/' + idseg2, {}, headtoken).then((res) => {
                        alert("Indice de seguriad eliminada");
                        //    console.log("resdat delntro del xios", res.data)
                    })

                },
                actualizarseguridad: function (res) {
                    let modificoseguridad = {}
                    let seguridad = this.seguridad

                    for (let index = 0; index < seguridad.length; index++) {
                        const element = seguridad[index];
                        if (element.activo == true) {
                            element.activo = 1
                        }
                        if (index == res) {
                            modificoseguridad = {
                                idseg: element.idseg,
                                categoria: element.categoria,
                                descripcion: element.descripcion,
                                activo: 1
                            }
                            // console.log("moficio seguridad", modificoseguridad)
                        }
                    }
                    let token = localStorage.getItem("token");
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    //  console.log("id se seguridad que llega",modificoseguridad.idseg)
                    axios.put(API + '/seguridad/edit/' + modificoseguridad.idseg, modificoseguridad, headtoken).then((res) => {
                        axios.get(API + '/seguridad/all', headtoken).then((res) => {
                            alert("Indice de seguridad modificada.");
                        })
                    })
                },
                mostrartodos: function () {
                    let token = localStorage.getItem("token");

                    this.categoria = localStorage.getItem("seguridad")
                    let id = localStorage.getItem("idusuario")
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.get(API + '/seguridad/allall', headtoken).then((res) => {
                        let seguridad = res.data.response;
                        //   console.log("contenido del for", seguridad)
                        this.categoria = seguridad
                    })
                },
                mostraractivos: function () {
                    let token = localStorage.getItem("token");

                    this.categoria = localStorage.getItem("seguridad")
                    let id = localStorage.getItem("idusuario")
                    const headtoken = { headers: { "mytoken": `${token}` } }
                    axios.get(API + '/seguridad/all', headtoken).then((res) => {
                        let seguridad = res.data.response;
                        // console.log("contenido del for", seguridad)
                        this.categoria = seguridad
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
                axios.get(API + '/seguridad/all', headtoken).then((res) => {
                    let seguridad = res.data.response;
                    console.log("contenido del for que llena el html", seguridad)
                    this.seguridad = seguridad

                })
            },//fin del mounted
        })
    })
})