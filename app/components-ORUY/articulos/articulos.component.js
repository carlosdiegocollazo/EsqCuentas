let articulosComponent = Vue.component('articulos-component', function(resolve) {
    axios.get('./app/components/articulos/articulosView.html').then(function (view){

        resolve ({
            template: view.data,
            data: function () {
                return{
                    search:"",
                    activex: false,
                    clasState: "",
                    nombreUsuario: localStorage.getItem('user-name'),
                    artTitulo: "",
                    artKeywords: "",
                    resumen: "",
                    userRol: "",
                    articulos: [],
                    articulo: {
                        msg:"hola"
                    },
                    isEdit: false,
                    isCreate: false,
                    img: "",
                    templateSelected: ``
                }
            },
            methods: {
                /* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
                openNav: function () {
                    document.getElementById("mySidebar").style.width = "250px";

                },
                
                /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
                closeNav: function () {
                    document.getElementById("mySidebar").style.width = "0";
                },
                borrarArt: function (res) {
                    let idArt = res
                    let token = localStorage.getItem("token");
                    const headtoken = {headers: {"mytoken":`${token}`}}
                   
                    axios.put(API+'articulo/delete/'+idArt,{},headtoken).then((res)=> {
                        window.location.reload()
                    })

                },
                editarArt: function (res) {
                    let artEdit   = this.articulos[res]
                    this.isEdit   = true;
                    this.isCreate = false;
                    this.articulo = artEdit;

                    console.log("Valores de res::",res)
                    console.log("Valor de Artedit",artEdit)

                    this.resumen = artEdit.articuloResumen
                    this.titulo = artEdit.articuloTitulo
                    this.keywords = artEdit.articuloKeywords
                    
                },
                newArt: function (){
                    this.isEdit   = false;
                    
                    this.articulo = {
                        articuloResumen: '',
                        articuloTitulo: '',
                        articuloKeywords: ''
                    }
                    setTimeout( () => {
                        this.isCreate = true;
                    })
                },
                articulosView: function (){
                    this.isEdit     = false;
                    this.isCreate   = false;
                }
            },
            mounted: function () {
                console.log(this.$router)
                this.userRol = localStorage.getItem("user-rol")
                let id = localStorage.getItem("user-id")
                let token = localStorage.getItem("token");
                let imgRandom = Math.floor(Math.random() * 3) + 1;
                this.img = `./assets/${imgRandom}`


                axios.get('https://server134-school.lexartlabs.com/api-or-dev/articulos/usuario/'+id, 
                    {headers: {"mytoken":`${token}`}}).then((res) =>{
                        let elArt = res.data.response;

                            if (!res.data.error) {

                                for (var i = elArt.length - 1; i >= 0; i--) {
                                    let valor = elArt[i].articulo
                                    let imgRandom = Math.floor(Math.random() * 3) + 1;
                                    this.img = `./assets/${imgRandom}.jpg`

                                    if (valor.articuloEstado === "En Espera") {
                                                                               
                                        valor["artStyle"]   =  "await";
                                        valor["artImg"]     =   this.img;
                                        console.log("en espera")
                                        
                                    }else if (valor.articuloEstado === "Publicado") {

                                        valor["artStyle"]  =  "publish";
                                        valor["artImg"]     =   this.img;
                                  
                                    }else if (valor.articuloEstado === "Cancelada") {

                                        valor["artStyle"]  =  "reject";
                                        valor["artImg"]     =   this.img;
                                  
                                    }else if (valor.articuloEstado === "En Revision") {

                                        valor["artStyle"]  =  "await";
                                        valor["artImg"]     =   this.img;
                                  
                                    }

                                    axios.get(API+"recomendaciones/articulo/"+valor.articuloId,{headers: {"mytoken":`${token}`}}).then((res)=> {
                                        let recomendacion = res.data.response;
                                        valor["recomendacion"]= recomendacion
                                        
                                        this.articulos.push(valor);     
                                        console.log(valor)                                  
                                    })  
                                   // console.log("log de articulos[]:::",this.articulos)
                                }

                                


                            }else{

                                console.log("Usuario ID:"+id+" :EL ERROR::::",res.data.error)
                                // window.localStorage.clear();
                            }
                        })
                    },                    
            computed: {
                filteredList() {
                  return this.articulos.filter(articulos => {
                    return articulos.articuloTitulo.toLowerCase().includes(this.search.toLowerCase())
                  })
                }
            }

        })
    })
}) 