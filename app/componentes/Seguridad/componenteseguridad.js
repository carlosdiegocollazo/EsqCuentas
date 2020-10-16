let componenteseguridad = Vue.component('seguridad-component', function (resolve) {
    axios.get('./app/componentes/seguridad/vistaseguridad.html').then(function (view) {
        resolve({
            template: view.data,
            data: function () {
                return {
                    registro: {
                        seguridad: "",
                        divide: 1,
                        activo:1
                    }

                }
            },
            methods: {
                registsegurida: function () {
                    let registro = {
                        seguridad: this.registro.seguridad,
                        divide: this.registro.divide,
                        activo: this.registro.activo
                    }

                    console.log("registro", registro)
                    if (this.registro.segurida !== "") {
                        axios.post(API + 'seguridad/new', registro).then((res) => {

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