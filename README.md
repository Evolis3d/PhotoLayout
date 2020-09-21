# PhotoLayout

### Photoshop -> Unity3D exporter scripts for Canvas GUI layout generation.

by **Carlos Lecina**

* * *

**PhotoLayout** is a set of tools (probably more than one script) that will export your current PSD document to a custom import Unity C# script.
This script is really a code generator, a custom editor tool that will generate a nested Canvas, filled with all its children.

**Important:** THIS SCRIPT WON'T GENERATE YOUR GRAPHICS. YOU STILL NEED TO EXPORT THEM.

### Features

-   Almost 0 dependencies.
-   C# import code generation from scratch.
-   Uses % percentages instead of pixels.
-   1:1 Replication,
-   more coming soon...

### Installation

Just run the included .jsx script in Photoshop to generate the .cs file. Place the code file into your Unity3D project, ensure it's inside the _Assets\\Editor_ folder.

Then open Unity3D and execute the Editor script. This will generate the whole Canvas hierarchy and place every item in the Canvas.

### Coming Soon

- Export all the graphic material into an Atlas Texture...
- PlaceHolder script generator, auto-assigns as a Component to the Canvas.
- Naming the elements.
