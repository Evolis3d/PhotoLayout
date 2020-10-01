// Fichero include con vars y funciones para los scripts de generaci�n de plantillas
// ---------------------------

//CONSTS COMUNES PARA LA GENERACION DE PLANTILLAS
var screenwidth = app.activeDocument.width;
screenwidth = parseInt(screenwidth);
var screenheight = app.activeDocument.height;
screenheight = parseInt(screenheight);
var docName = "editor_GenerateUI.cs";


var enter = "\n";
var tabs = "\t";
var comillas = "\"";
var antibarra = "\\";
var decimal = "f ";
//CONSTS - FIN


function GeneraHeader() {
  coords += enter;
  coords += "//REMEMBER: This script is self-generated and ONE-USE only!. You may want to remove it from your Project later..." + enter;
  coords += "//TEMPORAL FIX: Please, include the UnityEngine; line to this code by yourself, in case it's not there..." + enter;
  coords += enter;
  coords += enter;
  coords += "using System.Collections;" + enter;
  coords += "using System.Collections.Generic;" + enter;
  cooods += "using UnityEngine;" + enter;
  coords += "using UnityEngine.UI;" + enter;
  coords += "using UnityEditor;" + enter;
  coords += enter;

  //
  coords += "public class editor_GenerateUI : MonoBehaviour" + enter;
  coords += "{" + enter;
  coords += tabs + "static GameObject CanvasRoot;"
  coords += enter;
  //
  coords += "[MenuItem(" + comillas + "Gamascorpio/GenerateUI" + comillas + ")]" + enter;
  coords += "static void GenerateUI()" + enter;
  coords += "{" + enter;
  //context-canvas
  GenerateCanvas();
  //innerElements, from PSD layers..
  coords += tabs + "GenerateInnerUI();" + enter;
  //
  coords += "}" + enter;
  coords += enter;
  coords += enter;
  coords += "static private void GenerateInnerUI()" + enter;
  coords += "{" + enter;
  coords += "GameObject el;" + enter;
}

function GeneraFoo() {
  coords += "}" + enter;
  coords += enter;
  //
  coords += "}" + enter;
  coords += enter;
}

function GenerateCanvas() {
  coords += tabs + "CanvasRoot = new GameObject(" + comillas + "Canvas" + comillas + ", ";
  coords += "typeof(Canvas), ";
  coords += "typeof(CanvasScaler), ";
  coords += "typeof(GraphicRaycaster), ";
  coords += "typeof(CanvasGroup) ";
  coords += ");" + enter;
  coords += tabs + "CanvasRoot.transform.position = Vector3.zero;" + enter;
  coords += tabs + "CanvasRoot.layer = 5;" + enter;
  //
  coords += tabs + "CanvasRoot.GetComponent<Canvas>().renderMode = RenderMode.ScreenSpaceOverlay;" + enter;
  coords += tabs + "CanvasRoot.GetComponent<Canvas>().pixelPerfect = true;" + enter;
  //
  coords += tabs + "CanvasRoot.GetComponent<CanvasScaler>().uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;" + enter;
  coords += tabs + "CanvasRoot.GetComponent<CanvasScaler>().referenceResolution = new Vector2(" + screenwidth + "," + screenheight + ");" + enter;
  coords += tabs + "CanvasRoot.GetComponent<CanvasScaler>().matchWidthOrHeight = 1.0f;" + enter;
  //
}

function GenerateElement() {
  //
  coords += enter;
  coords += tabs + "el = new GameObject(" + comillas + layerRef.name + comillas + ", ";
  coords += "typeof(Image) ";
  coords += ");" + enter;
  coords += tabs + "el.transform.SetParent(CanvasRoot.transform);" + enter;
  //
  coords += tabs + "el.GetComponent<RectTransform>().anchoredPosition = Vector2.zero;" + enter;
  //relleno cada capa
  GenerateElement2();
  coords += tabs + "el.GetComponent<RectTransform>().sizeDelta = Vector2.zero;" + enter;
  //
  if (layerRef.isBackgroundLayer) {
    coords += tabs + "el.GetComponent<Image>().color = Color.white;" + enter;
  } else {
    coords += tabs + "el.GetComponent<Image>().color = Color.red;" + enter;
  }
  //
  coords += tabs + "el.transform.SetSiblingIndex(0);" + enter;
  //
}

//   -------------------------------------------------

function GenerateElement2() {
  //
  var xminu = xmin / screenwidth;
  xminu = (xminu).toFixed(3);
  var xmaxu = xmax / screenwidth;
  xmaxu = (xmaxu).toFixed(3);
  var yminu = (screenheight - ymin) / screenheight;
  yminu = (yminu).toFixed(3);
  var ymaxu = (screenheight - ymax) / screenheight;
  ymaxu = (ymaxu).toFixed(3);
  //
  coords += enter;
  coords += tabs + "el.GetComponent<RectTransform>().anchorMin = new Vector2(" + xminu + decimal + "," + ymaxu + decimal + ");" + enter;
  coords += tabs + "el.GetComponent<RectTransform>().anchorMax = new Vector2(" + xmaxu + decimal + "," + yminu + decimal + ");" + enter;
  //
}