let componentemoneda = Vue.component('moneda-component', function (resolve) {
    axios.get('./app/componentes/monedas/vistamonedas.html').then(function (view) {
        resolve({
            template: view.data,
            data: function () {
                return {
                    registro: {
                        moneda: "",
                        divide: ""
                    }

                }
            },
            methods: {
                registmoneda: function () {
                    let registro = {
                        moneda: this.registro.moneda,
                        divide: this.registro.divide,
                        activo: this.registro.activo
                    }

                    console.log("registro", registro)
                    if (this.registro.moneda !== "") {
                        axios.post(API + 'monedas/new', registro).then((res) => {

                            let resultado = res.data;
                            if (resultado.response) {
                                router.push({ path: '/mesa' });
                            } else {
                                alert(res.data.error);
                            }
                        })
                    } else {
                        alert("Descripcion no puede estar vacia");
                    }
                },
            },
        })
    })
})