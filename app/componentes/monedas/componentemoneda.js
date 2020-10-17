let componentemoneda = Vue.component('monedas-component', function (resolve) {
    axios.get('./app/componentes/monedas/vistamonedas.html').then(function (view) {
        resolve({
            template: view.data,
            data: function () {
                return {
                    registro: {
                        monedas: "",
                        divide: 1,
                        activo: 1
                    },
                    monedas: []


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
                            console.log("resultado", resultado)
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
                eliminarmoneda: function (res) {
                    let idmon = res
                    let token = localStorage.getItem("token");
                    const headtoken = { headers: { "mytoken": `${token}` } }

                    axios.put(API + 'monedas/delete/' + idmon, {}, headtoken).then((res) => {
                        window.location.reload()
                    })

                },
                actualizarmoneda: function (res) {
                    let editomonedas = this.monedas[res]
                    this.monedas = editomonedas;

                    console.log("Valor de editomonedas", editomonedas)

                    this.monedas = editomonedas.monedasmonedas
                    this.divide = editomonedas.monedasdivide
                    this.activo = editomonedas.monedasactivo

                },
                cerrarsesion: function () {

                    router.push('/mesa')
                }
            },

            mounted: function () {
                //console.log(this.$router)
                let token = localStorage.getItem("token");

                this.seguridad = localStorage.getItem("seguridad")
                let id = localStorage.getItem("idusuario")
                const headtoken = { headers: { "mytoken": `${token}` } }
                axios.get(API + '/monedas/all', headtoken).then((res) => {
                    let monedas = res.data.response;
                    console.log("contenido del for", monedas)

                    this.monedas = monedas

                })
            },
        })
    })
})