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
	//innerElements, from PSD layers..
	
	coords += "}" +enter;
	coords += enter;
}

function GeneraFoo() {
	coords +="}" +enter;
	coords += enter;
}

function GenerateCanvas()
{
	coords += "var nc = new GameObject("+comillas+"Canvas"+comillas+", ";
		coords += "typeof(Canvas), ";
		coords += "typeof(CanvasScaler), ";
		coords += "typeof(GraphicRaycaster), ";
		coords += "typeof(CanvasGroup) ";
	coords += ");" +enter;
	coords += "nc.layer = 5;" +enter;
	//
	coords += "nc.GetComponent<Canvas>().renderMode = RenderMode.ScreenSpaceOverlay;" +enter;
	coords += "nc.GetComponent<Canvas>().pixelPerfect = true;" +enter;
	//
	coords += "nc.GetComponent<CanvasScaler>().uiScaleMode = ScaleMode.ScaleAndCrop;" +enter;
	coords += "nc.GetComponent<CanvasScaler>().referenceResolution = new Vector2("+screenwidth+","+screenheight+");" + enter;
	coords += "nc.GetComponent<CanvasScaler>().match = 1.0f;" +enter;
	//
}


//   -------------------------------------------------
