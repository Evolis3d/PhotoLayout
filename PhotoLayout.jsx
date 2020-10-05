// PhotoLayout.jsx
// -------------------------------------------------------------------
// Exports layer coords, sizes to a text file
// for later use in Unity3D
//
// Requires: Adobe Photoshop CS6+
// Version: 0.1, 21/09/2020
// Author: Carlos Lecina  - programacion@evolis3d.com
// ===============================================================================
// USAGE:
// 1. File > Command Scripts > Explore...
// 2. Select PhotoLayout.jsx file, and follow the steps...
// ===============================================================================

// Enables double-click launching from the Mac Finder or Windows Explorer
#target photoshop

// Bring application forward
app.bringToFront();

// Set active Document variable and decode name for output
var docRef = app.activeDocument;

// Define pixels as unit of measurement
var defaultRulerUnits = preferences.rulerUnits;
preferences.rulerUnits = Units.PIXELS;

// Define variable for the number of layers in the active document
var layerNum = app.activeDocument.artLayers.length;

// Define variable for the active layer in the active document
var layerRef = app.activeDocument.activeLayer;


//METER AQUI LOS INCLUDES NECESARIOS
#include "inc_common.jsx";
#include "inc_extras.jsx";
 //METER AQUI --FIN--


// Define varibles for x and y of layers
var xmin = layerRef.bounds[0].value;
var ymin = layerRef.bounds[1].value;
var xmax = layerRef.bounds[2].value;
var ymax = layerRef.bounds[3].value;
var w = xmin + xmax;
var h = ymin + ymax;

var coords = "";

// Loop to iterate through all layers
function recurseLayers(currLayers) {
  for (var i = 0; i < currLayers.layers.length; i++) {
    layerRef = currLayers.layers[i];

    xmin = layerRef.bounds[0].value;
    xmin = parseInt(xmin);
    ymin = layerRef.bounds[1].value;
    ymin = parseInt(ymin);

    xmax = layerRef.bounds[2].value;
    xman = parseInt(xmax);
    ymax = layerRef.bounds[3].value;
    ymax = parseInt(ymax);

    w = xmin + xmax;
    h = ymin + ymax;


    //Bloque para generar los tags desde las capas---------------
    if (layerRef.visible == true) {
      //if (layerRef.isBackgroundLayer == true) {
      GenerateElement();
      //}
    }
    //if (layerRef.name.toUpperCase() == capaQuestion) {
    //  GeneraQuestion();
    //}
    //if (layerRef.name.toUpperCase() == capaAnswer1) {
    //  GeneraFoto();
    //}
    //if (layerRef.name.toUpperCase() == capaPlayer1) {
    //  GeneraCorrecto();
    //}
    //Fin de Bloque para Question----------------------------------



    //test if it's a layer set
    if (isLayerSet(currLayers.layers[i])) {
      //recurseLayers(currLayers.layers[i]);
    }
  }
}

//a test for a layer set
function isLayerSet(layer) {
  try {
    if (layer.layers.length > 0) {
      return true;
    }
  } catch (err) {
    return false;
  }
}

// Ask the user for the folder to export to
var FPath = Folder.selectDialog("Save exported coordinates to");

// Detect line feed type
if ($.os.search(/windows/i) !== -1) {
  fileLineFeed = "Windows";
} else {
  fileLineFeed = "Macintosh";
}

// Export to txt file
function writeFile(info) {
  try {
    var f = new File(FPath + "/" + docName);
    f.remove();
    f.open('a');
    f.lineFeed = fileLineFeed;
    f.write(info);
    f.close();
  } catch (e) {}
}

// Run the functions
//AQUI VA EL EXPORTADO GENERICO
GeneraHeader();
//   ----------------
recurseLayers(docRef); // <-- content of every layer
//   ----------------
GeneraFoo();

preferences.rulerUnits = defaultRulerUnits; // Set preferences back to user 's defaults
writeFile(coords);

// inc_extras features
GeneraController();
writeFile(coords);
// -------------

// Show results
if (FPath == null) {
  alert("Export aborted", "Canceled");
} else {
  alert("Exported " + layerNum + " elements successfully to " + FPath + "/" + docName);
}