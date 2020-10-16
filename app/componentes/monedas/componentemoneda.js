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
                    }

                }
            },
            methods: {
                crearmoneda: function () {
                    let registro = {
                        monedas: this.registro.monedas,
                        divide: this.registro.divide,
                        activo: this.registro.activo
                    }

                    console.log("registro", registro)
                    if (this.registro.monedas !== "") {
                        axios.post(API + 'monedas/new', registro).then((res) => {
                            let resultado = res.data;
                            console.log("resultado", resultado)
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

                }
            },

            mounted: function () {
                console.log(this.$router)
                this.seguridad = localStorage.getItem("seguridad")
                let id = localStorage.getItem("idusuario")
                let token = localStorage.getItem("token");
                axios.get(API + '/monedas/all',
                    { headers: { "mytoken": `${token}` } }).then((res) => {
                        let monedas = res.data.response;
                        console.log("contenido del for", monedas)
                    })
                    this.monedas
                },
        })
    })
})