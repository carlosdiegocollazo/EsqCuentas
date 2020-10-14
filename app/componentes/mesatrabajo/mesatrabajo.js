let componentemesa = Vue.component('mesa-trabajo', function(resolve) {
    axios.get('./app/componentes/mesatrabajo/vistamesa.html').then((view) =>{

        resolve({
            template: view.data
        })
    })
})