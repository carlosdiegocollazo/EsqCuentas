let editorComponent = Vue.component('editor-component', function(resolve) {
    axios.get('./app/components/editor/editorView.html').then( function(res) {
        resolve ({
            props:['objArticulo'],
            template:res.data,
            data: function() {
                return {
                    datart: '',
                    datartButton: '',
                    artTitulo: '',
                    artKeywords:'',
                    artArchivo:'',   
                    artTopico: '',
                    active: this.activex     
                }
            },
            methods:{
                guardarArt: function () {
                    let token = localStorage.getItem("token");
                    console.log(token)
                    let resumen = this.datart.getData();
                    let id = localStorage.getItem('user-id');
                    let url = API+'articulo/new';

                    let topico = document.getElementById("topicos")
                    this.artTopico = topico.value

                    let articulo = {
                        articuloEstado: "En Espera",
                        articuloTipo: "1",
                        articuloTopico: this.artTopico,
                        articuloTitulo: this.artTitulo,
                        articuloResumen : resumen,
                        articuloKeywords :this.artKeywords,
                        articuloAutor: id,
                        articuloArchivo: this.artArchivo,
                        articuloPuntaje: "0"
                    }
                    console.log(articulo)
                    axios.post(url,articulo,{headers: {"mytoken":`${token}`}}).then((res) => {
                        let response = res.data;
                        console.log(response)
                        // window.location.reload()
                    })
                },
                editarArt: function () {
                    let token = localStorage.getItem("token");
                    let usuarioId = localStorage.getItem("user-id")
                    this.active = false
                    console.log(this.objArticulo)
                    let id = this.objArticulo.articuloId
                    let resumen = this.datart.getData();

                    let articuloEdit = {
                        articuloEstado: "En Espera",
                        articuloTipo: "1",
                        articuloTopico: "1",
                        articuloTitulo: this.artTitulo,
                        articuloResumen : resumen,
                        articuloKeywords :this.artKeywords,
                        articuloArchivo: this.artArchivo,
                        articuloAutor: usuarioId,
                        articuloArchivo: this.artArchivo,
                        articuloPuntaje: "0"
                    }
                    axios.put(API+'articulo/edit/'+id,articuloEdit,{headers: {"mytoken":`${token}`}}).then( (res) => {
                        console.log("editando articulos",id)
                        console.log(res.data)
                        window.location.reload()
                    })
                }
            },
            mounted: function () {
                                
                // -----------------------------------------------------

                console.log("objArticulo: ", this.objArticulo)
               
                let artEdit = this.objArticulo;

                this.datart        = artEdit.articuloResumen
                this.artTitulo     = artEdit.articuloTitulo
                this.artKeywords   = artEdit.articuloKeywords
                this.artArchivo    = artEdit.articuloArchivo
                
                DecoupledEditor 
                .create( document.querySelector('#editorx'))
                .then(newEditor => {
                    const toolbarContainer = document.querySelector( '#toolbar-container' );
                    toolbarContainer.appendChild( newEditor.ui.view.toolbar.element );
                    
                        if(this.datart == ''){
                            this.datart = newEditor
                            this.datart.getData()
                        } else {
                            newEditor.setData(this.datart)
                            this.datart = newEditor
                        }

                }).catch( error => {
                    console.error( "ERROR DEL CATH:::",error );
                });

                this.datartButton = this.datart.length
                this.datartButton.toString()
                console.log("datartButton:::",typeof this.datartButton)
               
            }
        })       
    })
})