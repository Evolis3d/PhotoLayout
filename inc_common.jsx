// Fichero include con vars y funciones para los scripts de generaci�n de plantillas
// ---------------------------

//CONSTS COMUNES PARA LA GENERACION DE PLANTILLAS
var screenwidth = app.activeDocument.width;
var screenheight = app.activeDocument.height;
var docName = "editor_GenerateUI.cs";


var enter = "\n";
var comillas = "\"";
var antibarra = "\\";
//CONSTS - FIN


function GeneraHeader() {
	coords += "using System.Collections;" +enter;
	coords += "using System.Collections.Generic;" +enter;
	cooods += "using UnityEngine;" +enter;
	coords += "using UnityEngine.UI;" +enter;
	coords += "using UnityEditor;" +enter;
	coords += enter;

	//
	coords += "public class editor_genera : MonoBehaviour" +enter;
	coords += "{" +enter;

	//
	coords += "[MenuItem("+comillas+"Gamascorpio/GenerateUI"+comillas+")]" +enter;
	coords += "static void GenerateUI()" +enter;
	coords += "{" +enter;
	//context-canvas
	GenerateCanvas();
	//endof_context-canvas
	coords += "}" +enter;
	coords += enter;
}

function GeneraFoo() {
	coords +="}" +enter;
	coords += enter;
}

function GenerateCanvas()
{
	coords += "var nc = new GameObject();" +enter;
}


//   -------------------------------------------------
