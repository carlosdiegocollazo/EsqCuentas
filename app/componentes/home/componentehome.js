let componentehome = Vue.component('home-component', function(resolve) {
    axios.get('./app/componentes/home/vistahome.html').then(function(view) {
        resolve({
            template: view.data,
            data: function() {
                return {
                    usuario: {
                        email: "",
                        password: ""
                    },

                }
            },
            methods: {
                loginUser: function () {
                    let usuario = {
                        usuarioEmail: this.usuario.email,
                        usuarioPassword: this.usuario.password
                    }
                    console.log(usuario)
                        axios.post(API + 'usuarios/login', usuario).then((res) => {
                            let resultado = res.data;
                            console.log(resultado)

                            if (resultado.response) {
                                usuario = resultado;
                                console.log("Nombre de usuario:::", usuario.response.usuarioNombre)
                                localStorage.setItem("user-name", usuario.response.usuarioNombre);
                                localStorage.setItem("user-id", usuario.response.usuarioId);
                                localStorage.setItem("user-rol", usuario.response.usuarioRol);
                                localStorage.setItem("token", usuario.token)
                                router.push({ path: '/backoffice/articulos' });
                            } else {
                                console.log(usuario)
                                alert("Usuario / Contraseña incorrectos");
                                this.user = {};
                            }
                        })
                    },

            }
        })
    })
})