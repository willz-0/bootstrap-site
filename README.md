## Element 5 – Multiple Scene Switching

The purpose of Element 5 was to demonstrate scene management within Babylon.js. Rather than creating a single environment, two separate scenes were developed that can be loaded and unloaded dynamically. This demonstrates how Babylon.js can manage multiple independent scenes within the same application.

Scene A contains a rotating cube positioned above a ground plane. A hemispheric light is used to illuminate the scene and a green background colour was selected to visually distinguish it from the second scene. The cube rotates continuously through the use of the registerBeforeRender() function, which updates the object's rotation before each frame is rendered.

Scene B contains a sphere positioned above a ground plane with a blue background. The sphere rotates and moves vertically using a sine function to create a floating animation effect. GUI text is displayed to inform the user that they can return to Scene A by pressing the appropriate key.

A scene switching system was implemented through a dedicated switchScene() function. This function first disposes of the currently active scene before creating and loading the selected scene. Disposing of unused scenes is important as it removes meshes, materials and textures from memory, helping to maintain performance and prevent unnecessary resource usage.

Keyboard input was implemented using a keydown event listener. Pressing the "1" key loads Scene A, while pressing the "2" key loads Scene B. This provides a simple but effective method of demonstrating scene transitions and user interaction.

The Babylon.js render loop continuously checks whether a scene is active before rendering. This ensures that only one scene is displayed at a time and prevents conflicts between multiple scenes.

During development, one challenge was ensuring that scene transitions occurred smoothly without leaving previous objects active in memory. This issue was resolved by disposing of the active scene before creating the next one. This approach keeps the application organised and efficient.

If the project were expanded further, additional scenes could be added alongside transition effects such as fade animations, loading screens or interactive portals. These features would provide a more immersive user experience while building upon the scene management system implemented in this element.

### Conclusion

Element 5 successfully demonstrates the use of multiple scenes within Babylon.js and the ability to switch between them using keyboard input. The implementation shows an understanding of scene creation, scene disposal, animation, user interaction and rendering. This element provides a solid foundation for more advanced scene management systems that could be developed in future projects.



























