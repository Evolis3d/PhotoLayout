//Extra file to create a UICOntroller for the recently generated UI Layout
// ---------------------------

//CONSTS COMUNES PARA LA GENERACION DE PLANTILLAS
//var docName = "UIController.cs";
var enter = "\n";
var tabs = "\t";
var comillas = "\"";
var antibarra = "\\";
var decimal = "f ";
//CONSTS - FIN


function GeneraController() {
  //1. Overwrite some system vars..
  coords = "";
  docName = "UIController.cs";

  //2. the script..
  coords += enter;
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
  coords += "public class UIController : MonoBehaviour" + enter;
  coords += "{" + enter;

  //
  coords += tabs + "public Canvas canv;" + enter;
  coords += tabs + "private CanvasGroup canvGroup;" + enter;
  coords += enter;
  coords += tabs + "[Header(" + comillas + "UI Elements" + comillas + ")]" + enter;

  //each layer avaiable. NOTE: This is common type variables, I won't specify data type for them...
  for (var i = 0; i < app.activeDocument.layers.length; i++) {
    layerRef = app.activeDocument.layers[i];
    if (layerRef.visible == true) {
      coords += tabs + "public GameObject " + layerRef.name + ";" + enter;
    }
  }
  //
  coords += "}" + enter;
  coords += enter;
}