// Concursazo.jsx
// -------------------------------------------------------------------
// Script que genera en fichero las plantillas de los niveles
// del Concursazo.
//
// Requisitos: Adobe Photoshop CS6
// Version: 0.2, 26/02/2020
// Author: Pioj  - piojete@gmail.com
// ===============================================================================
// USO:
// 1. Archivo > Secuencia de Comandos > Explorar...
// 2. Selecciona el archivo Concursazo.jsx , ó el que convenga..
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
#include "includes/inc_common.jsx";
#include "includes/inc_Game01.jsx";
 //METER AQUI --FIN--


// Define varibles for x and y of layers
var x = layerRef.bounds[0].value;
var y = layerRef.bounds[1].value;
var w = layerRef.bounds[2].value;
var h = layerRef.bounds[3].value;
var coords = "";

// Loop to iterate through all layers
function recurseLayers(currLayers) {
  for (var i = 0; i < currLayers.layers.length; i++) {
    layerRef = currLayers.layers[i];

    x = layerRef.bounds[0].value;
    y = layerRef.bounds[1].value;

    w = layerRef.bounds[2].value;
    h = layerRef.bounds[3].value;

    //Bloque para generar los tags desde las capas
    if (layerRef.name.toUpperCase() == capaQuestion) {
      GeneraQuestion();
    }
    if (layerRef.name.toUpperCase() == capaAnswer1) {
      GeneraFoto();
    }
    if (layerRef.name.toUpperCase() == capaPlayer1) {
      GeneraCorrecto();
    }
    //Fin de Bloque para Question



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
GeneraComun();
//   ----------------
recurseLayers(docRef);
preferences.rulerUnits = defaultRulerUnits; // Set preferences back to user 's defaults
writeFile(coords);


// Show results
if (FPath == null) {
  alert("Export aborted", "Canceled");
} else {
  alert("Exportados " + layerNum + " elementos con exito en " + FPath + "/" + docName);
}