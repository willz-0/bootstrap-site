const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.3, 0.3, 0.45);

    // Camera
    const camera = new BABYLON.ArcRotateCamera(
        "camera",
        Math.PI / 2,
        Math.PI / 3,
        12,
        new BABYLON.Vector3(0, 1, 0),
        scene
    );
    camera.attachControl(canvas, true);

    // Light
    const light = new BABYLON.DirectionalLight(
        "light",
        new BABYLON.Vector3(-1, -2, -1),
        scene
    );
    light.position = new BABYLON.Vector3(10, 20, 10);

    // Shadow generator
    const shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
    shadowGenerator.useBlurExponentialShadowMap = true;

    // Ground
    const ground = BABYLON.MeshBuilder.CreateGround(
        "ground",
        { width: 10, height: 10 },
        scene
    );

    const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
    groundMat.diffuseTexture = new BABYLON.Texture(
        "textures/floor.png",
        scene
    );
    ground.material = groundMat;
    ground.receiveShadows = true;

    // Cube
    const box = BABYLON.MeshBuilder.CreateBox(
        "box",
        { size: 2 },
        scene
    );
    box.position.y = 1;

    const boxMat = new BABYLON.StandardMaterial("boxMat", scene);
    boxMat.diffuseTexture = new BABYLON.Texture(
        "textures/wood.jpg",
        scene
    );
    box.material = boxMat;
    shadowGenerator.addShadowCaster(box);

    // Sphere on top of cube
    const sphere = BABYLON.MeshBuilder.CreateSphere(
        "sphere",
        { diameter: 1 },
        scene
    );
    sphere.position.y = 2.5;

    const sphereMat = new BABYLON.StandardMaterial("sphereMat", scene);
    sphereMat.diffuseColor = new BABYLON.Color3(0.8, 0.2, 0.2);
    sphere.material = sphereMat;
    shadowGenerator.addShadowCaster(sphere);
   scene.onBeforeRenderObservable.add(function () {
   box.rotation.y += 0.01;
     sphere.position.y = 2.5 + Math.sin(performance.now() * 0.003) * 0.4;
});
    return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
  
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});
