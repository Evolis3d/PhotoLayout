// Fichero include con vars y funciones para los scripts de generación de plantillas
// ---------------------------

//CONSTS COMUNES PARA LA GENERACION DE PLANTILLAS
var screenwidth = 1280;
var screenheight = 720;

var DefaultFolder = "res";
var DefaultMusic = "BgMusic_Default.mp3";

var enter = "\n";
var comillas = "\"";
var antibarra = "\\";
//CONSTS - FIN


function GeneraBackground() {
	coords += "<background " +enter;
	coords += "color=" + comillas + "0,0,0" + comillas + enter;
	coords += ">" + enter;
      	coords += enter;
}


function GeneraFondo() {
      coords += "<image " + enter;
      coords += "filename=" + comillas + DefaultFolder  + antibarra + "Fondo.jpg" + comillas + enter;
      coords += "position=" + comillas + "0,0" + comillas + enter;
      coords += "layer=" + comillas + "1" + comillas + enter;
      coords += "id=" + comillas + "Fondo" + comillas + enter;
      coords += "size=" + comillas + screenwidth + "," + screenheight + comillas + enter;
      coords += ">" + enter;
      coords += enter;
}


function GeneraMusic() {
	coords += "<music " + enter;
	coords += "filename=" + comillas + DefaultFolder  + antibarra + DefaultMusic + comillas + enter;
	coords += ">" + enter;
      	coords += enter;
}


//   -------------------------------------------------
//Funcion OPCIONAL para generar los 3 tags de golpe

function GeneraComun() {
	GeneraBackground();
	GeneraFondo();
	GeneraMusic();
}

//   ----------------------------------------------