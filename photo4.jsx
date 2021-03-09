#target photoshop;


//GLOBALS DOCUMENT
var docRef = app.activeDocument;
var version = app.version;
var numversion = parseInt(version);
var defaultRulerUnits = preferences.rulerUnits;
preferences.rulerUnits = Units.PIXELS;
var layerNum = app.activeDocument.artLayers.length;
var layerRef = app.activeDocument.activeLayer;
var layername = layerRef.name.toUpperCase();
var screenwidth = app.activeDocument.width;
var screenheight = app.activeDocument.height;
screenwidth = parseInt(screenwidth);
screenheight = parseInt(screenheight);

//GLOBALS COORDS
var xmin = layerRef.bounds[0].value;
var ymin = layerRef.bounds[1].value;
var xmax = layerRef.bounds[2].value;
var ymax = layerRef.bounds[3].value;
var w = xmin + xmax;
var h = ymin + ymax;
var coords = "";

//GLOBALS PARSER
var docName = "editor_GenerateUI.cs";
var enter = "\n";
var tabs = "\t";
var comillas = "\"";
var antibarra = "\\";
var decimal = "f ";

//GLOBALS EXPORT Settings
var alert_cs6mode = "Photoshop CS6 or previous detected. Random Colors: ON, Add Controls:ON";
var alert_ccmode = "Photoshop CC or next detected. All features ON";

var OPTIONS_RANDOMCOLORS = false;
var OPTIONS_ADDCONTROLS = false;
var OPTIONS_PATH = null;

//MAIN CALL!!
Main();


function Main() {
  app.bringToFront();

  if (numversion < 14) {
    alert(alert_cs6mode);
    SetPath();
    Generate();
    //FinalCheck();
  }
  //if numversion >13 , es que usamos una versión CC más nueva...
  else {
    alert(alert_ccmode);
    ShowGUI();
  }
}



//-FUNCTIONS--------------------------------------------------------

function SetPath() {
  OPTIONS_PATH = Folder.selectDialog("Save exported coords to");
  //
  if ($.os.search(/windows/i) !== -1) {
    fileLineFeed = "Windows";
  } else {
    fileLineFeed = "Macintosh";
  }
}

function FinalCheck() {
  if (OPTIONS_PATH == null) {
    alert("Export Aborted", "Canceled");
  } else {
    alert("Exported " + layernum + " elements successfully to " + OPTIONS_PATH + "/" + docName);
  }
}


function ShowGUI() {
  var dialog = new Window("dialog", undefined, undefined, {
    resizeable: true
  });
  dialog.text = "PhotoLayout Export Settings";
  dialog.orientation = "column";
  dialog.alignChildren = ["left", "top"];
  dialog.spacing = 10;
  dialog.margins = 16;

  var divider1 = dialog.add("panel", undefined, undefined, {
    name: "divider1"
  });
  divider1.alignment = "fill";

  var group1 = dialog.add("group", undefined, {
    name: "group1"
  });
  group1.orientation = "row";
  group1.alignChildren = ["left", "center"];
  group1.spacing = 10;
  group1.margins = 0;

  var statictext1 = group1.add("statictext", undefined, undefined, {
    name: "statictext1"
  });
  statictext1.text = "Export Path:";

  var edittext1 = group1.add('edittext {properties: {name: "edittext1"}}');
  edittext1.text = "(none)";
  edittext1.preferredSize.width = 150;

  var button1 = group1.add("button", undefined, undefined, {
    name: "button1"
  });
  button1.text = "...";

  button1.onClick = function () {
    SetPath();
    edittext1.text = OPTIONS_PATH;
  }


  var divider2 = dialog.add("panel", undefined, undefined, {
    name: "divider2"
  });
  divider2.alignment = "fill";

  var checkbox1 = dialog.add("checkbox", undefined, undefined, {
    name: "checkbox1"
  });
  checkbox1.helpTip = "Every layer will have its own color";
  checkbox1.text = "Use Random Colors";
  OPTIONS_RANDOMCOLORS = checkbox1.value;

  var checkbox2 = dialog.add("checkbox", undefined, undefined, {
    name: "checkbox2"
  });
  checkbox2.helpTip = "Convert btn_ to Button, txt_ for TextMeshPro";
  checkbox2.text = "Generate Extras";
  OPTIONS_ADDCONTROLS = checkbox2.value;

  var divider3 = dialog.add("panel", undefined, undefined, {
    name: "divider3"
  });
  divider3.alignment = "fill";

  var button2 = dialog.add("button", undefined, undefined, {
    name: "button2"
  });
  button2.text = "Export";
  button2.alignment = ["center", "top"];

  button2.onClick = function () {
      if (OPTIONS_PATH == null) {
        alert("Error! File path not specified!");
      }
      else {
        Generate();
      }
  }

  //llamada
  dialog.show();
}


function Generate()
{
  //cosas
}



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

function GeneraFoo() {
  coords += "}" + enter;
  coords += enter;
  //
  coords += "}" + enter;
  coords += enter;
}

function getLayerColour() {
  //Colours returned ....
  // "none","red","orange","yellowColor","grain","blue","violet","gray"
  var ref = new ActionReference();
  ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );
  var appDesc = executeActionGet(ref);
  return typeIDToStringID(appDesc.getEnumerationValue(stringIDToTypeID('color')) );
}
