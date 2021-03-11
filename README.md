# PhotoLayout

### Photoshop → Unity3D exporter scripts for Canvas GUI layout generation.

by **Carlos Lecina**

* * *

**PhotoLayout** is a single file .jsx Photoshop Script _(a big one!)_ that will export your current PSD document to a self-generated, custom Unity C# script.
The script is really a GUI generator and a composer, a custom editor tool that will create a nested Canvas from scratch, filled with all its children.

The order of the elements is reversed so it matches the one from your PSD document.


**Important:** THIS SCRIPT WON'T GENERATE YOUR GRAPHICS. YOU STILL NEED TO EXPORT THEM.


![Example](https://github.com/Evolis3d/PhotoLayout/blob/master/example.jpg)


### Features

-   **NEW!** Now comes with a GUI! _(only for Photoshop CC or later)_
-   **NEW!** Support for special prefixes _(btn_ & text_)_
-   **NEW!** Option to convert Text Layers into TextMeshPRO Text controls.
-   **NEW!** Basic text alignment for Text Layers.
-   **NEW!** Option to color your elements using Photoshop's internal layer-color presets.
-   0 dependencies, single file.
-   Modular, so it can be extended in the future. 
-   C# code generation from scratch, zero, nada.
-   Uses % percentages and RectTransform' Anchors instead of pixels.
-   1:1 Replication _(WYSIWYG)_
-   **Extra!** Generates a UIController script. _(if you'll ever need one...)_ 
-   A few more coming soon...

### Installation

Just run the included **PhotoLayout.jsx** script in Photoshop. Versions CS6 or previous can't show the Settings Dialog window.

When 'Use Layer color-presets' option is turned off, random colors will be used for each element.

When 'Generate Extras' option is turned off, all Layers will be treated as Image elements.
 
**NOTE:** Ensure to point to your _Project\Assets\Editor_ folder.

Then open Unity3D. Before doing anything else, ensure you've added all your needed packages from the PackageManager. 

Then execute the Editor script. 

This will generate the whole Canvas hierarchy and place every item in the Canvas.

### Important! Temporal Fix

There's some weird bug that prevents the line **"using UnityEngine;"** for being added at the top of the code. Please, add it by yourself.

_(I'm working on it!)_

### Coming Soon
- Layer Groups.
- More align features _(vertical align options...)_
- Code clean-up & reorganization _(NOW it's a mess! XD)_

### Deprecated
- Export & pack all graphics into a TextureAtlas. _(2D PSD Importer package already does that)_
