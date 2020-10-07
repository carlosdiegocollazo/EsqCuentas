let perfilComponent = Vue.component('perfil-component', function(resolve) {
    axios.get('./app/components/perfil/perfilView.html').then(function (view){

        resolve ({
            template: view.data,
            data: function () {
                return {
                    //nombreUsuario: localStorage.getItem('user-name'),
                    id: localStorage.getItem('user-id'),
                    actualizar: {
                                usuarioNick: "",
                                usuarioNombre: "",
                                usuarioApellido: "",
                                usuarioEmail: "",
                                usuarioKeywords: "",
                                usuarioOrg: "Seleccione",
                                usuarioEmpleo: "",
                                usuarioProfesion: "",
                                usuarioPais: "Uruguay",
                                usuarioNivelEduc: "Seleccione",
                                usuarioRol: 1,
                                usuarioPerfil: ""
                    }
            }
        },
        methods: {
            actualizaUser: function () {    
                let token = localStorage.getItem("token"); 
                let elId = localStorage.getItem('user-id');      

                if (this.actualizar.pwd == this.actualizar.rpwd) {
                    
                    axios.put(API + 'usuario/edit/'+elId, this.actualizar, {headers: {"mytoken":`${token}`}}).then((res) => {
                      
                        let resultado = res.data;
                        console.log(resultado)
                        if (!res.data.error) {
                            //router.push({ path: '/backoffice/articulos' });
                            let topico = document.getElementById("topicos")
                            let preferencias = {
                                preferenciaUsuario: elId,
                                preferenciaTopico: topico.value
                            }
                            axios.post(API + 'preferencia/new',preferencias,{headers: {"mytoken":`${token}`}}).then((res)=> {
                                console.log("Respuesta de preferencias:::",res.data)
                            })

                            alert("Usuario Actualizado con exito");
                        } else {
                            alert("No funciona la operacion de actualizar");
                        }
                    })
                } else {
                    alert("Los passwords no coinciden");
                }
            }, //fin function actualizar          
            cancelar: function () {
                router.push({ path: '/backoffice/articulos' });
            }

        }, //fin del methods   
        mounted:function() {           
            let token = localStorage.getItem("token");
            let elId = localStorage.getItem('user-id');
            console.log("Numero::",elId)                                            
                axios.get(API+'usuario/'+elId,{headers: {"mytoken":`${token}`}}).then((resp) =>{
                    let respuesta=resp.data.response;
                                        
                    actualizarEditado = {
                        usuarioNick: respuesta.usuarioNick,
                        usuarioNombre: respuesta.usuarioNombre,
                        usuarioApellido: respuesta.usuarioApellido,
                        usuarioEmail: respuesta.usuarioEmail,
                        usuarioEmpleo: respuesta.usuarioEmpleo,
                        usuarioKeywords: respuesta.usuarioKeywords ,
                        usuarioNivelEduc: respuesta.usuarioNivelEduc,
                        usuarioOrg: respuesta.usuarioOrg,
                        usuarioPais: respuesta.usuarioPais,
                        usuarioPerfil: respuesta.usuarioPerfil,
                        usuarioRol: 1
                    }                   
                    
                    this.actualizar = actualizarEditado;                    
                })
            } //fn del mounted
        }) // fin de resolve
    }) //fin de axios
}) //fin de let