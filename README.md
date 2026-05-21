Babylon.js Coursework Documentation

Introduction:

This coursework project was developed using Babylon.js to create interactive 3D environments inside a web browser. Each element introduced new features such as textures, terrain, physics, collisions, imported models, and player interaction systems.

The project was built using:

* HTML
* JavaScript
* Babylon.js

  Element 1 – Basic Shapes and Scene Setup

Aim

The aim of Element 1 was to create a simple Babylon.js scene using primitive meshes, textures, lighting, shadows, and animation.

Features

* ArcRotateCamera
* Directional lighting
* Shadows
* Textured ground
* Cube and sphere meshes
* Animation system
  
Final Scene:
![Final Scene](./Screenshot%202026-05-20%20at%2023.36.40.png)


Scene Setup Code

![Scene Setup](./Screenshot%202026-05-20%20at%2023.41.00.png)

Babylon.js engine and scene setup with custom background colour.

Camera and Lighting:

![Camera](./Screenshot%202026-05-20%20at%2023.41.45.png)

![Lighting](./Screenshot%202026-05-20%20at%2023.42.32.png)

ArcRotateCamera and directional lighting used to control the scene view and create shadows.

Result:
Element 1 successfully demonstrates basic Babylon.js scene creation, textures, lighting, shadows, and animation.

Element 2 – Environment Creation
Aim:
The aim of Element 2 was to create a larger outdoor environment using terrain, skyboxes, houses, and sprites.

Features:
* Height map terrain
* Sky environment
* Tree and palm sprites
* Multiple houses
* Improved camera controls

Final Scene

![Element 2 Final Scene](./element2-scene.jpg)

Large outdoor environment created using terrain, houses, trees, and sky textures.

Height map terrain used to create hills and landscape variation.
![Terrain Code](./Screenshot%202026-05-21%20at%2000.10.27.png)

Sprites and Environment

![Sprite System](./Screenshot%202026-05-21%20at%2000.11.05.png)

SpriteManager used for trees and environmental objects to improve performance.

Element 3 – Interaction and Physics
Aim:
The aim of Element 3 was to implement collisions, physics, imported models, player movement, and object interaction.

Features:

* Physics engine
* Follow camera
* Imported player model
* Collision systems
* Keyboard movement
* Pushable physics box

Final Scene:
![Element 3 Final Scene](./element3-scene.jpg)

Physics and Collisions:

![Physics Code](./element3-physics.jpg)

Gravity and collision detection were added so the player and objects can interact properly.

Character Import and Movement:
![Character Movement Code](./element3-movement.jpg)

Movement Controls:
![Movement Controls](./element3-controls.jpg)

Keyboard input was added using ActionManager to move and rotate the player.

Push Box Physics:
![Push Box Code](./element3-pushbox.jpg)

The player can push the physics box when close enough using impulses and collision detection.

Result

The interaction system was successful because the player can move smoothly using keyboard controls and interact with physics objects in real time. Gravity and collision detection helped create a more realistic environment, while the push box mechanic demonstrated working physics interactions using impulses.

Element 4 – GUI, Audio, Logic

This element demonstrates GUI systems, movement logic, jumping, and health mechanics using Babylon.js.

Final Scene:
![Element 4 Scene](element4-scene.jpg)

GUI – Health Bar:
![GUI Code](element4-gui.jpg)

A GUI health bar was created using Babylon GUI controls. The health bar updates dynamically during gameplay.
Movement and Jump Logic:
![Movement Code](element4-movement.jpg)

Keyboard input was implemented for movement and jumping using collision detection and gravity.
Health / Damage Logic:
![Logic Code](element4-logic.jpg)

The player loses health when colliding with the obstacle, and the GUI health bar updates in real time.

Result:
The GUI and gameplay systems worked successfully. The player could move, jump, collide with objects, and lose health dynamically while the health bar updated correctly on screen.
































