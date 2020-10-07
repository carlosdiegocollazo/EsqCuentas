let registroComponent = Vue.component('user-component', function (resolve) {
    axios.get('./app/components/registro/reguserFormView.html').then(function (view) {
        resolve({
            template: view.data,
            data: function () {
                return {
                    usuario: {
                                email: "",
                                password: ""
                            },
                    
                    registro: {
                                nick:"",
                                nombre: "",
                                apellido: "",
                                email: "",
                                pwd: "", 
                                rpwd: "",
                                keywords: "",
                                empleo:"",
                                profesion:"",
                                organizacion:"",
                                educacion: ""
                            }
                }
            },
            methods: {
                loginUser: function () {
                    let usuario = {
                        usuarioEmail: this.usuario.email,
                        usuarioPassword: this.usuario.password
                    }
                        axios.post(API + 'usuario/login', usuario).then((res) => {
                            let resultado = res.data;

                            if (resultado.response) {
                                usuario = resultado;
                                console.log("Nombre de usuario:::", usuario.response.usuarioNombre)
                                localStorage.setItem("user-name", usuario.response.usuarioNombre);
                                localStorage.setItem("user-id", usuario.response.usuarioId);
                                localStorage.setItem("user-rol", usuario.response.usuarioRol);
                                localStorage.setItem("token", usuario.token)
                                router.push({ path: '/backoffice/articulos' });
                            } else {

                                alert("Usuario / Contraseña incorrectos");
                                this.user = {};
                            }
                        })
                    },                   
                    registUser: function () {  
                        let captcha = document.querySelector('#g-recaptcha-response').value;        

                        let registro = {
                            usuarioNick: this.registro.nombre,
                            usuarioNombre: this.registro.nombre,
                            usuarioApellido: this.registro.apellido,
                            usuarioEmail: this.registro.email,
                            usuarioPassword: this.registro.pwd,
                            usuarioKeywords: this.registro.keywords,
                            usuarioEmpleo: "Selecione",
                            usuarioProfesion: "Seleccione",
                            usuarioOrg: 1,
                            usuarioPais: "Uruguay",
                            usuarioNivelEduc: this.registro.educacion,
                        }
                        if (this.registro.nombre !== "" & this.registro.apellido !=="" & this.registro.email !=="") {
                            if (this.registro.pwd !=="" & this.registro.pwd == this.registro.rpwd) {
                                if(captcha !== ""){
                                axios.post(API + 'usuario/new', registro).then((res) => {

                                    let resultado = res.data;
                                    if (!res.data.error) {
                                        router.push({ path: '/backoffice/articulos' });
                                    } else {
                                        alert(res.data.error);
                                    }
                                })
                            }else{
                                alert("Verifica que no eres un robot")
                            }
                            } else {
                                alert("Los passwords no coinciden o estan vacios");
                            }
                        } else {
                            alert("Debe ingresar Nombre, Apellido y e-mail");
                        }
                    },               
                    limpiar:function () {
                        this.registro={
                            nick: "",
                            nombre: "",
                            apellido: "",
                            email: "",
                            pwd: "",
                            rpwd: "",
                            keywords: "",
                            empleo: "",
                            profesion: "",
                            organizacion: "",
                            educacion: ""
                        }
                    }
            }
        })
    })
})