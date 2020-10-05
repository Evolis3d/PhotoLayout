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
  coords += "public class UIController : MonoBehaviour" + enter;
  coords += "{" + enter;

  //each layer avaiable
  for (var i = 0; i < app.activeDocument.layers.length; i++) {
    layerRef = app.activeDocument.layers[i];
    if (layerRef.visible == true) {
      coords += tabs + "public Image " + layerRef.name + ";" + enter;
    }
  }
  //
  coords += "}" + enter;
  coords += enter;
}