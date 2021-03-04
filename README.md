# PhotoLayout

### Photoshop → Unity3D exporter scripts for Canvas GUI layout generation.

by **Carlos Lecina**

* * *

**PhotoLayout** is a set of tools _(probably more than one script)_ that will export your current PSD document to a self-generated, custom Unity C# script.
This script is really a GUI generator and composer, a custom editor tool that will create a nested Canvas from scratch, filled with all its children.

The order of the elements is reversed so it matches the one from your PSD document.

**Important:** THIS SCRIPT WON'T GENERATE YOUR GRAPHICS. YOU STILL NEED TO EXPORT THEM.


![Example](https://github.com/Evolis3d/PhotoLayout/blob/master/example.jpg)


### Features

-   0 dependencies, just the export scripts.
-   Modular, so it can be extended in the future. 
-   C# code generation from scratch, zero, nada.
-   Uses % percentages and RectTransform' Anchors instead of pixels.
-   1:1 Replication _(WYSIWYG)_
-   Basic colors for each UI element.
-   **Extra!** Generates a UIController script. _(if you'll ever need one...)_ 
-   more coming soon...

### Installation

Just run the included **PhotoLayout.jsx** script in Photoshop to generate the .cs file. When asked, point to your _Project\Assets\Editor_ folder.

Then open Unity3D and execute the Editor script. This will generate the whole Canvas hierarchy and place every item in the Canvas.

### Important! Temporal Fix

There's some weird bug that prevents the line **"using UnityEngine;"** for being added at the top of the code. Please, add it by yourself.

_(I'm working on it!)_

### Coming Soon
- Accurate coloring for UI elements.
- Layer Groups.
- Text Layers → TextMeshPRO conversion support.
- More align features _(I hope so...)_
- Code clean-up & reorganization _(it's a mess! XD)_

### Deprecated
- Export & pack all graphics into a TextureAtlas. _(2D PSD Importer package already does that)_
