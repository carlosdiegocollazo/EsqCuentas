let busquedaComponent = Vue.component('busqueda', function (resolve){
    axios.get('./app/components/busqueda/busquedaView.html').then(function (view){
        resolve({
            props: ['busqueda'],
            template: view.data,
            data: function (){
                return{
                    autor: "",
                    error: false,
                    userRol: "",
                    foundit: [],
                    img: ""

                }
            },
            mounted: function () {
                this.articulos = ""
                this.userRol = localStorage.getItem("user-rol")
                let imgRandom = Math.floor(Math.random() * 3) + 1;
                this.img = `./assets/${imgRandom}.jpg`
                console.log("objBuscar::", router.app._route.params.busqueda)
               
                let objBuscar = {
                    // faltaba esto, por que estas buscando por url cuando agregas el componente a un ruteo
                    // es horrible pero bueno
                    // esto vuela igual que la paloma jaja
                    buscar:  router.app._route.params.busqueda,
                    parametro1: "1"
                }
               

                console.log(axios)

                if (objBuscar.buscar !== "" || objBuscar.buscar !== 'undefined'){

                    axios.post(API+'articulos/buscar/fullflex/',objBuscar,{}).then((res)=>{

                        let respuesta = res.data.response;

                        if (!res.data.error){                    
                            for (var i = respuesta.length - 1; i >= 0; i--) {
                                this.autor = res.data.response[i].autor.usuarioNombre
                                let found_item =  respuesta[i].articulo
                                found_item['artImg'] = this.img
                                if (found_item.articuloEstado === "En Espera") {
                                                                               
                                    found_item["artStyle"]   =  "await";
                                    
                                }else if (found_item.articuloEstado === "Publicado") {

                                    found_item["artStyle"]  =  "publish";
                              
                                }else if (found_item.articuloEstado === "Cancelada") {

                                    found_item["artStyle"]  =  "reject";
                              
                                }else if (found_item.articuloEstado === "En Revision") {

                                    found_item["artStyle"]  =  "await";
                              
                                } 
                                axios.get(API+"recomendaciones/articulo/full/"+found_item.articuloId).then((res)=> {
                                    let recomendacion = res.data.response;
                                    found_item["recomendacion"]= recomendacion
                                    this.foundit.push(found_item)                                     
                                })                              
                            }
                        }else{
                            this.error =true
                        }
                        console.log("RESPUESTA:::", respuesta)
                    })
                }
            }
        })        
    })
})