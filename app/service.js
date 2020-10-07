let Servicio  = {
	view: function (url, callback){
		let xhttp = new XMLHttpRequest();
		let view  = ``;
		xhttp.onreadystatechange = function () {
			if (xhttp.readyState == 4) {
				view = xhttp.responseText;
				callback(view);
			}
		}

		// OBTENER LOS DATOS POR GET
		xhttp.open('GET', url);
		xhttp.send();
	}
}



[
	{
	"value":10,
	"text":"Beijing",
	"continent":"Asia"
	},
	{
	"value":1,
	"text":"Amsterdam",
	"continent":"Europe"
	},
	{
	"value":6,
	"text":"Buenos Aires",
	"continent":"America"
	},
	{
	"value":5,
	"text":"Mexico City",
	"continent":"America"
	},
	{
	"value":9,
	"text":"Canberra",
	"continent":"Australia"
	},
	{
	"value":14,
	"text":"Cape Town",
	"continent":"Africa"
	}
]