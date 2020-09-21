//Fichero de include especifico para generar el nivel Game01.xml
// ---------------------------

//CONSTS GAME1.xml - tags de la interfaz del Edu
var docName = "Game01.xml";

var capaQuestion = "QUESTION";
var capaAnswer1 = "ANSWER1";
var capaPlayer1 = "PLAYER1";
//CONSTS GAME1.xml ---Fin--



function GeneraQuestion() {  
      coords += "<barra-pregunta " + enter;
      coords += "filename=" + comillas + "res" + antibarra + "Question_Fill.png" + comillas + enter;
      coords += "layer=" + comillas + "3" + comillas + enter;
      coords += "size=" + comillas + w + "," + h + comillas + enter;
      coords += "alpha=" + comillas + "0" + comillas + enter;

      coords += "ending_filename=" + comillas + "res" + antibarra + "Question_Alert.png" + comillas + enter;
      coords += "speed=" + comillas + "3" + comillas + enter;	

      coords += "position_end=" + comillas + x + "," + y + comillas + enter;
      coords += "position_start=" + comillas + x + "," + y + comillas + enter;
      
      coords += "background_filename=" + comillas + "res" + antibarra + "Question_Bg.png" + comillas + enter;
      coords += "background_position=" + comillas + x + "," + y + comillas + enter;
      coords += "background_layer=" + comillas + "2" + comillas + enter;
      coords += "background_size=" + comillas + w + "," + h + comillas + enter;

      coords += "text_position=" + comillas + "0,0" + comillas + enter;
      coords += "text_size=" + comillas + "0,0" + comillas + enter;
      coords += "text_layer=" + comillas + "8" + comillas + enter;
      coords += "text_color=" + comillas + "255,255,255" + comillas + enter;
      coords += "text_font=" + comillas + "verdana" + comillas + enter;
      coords += "text_bold=" + comillas + "1" + comillas + enter;
      coords += "text_font_size=" + comillas + "18" + comillas + enter;

      coords += ">" + enter;
      coords += enter;
}



function GeneraFoto() {
	coords += "<foto-pregunta " + enter;
	coords += "position=" + comillas + x + "," + y + comillas + enter;
	coords += "size=" + comillas + w + "," + h + comillas + enter;
	coords +=" layer=" + comillas + "8" + comillas + enter;
	coords += ">" + enter;
      	coords += enter;
}

function GeneraVideo() {
	coords += "<video-pregunta " + enter;
	coords += "position=" + comillas + x + "," + y + comillas + enter;
	coords += "size=" + comillas + w + "," + h + comillas + enter;
	coords +=" layer=" + comillas + "8" + comillas + enter;
	coords += ">" + enter;
      	coords += enter;
}


function GeneraCorrecto() {
	coords += "<imagen-correcto " + enter;
	coords += "filename=" + comillas + "res" + antibarra + "v.png" + comillas + enter;
	coords += "scale=" + comillas + "100" + comillas + enter;
	coords +=" layer=" + comillas + "7" + comillas + enter;
	coords += ">" + enter;
      	coords += enter;
}


function GeneraIncorrecto() {
	coords += "<imagen-incorrecto " + enter;
	coords += "filename=" + comillas + "res" + antibarra + "v.png" + comillas + enter;
	coords += "scale=" + comillas + "100" + comillas + enter;
	coords +=" layer=" + comillas + "7" + comillas + enter;
	coords += ">" + enter;
      	coords += enter;
}


function GeneraVoices() {
	coords += "<voices " + enter;
	
	coords += ">" + enter;
      	coords += enter;
}
