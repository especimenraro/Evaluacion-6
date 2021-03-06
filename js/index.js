/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarSlider();
playVideoOnScroll();


$(document).ready(function () {

$.ajax ({
			url: "./inicio.php",
			//datatype: "json",
			//cache: false,
			//contentType: false,
			//processData: false,
			data:{campo:"Ciudad"},
			type: "POST"
		}).done(function (data,data2) {
			$("#selectCiudad").css("display","block");
			var listadoCiudades = JSON.parse(data);
			for (i=0; i<listadoCiudades.length;i++) {
				$("#selectCiudad").append('<option value="'+listadoCiudades[i].Ciudad+'">'+listadoCiudades[i].Ciudad+'</option>');
			} // FIN FOR
		} //FIN FUNCTION DONE
		) //FIN DONE
		
		$.ajax ({
			url: "./inicio.php",
			//datatype: "json",
			//cache: false,
			//contentType: false,
			//processData: false,
			data:{campo:"Tipo"},
			type: "POST"
		}).done(function (data,data2) {
			$("#selectTipo").css("display","block");
			var listadoTipo = JSON.parse(data);
			for (i=0; i<listadoTipo.length;i++) {
				$("#selectTipo").append('<option value="'+listadoTipo[i].Tipo+'">'+listadoTipo[i].Tipo+'</option>');
			} // FIN FOR
		} //FIN FUNCTION DONE
		) //FIN DONE
		
		
$("#formulario").submit(function (event) {
	$("#cartelera_anuncio").remove();
event.preventDefault();
var listado;
var Ciudad;
var flagCiudad;
var Tipo;
var flagTipo;
var precioMin;
var precioMax;
var slider;
var html;
if ($("#selectCiudad").val().length) { 
	Ciudad = $("#selectCiudad").val();
	flagCiudad = false;
	} //FIN IF
else {
	flagCiudad = true;	
	Ciudad = "xxx";
	}
	
if ($("#selectTipo").val().length) { 
	Tipo = $("#selectTipo").val();
	flagTipo= false;
	} //FIN IF
else {
	flagTipo = true;	
	Tipo="xxx";
	}
	slider = $("#rangoPrecio").data("ionRangeSlider");
precioMin = slider.old_from.toString();
precioMax = slider.old_to.toString();

$.ajax ({
			url: "./buscador.php",
			//datatype: "json",
			//cache: false,
			//contentType: false,
			//processData: false,
			data:{Ciudad:Ciudad, Tipo: Tipo, flagTipo:flagTipo, flagCiudad:flagCiudad, precioMin: precioMin, precioMax: precioMax},
			type: "POST"
		}).done(function (data) {
			if (data!="null") {
			var listado = JSON.parse(data);
			$(".divider").after('<div class="row" id="cartelera_anuncio" ><div class="col s12" id="anuncio"></div></div>');
			for (i=0; i<listado.length;i++) {
				html = '<div class="row" ><div class="col l5"><img src="./img/home.jpg" class="responsive-img"></div><div class="col l7"><p>Id:'+listado[i].Id+'</p><p>Dirección:'+listado[i].Direccion+'</p><p>Ciudad:'+listado[i].Ciudad+'</p><p>Teléfono:'+listado[i].Telefono+'</p><p>Código Postal:'+listado[i].Codigo_Postal+'</p><p>Tipo:'+listado[i].Tipo+'</p><p>Precio:'+listado[i].Precio+'</p></div></div>';
				$("#anuncio").append(html);
			} // FIN FOR
		} //FIN IF
		else {
			html = '<div class="row" id="cartelera_anuncio" ><div class="col s12" id="anuncio"><p>No se encontraron coincidencias</p></div></div>'
			$(".divider").after(html);
		} // FIN ELSE
		} //FIN FUNCTION DONE
		) //FIN DONE
});//FIN SUBMIT

$("#mostrarTodos").click(function (event) {
	$("#cartelera_anuncio").remove();
	event.preventDefault();
	
	var Ciudad;
	var flagCiudad;
	var Tipo;
	var flagTipo;
	var precioMin;
	var precioMax;
	var slider;
	var html;
	Ciudad = $("#selectCiudad").val();
	Tipo = $("#selectTipo").val();
	precioMin = 0;
	precioMax = 100000;
	flagCiudad = true;
	flagTipo = true;
	$.ajax ({
			url: "./buscador.php",
			//datatype: "json",
			//cache: false,
			//contentType: false,
			//processData: false,
			data:{Ciudad:Ciudad, Tipo: Tipo, flagTipo:flagTipo, flagCiudad:flagCiudad, precioMin: precioMin, precioMax: precioMax},
			type: "POST"
		}).done(function (data) {
			if (data!="null") {
				var listado = JSON.parse(data);
				$(".divider").after('<div class="row" id="cartelera_anuncio" ><div class="col s12" id="anuncio"></div></div>');
					for (i=0; i<listado.length;i++) {
						html = '<div class="row" ><div class="col l5"><img src="./img/home.jpg" class="responsive-img"></div><div class="col l7"><p>Id:'+listado[i].Id+'</p><p>Dirección:'+listado[i].Direccion+'</p><p>Ciudad:'+listado[i].Ciudad+'</p><p>Teléfono:'+listado[i].Telefono+'</p><p>Código Postal:'+listado[i].Codigo_Postal+'</p><p>Tipo:'+listado[i].Tipo+'</p><p>Precio:'+listado[i].Precio+'</p></div></div>';
						$("#anuncio").append(html);
					} // FIN FOR
		} //FIN IF
		else {
			html = '<div class="row" id="cartelera_anuncio" ><div class="col s12" id="anuncio"><p>No se encontraron coincidencias</p></div></div>'
			$(".divider").after(html);
		} // FIN ELSE
		} //FIN FUNCTION DONE
		) //FIN DONE
}); // FIN CLICK MOSTRAR TODOS
}); // FIN DOCUMENT READY





















