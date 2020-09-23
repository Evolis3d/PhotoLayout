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
  coords += "using System.Collections;" + enter;
  coords += "using System.Collections.Generic;" + enter;
  coords += "using UnityEngine.UI;" + enter;
  coords += "using UnityEditor;" + enter;
  cooods += "using UnityEngine;" + enter;
  coords += enter;

  //
  coords += "public class editor_genera : MonoBehaviour" + enter;
  coords += "{" + enter;
  coords += "GameObject CanvasRoot;"
  coords += enter;
  //
  coords += "[MenuItem(" + comillas + "Gamascorpio/GenerateUI" + comillas + ")]" + enter;
  coords += "static void GenerateUI()" + enter;
  coords += "{" + enter;
  //context-canvas
  GenerateCanvas();
  //innerElements, from PSD layers..
  coords += "GenerateInnerUI();" + enter;
  //
  coords += "}" + enter;
  coords += enter;
}

function GeneraFoo() {
  coords += "}" + enter;
  coords += enter;
}

function GenerateCanvas() {
  coords += "CanvasRoot = new GameObject(" + comillas + "Canvas" + comillas + ", ";
  coords += "typeof(Canvas), ";
  coords += "typeof(CanvasScaler), ";
  coords += "typeof(GraphicRaycaster), ";
  coords += "typeof(CanvasGroup) ";
  coords += ");" + enter;
  coords += "CanvasRoot.layer = 5;" + enter;
  //
  coords += "CanvasRoot.GetComponent<Canvas>().renderMode = RenderMode.ScreenSpaceOverlay;" + enter;
  coords += "CanvasRoot.GetComponent<Canvas>().pixelPerfect = true;" + enter;
  //
  coords += "CanvasRoot.GetComponent<CanvasScaler>().uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;" + enter;
  coords += "CanvasRoot.GetComponent<CanvasScaler>().referenceResolution = new Vector2(" + screenwidth + "," + screenheight + ");" + enter;
  coords += "CanvasRoot.GetComponent<CanvasScaler>().matchWidthOrHeight = 1.0f;" + enter;
  //
}

function GenerateElement() {
  coords += "private void GenerateInnerUI()" + enter;
  coords += "{" + enter;
  //
  coords += "var el = new GameObject(" + comillas + layerRef.name + comillas + ", ";
  coords += "typeof(Image) ";
  coords += ");" + enter;
  coords += "el.transform.setParent(CanvasRoot.transform);" + enter;
  //
  coords += "}" + enter;
  coords += enter;
}
//   -------------------------------------------------