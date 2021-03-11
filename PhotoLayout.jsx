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
var fileLineFeed = "Windows";
var docName = "editor_GenerateUI.cs";
var enter = "\n";
var tabs = "\t";
var comillas = "\"";
var antibarra = "\\";
var decimal = "f ";

//GLOBALS EXPORT Settings
var alert_cs6mode = "Photoshop CS6 or previous detected. Layer Colors: OFF, Add Controls:ON";
var alert_ccmode = "Photoshop CC or next detected. All features ON";

var OPTIONS_LAYERCOLORS = false;
var OPTIONS_ADDCONTROLS = false;
var OPTIONS_PATH = null;

//MAIN CALL!!
Main();


function Main() {
  app.bringToFront();

  if (numversion < 14) {
    alert(alert_cs6mode);
    OPTIONS_LAYERCOLORS = false;
    OPTIONS_ADDCONTROLS = true;
    SetPath();
    Generate();
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
    alert("Exported " + layerNum + " elements successfully to " + OPTIONS_PATH + "/" + docName);
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

  button1.onClick = function() {
    SetPath();
    edittext1.text = decodeURI(OPTIONS_PATH); //OPTIONS_PATH;
  }


  var divider2 = dialog.add("panel", undefined, undefined, {
    name: "divider2"
  });
  divider2.alignment = "fill";

  var checkbox1 = dialog.add("checkbox", undefined, undefined, {
    name: "checkbox1"
  });
  checkbox1.helpTip = "Every layer will have its own color";
  checkbox1.text = "Use Layer color-presets";
  checkbox1.onClick = function() {
    OPTIONS_LAYERCOLORS = checkbox1.value;
  }

  var checkbox2 = dialog.add("checkbox", undefined, undefined, {
    name: "checkbox2"
  });
  checkbox2.helpTip = "Convert btn_ to Button, txt_ for TextMeshPro";
  checkbox2.text = "Generate Extras";
  checkbox2.onClick = function() {
    OPTIONS_ADDCONTROLS = checkbox2.value;
  }

  var divider3 = dialog.add("panel", undefined, undefined, {
    name: "divider3"
  });
  divider3.alignment = "fill";

  var button2 = dialog.add("button", undefined, undefined, {
    name: "button2"
  });
  button2.text = "Export";
  button2.alignment = ["center", "top"];

  button2.onClick = function() {
    if (OPTIONS_PATH == null) {
      alert("Error! File path not specified!");
    } else {
      Generate();
    }
  }

  //llamada
  dialog.show();
}


function Generate() {
  //cosas
  GeneraHeader();
  recurseLayers(docRef);
  GeneraFoo();
  preferences.rulerUnits = defaultRulerUnits;
  writeFile(coords);
  //limpio coords y genero el otro fichero, el GeneraController
  GeneraController();
  writeFile(coords);
  FinalCheck();
}


function recurseLayers(currLayers) {
  for (var i = 0; i < currLayers.layers.length; i++) {

    layerRef = currLayers.layers[i];
    xmin = layerRef.bounds[0].value;
    ymin = layerRef.bounds[1].value;
    xmax = layerRef.bounds[2].value;
    ymax = layerRef.bounds[3].value;
    xmin = parseInt(xmin);
    ymin = parseInt(ymin);
    xmax = parseInt(xmax);
    ymax = parseInt(ymax);
    w = xmin + xmax;
    w = ymin + ymax;

    if (layerRef.visible == true) {
      GenerateElement(layerRef);
    }
    //ZONA WIP para añadir la feature de Grupo de Capas..
    //
  }
}

function GenerateElement(miLayer) {
  //
  var xminu = xmin / screenwidth;
  var xmaxu = xmax / screenwidth;
  var yminu = (screenheight - ymin) / screenheight;
  var ymaxu = (screenheight - ymax) / screenheight;
  xminu = (xminu).toFixed(3);
  xmaxu = (xmaxu).toFixed(3);
  yminu = (yminu).toFixed(3);
  ymaxu = (ymaxu).toFixed(3);
  //
  coords += enter;
  if (isTrueText(miLayer)) {
    coords += tabs + "el = new GameObject(" + comillas + "text_" + miLayer.name.replace(/\s/g, '') + comillas + ", ";
  } else {
    coords += tabs + "el = new GameObject(" + comillas + miLayer.name + comillas + ", ";
  }
  if (isButton(miLayer)) {
    coords += "typeof(Button) ";
  } else if (isTrueText(miLayer)) {
    coords += "typeof(TMP_Text) ";
    var alignText = miLayer.textItem.justification;
    var texContents = miLayer.textItem.contents;
  } else if (isText(miLayer)) {
    coords += "typeof(TMP_Text) ";
  } else {
    coords += "typeof(Image) ";
  }
  coords += ");" + enter;
  coords += tabs + "el.transform.SetParent(CanvasRoot.transform);" + enter;
  coords += tabs + "el.GetComponent<RectTransform>().anchoredPosition = Vector2.zero;" + enter;
  //POS
  coords += enter;
  coords += tabs + "el.GetComponent<RectTransform>().anchorMin = new Vector2(" + xminu + decimal + "," + ymaxu + decimal + ");" + enter;
  coords += tabs + "el.GetComponent<RectTransform>().anchorMax = new Vector2(" + xmaxu + decimal + "," + yminu + decimal + ");" + enter;
  coords += tabs + "el.GetComponent<RectTransform>().sizeDelta = Vector2.zero;" + enter;
  //ALIGN
  if (isTrueText(miLayer)) {
    coords += tabs + "el.GetComponent<TMP_Text>().text = " + comillas + texContents + comillas + ";" + enter;
    coords += tabs + "el.GetComponent<TMP_Text>().enableAutoSizing = true;" + enter;
    coords += tabs + "el.GetComponent<TMP_Text>().alignment = " + convertAlignment(alignText) + ";" + enter;
  }
  //COLOR
  if (isTrueText(miLayer) == false) {
    GenColors(OPTIONS_LAYERCOLORS);
  }
  //
  coords += tabs + "el.transform.SetSiblingIndex(0);" + enter;
}

function GenColors(myGlobalOption) {
  if (myGlobalOption == false) {
    if (layerRef.isBackgroundLayer) {
      coords += tabs + "el.GetComponent<Image>().color = Color.white;" + enter;
    } else {
      var redCol = Math.floor(Math.random() * 256);
      var greCol = Math.floor(Math.random() * 256);
      var bluCol = Math.floor(Math.random() * 256);
      coords += tabs + "el.GetComponent<Image>().color = new Color32(" + redCol + "," + greCol + "," + bluCol + ",255);" + enter;
    }
  } else {
    var strColor = getLayerColour();
    // "none","red","orange","yellowColor","grain","blue","violet","gray"
    if (strColor == "none") coords += tabs + "el.GetComponent<Image>().color = Color.white;" + enter;
    else if (strColor == "red") coords += tabs + "el.GetComponent<Image>().color = Color.red;" + enter;
    //else if (strColor == "orange") coords += tabs + "el.GetComponent<Image>().color = Color.white;" + enter;
    else if (strColor == "yellowColor") coords += tabs + "el.GetComponent<Image>().color = Color.yellow;" + enter;
    else if (strColor == "grain") coords += tabs + "el.GetComponent<Image>().color = Color.green;" + enter;
    else if (strColor == "blue") coords += tabs + "el.GetComponent<Image>().color = Color.blue;" + enter;
    //else if (strColor == "violet") coords += tabs + "el.GetComponent<Image>().color = Color.white;" + enter;
    else if (strColor == "gray") coords += tabs + "el.GetComponent<Image>().color = Color.gray;" + enter;
  }
}

function convertAlignment(myAlign) {
  var rsult = "TextAlignmentOptions.Left";
  if (myAlign == Justification.LEFT) rsult = "TextAlignmentOptions.Left";
  else if (myAlign == Justification.CENTER) rsult = "TextAlignmentOptions.Center";
  else if (myAlign == Justification.RIGHT) rsult = "TextAlignmentOptions.Right";
  return rsult;
}

function isTrueText(thisLayer) {
  return (thisLayer.kind == LayerKind.TEXT && OPTIONS_ADDCONTROLS == true);
}

function isText(thisLayer) {
  var miniT = thisLayer.name.toUpperCase();
  miniT = miniT.substring(0, 5);
  return (miniT == "TEXT_" && OPTIONS_ADDCONTROLS == true);
}

function isButton(thisLayer) {
  var miniL = thisLayer.name.toUpperCase();
  miniL = miniL.substring(0, 4);
  return (miniL == "BTN_" && OPTIONS_ADDCONTROLS == true);
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
  if (OPTIONS_ADDCONTROLS == true) {
    coords += "using TMPro;" + enter;
  }
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
  if (OPTIONS_ADDCONTROLS == true) {
    coords += "using TMPro;" + enter;
  }
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
      if (isTrueText(layerRef)) {
        coords += tabs + "public GameObject " + "text_" + layerRef.name.replace(/\s/g, '') + ";" + enter;
      } else {
        coords += tabs + "public GameObject " + layerRef.name + ";" + enter;
      }
    }
  }
  //
  coords += "}" + enter;
  coords += enter;
}

function writeFile(info) {
  try {
    var f = new File(OPTIONS_PATH + "/" + docName);
    f.remove();
    f.open('a');
    f.lineFeed = fileLineFeed;
    f.write(info);
    f.close();
  } catch (e) {}
}

function getLayerColour() {
  //Colours returned ....
  // "none","red","orange","yellowColor","grain","blue","violet","gray"
  var ref = new ActionReference();
  ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
  var appDesc = executeActionGet(ref);
  return typeIDToStringID(appDesc.getEnumerationValue(stringIDToTypeID('color')));
}