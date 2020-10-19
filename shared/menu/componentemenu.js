Vue.component('menu-item', function (resolve, reject) {
    axios.get('./shared/menu/vistamenu.html').then(function (view) {
        resolve({
            //props:['title','menuItems'],
            template: view.data,
            data: function () {
                return {
                    idusu: localStorage.getItem('idusu'),
                    nombreusuario: localStorage.getItem('nombreusuario'),
                    seguridad: localStorage.getItem('seguridad'),

                }
            },
        })
    })
})