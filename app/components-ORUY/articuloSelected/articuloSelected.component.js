let artselected = Vue.component('artselected', function (resolve){
    axios.get('./app/components/articuloSelected/articuloSelectedView.html').then((view) => {
        resolve({
            props: ['id'],
            template: view.data,
            data: function () {
                return {
                    autor: "",
                    title: "",
                    archivo: '',
                    select:"",
                    templateView: ``,
                    resdevolucion:[],
                    nombrerevisor:"",
                    idrevisor:0,
                    userRol: "",
                    devolution: ''
                }
            },
            methods:{
                recomendarArticulo: function(){
                   let token           = localStorage.getItem("token");
                   let userId          = localStorage.getItem("user-id");
                   let recomendacion   = {
                                           "recomendacionArticulo": this.id,
                                           "recomendacionRevisor": userId
                                       }
                   axios.post(API + 'recomendacion/new', recomendacion, {headers: {"mytoken":`${token}`}}).then((res)=>{
                       if (!res.data.error) {
                           alert(res.data.response);
                       }else {
                           alert(res.data.error);
                       }
                   })
               },
               cambiarEstado: function () {
                    let token = localStorage.getItem("token");
                    this.select = "Publicado"             

                    axios.put(API+'articulo/publicar/'+this.id,{},{headers: {"mytoken":`${token}`}}).then( (res) => {
                        console.log(res.data)
                        router.push('/backoffice/articulos')
                    })
               },
               devolucionInsert: function () {
                let token = localStorage.getItem("token");
                let usrID = localStorage.getItem("user-id")
                let devolucion = this.devolution.getData(); 

                let objDevolucion = {
                    "devolucionArticulo": this.id,
                    "devolucionRevisor": usrID,
                    "devolucionValor": "5",
                    "devolucionComentario": devolucion
                }

                console.log(objDevolucion)
                axios.post(API+'devolucion/new',objDevolucion, {headers: {'mytoken': token}}).then((res) => {
                    let respuesta = res.data;
                    console.log(respuesta)
                    if(respuesta.error){
                        alert(respuesta.error)
                    }else {
                        window.location.reload()
                    }
                })
               }
            },
            mounted: function () {
                this.userRol = localStorage.getItem("user-rol")
                console.log(this.userRol)
                let token = localStorage.getItem("token");
                let editorx = document.querySelectorAll("editorx")


                 

                // let selector = document.querySelectorAll("#selectEstado")
                //     selector.addEventListener('onchange', () => {
                //         cambiarEstado()
                //     })

                axios.get(API+'articulo/full/'+this.id,{}).then((res) => {
                    let data = res.data.response.articulo
                    this.autor = res.data.response.autor.usuarioNombre
                    console.log("res.data.response.articulo", data)
                    this.title = data.articuloTitulo.charAt(0).toUpperCase() + data.articuloTitulo.slice(1);
                    this.templateView = data.articuloResumen;
                    this.archivo = data.articuloArchivo;
                })

                console.log("ARCHIVOS!!",this.archivo)
                if(this.userRol) {
                    axios.get(API + 'devoluciones/articulo/full/' + this.id, { headers: { "mytoken": `${token}`}}).then((res) => {
                        let devuelve = res.data.response;
    
                        for (let index = 0; index < devuelve.length; index++) {
                            const devuelvevarios = devuelve[index];
                            let dev = {                            
                                devolucionFecha: devuelvevarios.devolucion.devolucionFecha,
                                devolucionComentario: devuelvevarios.devolucion.devolucionComentario,
                                devolucionValor: devuelvevarios.devolucion.devolucionValor,
                                nombrerevisor: devuelvevarios.autor.usuarioNombre,
                            }
                            this.resdevolucion.push(dev);
                        }                        
                    })
                }
                //cargo datos de comentarios/devolucion
                
                

                // Contenedor para devolcuiones
                // ----------------------------------------------------
                
                let editor;
                setTimeout( () => {
                    console.log("DecoupledEditor: ", DecoupledEditor);

                    DecoupledEditor
                    .create( document.getElementById('editorx') ).then( newEditor => {
                        const toolbarContainer = document.getElementById( 'toolbar-container' );
                        console.log("toolbarContainer: ", toolbarContainer)
                        toolbarContainer.appendChild( newEditor.ui.view.toolbar.element );
                        
                        this.devolution = newEditor;
                        this.devolution.getData();

                    } )
                    .catch( error => {
                        console.log( error );
                    } );
                })
            }
        })
    })
})